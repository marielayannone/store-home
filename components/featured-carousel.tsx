"use client"

import { useState } from "react"
import Link from "next/link"
import { Truck, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Datos de ejemplo para las ofertas destacadas
const featuredDeals = [
  {
    id: 1,
    title: 'Smart TV 55" 4K UHD',
    originalPrice: 149999,
    discountPrice: 89999,
    discount: 40,
    image: "/placeholder.svg?height=200&width=200&text=Smart+TV",
    freeShipping: true,
    installments: 12,
    rating: 4.7,
    reviews: 245,
    seller: "TecnoStore",
    sellerRating: "Platinum",
  },
  {
    id: 2,
    title: "Notebook Core i5 8GB RAM 256GB SSD",
    originalPrice: 269999,
    discountPrice: 199999,
    discount: 25,
    image: "/placeholder.svg?height=200&width=200&text=Notebook",
    freeShipping: true,
    installments: 12,
    rating: 4.8,
    reviews: 189,
    seller: "ComputerWorld",
    sellerRating: "Gold",
  },
  {
    id: 3,
    title: "Zapatillas deportivas premium",
    originalPrice: 49999,
    discountPrice: 34999,
    discount: 30,
    image: "/placeholder.svg?height=200&width=200&text=Zapatillas",
    freeShipping: true,
    installments: 6,
    rating: 4.5,
    reviews: 320,
    seller: "DeportesOnline",
    sellerRating: "Platinum",
  },
  {
    id: 4,
    title: "Smartphone 128GB 8GB RAM",
    originalPrice: 189999,
    discountPrice: 149999,
    discount: 20,
    image: "/placeholder.svg?height=200&width=200&text=Smartphone",
    freeShipping: true,
    installments: 12,
    rating: 4.9,
    reviews: 412,
    seller: "TecnoStore",
    sellerRating: "Platinum",
  },
  {
    id: 5,
    title: "Heladera No Frost 400L",
    originalPrice: 349999,
    discountPrice: 279999,
    discount: 20,
    image: "/placeholder.svg?height=200&width=200&text=Heladera",
    freeShipping: true,
    installments: 18,
    rating: 4.6,
    reviews: 156,
    seller: "ElectroHogar",
    sellerRating: "Gold",
  },
  {
    id: 6,
    title: 'Bicicleta Mountain Bike 29"',
    originalPrice: 129999,
    discountPrice: 89999,
    discount: 30,
    image: "/placeholder.svg?height=200&width=200&text=Bicicleta",
    freeShipping: true,
    installments: 12,
    rating: 4.7,
    reviews: 203,
    seller: "DeportesOnline",
    sellerRating: "Platinum",
  },
]

export default function FeaturedCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold">Ofertas destacadas</h2>
        <Link href="/ofertas" className="text-primary hover:underline text-sm">
          Ver todas
        </Link>
      </div>

      <Carousel className="w-full" onSelect={(index) => setCurrentSlide(index)}>
        <CarouselContent>
          {featuredDeals.map((deal) => (
            <CarouselItem key={deal.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <Link href={`/producto/${deal.id}`}>
                <Card className="border border-border hover:border-primary/50 transition-all duration-300 h-full">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.title}
                        className="w-full h-48 object-contain p-4"
                      />
                      <Badge className="absolute top-2 right-2 bg-accent text-white font-bold">
                        {deal.discount}% OFF
                      </Badge>
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-muted-foreground mb-1 flex items-center">
                        <span>{deal.seller}</span>
                        <span className="mx-1">•</span>
                        <span className="text-primary text-xs">{deal.sellerRating}</span>
                      </div>
                      <h3 className="font-medium text-foreground line-clamp-2 h-12">{deal.title}</h3>
                      <div className="mt-2">
                        <div className="flex items-baseline">
                          <span className="text-xl font-bold">${deal.discountPrice.toLocaleString("es-AR")}</span>
                          <span className="ml-2 text-sm text-muted-foreground line-through">
                            ${deal.originalPrice.toLocaleString("es-AR")}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          en {deal.installments}x $
                          {Math.round(deal.discountPrice / deal.installments).toLocaleString("es-AR")} sin interés
                        </div>
                      </div>
                      {deal.freeShipping && (
                        <div className="flex items-center mt-2 text-primary text-sm">
                          <Truck className="h-4 w-4 mr-1" />
                          <span>Envío gratis</span>
                        </div>
                      )}
                      <div className="flex items-center mt-2">
                        <div className="flex">
                          <Star className="h-4 w-4 text-primary fill-current" />
                          <span className="ml-1 text-sm">{deal.rating}</span>
                        </div>
                        <span className="mx-1 text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{deal.reviews} opiniones</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 bg-card border border-border hover:bg-primary hover:text-primary-foreground" />
        <CarouselNext className="right-0 bg-card border border-border hover:bg-primary hover:text-primary-foreground" />
      </Carousel>

      <div className="flex justify-center mt-4">
        <div className="flex space-x-2">
          {featuredDeals.slice(0, Math.min(6, featuredDeals.length)).map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={`w-2 h-2 rounded-full p-0 ${currentSlide === index ? "bg-primary" : "bg-muted"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
