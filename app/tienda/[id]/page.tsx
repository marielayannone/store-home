"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, MessageSquare, MapPin, Package, Clock, ShieldCheck, Filter, Grid3X3, LayoutList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import ProductCard from "@/components/product-card"

// Datos de ejemplo para el vendedor
const mockVendor = {
  id: "1",
  name: "TecnoStore",
  description:
    "Tienda especializada en productos de tecnología y electrónica. Ofrecemos los mejores precios y garantía en todos nuestros productos.",
  location: "Buenos Aires, Argentina",
  joinDate: "Marzo 2020",
  rating: 4.8,
  reviewCount: 156,
  salesCount: 1240,
  responseTime: "2 horas",
  avatar: "/placeholder.svg?height=150&width=150&text=TecnoStore",
  banner: "/placeholder.svg?height=300&width=1200&text=TecnoStore",
  verified: true,
  categories: ["Electrónica", "Computación", "Celulares", "Accesorios"],
  badges: ["Vendedor Premium", "Envíos Rápidos", "Atención 24/7"],
}

// Productos de ejemplo
const mockProducts = [
  {
    id: 1,
    name: 'Smartphone 128GB - Pantalla AMOLED 6.5" - 8GB RAM',
    price: 149999,
    image: "/placeholder.svg?height=200&width=200&text=Smartphone",
    rating: 4.7,
    seller: "TecnoStore",
    discount: 10,
  },
  {
    id: 2,
    name: "Auriculares Bluetooth con cancelación de ruido",
    price: 24999,
    image: "/placeholder.svg?height=200&width=200&text=Auriculares",
    rating: 4.5,
    seller: "TecnoStore",
  },
  {
    id: 3,
    name: "Smartwatch con monitor de ritmo cardíaco",
    price: 18999,
    image: "/placeholder.svg?height=200&width=200&text=Smartwatch",
    rating: 4.6,
    seller: "TecnoStore",
    discount: 15,
  },
  {
    id: 4,
    name: 'Tablet 10" 64GB WiFi',
    price: 45999,
    image: "/placeholder.svg?height=200&width=200&text=Tablet",
    rating: 4.8,
    seller: "TecnoStore",
  },
  {
    id: 5,
    name: "Cargador inalámbrico rápido",
    price: 5999,
    image: "/placeholder.svg?height=200&width=200&text=Cargador",
    rating: 4.4,
    seller: "TecnoStore",
  },
  {
    id: 6,
    name: "Parlante Bluetooth portátil resistente al agua",
    price: 12999,
    image: "/placeholder.svg?height=200&width=200&text=Parlante",
    rating: 4.7,
    seller: "TecnoStore",
    discount: 20,
  },
  {
    id: 7,
    name: "Cámara de seguridad WiFi HD",
    price: 8999,
    image: "/placeholder.svg?height=200&width=200&text=Cámara",
    rating: 4.3,
    seller: "TecnoStore",
  },
  {
    id: 8,
    name: "Teclado mecánico RGB para gaming",
    price: 15999,
    image: "/placeholder.svg?height=200&width=200&text=Teclado",
    rating: 4.9,
    seller: "TecnoStore",
    discount: 5,
  },
]

