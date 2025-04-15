-- Crear tablas para el marketplace

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('buyer', 'seller', 'admin')),
  status TEXT NOT NULL CHECK (status IN ('active', 'pending', 'blocked')),
  verification_level TEXT NOT NULL CHECK (verification_level IN ('none', 'email', 'phone', 'document', 'complete')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  avatar_url TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  province TEXT
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  stock INTEGER NOT NULL,
  category TEXT NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('new', 'used')),
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'draft')),
  seller_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  sku TEXT,
  weight DECIMAL(10, 2),
  dimensions JSONB,
  features TEXT[],
  free_shipping BOOLEAN NOT NULL DEFAULT FALSE,
  shipping_type TEXT NOT NULL CHECK (shipping_type IN ('seller', 'buyer')),
  has_variants BOOLEAN NOT NULL DEFAULT FALSE,
  sales_count INTEGER NOT NULL DEFAULT 0,
  views_count INTEGER NOT NULL DEFAULT 0
);

-- Tabla de imágenes de productos
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  is_main BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabla de variantes de productos
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  stock INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabla de órdenes
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY,
  buyer_id UUID NOT NULL REFERENCES users(id),
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total DECIMAL(12, 2) NOT NULL,
  shipping_address JSONB NOT NULL,
  shipping_method TEXT NOT NULL,
  shipping_cost DECIMAL(12, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT NOT NULL CHECK (payment_status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabla de items de órdenes
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  seller_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Tabla de mensajes
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES users(id),
  receiver_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Crear políticas de seguridad (RLS)

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios
CREATE POLICY "Los usuarios pueden ver sus propios datos"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Los administradores pueden ver todos los usuarios"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Los usuarios pueden actualizar sus propios datos"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Los administradores pueden actualizar cualquier usuario"
  ON users FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para productos
CREATE POLICY "Cualquiera puede ver productos activos"
  ON products FOR SELECT
  USING (status = 'active');

CREATE POLICY "Los vendedores pueden ver sus propios productos"
  ON products FOR SELECT
  USING (seller_id = auth.uid());

CREATE POLICY "Los administradores pueden ver todos los productos"
  ON products FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Los vendedores pueden crear productos"
  ON products FOR INSERT
  WITH CHECK (
    seller_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND (role = 'seller' OR role = 'admin')
    )
  );

CREATE POLICY "Los vendedores pueden actualizar sus propios productos"
  ON products FOR UPDATE
  USING (seller_id = auth.uid());

CREATE POLICY "Los administradores pueden actualizar cualquier producto"
  ON products FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Los vendedores pueden eliminar sus propios productos"
  ON products FOR DELETE
  USING (seller_id = auth.uid());

CREATE POLICY "Los administradores pueden eliminar cualquier producto"
  ON products FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para imágenes de productos
CREATE POLICY "Cualquiera puede ver imágenes de productos"
  ON product_images FOR SELECT
  USING (true);

CREATE POLICY "Los vendedores pueden gestionar imágenes de sus productos"
  ON product_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM products WHERE id = product_id AND seller_id = auth.uid()
    )
  );

CREATE POLICY "Los administradores pueden gestionar cualquier imagen"
  ON product_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para variantes de productos
CREATE POLICY "Cualquiera puede ver variantes de productos"
  ON product_variants FOR SELECT
  USING (true);

CREATE POLICY "Los vendedores pueden gestionar variantes de sus productos"
  ON product_variants FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM products WHERE id = product_id AND seller_id = auth.uid()
    )
  );

CREATE POLICY "Los administradores pueden gestionar cualquier variante"
  ON product_variants FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para órdenes
CREATE POLICY "Los compradores pueden ver sus propias órdenes"
  ON orders FOR SELECT
  USING (buyer_id = auth.uid());

CREATE POLICY "Los vendedores pueden ver órdenes que contienen sus productos"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM order_items WHERE order_id = id AND seller_id = auth.uid()
    )
  );

CREATE POLICY "Los administradores pueden ver todas las órdenes"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Los compradores pueden crear órdenes"
  ON orders FOR INSERT
  WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Los administradores pueden actualizar cualquier orden"
  ON orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para items de órdenes
CREATE POLICY "Los compradores pueden ver items de sus propias órdenes"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders WHERE id = order_id AND buyer_id = auth.uid()
    )
  );

CREATE POLICY "Los vendedores pueden ver items de órdenes que contienen sus productos"
  ON order_items FOR SELECT
  USING (seller_id = auth.uid());

CREATE POLICY "Los administradores pueden ver todos los items de órdenes"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Los compradores pueden crear items de órdenes"
  ON order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders WHERE id = order_id AND buyer_id = auth.uid()
    )
  );

-- Políticas para mensajes
CREATE POLICY "Los usuarios pueden ver sus propios mensajes"
  ON messages FOR SELECT
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Los usuarios pueden enviar mensajes"
  ON messages FOR INSERT
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Los usuarios pueden marcar como leídos sus mensajes recibidos"
  ON messages FOR UPDATE
  USING (receiver_id = auth.uid());

CREATE POLICY "Los administradores pueden ver todos los mensajes"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_condition ON products(condition);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_order_items_seller_id ON order_items(seller_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
