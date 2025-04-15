import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

// Tipos para las tablas de Supabase
export type User = {
  id: string
  email: string
  first_name: string
  last_name: string
  role: "buyer" | "seller" | "admin"
  created_at: string
  avatar_url?: string
  phone?: string
  address?: string
  city?: string
  postal_code?: string
  province?: string
  status: "active" | "pending" | "blocked"
  verification_level: "none" | "email" | "phone" | "document" | "complete"
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  condition: "new" | "used"
  status: "active" | "inactive" | "draft"
  seller_id: string
  created_at: string
  updated_at: string
  sku?: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  features?: string[]
  free_shipping: boolean
  shipping_type: "seller" | "buyer"
  has_variants: boolean
  sales_count: number
  views_count: number
}

export type ProductImage = {
  id: string
  product_id: string
  url: string
  is_main: boolean
  created_at: string
}

export type ProductVariant = {
  id: string
  product_id: string
  name: string
  price: number
  stock: number
  created_at: string
}

export type Order = {
  id: string
  buyer_id: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  shipping_address: {
    name: string
    address: string
    city: string
    postal_code: string
    province: string
    phone: string
  }
  shipping_method: string
  shipping_cost: number
  payment_method: string
  payment_status: "pending" | "approved" | "rejected"
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  variant_id?: string
  quantity: number
  price: number
  seller_id: string
  created_at: string
}

export type Message = {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  read: boolean
  created_at: string
}

// Crear cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Anon Key is missing. Please check your environment variables.")
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Funciones de autenticación
export async function signUpWithEmail(email: string, password: string, userData: Partial<User>) {
  try {
    // Verificar si el correo ya existe
    const { data: existingUsers, error: checkError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      throw checkError
    }

    if (existingUsers) {
      throw new Error("Este correo electrónico ya está registrado")
    }

    // Registrar usuario en auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          role: userData.role || "buyer",
        },
      },
    })

    if (authError) throw authError

    if (!authData.user) {
      throw new Error("No se pudo crear el usuario")
    }

    // Crear registro en la tabla users
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email: email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      role: userData.role || "buyer",
      status: "pending",
      verification_level: "email",
      created_at: new Date().toISOString(),
    })

    if (profileError) throw profileError

    return { user: authData.user }
  } catch (error) {
    console.error("Error signing up:", error)
    throw error
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // Verificar si el usuario está activo
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("status")
      .eq("id", data.user.id)
      .single()

    if (userError) throw userError

    if (userData.status === "blocked") {
      await supabase.auth.signOut()
      throw new Error("Tu cuenta ha sido bloqueada. Contacta con soporte para más información.")
    }

    return data
  } catch (error) {
    console.error("Error signing in:", error)
    throw error
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) throw sessionError

    if (!sessionData.session) return null

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", sessionData.session.user.id)
      .single()

    if (userError) throw userError

    return userData as User
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return !!data.session
  } catch (error) {
    console.error("Error checking authentication:", error)
    return false
  }
}

