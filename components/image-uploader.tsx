"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Copy, Check } from "lucide-react"

export default function ImageUploader() {
  const [images, setImages] = useState<{ id: string; file: File; preview: string; copied?: boolean }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Manejar la selección de archivos
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Convertir FileList a Array y procesar cada archivo
    const newImages = Array.from(files).map((file) => {
      // Crear URL de vista previa
      const preview = URL.createObjectURL(file)
      return {
        id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview,
      }
    })

    setImages((prev) => [...prev, ...newImages])

    // Limpiar input para permitir seleccionar el mismo archivo nuevamente
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Eliminar una imagen
  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id)
      // Liberar URL de objeto para evitar fugas de memoria
      const imgToRemove = prev.find((img) => img.id === id)
      if (imgToRemove) {
        URL.revokeObjectURL(imgToRemove.preview)
      }
      return filtered
    })
  }

  // Copiar URL de imagen al portapapeles
  const copyImageUrl = (id: string) => {
    const image = images.find((img) => img.id === id)
    if (!image) return

    navigator.clipboard
      .writeText(image.preview)
      .then(() => {
        // Marcar como copiada temporalmente
        setImages((prev) => prev.map((img) => (img.id === id ? { ...img, copied: true } : img)))

        // Quitar marca después de 2 segundos
        setTimeout(() => {
          setImages((prev) => prev.map((img) => (img.id === id ? { ...img, copied: false } : img)))
        }, 2000)
      })
      .catch((err) => console.error("Error al copiar URL:", err))
  }

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">Subir Imágenes</h2>

      <div className="bg-muted p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-2">Instrucciones:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Haz clic en "Seleccionar Imágenes" para elegir archivos de tu dispositivo</li>
          <li>Las imágenes se mostrarán abajo con opciones para copiar su URL</li>
          <li>Usa "Copiar URL" para obtener la dirección que puedes usar en tus productos</li>
          <li>Estas imágenes son temporales y solo estarán disponibles en esta sesión</li>
        </ol>
      </div>

      {/* Input de archivo oculto */}
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" multiple className="hidden" />

      {/* Botón para activar el selector de archivos */}
      <Button onClick={() => fileInputRef.current?.click()} className="mb-6" size="lg">
        <Upload className="h-5 w-5 mr-2" />
        Seleccionar Imágenes
      </Button>

      {/* Mostrar mensaje si no hay imágenes */}
      {images.length === 0 && (
        <div className="text-center py-12 bg-card rounded-lg border border-dashed">
          <p className="text-muted-foreground">
            No hay imágenes seleccionadas. Haz clic en "Seleccionar Imágenes" para comenzar.
          </p>
        </div>
      )}

      {/* Galería de imágenes subidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              <img
                src={image.preview || "/placeholder.svg"}
                alt={`Imagen subida ${image.file.name}`}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => removeImage(image.id)}
                className="absolute top-2 right-2 bg-background/80 p-1 rounded-full hover:bg-background"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <CardContent className="p-3">
              <div className="text-sm text-muted-foreground mb-2 truncate">{image.file.name}</div>
              <Button
                variant={image.copied ? "default" : "outline"}
                size="sm"
                className="w-full"
                onClick={() => copyImageUrl(image.id)}
              >
                {image.copied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copiar URL
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
