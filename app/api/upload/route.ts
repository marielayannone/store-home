import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    // Obtener archivo
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No se ha proporcionado ningún archivo" }, { status: 400 })
    }

    // Validar tipo de archivo
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de archivo no permitido. Solo se permiten imágenes JPEG, PNG, WEBP y GIF." },
        { status: 400 },
      )
    }

    // Validar tamaño de archivo (máximo 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. El tamaño máximo permitido es 5MB." },
        { status: 400 },
      )
    }

    // Generar nombre de archivo único
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `${user.id}/${fileName}`

    // Convertir archivo a ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Subir archivo a Supabase Storage
    const { data, error } = await supabase.storage.from("images").upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    })

    if (error) throw error

    // Obtener URL pública del archivo
    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl })
  } catch (error: any) {
    console.error("Error uploading file:", error)

    return NextResponse.json({ error: error.message || "Error al subir el archivo" }, { status: 500 })
  }
}
