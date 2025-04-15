import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SellerCardProps {
  seller: {
    id: number
    name: string
    rating: number
    products: number
    image: string
  }
}

export default function SellerCard({ seller }: SellerCardProps) {
  const { id, name, rating, products, image } = seller

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-md hover:shadow-primary/20 transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <img src={image || "/placeholder.svg"} alt={name} className="w-16 h-16 rounded-full object-cover mr-4" />
        <div>
          <h3 className="font-medium text-lg text-foreground">{name}</h3>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-primary fill-current" />
            <span className="ml-1 text-sm text-muted-foreground">{rating} (120 reseñas)</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-1">
          <span className="font-medium">{products}</span> productos
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <span className="font-medium">98%</span> de satisfacción
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">24h</span> tiempo de respuesta
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          className="flex-1 border-border text-foreground hover:text-primary hover:border-primary"
        >
          <Link href={`/tienda/${id}`} className="w-full">
            Ver tienda
          </Link>
        </Button>
        <Button variant="default" className="flex-1 bg-primary hover:bg-accent">
          <Link href={`/chat/${id}`} className="w-full">
            Contactar
          </Link>
        </Button>
      </div>
    </div>
  )
}
