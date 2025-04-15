"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Save, ImageIcon, X, Plus, Trash2, ArrowLeft, Star, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import VendorLayout from "@/components/vendor-layout"
import { createProduct } from "@/lib/vendor"
import { useToast } from "@/hooks/use-toast"

interface ProductImage {
  id: string
  url: string
  main: boolean
  file?: File
}

interface ProductVariant {
  id: string
  name: string
  price: number
  stock: number
}

export default function NewProduct() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    condition: "new", // nuevo o usado
    status: "draft",
    sku: "",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    features: [""],
    images: [] as ProductImage[],
    variants: [] as ProductVariant[],
    hasVariants: false,
    freeShipping: false,
    shippingType: "seller", // seller (a cargo del vendedor) o buyer (a cargo del comprador)
  })

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    condition: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Manejar campos anidados como dimensions.length
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Limpiar error
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    // Si cambiamos freeShipping a true, automáticamente establecemos shippingType a "seller"
    if (name === "freeShipping" && checked) {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        shippingType: "seller",
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    }
  }

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures[index] = value
    setFormData((prev) => ({ ...prev, features: updatedFeatures }))
  }

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  const removeFeature = (index: number) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures.splice(index, 1)
    setFormData((prev) => ({ ...prev, features: updatedFeatures }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsLoading(true)

      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const newImage: ProductImage = {
            id: Date.now().toString(),
            url: event.target.result as string,
            main: formData.images.length === 0, // Primera imagen es la principal
            file: file,
          }

          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, newImage],
          }))

          setIsLoading(false)

          toast({
            title: "Imagen cargada",
            description: "La imagen se ha cargado correctamente",
          })
        }
      }

      reader.onerror = () => {
        setIsLoading(false)
        toast({
          title: "Error",
          description: "No se pudo cargar la imagen",
          variant: "destructive",
        })
      }

      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleRemoveImage = (id: string) => {
    const updatedImages = formData.images.filter((img) => img.id !== id)

    // Si eliminamos la imagen principal, establecer la primera como principal
    if (formData.images.find((img) => img.id === id)?.main && updatedImages.length > 0) {
      updatedImages[0].main = true
    }

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }))
  }

  const handleSetMainImage = (id: string) => {
    const updatedImages = formData.images.map((img) => ({
      ...img,
      main: img.id === id,
    }))

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }))
  }

  const handleAddVariant = () => {
    const newVariant: ProductVariant = {
      id: Date.now().toString(),
      name: "",
      price: 0,
      stock: 0,
    }

    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }))
  }

  const handleVariantChange = (id: string, field: keyof ProductVariant, value: string | number) => {
    const updatedVariants = formData.variants.map((variant) => {
      if (variant.id === id) {
        return { ...variant, [field]: value }
      }
      return variant
    })

    setFormData((prev) => ({
      ...prev,
      variants: updatedVariants,
    }))
  }

  const handleRemoveVariant = (id: string) => {
    const updatedVariants = formData.variants.filter((variant) => variant.id !== id)
    setFormData((prev) => ({
      ...prev,
      variants: updatedVariants,
    }))
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    // Validar campos obligatorios
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio"
      valid = false
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria"
      valid = false
    }

    if (!formData.price.trim()) {
      newErrors.price = "El precio es obligatorio"
      valid = false
    } else if (isNaN(Number.parseFloat(formData.price)) || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "El precio debe ser un número mayor que cero"
      valid = false
    }

    if (!formData.stock.trim()) {
      newErrors.stock = "El stock es obligatorio"
      valid = false
    } else if (isNaN(Number.parseInt(formData.stock)) || Number.parseInt(formData.stock) < 0) {
      newErrors.stock = "El stock debe ser un número no negativo"
      valid = false
    }

    if (!formData.category) {
      newErrors.category = "La categoría es obligatoria"
      valid = false
    }

    if (!formData.condition) {
      newErrors.condition = "El estado del producto es obligatorio"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent, saveAsDraft = false) => {
    e.preventDefault()

    if (!validateForm() && !saveAsDraft) {
      // Si estamos guardando como borrador, no validamos
      setActiveTab("basic") // Ir a la pestaña con errores
      return
    }

    setIsLoading(true)

    try {
      // Preparar datos para enviar
      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        status: saveAsDraft ? "draft" : formData.status,
      }

      // En una implementación real, esto se conectaría con Supabase o tu backend
      // También se subirían las imágenes a un servicio de almacenamiento
      await createProduct(productData)

      toast({
        title: saveAsDraft ? "Borrador guardado" : "Producto creado",
        description: saveAsDraft
          ? "El producto ha sido guardado como borrador"
          : "El producto ha sido creado correctamente",
      })

      // Redirigir a la lista de productos
      router.push("/vendedor/productos")
    } catch (error) {
      console.error("Error creating product:", error)
      toast({
        title: "Error",
        description: "No se pudo crear el producto",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VendorLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/vendedor/productos")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Nuevo Producto</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={(e) => handleSubmit(e, true)} disabled={isLoading}>
              Guardar como borrador
            </Button>
            <Button onClick={(e) => handleSubmit(e, false)} disabled={isLoading}>
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
                  Guardando...
                </span>
              ) : (
                <span className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Publicar producto
                </span>
              )}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="basic">Información básica</TabsTrigger>
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="images">Imágenes</TabsTrigger>
            <TabsTrigger value="variants">Variantes</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Información básica del producto</CardTitle>
                <CardDescription>Ingresa la información principal de tu producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del producto *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Smartphone 128GB"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe tu producto detalladamente..."
                    className={`min-h-[120px] ${errors.description ? "border-red-500" : ""}`}
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Estado del producto *</Label>
                  <RadioGroup
                    value={formData.condition}
                    onValueChange={(value) => handleSelectChange("condition", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="new" />
                      <Label htmlFor="new">Nuevo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="used" />
                      <Label htmlFor="used">Usado</Label>
                    </div>
                  </RadioGroup>
                  {errors.condition && <p className="text-red-500 text-xs mt-1">{errors.condition}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio (ARS) *</Label>
                    <Input
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Ej: 149999"
                      className={errors.price ? "border-red-500" : ""}
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock *</Label>
                    <Input
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="Ej: 50"
                      className={errors.stock ? "border-red-500" : ""}
                    />
                    {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electrónica</SelectItem>
                      <SelectItem value="clothing">Ropa</SelectItem>
                      <SelectItem value="home">Hogar</SelectItem>
                      <SelectItem value="sports">Deportes</SelectItem>
                      <SelectItem value="beauty">Belleza</SelectItem>
                      <SelectItem value="food">Alimentos</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                      <SelectItem value="draft">Borrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="freeShipping"
                      checked={formData.freeShipping}
                      onCheckedChange={(checked) => handleSwitchChange("freeShipping", checked)}
                    />
                    <Label htmlFor="freeShipping">Envío gratis</Label>
                  </div>

                  {!formData.freeShipping && (
                    <div className="space-y-2 pl-6">
                      <Label htmlFor="shippingType">Costo de envío a cargo de:</Label>
                      <RadioGroup
                        value={formData.shippingType}
                        onValueChange={(value) => handleSelectChange("shippingType", value)}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="seller" id="seller" />
                          <Label htmlFor="seller">Vendedor</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="buyer" id="buyer" />
                          <Label htmlFor="buyer">Comprador</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/vendedor/productos")}>
                  Cancelar
                </Button>
                <Button onClick={() => setActiveTab("details")}>Continuar</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Detalles del producto</CardTitle>
                <CardDescription>Agrega información detallada sobre tu producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU (Código de producto)</Label>
                  <Input
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="Ej: PROD-12345"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (gramos)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Ej: 500"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Dimensiones (cm)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      name="dimensions.length"
                      value={formData.dimensions.length}
                      onChange={handleChange}
                      placeholder="Largo"
                    />
                    <Input
                      name="dimensions.width"
                      value={formData.dimensions.width}
                      onChange={handleChange}
                      placeholder="Ancho"
                    />
                    <Input
                      name="dimensions.height"
                      value={formData.dimensions.height}
                      onChange={handleChange}
                      placeholder="Alto"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Características</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                      <Plus className="h-4 w-4 mr-1" />
                      Agregar
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder={`Característica ${index + 1}`}
                        />
                        {formData.features.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(index)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("basic")}>
                  Atrás
                </Button>
                <Button onClick={() => setActiveTab("images")}>Continuar</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Imágenes del producto</CardTitle>
                <CardDescription>Agrega imágenes para mostrar tu producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileInput}
                    className="flex items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                        Cargando...
                      </span>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Subir imagen
                      </>
                    )}
                  </Button>
                </div>

                {formData.images.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed rounded-md">
                    <ImageIcon className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p className="text-muted-foreground">
                      No hay imágenes. Haz clic en "Subir imagen" para agregar fotos de tu producto.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image) => (
                      <div
                        key={image.id}
                        className={`relative border rounded-md overflow-hidden ${
                          image.main ? "ring-2 ring-orange-500" : ""
                        }`}
                      >
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt="Imagen del producto"
                          className="w-full h-32 object-contain"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          {!image.main && (
                            <Button
                              type="button"
                              variant="secondary"
                              size="icon"
                              className="h-6 w-6 rounded-full bg-white"
                              onClick={() => handleSetMainImage(image.id)}
                            >
                              <Star className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            className="h-6 w-6 rounded-full bg-white"
                            onClick={() => handleRemoveImage(image.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        {image.main && (
                          <div className="absolute bottom-0 left-0 right-0 bg-orange-500 text-white text-xs py-1 text-center">
                            Imagen principal
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("details")}>
                  Atrás
                </Button>
                <Button onClick={() => setActiveTab("variants")}>Continuar</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="variants">
            <Card>
              <CardHeader>
                <CardTitle>Variantes del producto</CardTitle>
                <CardDescription>Agrega variantes si tu producto tiene diferentes opciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasVariants"
                    checked={formData.hasVariants}
                    onCheckedChange={(checked) => handleSwitchChange("hasVariants", checked)}
                  />
                  <Label htmlFor="hasVariants">Este producto tiene variantes</Label>
                </div>

                {formData.hasVariants && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Variantes</Label>
                      <Button type="button" variant="outline" size="sm" onClick={handleAddVariant}>
                        <Plus className="h-4 w-4 mr-1" />
                        Agregar variante
                      </Button>
                    </div>

                    {formData.variants.length === 0 ? (
                      <div className="text-center py-6 border-2 border-dashed rounded-md">
                        <p className="text-muted-foreground">
                          No hay variantes. Haz clic en "Agregar variante" para crear opciones.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {formData.variants.map((variant) => (
                          <div key={variant.id} className="border rounded-md p-4 space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Variante</h4>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveVariant(variant.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>

                            <div className="space-y-2">
                              <Label>Nombre de la variante</Label>
                              <Input
                                value={variant.name}
                                onChange={(e) => handleVariantChange(variant.id, "name", e.target.value)}
                                placeholder="Ej: Color Negro, Talla M, etc."
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Precio</Label>
                                <Input
                                  type="number"
                                  value={variant.price}
                                  onChange={(e) =>
                                    handleVariantChange(variant.id, "price", Number.parseFloat(e.target.value))
                                  }
                                  placeholder="Precio"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Stock</Label>
                                <Input
                                  type="number"
                                  value={variant.stock}
                                  onChange={(e) =>
                                    handleVariantChange(variant.id, "stock", Number.parseInt(e.target.value))
                                  }
                                  placeholder="Stock"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("images")}>
                  Atrás
                </Button>
                <Button onClick={(e) => handleSubmit(e, false)}>
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
                      Guardando...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save className="mr-2 h-4 w-4" />
                      Publicar producto
                    </span>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  )
}
