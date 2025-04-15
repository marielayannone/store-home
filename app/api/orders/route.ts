import { type NextRequest, NextResponse } from "next/server"
import { createOrder, getCurrentUser } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    // Obtener datos del pedido
    const orderData = await request.json()

    // Validar datos
    if (!orderData.items || !orderData.items.length) {
      return NextResponse.json({ error: "El pedido debe contener al menos un producto" }, { status: 400 })
    }

    if (!orderData.shippingAddress) {
      return NextResponse.json({ error: "La dirección de envío es requerida" }, { status: 400 })
    }

    if (!orderData.paymentMethod) {
      return NextResponse.json({ error: "El método de pago es requerido" }, { status: 400 })
    }

    // Crear pedido
    const order = await createOrder(orderData)

    return NextResponse.json({ order }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating order:", error)

    return NextResponse.json({ error: error.message || "Error al crear el pedido" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    // Obtener pedidos según el rol del usuario
    let orders

    if (user.role === "buyer") {
      // Si es comprador, obtener sus pedidos
      const { getOrdersByBuyer } = await import("@/lib/supabase")
      orders = await getOrdersByBuyer()
    } else if (user.role === "seller") {
      // Si es vendedor, obtener pedidos de sus productos
      const { getOrdersBySeller } = await import("@/lib/supabase")
      orders = await getOrdersBySeller()
    } else {
      return NextResponse.json({ error: "Rol no autorizado" }, { status: 403 })
    }

    return NextResponse.json({ orders })
  } catch (error: any) {
    console.error("Error getting orders:", error)

    return NextResponse.json({ error: error.message || "Error al obtener los pedidos" }, { status: 500 })
  }
}
