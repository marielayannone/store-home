import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id

    // Verificar autenticación
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    // Obtener pedido
    let query = supabase
      .from("orders")
      .select(`
        *,
        order_items(*, products(*)),
        buyers:buyer_id(*)
      `)
      .eq("id", orderId)

    // Si es vendedor, verificar que el pedido contiene sus productos
    if (user.role === "seller") {
      query = query.eq("order_items.seller_id", user.id)
    } else if (user.role === "buyer") {
      // Si es comprador, verificar que el pedido le pertenece
      query = query.eq("buyer_id", user.id)
    }

    const { data: order, error } = await query.single()

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 })
      }

      throw error
    }

    return NextResponse.json({ order })
  } catch (error: any) {
    console.error("Error getting order:", error)

    return NextResponse.json({ error: error.message || "Error al obtener el pedido" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id

    // Verificar autenticación
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    // Solo vendedores pueden actualizar pedidos
    if (user.role !== "seller" && user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    // Obtener datos de actualización
    const updateData = await request.json()

    // Validar datos
    if (!updateData.status) {
      return NextResponse.json({ error: "El estado es requerido" }, { status: 400 })
    }

    // Verificar que el pedido contiene productos del vendedor
    const { data: orderItems, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId)
      .eq("seller_id", user.id)

    if (itemsError) throw itemsError

    if (!orderItems.length) {
      return NextResponse.json({ error: "No autorizado para actualizar este pedido" }, { status: 403 })
    }

    // Actualizar pedido
    const { data: order, error } = await supabase
      .from("orders")
      .update({
        status: updateData.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ order })
  } catch (error: any) {
    console.error("Error updating order:", error)

    return NextResponse.json({ error: error.message || "Error al actualizar el pedido" }, { status: 500 })
  }
}
