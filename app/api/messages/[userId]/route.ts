import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, getMessages } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId

    // Verificar autenticación
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    // Obtener mensajes
    const messages = await getMessages(userId)

    return NextResponse.json({ messages })
  } catch (error: any) {
    console.error("Error getting messages:", error)

    return NextResponse.json({ error: error.message || "Error al obtener los mensajes" }, { status: 500 })
  }
}
