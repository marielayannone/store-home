"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Star, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getProducts } from "@/lib/products"

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  seller: string
  discount?: number
  freeShipping?: boolean
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        // En una implementación real, esto cargaría productos desde Supabase
        const featuredProducts = await getProducts({ featured: true, limit: 4 })
        setProducts(featuredProducts)
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="bg-gray-200 h-48 rounded-md mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <Link href={`/producto/${product.id}`}>
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg?height=200&width=200&text=Producto"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.discount && (
                <Badge className="absolute top-2 right-2 bg-orange-500">{product.discount}% OFF</Badge>
              )}
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1">{product.seller}</div>
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 h-12">{product.name}</h3>

              <div className="flex items-baseline mb-1">
                {product.discount ? (
                  <>
                    <span className="text-xl font-bold">
                      ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                )}
              </div>

              {product.freeShipping && (
                <div className="flex items-center text-green-600 text-sm mb-2">
                  <Truck className="h-4 w-4 mr-1" />
                  <span>Envío gratis</span>
                </div>
              )}

              <div className="flex items-center">
                <div className="flex">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                </div>
              </div>
            </div>
          </Link>
          <div className="px-4 pb-4">
            <Button className="w-full bg-orange-500 hover:bg-orange-600">Agregar al carrito</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
