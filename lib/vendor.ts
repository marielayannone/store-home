// Simulación de datos para el panel de vendedor - En una implementación real, esto se conectaría con Supabase o tu backend

interface Stats {
  sales: {
    total: number
    percentage: number
    trend: "up" | "down"
  }
  orders: {
    total: number
    percentage: number
    trend: "up" | "down"
  }
  customers: {
    total: number
    percentage: number
    trend: "up" | "down"
  }
  products: {
    total: number
    active: number
  }
}

interface Order {
  id: string
  customer: string
  date: string
  amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
}

interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  status: "active" | "inactive" | "draft"
  sales: number
  image: string
  createdAt: string
}

// Datos de ejemplo para estadísticas
const statsData: Record<string, Stats> = {
  week: {
    sales: {
      total: 125000,
      percentage: 12,
      trend: "up",
    },
    orders: {
      total: 32,
      percentage: 8,
      trend: "up",
    },
    customers: {
      total: 28,
      percentage: 5,
      trend: "up",
    },
    products: {
      total: 45,
      active: 38,
    },
  },
  month: {
    sales: {
      total: 450000,
      percentage: 15,
      trend: "up",
    },
    orders: {
      total: 124,
      percentage: 10,
      trend: "up",
    },
    customers: {
      total: 85,
      percentage: 12,
      trend: "up",
    },
    products: {
      total: 45,
      active: 38,
    },
  },
  year: {
    sales: {
      total: 3250000,
      percentage: 5,
      trend: "down",
    },
    orders: {
      total: 1250,
      percentage: 3,
      trend: "down",
    },
    customers: {
      total: 450,
      percentage: 8,
      trend: "up",
    },
    products: {
      total: 45,
      active: 38,
    },
  },
}

// Datos de ejemplo para pedidos recientes
const recentOrdersData: Order[] = [
  {
    id: "ORD-12345",
    customer: "Juan Pérez",
    date: "15 Jun 2023",
    amount: 24999,
    status: "delivered",
  },
  {
    id: "ORD-12346",
    customer: "María González",
    date: "14 Jun 2023",
    amount: 149999,
    status: "shipped",
  },
  {
    id: "ORD-12347",
    customer: "Carlos Rodríguez",
    date: "13 Jun 2023",
    amount: 5999,
    status: "processing",
  },
  {
    id: "ORD-12348",
    customer: "Ana Martínez",
    date: "12 Jun 2023",
    amount: 12999,
    status: "pending",
  },
  {
    id: "ORD-12349",
    customer: "Luis Sánchez",
    date: "11 Jun 2023",
    amount: 8999,
    status: "cancelled",
  },
]

// Datos de ejemplo para productos populares
const popularProductsData: Product[] = [
  {
    id: "PROD-001",
    name: 'Smartphone 128GB - Pantalla AMOLED 6.5" - 8GB RAM',
    price: 149999,
    stock: 15,
    category: "electronics",
    status: "active",
    sales: 42,
    image: "/placeholder.svg?height=48&width=48",
    createdAt: "2023-01-15",
  },
  {
    id: "PROD-002",
    name: "Auriculares Bluetooth con cancelación de ruido",
    price: 24999,
    stock: 28,
    category: "electronics",
    status: "active",
    sales: 36,
    image: "/placeholder.svg?height=48&width=48",
    createdAt: "2023-02-20",
  },
  {
    id: "PROD-003",
    name: "Smartwatch con monitor de ritmo cardíaco",
    price: 18999,
    stock: 10,
    category: "electronics",
    status: "active",
    sales: 29,
    image: "/placeholder.svg?height=48&width=48",
    createdAt: "2023-03-05",
  },
  {
    id: "PROD-004",
    name: 'Tablet 10" 64GB WiFi',
    price: 45999,
    stock: 8,
    category: "electronics",
    status: "active",
    sales: 21,
    image: "/placeholder.svg?height=48&width=48",
    createdAt: "2023-04-10",
  },
  {
    id: "PROD-005",
    name: "Cargador inalámbrico rápido",
    price: 5999,
    stock: 42,
    category: "electronics",
    status: "active",
    sales: 18,
    image: "/placeholder.svg?height=48&width=48",
    createdAt: "2023-05-15",
  },
]

// Datos de ejemplo para todos los productos
const allProductsData: Product[] = [
  ...popularProductsData,
  {
    id: "PROD-006",
    name: "Funda de silicona para smartphone",
    price: 1999,
    stock: 50,
    category: "accessories",
    status: "active",
    sales: 15,
    image: "/placeholder.svg?height=48&width=48",
    createdAt: "2023-05-20",
  },
  {
    id: "PROD-007",
    name: "Cable USB-C 2m",
    price: 1499,
    stock: 100,
    category: "accessories",
    status: "active",
    sales: 12,
    image: "/placeholder.svg?height=48&width=48",
    createdAt: "2023-05-25",
  },
  {
    id: "PROD-008",
    name: "Memoria USB 64GB",
    price: 3999,
    stock: 30,
    category: "electronics",
    status: "inactive",
    sales: 8,
    image: "/placeholder.svg?height=48&width=48",
    createdAt: "2023-06-01",
  },
  {
    id: "PROD-009",
    name: "Teclado mecánico RGB",
    price: 12999,
    stock: 5,
    category: "electronics",
    status: "active",
    sales: 6,
    image: "/placeholder.svg?height=48&width=48",
    createdAt: "2023-06-05",
  },
  {
    id: "PROD-010",
    name: "Mouse inalámbrico ergonómico",
    price: 4999,
    stock: 15,
    category: "electronics",
    status: "active",
    sales: 4,
    image: "/placeholder.svg?height=48&width=48",
    createdAt: "2023-06-10",
  },
  {
    id: "PROD-011",
    name: "Parlante Bluetooth portátil",
    price: 8999,
    stock: 12,
    category: "electronics",
    status: "draft",
    sales: 0,
    image: "/placeholder.svg?height=48&width=48",
    createdAt: "2023-06-15",
  },
]

// Función para obtener estadísticas del vendedor
export async function getVendorStats(timeframe = "week"): Promise<Stats> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return statsData[timeframe] || statsData.week
}

// Función para obtener pedidos recientes
export async function getRecentOrders(): Promise<Order[]> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 800))

  return recentOrdersData
}

// Función para obtener productos populares
export async function getPopularProducts(): Promise<Product[]> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 600))

  return popularProductsData
}

// Función para obtener todos los productos
export async function getVendorProducts(): Promise<Product[]> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return allProductsData
}

// Función para eliminar un producto
export async function deleteProduct(id: string): Promise<void> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 800))

  // En una implementación real, aquí se eliminaría el producto de la base de datos
  console.log(`Producto ${id} eliminado`)
}

// Función para crear un producto
export async function createProduct(productData: any): Promise<Product> {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // En una implementación real, aquí se crearía el producto en la base de datos
  const newProduct: Product = {
    id: `PROD-${Math.floor(Math.random() * 1000)}`,
    name: productData.name,
    price: productData.price,
    stock: productData.stock,
    category: productData.category,
    status: productData.status,
    sales: 0,
    image: productData.images.length > 0 ? productData.images[0].url : "/placeholder.svg?height=48&width=48",
    createdAt: new Date().toISOString().split("T")[0],
  }

  console.log("Producto creado:", newProduct)

  return newProduct
}