export async function isAdmin(): Promise<boolean> {
  try {
    const user = await getCurrentUser()
    return user?.role === "admin"
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

// Funciones para productos
export async function getProducts(options: {
  category?: string
  search?: string
  limit?: number
  offset?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
  status?: string
  sellerId?: string
  condition?: string
}) {
  try {
    let query = supabase.from("products").select("*, product_images(*)")

    // Filtros
    if (options.category) {
      query = query.eq("category", options.category)
    }

    if (options.status) {
      query = query.eq("status", options.status)
    }

    if (options.sellerId) {
      query = query.eq("seller_id", options.sellerId)
    }

    if (options.condition) {
      query = query.eq("condition", options.condition)
    }

    if (options.search) {
      query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`)
    }

    // Ordenamiento
    if (options.sortBy) {
      const order = options.sortOrder || "asc"
      query = query.order(options.sortBy, { ascending: order === "asc" })
    } else {
      query = query.order("created_at", { ascending: false })
    }

    // Paginación
    if (options.limit) {
      query = query.limit(options.limit)
    }

    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    // Ejecutar consulta
    const { data, error, count } = await query

    if (error) throw error

    // Obtener el conteo total
    const { count: totalCount, error: countError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })

    if (countError) throw countError

    return {
      data,
      count: totalCount,
    }
  } catch (error) {
    console.error("Error getting products:", error)
    throw error
  }
}

export async function getProductById(id: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_images(*),
        product_variants(*),
        seller:seller_id(id, first_name, last_name, email)
      `)
      .eq("id", id)
      .single()

    if (error) throw error

    // Incrementar contador de vistas
    await supabase
      .from("products")
      .update({ views_count: (data.views_count || 0) + 1 })
      .eq("id", id)

    return data
  } catch (error) {
    console.error("Error getting product by ID:", error)
    throw error
  }
}

export async function createProduct(productData: Partial<Product>) {
  try {
    // Obtener el usuario actual
    const user = await getCurrentUser()

    if (!user) {
      throw new Error("Debes iniciar sesión para crear un producto")
    }

    // Generar ID único
    const productId = uuidv4()

    // Preparar datos del producto
    const product = {
      id: productId,
      seller_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      views_count: 0,
      sales_count: 0,
      ...productData,
    }

    // Extraer imágenes y variantes si existen
    const images = productData.images || []
    const variants = productData.variants || []

    // Eliminar propiedades que no pertenecen a la tabla products
    delete product.images
    delete product.variants

    // Insertar producto
    const { error: productError } = await supabase.from("products").insert(product)

    if (productError) throw productError

    // Insertar imágenes si existen
    if (images && images.length > 0) {
      const productImages = images.map((image: any) => ({
        id: uuidv4(),
        product_id: productId,
        url: image.url,
        is_main: image.main,
        created_at: new Date().toISOString(),
      }))

      const { error: imagesError } = await supabase.from("product_images").insert(productImages)

      if (imagesError) throw imagesError
    }

    // Insertar variantes si existen
    if (variants && variants.length > 0) {
      const productVariants = variants.map((variant: any) => ({
        id: uuidv4(),
        product_id: productId,
        name: variant.name,
        price: variant.price,
        stock: variant.stock,
        created_at: new Date().toISOString(),
      }))

      const { error: variantsError } = await supabase.from("product_variants").insert(productVariants)

      if (variantsError) throw variantsError
    }

    return { id: productId, ...product }
  } catch (error) {
    console.error("Error creating product:", error)
    throw error
  }
}

export async function updateProduct(id: string, productData: Partial<Product>) {
  try {
    // Obtener el usuario actual
    const user = await getCurrentUser()

    if (!user) {
      throw new Error("Debes iniciar sesión para actualizar un producto")
    }

    // Verificar que el producto pertenezca al vendedor
    const { data: existingProduct, error: productError } = await supabase
      .from("products")
      .select("seller_id")
      .eq("id", id)
      .single()

    if (productError) throw productError

    if (existingProduct.seller_id !== user.id && user.role !== "admin") {
      throw new Error("No tienes permiso para actualizar este producto")
    }

    // Preparar datos del producto
    const product = {
      updated_at: new Date().toISOString(),
      ...productData,
    }

    // Extraer imágenes y variantes si existen
    const images = productData.images || []
    const variants = productData.variants || []

    // Eliminar propiedades que no pertenecen a la tabla products
    delete product.images
    delete product.variants

    // Actualizar producto
    const { error: updateError } = await supabase.from("products").update(product).eq("id", id)

    if (updateError) throw updateError

    // Actualizar imágenes si existen
    if (images && images.length > 0) {
      // Eliminar imágenes existentes
      const { error: deleteImagesError } = await supabase.from("product_images").delete().eq("product_id", id)

      if (deleteImagesError) throw deleteImagesError

      // Insertar nuevas imágenes
      const productImages = images.map((image: any) => ({
        id: uuidv4(),
        product_id: id,
        url: image.url,
        is_main: image.main,
        created_at: new Date().toISOString(),
      }))

      const { error: imagesError } = await supabase.from("product_images").insert(productImages)

      if (imagesError) throw imagesError
    }

    // Actualizar variantes si existen
    if (variants && variants.length > 0) {
      // Eliminar variantes existentes
      const { error: deleteVariantsError } = await supabase.from("product_variants").delete().eq("product_id", id)

      if (deleteVariantsError) throw deleteVariantsError

      // Insertar nuevas variantes
      const productVariants = variants.map((variant: any) => ({
        id: uuidv4(),
        product_id: id,
        name: variant.name,
        price: variant.price,
        stock: variant.stock,
        created_at: new Date().toISOString(),
      }))

      const { error: variantsError } = await supabase.from("product_variants").insert(productVariants)

      if (variantsError) throw variantsError
    }

    return { id, ...product }
  } catch (error) {
    console.error("Error updating product:", error)
    throw error
  }
}

export async function deleteProduct(id: string) {
  try {
    // Obtener el usuario actual
    const user = await getCurrentUser()

    if (!user) {
      throw new Error("Debes iniciar sesión para eliminar un producto")
    }

    // Verificar que el producto pertenezca al vendedor
    const { data: existingProduct, error: productError } = await supabase
      .from("products")
      .select("seller_id")
      .eq("id", id)
      .single()

    if (productError) throw productError

    if (existingProduct.seller_id !== user.id && user.role !== "admin") {
      throw new Error("No tienes permiso para eliminar este producto")
    }

    // Eliminar imágenes del producto
    const { error: imagesError } = await supabase.from("product_images").delete().eq("product_id", id)

    if (imagesError) throw imagesError

    // Eliminar variantes del producto
    const { error: variantsError } = await supabase.from("product_variants").delete().eq("product_id", id)

    if (variantsError) throw variantsError

    // Eliminar producto
    const { error: deleteError } = await supabase.from("products").delete().eq("id", id)

    if (deleteError) throw deleteError

    return { success: true }
  } catch (error) {
    console.error("Error deleting product:", error)
    throw error
  }
}

// Funciones para imágenes de productos
export async function uploadProductImage(file: File) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new Error("Debes iniciar sesión para subir imágenes")
    }

    // Generar nombre único para el archivo
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `products/${user.id}/${fileName}`

    // Subir archivo a Supabase Storage
    const { data, error } = await supabase.storage.from("images").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) throw error

    // Obtener URL pública
    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(data.path)

    return { url: publicUrl }
  } catch (error) {
    console.error("Error uploading product image:", error)
    throw error
  }
}

