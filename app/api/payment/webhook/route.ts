import { type NextRequest, NextResponse } from "next/server"
import { processPaymentWebhook } from "@/lib/mercadopago"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    // Obtener datos de la notificación
    const data = await request.json()

    // Procesar notificación
    const result = await processPaymentWebhook(data)

    // Si el pago fue aprobado, actualizar el estado del pedido
    if (result.success && result.payment.status === "approved") {
      const orderId = result.payment.external_reference

      // Actualizar estado del pedido a "processing"
      await supabase
        .from("orders")
        .update({
          status: "processing",
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error processing payment webhook:", error)

    return NextResponse.json({ error: error.message || "Error al procesar la notificación de pago" }, { status: 500 })
  }
}
