"use client"

import Link from "next/link"
import { Smartphone, Home, Shirt, Dumbbell, Utensils, Sparkles, Car, Laptop, Headphones } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Datos de ejemplo para las categorías
const categories = [
  { id: 1, name: "Electrónica", icon: <Smartphone className="h-8 w-8 text-primary" />, count: 1245 },
  { id: 2, name: "Hogar", icon: <Home className="h-8 w-8 text-primary" />, count: 876 },
  { id: 3, name: "Ropa", icon: <Shirt className="h-8 w-8 text-primary" />, count: 2134 },
  { id: 4, name: "Deportes", icon: <Dumbbell className="h-8 w-8 text-primary" />, count: 567 },
  { id: 5, name: "Alimentos", icon: <Utensils className="h-8 w-8 text-primary" />, count: 432 },
  { id: 6, name: "Belleza", icon: <Sparkles className="h-8 w-8 text-primary" />, count: 789 },
  { id: 7, name: "Vehículos", icon: <Car className="h-8 w-8 text-primary" />, count: 345 },
  { id: 8, name: "Computación", icon: <Laptop className="h-8 w-8 text-primary" />, count: 987 },
  { id: 9, name: "Audio", icon: <Headphones className="h-8 w-8 text-primary" />, count: 654 },
]

export default function CategoriesCarousel() {
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold">Categorías populares</h2>
        <Link href="/categorias" className="text-primary hover:underline text-sm">
          Ver todas
        </Link>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem key={category.id} className="md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <Link href={`/categoria/${category.id}`}>
                <Card className="border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300 h-full">
                  <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                    <div className="mb-3">{category.icon}</div>
                    <h3 className="font-medium text-foreground">{category.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{category.count} productos</p>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 bg-card border border-border hover:bg-primary hover:text-primary-foreground" />
        <CarouselNext className="right-0 bg-card border border-border hover:bg-primary hover:text-primary-foreground" />
      </Carousel>
    </div>
  )
}