// Funciones para órdenes
export async function createOrder(orderData: {
  items: { productId: string; variantId?: string; quantity: number; price: number; sellerId: string }[]
  shippingAddress: Order["shipping_address"]
  shippingMethod: string
  shippingCost: number
  paymentMethod: string
  total: number
}) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new Error("Debes iniciar sesión para crear una orden")
    }

    // Generar ID único
    const orderId = uuidv4()

    // Crear orden
    const { error: orderError } = await supabase.from("orders").insert({
      id: orderId,
      buyer_id: user.id,
      status: "pending",
      total: orderData.total,
      shipping_address: orderData.shippingAddress,
      shipping_method: orderData.shippingMethod,
      shipping_cost: orderData.shippingCost,
      payment_method: orderData.paymentMethod,
      payment_status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (orderError) throw orderError

    // Crear items de la orden
    const orderItems = orderData.items.map((item) => ({
      id: uuidv4(),
      order_id: orderId,
      product_id: item.productId,
      variant_id: item.variantId,
      quantity: item.quantity,
      price: item.price,
      seller_id: item.sellerId,
      created_at: new Date().toISOString(),
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) throw itemsError

    // Actualizar stock de productos
    for (const item of orderData.items) {
      if (item.variantId) {
        // Actualizar stock de variante
        const { data: variant, error: variantError } = await supabase
          .from("product_variants")
          .select("stock")
          .eq("id", item.variantId)
          .single()

        if (variantError) throw variantError

        const newStock = Math.max(0, variant.stock - item.quantity)

        const { error: updateError } = await supabase
          .from("product_variants")
          .update({ stock: newStock })
          .eq("id", item.variantId)

        if (updateError) throw updateError
      } else {
        // Actualizar stock de producto
        const { data: product, error: productError } = await supabase
          .from("products")
          .select("stock, sales_count")
          .eq("id", item.productId)
          .single()

        if (productError) throw productError

        const newStock = Math.max(0, product.stock - item.quantity)
        const newSalesCount = (product.sales_count || 0) + item.quantity

        const { error: updateError } = await supabase
          .from("products")
          .update({
            stock: newStock,
            sales_count: newSalesCount,
          })
          .eq("id", item.productId)

        if (updateError) throw updateError
      }
    }

    return { id: orderId, status: "pending" }
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export async function getOrdersByBuyer(options?: {
  status?: string
  limit?: number
  offset?: number
}) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new Error("Debes iniciar sesión para ver tus órdenes")
    }

    let query = supabase
      .from("orders")
      .select(`
        *,
        items:order_items(
          *,
          product:product_id(name, price, free_shipping, shipping_type),
          variant:variant_id(name, price)
        )
      `)
      .eq("buyer_id", user.id)
      .order("created_at", { ascending: false })

    if (options?.status) {
      query = query.eq("status", options.status)
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error getting buyer orders:", error)
    throw error
  }
}

export async function getOrdersBySeller(options?: {
  status?: string
  limit?: number
  offset?: number
}) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new Error("Debes iniciar sesión para ver tus órdenes")
    }

    // Primero obtenemos los IDs de las órdenes donde el vendedor tiene items
    const { data: orderItemsData, error: orderItemsError } = await supabase
      .from("order_items")
      .select("order_id")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false })

    if (orderItemsError) throw orderItemsError

    if (!orderItemsData || orderItemsData.length === 0) {
      return []
    }

    // Extraer IDs únicos de órdenes
    const orderIds = [...new Set(orderItemsData.map((item) => item.order_id))]

    // Obtener las órdenes completas
    let query = supabase
      .from("orders")
      .select(`
        *,
        items:order_items(
          *,
          product:product_id(name, price, free_shipping, shipping_type),
          variant:variant_id(name, price)
        )
      `)
      .in("id", orderIds)
      .order("created_at", { ascending: false })

    if (options?.status) {
      query = query.eq("status", options.status)
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) throw error

    // Filtrar los items para mostrar solo los del vendedor
    return data.map((order) => ({
      ...order,
      items: order.items.filter((item) => item.seller_id === user.id),
    }))
  } catch (error) {
    console.error("Error getting seller orders:", error)
    throw error
  }
}

