"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, Truck, CreditCard, ShieldCheck, MessageSquare, Heart, Share2, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProductById } from "@/lib/products"

interface Product {
  id: string
  name: string
  price: number
  discount?: number
  rating: number
  reviewCount: number
  seller: {
    id: string
    name: string
    rating: number
  }
  stock: number
  description: string
  features: string[]
  images: string[]
  colors?: string[]
  shipping: {
    method: string
    price: number
    time: string
  }[]
  payment: string[]
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = params.id
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const productData = await getProductById(productId)
        setProduct(productData)
      } catch (error) {
        console.error("Error loading product:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-96 rounded-lg mb-4"></div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-24 rounded-md"></div>
              ))}
            </div>
          </div>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-6 w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <p className="mb-6">Lo sentimos, el producto que estás buscando no existe o ha sido eliminado.</p>
        <Link href="/productos">
          <Button className="bg-orange-500 hover:bg-orange-600">Ver otros productos</Button>
        </Link>
      </div>
    )
  }

  const discountedPrice = product.discount ? product.price - (product.price * product.discount) / 100 : product.price

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imágenes del producto */}
        <div>
          <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage] || "/placeholder.svg?height=500&width=500"}
              alt={product.name}
              className="w-full h-auto"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`border cursor-pointer rounded-md overflow-hidden ${
                  selectedImage === index ? "border-orange-500" : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image || "/placeholder.svg?height=100&width=100"}
                  alt={`${product.name} - imagen ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>

            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-orange-500 fill-current" />
                <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
              </div>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-600">{product.reviewCount} reseñas</span>
              <span className="mx-2 text-gray-300">|</span>
              <Link href={`/tienda/${product.seller.id}`} className="text-sm text-orange-500 hover:underline">
                {product.seller.name}
              </Link>
            </div>

            <div className="flex items-baseline mb-4">
              {product.discount ? (
                <>
                  <span className="text-3xl font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
                  <span className="ml-2 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  <span className="ml-2 text-sm font-medium text-orange-500">{product.discount}% OFF</span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-center text-green-600 mb-2">
                <Truck className="h-4 w-4 mr-2" />
                <span className="text-sm">Envío gratis a todo el país</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <CreditCard className="h-4 w-4 mr-2" />
                <span className="text-sm">Hasta 12 cuotas sin interés</span>
              </div>
              <div className="flex items-center text-gray-600">
                <ShieldCheck className="h-4 w-4 mr-2" />
                <span className="text-sm">Garantía de 12 meses</span>
              </div>
            </div>

            {/* Colores */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`px-3 py-1 border rounded-md cursor-pointer ${
                        index === 0 ? "border-orange-500 bg-orange-50" : "border-gray-200"
                      }`}
                    >
                      {color}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cantidad */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Cantidad</h3>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 text-gray-900 font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={incrementQuantity} disabled={quantity >= product.stock}>
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="ml-4 text-sm text-gray-500">{product.stock} disponibles</span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col space-y-3">
              <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600">
                Comprar ahora
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-gray-300 text-gray-800 hover:text-orange-500 hover:border-orange-500"
              >
                Agregar al carrito
              </Button>
              <div className="flex space-x-2">
                <Button variant="ghost" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Favorito
                </Button>
                <Button variant="ghost" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <Link href={`/chat/${product.seller.id}`} className="w-full">
                    Chat
                  </Link>
                </Button>
                <Button variant="ghost" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de información */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
            <TabsTrigger value="shipping">Envío</TabsTrigger>
            <TabsTrigger value="payment">Pagos</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-4">
            <p className="text-gray-700">{product.description}</p>
          </TabsContent>
          <TabsContent value="specifications" className="py-4">
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2"></span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="shipping" className="py-4">
            <h3 className="font-medium mb-4">Opciones de envío</h3>
            <div className="space-y-4">
              {product.shipping.map((option, index) => (
                <div key={index} className="flex justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">{option.method}</p>
                    <p className="text-sm text-gray-600">{option.time}</p>
                  </div>
                  <div className="text-right">
                    {option.price === 0 ? (
                      <span className="text-green-600 font-medium">Gratis</span>
                    ) : (
                      <span className="font-medium">${option.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="payment" className="py-4">
            <h3 className="font-medium mb-4">Métodos de pago</h3>
            <div className="space-y-2">
              {product.payment.map((method, index) => (
                <div key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2"></span>
                  <span className="text-gray-700">{method}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <div className="flex items-center mb-6">
              <div className="mr-4">
                <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600 mt-1">{product.reviewCount} reseñas</div>
              </div>
              <div className="flex-1">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center mb-1">
                    <div className="text-sm text-gray-600 w-6">{star}</div>
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 w-8">
                      {star === 5 ? "70%" : star === 4 ? "20%" : star === 3 ? "7%" : star === 2 ? "2%" : "1%"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