export default function VendorProfile({ params }: { params: { id: string } }) {
  const vendorId = params.id
  const [vendor, setVendor] = useState(mockVendor)
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Simulación de carga de datos
    const loadData = async () => {
      setIsLoading(true)
      // En una implementación real, aquí se cargarían los datos del vendedor y sus productos
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }

    loadData()
  }, [vendorId])

  useEffect(() => {
    // Filtrar productos por búsqueda
    if (searchQuery.trim() === "") {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredProducts(filtered)
    }
  }, [searchQuery, products])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="md:w-2/3">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner */}
      <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-6">
        <img
          src={vendor.banner || "/placeholder.svg"}
          alt={`${vendor.name} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">{vendor.name}</h1>
          {vendor.verified && (
            <div className="flex items-center mt-1">
              <Badge className="bg-primary text-white">Vendedor Verificado</Badge>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Información del vendedor */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={vendor.avatar || "/placeholder.svg"}
                  alt={vendor.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{vendor.rating}</span>
                  <span className="ml-1 text-gray-500">({vendor.reviewCount} reseñas)</span>
                </div>
                <div className="flex space-x-2">
                  {vendor.badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Sobre {vendor.name}</h3>
                  <p className="text-sm text-gray-600">{vendor.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Ubicación</p>
                      <p className="text-sm text-gray-600">{vendor.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Package className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Ventas realizadas</p>
                      <p className="text-sm text-gray-600">{vendor.salesCount}+ ventas exitosas</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Tiempo de respuesta</p>
                      <p className="text-sm text-gray-600">Responde en {vendor.responseTime} aprox.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Miembro desde</p>
                      <p className="text-sm text-gray-600">{vendor.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full bg-primary hover:bg-accent">
                  <Link href={`/chat/${vendor.id}`} className="w-full flex items-center justify-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contactar vendedor
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-medium mb-3">Categorías</h3>
              <div className="flex flex-wrap gap-2">
                {vendor.categories.map((category, index) => (
                  <Badge key={index} variant="outline" className="bg-card hover:bg-card/80">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Productos del vendedor */}
        <div className="md:col-span-2">
          <Tabs defaultValue="products">
            <TabsList className="w-full">
              <TabsTrigger value="products" className="flex-1">
                Productos
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">
                Reseñas
              </TabsTrigger>
              <TabsTrigger value="policies" className="flex-1">
                Políticas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="mt-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="relative w-full md:w-80">
                  <Input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{filteredProducts.length} productos</span>
                  <div className="border rounded-md flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-9 w-9 ${viewMode === "grid" ? "bg-primary/10 text-primary" : ""}`}
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-9 w-9 ${viewMode === "list" ? "bg-primary/10 text-primary" : ""}`}
                      onClick={() => setViewMode("list")}
                    >
                      <LayoutList className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <p className="text-gray-500">No se encontraron productos</p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="flex">
                        <div className="w-32 h-32 p-2">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <CardContent className="flex-1 p-4">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <h3 className="font-medium mb-1 line-clamp-2">{product.name}</h3>
                              <div className="flex items-center mb-2">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                {product.discount ? (
                                  <div className="flex items-baseline">
                                    <span className="text-lg font-bold">
                                      $
                                      {(product.price - (product.price * product.discount) / 100).toLocaleString(
                                        "es-AR",
                                      )}
                                    </span>
                                    <span className="ml-2 text-sm text-gray-500 line-through">
                                      ${product.price.toLocaleString("es-AR")}
                                    </span>
                                    <Badge className="ml-2 bg-accent text-white">{product.discount}% OFF</Badge>
                                  </div>
                                ) : (
                                  <span className="text-lg font-bold">${product.price.toLocaleString("es-AR")}</span>
                                )}
                              </div>
                              <Button size="sm" className="bg-primary hover:bg-accent">
                                <Link href={`/producto/${product.id}`}>Ver detalles</Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="text-4xl font-bold text-center">{vendor.rating}</div>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(vendor.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 text-center mt-1">{vendor.reviewCount} reseñas</div>
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
                              width: `${
                                star === 5 ? "70" : star === 4 ? "20" : star === 3 ? "7" : star === 2 ? "2" : "1"
                              }%`,
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
              </div>

              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={`/placeholder.svg?height=40&width=40&text=User${i + 1}`}
                          alt={`Usuario ${i + 1}`}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-medium">Usuario {i + 1}</p>
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, j) => (
                                <Star
                                  key={j}
                                  className={`h-4 w-4 ${
                                    j < 5 - (i % 2) ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-500">
                              {new Date(Date.now() - 1000 * 60 * 60 * 24 * (i + 1) * 3).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        {i === 0
                          ? "Excelente vendedor, muy atento y rápido en responder. El producto llegó en perfectas condiciones y antes de lo esperado. Totalmente recomendable."
                          : i === 1
                            ? "Muy buena atención y el producto es tal cual se describe. El envío fue rápido y sin problemas. Volvería a comprar."
                            : "Buen vendedor, respondió todas mis dudas antes de comprar. El producto es de buena calidad y el precio es justo."}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="policies" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Política de envíos</h3>
                      <p className="text-gray-600">
                        Realizamos envíos a todo el país a través de Correo Argentino y empresas de logística privadas.
                        Los tiempos de entrega varían según la ubicación, pero generalmente son de 3 a 5 días hábiles.
                        Ofrecemos envío gratis en compras superiores a $20.000.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Política de devoluciones</h3>
                      <p className="text-gray-600">
                        Aceptamos devoluciones dentro de los 10 días posteriores a la recepción del producto. El
                        producto debe estar en su empaque original y sin señales de uso. Los costos de envío para
                        devoluciones corren por cuenta del comprador, excepto en casos de productos defectuosos.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Garantía</h3>
                      <p className="text-gray-600">
                        Todos nuestros productos cuentan con garantía oficial del fabricante. Además, ofrecemos 30 días
                        de garantía adicional por cualquier defecto de fábrica. Para hacer efectiva la garantía, es
                        necesario presentar la factura de compra.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Medios de pago aceptados</h3>
                      <p className="text-gray-600">
                        Aceptamos todas las tarjetas de crédito y débito, transferencia bancaria, efectivo en puntos de
                        pago y Mercado Pago. Ofrecemos hasta 12 cuotas sin interés con tarjetas seleccionadas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
