import { type NextRequest, NextResponse } from "next/server"
import { getProductImages } from "@/lib/image-service"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category") || "product"
  const count = Number.parseInt(searchParams.get("count") || "10")

  try {
    const images = await getProductImages(category, count)
    return NextResponse.json({ images })
  } catch (error) {
    console.error("Error en API de imágenes:", error)
    return NextResponse.json({ error: "Error al obtener imágenes" }, { status: 500 })
  }
}
