import { MercadoPagoConfig, Preference } from "mercadopago"

// Configuración de Mercado Pago
const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
})

interface CreatePreferenceParams {
  items: {
    id: string
    title: string
    quantity: number
    unitPrice: number
    description?: string
    pictureUrl?: string
    categoryId?: string
  }[]
  payer: {
    name: string
    surname: string
    email: string
    phone?: {
      areaCode: string
      number: string
    }
    address?: {
      streetName: string
      streetNumber: number
      zipCode: string
    }
  }
  backUrls: {
    success: string
    failure: string
    pending: string
  }
  autoReturn?: "approved" | "all"
  externalReference: string
  notificationUrl?: string
}

// Función para crear una preferencia de pago
export async function createPaymentPreference(params: CreatePreferenceParams) {
  try {
    const preference = new Preference(mercadopago)

    const response = await preference.create({
      items: params.items,
      payer: params.payer,
      back_urls: params.backUrls,
      auto_return: params.autoReturn || "approved",
      external_reference: params.externalReference,
      notification_url: params.notificationUrl,
    })

    return response
  } catch (error) {
    console.error("Error creating payment preference:", error)
    throw error
  }
}

// Función para verificar el estado de un pago
export async function getPaymentStatus(paymentId: string) {
  try {
    const payment = await mercadopago.payment.get(paymentId)
    return payment
  } catch (error) {
    console.error("Error getting payment status:", error)
    throw error
  }
}

// Función para procesar una notificación de pago (webhook)
export async function processPaymentWebhook(data: any) {
  try {
    // Verificar tipo de notificación
    if (data.type === "payment") {
      const paymentId = data.data.id
      const payment = await getPaymentStatus(paymentId)

      // Actualizar estado del pedido según el estado del pago
      if (payment.status === "approved") {
        // Actualizar pedido a "processing"
        // En una implementación real, aquí se actualizaría el estado del pedido en la base de datos
        console.log(`Payment ${paymentId} approved. Order: ${payment.external_reference}`)
      } else if (payment.status === "pending" || payment.status === "in_process") {
        // Mantener pedido como "pending"
        console.log(`Payment ${paymentId} pending. Order: ${payment.external_reference}`)
      } else {
        // Cancelar pedido
        console.log(`Payment ${paymentId} failed. Order: ${payment.external_reference}`)
      }

      return { success: true, payment }
    }

    return { success: false, message: "Not a payment notification" }
  } catch (error) {
    console.error("Error processing payment webhook:", error)
    throw error
  }
}
