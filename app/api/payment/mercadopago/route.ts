import { type NextRequest, NextResponse } from "next/server"
import { createPaymentPreference } from "@/lib/mercadopago"
import { getCurrentUser } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    // Obtener datos del pago
    const { items, orderId, totalAmount, shippingAddress } = await request.json()

    if (!items || !items.length) {
      return NextResponse.json({ error: "Los items son requeridos" }, { status: 400 })
    }

    if (!orderId) {
      return NextResponse.json({ error: "El ID del pedido es requerido" }, { status: 400 })
    }

    if (!totalAmount) {
      return NextResponse.json({ error: "El monto total es requerido" }, { status: 400 })
    }

    // Crear preferencia de pago en Mercado Pago
    const mpItems = items.map((item: any) => ({
      id: item.id,
      title: item.name,
      quantity: item.quantity,
      unitPrice: item.price,
      description: item.description || "",
      pictureUrl: item.image || "",
      categoryId: item.category || "others",
    }))

    const preference = await createPaymentPreference({
      items: mpItems,
      payer: {
        name: user.first_name,
        surname: user.last_name,
        email: user.email,
        phone: shippingAddress?.phone
          ? {
              areaCode: "",
              number: shippingAddress.phone,
            }
          : undefined,
        address: shippingAddress
          ? {
              streetName: shippingAddress.address,
              streetNumber: 0, // En una implementación real, se separaría la calle del número
              zipCode: shippingAddress.postal_code,
            }
          : undefined,
      },
      backUrls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?order_id=${orderId}`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/failure?order_id=${orderId}`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending?order_id=${orderId}`,
      },
      autoReturn: "approved",
      externalReference: orderId,
      notificationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook`,
    })

    return NextResponse.json({ preference })
  } catch (error: any) {
    console.error("Error creating payment preference:", error)

    return NextResponse.json({ error: error.message || "Error al crear la preferencia de pago" }, { status: 500 })
  }
}
