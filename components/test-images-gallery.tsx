"use client"

import { useState, useEffect } from "react"
import { getProductImages } from "@/lib/image-service"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Download, Copy, RefreshCw } from "lucide-react"

export default function TestImagesGallery({ category = "product", count = 12 }) {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(category)

  const categories = [
    "product",
    "electronics",
    "clothing",
    "furniture",
    "food",
    "toys",
    "sports",
    "beauty",
    "books",
    "automotive",
    "jewelry",
    "argentina",
  ]

  useEffect(() => {
    loadImages()
  }, [selectedCategory])

  const loadImages = async () => {
    setLoading(true)
    try {
      const imageData = await getProductImages(selectedCategory, count)
      setImages(imageData)
    } catch (error) {
      console.error("Error cargando imágenes:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyImageUrl = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL de imagen copiada al portapapeles")
      })
      .catch((err) => {
        console.error("Error al copiar URL:", err)
      })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Galería de Imágenes de Prueba</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="text-sm"
            >
              {cat}
            </Button>
          ))}
        </div>

        <Button onClick={loadImages} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Recargar imágenes
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Cargando imágenes...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="relative aspect-video bg-muted">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `/placeholder.svg?height=300&width=400&text=Error`
                  }}
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground truncate">{image.alt}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => copyImageUrl(image.url)}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copiar URL
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => window.open(image.url, "_blank")}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Descargar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
