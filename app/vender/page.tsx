"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useSupabaseAuth } from "@/lib/auth"
import { createProduct } from "@/lib/products"

export default function SellPage() {
  const router = useRouter()
  const { user } = useSupabaseAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [images, setImages] = useState<{ file: File; preview: string }[]>([])

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    condition: "new",
    freeShipping: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))

      setImages((prev) => [...prev, ...newImages].slice(0, 5)) // Máximo 5 imágenes
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview) // Liberar memoria
      newImages.splice(index, 1)
      return newImages
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setError("Debes iniciar sesión para publicar un producto")
      return
    }

    if (images.length === 0) {
      setError("Debes subir al menos una imagen del producto")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // En una implementación real, aquí subiríamos las imágenes a Supabase Storage
      // y luego crearíamos el producto con las URLs de las imágenes

      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        category: formData.category,
        condition: formData.condition,
        free_shipping: formData.freeShipping,
        // Simulamos URLs de imágenes para esta versión inicial
        images: images.map((img, index) => ({
          url: `/placeholder.svg?height=500&width=500&text=Producto`,
          main: index === 0,
        })),
      }

      await createProduct(productData)

      router.push("/publicacion-exitosa")
    } catch (error: any) {
      console.error("Error creating product:", error)
      setError(error.message || "Error al publicar el producto. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Publicar un producto</CardTitle>
            <CardDescription>Completa el formulario para publicar tu producto en STORE HOME</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

              {/* Información básica */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Información básica</h3>

                <div className="space-y-2">
                  <Label htmlFor="name">Título del producto *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Smartphone Samsung Galaxy S21 128GB"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe detalladamente tu producto..."
                    rows={5}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Cantidad disponible *</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="1"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronica">Electrónica</SelectItem>
                        <SelectItem value="ropa">Ropa</SelectItem>
                        <SelectItem value="hogar">Hogar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Condición *</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => handleSelectChange("condition", value)}
                      required
                    >
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Selecciona la condición" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Nuevo</SelectItem>
                        <SelectItem value="used">Usado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="freeShipping"
                    checked={formData.freeShipping}
                    onCheckedChange={(checked) => handleSwitchChange("freeShipping", checked)}
                  />
                  <Label htmlFor="freeShipping">Envío gratis</Label>
                </div>
              </div>

              {/* Imágenes */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Imágenes del producto *</h3>
                <p className="text-sm text-gray-500">Sube hasta 5 imágenes. La primera será la imagen principal.</p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative border rounded-md overflow-hidden aspect-square">
                      <img
                        src={img.preview || "/placeholder.svg"}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      {index === 0 && (
                        <span className="absolute bottom-0 left-0 right-0 bg-orange-500 text-white text-xs text-center py-1">
                          Principal
                        </span>
                      )}
                    </div>
                  ))}

                  {images.length < 5 && (
                    <div className="border border-dashed border-gray-300 rounded-md flex items-center justify-center aspect-square">
                      <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center p-4">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Subir imagen</span>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Publicando producto...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Publicar producto
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