// Funciones para mensajes
export async function sendMessage(receiverId: string, content: string) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new Error("Debes iniciar sesión para enviar mensajes")
    }

    const messageId = uuidv4()

    const { error } = await supabase.from("messages").insert({
      id: messageId,
      sender_id: user.id,
      receiver_id: receiverId,
      content,
      read: false,
      created_at: new Date().toISOString(),
    })

    if (error) throw error

    return {
      id: messageId,
      sender_id: user.id,
      receiver_id: receiverId,
      content,
      read: false,
      created_at: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error sending message:", error)
    throw error
  }
}

export async function getConversations() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new Error("Debes iniciar sesión para ver tus conversaciones")
    }

    // Obtener todos los mensajes enviados o recibidos por el usuario
    const { data: messagesData, error: messagesError } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order("created_at", { ascending: false })

    if (messagesError) throw messagesError

    if (!messagesData || messagesData.length === 0) {
      return []
    }

    // Agrupar mensajes por conversación
    const conversations = {}
    const userIds = new Set<string>()

    messagesData.forEach((message) => {
      const otherUserId = message.sender_id === user.id ? message.receiver_id : message.sender_id
      userIds.add(otherUserId)

      if (!conversations[otherUserId]) {
        conversations[otherUserId] = {
          user_id: otherUserId,
          last_message: message,
          unread_count: message.receiver_id === user.id && !message.read ? 1 : 0,
        }
      } else if (message.created_at > conversations[otherUserId].last_message.created_at) {
        conversations[otherUserId].last_message = message
      }

      if (message.receiver_id === user.id && !message.read) {
        conversations[otherUserId].unread_count++
      }
    })

    // Obtener información de los usuarios
    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select("id, first_name, last_name, avatar_url")
      .in("id", Array.from(userIds))

    if (usersError) throw usersError

    // Combinar datos
    return Object.values(conversations)
      .map((conv) => {
        const userData = usersData.find((u) => u.id === conv.user_id)
        return {
          ...conv,
          user: userData,
        }
      })
      .sort((a, b) => new Date(b.last_message.created_at).getTime() - new Date(a.last_message.created_at).getTime())
  } catch (error) {
    console.error("Error getting conversations:", error)
    throw error
  }
}

export async function getMessages(otherUserId: string) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new Error("Debes iniciar sesión para ver tus mensajes")
    }

    // Obtener mensajes entre los dos usuarios
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`,
      )
      .order("created_at", { ascending: true })

    if (error) throw error

    // Marcar mensajes como leídos
    const unreadMessageIds = data.filter((msg) => msg.receiver_id === user.id && !msg.read).map((msg) => msg.id)

    if (unreadMessageIds.length > 0) {
      const { error: updateError } = await supabase.from("messages").update({ read: true }).in("id", unreadMessageIds)

      if (updateError) throw updateError
    }

    return data
  } catch (error) {
    console.error("Error getting messages:", error)
    throw error
  }
}
