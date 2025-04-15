"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download, RefreshCw } from "lucide-react"

// Categorías de productos comunes
const CATEGORIES = [
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
]

// Colores para hacer los placeholders más variados
const COLORS = ["FF5733", "33FF57", "3357FF", "F033FF", "FF33F0", "FFBD33", "33FFBD", "BD33FF", "33BDFF", "FF33BD"]

export default function PlaceholderImages() {
  const [selectedSize, setSelectedSize] = useState("400x300")
  const [selectedCategory, setSelectedCategory] = useState("product")
  const [customText, setCustomText] = useState("")
  const [placeholders, setPlaceholders] = useState(() => generatePlaceholders())

  // Función para generar URLs de placeholders
  function generatePlaceholders(count = 12) {
    return Array.from({ length: count }, (_, i) => {
      const category = CATEGORIES[i % CATEGORIES.length]
      const color = COLORS[i % COLORS.length]
      const [width, height] = selectedSize.split("x")

      // Usamos placeholder.com que es un servicio externo confiable
      return {
        id: `placeholder-${i}`,
        url: `https://via.placeholder.com/${width}x${height}/${color}/FFFFFF?text=${category}`,
        category,
      }
    })
  }

  // Regenerar placeholders con nuevos parámetros
  const regeneratePlaceholders = () => {
    setPlaceholders(generatePlaceholders())
  }

  // Generar placeholder personalizado
  const generateCustomPlaceholder = () => {
    const [width, height] = selectedSize.split("x")
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    const text = customText || selectedCategory

    const newPlaceholder = {
      id: `custom-${Date.now()}`,
      url: `https://via.placeholder.com/${width}x${height}/${color}/FFFFFF?text=${text}`,
      category: text,
    }

    setPlaceholders([newPlaceholder, ...placeholders.slice(0, 11)])
  }

  // Copiar URL al portapapeles
  const copyImageUrl = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => alert("URL copiada al portapapeles"))
      .catch((err) => console.error("Error al copiar:", err))
  }

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">Imágenes Placeholder</h2>

      <div className="bg-card p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-3">Configurar Placeholder</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Selector de tamaño */}
          <div>
            <label className="block text-sm font-medium mb-1">Tamaño</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-2 rounded-md border bg-background"
            >
              <option value="200x200">Pequeño (200x200)</option>
              <option value="400x300">Mediano (400x300)</option>
              <option value="600x400">Grande (600x400)</option>
              <option value="800x600">Extra Grande (800x600)</option>
            </select>
          </div>

          {/* Selector de categoría */}
          <div>
            <label className="block text-sm font-medium mb-1">Categoría</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 rounded-md border bg-background"
            >
              <option value="product">Producto (genérico)</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Texto personalizado */}
          <div>
            <label className="block text-sm font-medium mb-1">Texto personalizado</label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Escribe un texto..."
              className="w-full p-2 rounded-md border bg-background"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={generateCustomPlaceholder}>Generar Placeholder Personalizado</Button>
          <Button variant="outline" onClick={regeneratePlaceholders}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerar Todos
          </Button>
        </div>
      </div>

      {/* Instrucciones de uso */}
      <div className="bg-muted p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-2">Cómo usar estas imágenes:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Haz clic en "Copiar URL" en cualquier imagen que te guste</li>
          <li>Pega la URL en el campo de imagen al crear o editar un producto</li>
          <li>También puedes hacer clic en "Ver" para abrir la imagen en una nueva pestaña</li>
          <li>Usa "Generar Placeholder Personalizado" para crear imágenes con tu propio texto</li>
        </ol>
      </div>

      {/* Galería de placeholders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {placeholders.map((placeholder) => (
          <Card key={placeholder.id} className="overflow-hidden">
            <div className="aspect-video bg-muted">
              <img
                src={placeholder.url || "/placeholder.svg"}
                alt={`Placeholder ${placeholder.category}`}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-3">
              <div className="text-sm text-muted-foreground mb-2 truncate">{placeholder.category}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => copyImageUrl(placeholder.url)}>
                  <Copy className="h-3 w-3 mr-1" />
                  Copiar URL
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open(placeholder.url, "_blank")}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Ver
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
