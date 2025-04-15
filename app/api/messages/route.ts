import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, sendMessage, getConversations } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    // Obtener datos del mensaje
    const { receiverId, content } = await request.json()

    if (!receiverId) {
      return NextResponse.json({ error: "El ID del receptor es requerido" }, { status: 400 })
    }

    if (!content) {
      return NextResponse.json({ error: "El contenido del mensaje es requerido" }, { status: 400 })
    }

    // Enviar mensaje
    const message = await sendMessage(receiverId, content)

    return NextResponse.json({ message }, { status: 201 })
  } catch (error: any) {
    console.error("Error sending message:", error)

    return NextResponse.json({ error: error.message || "Error al enviar el mensaje" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    // Obtener conversaciones
    const conversations = await getConversations()

    return NextResponse.json({ conversations })
  } catch (error: any) {
    console.error("Error getting conversations:", error)

    return NextResponse.json({ error: error.message || "Error al obtener las conversaciones" }, { status: 500 })
  }
}
