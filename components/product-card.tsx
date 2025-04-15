import Link from "next/link"
import { Star, Truck, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    image: string
    rating: number
    seller: string
    discount?: number
    freeShipping?: boolean
    installments?: number
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, price, image, rating, seller, discount, freeShipping = true, installments = 12 } = product

  const discountedPrice = discount ? price - (price * discount) / 100 : price
  const installmentPrice = Math.round(discountedPrice / (installments || 1))

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300">
      <Link href={`/producto/${id}`}>
        <div className="relative">
          <img
            src={image || "/placeholder.svg?height=200&width=200&text=Producto"}
            alt={name}
            className="w-full h-48 object-contain p-4"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=200&width=200&text=Producto"
              e.currentTarget.alt = "Imagen no disponible"
            }}
          />
          {discount && <Badge className="absolute top-2 right-2 bg-accent text-white">{discount}% OFF</Badge>}
        </div>
        <div className="p-4">
          <div className="text-sm text-muted-foreground mb-1">{seller}</div>
          <h3 className="font-medium text-foreground mb-2 line-clamp-2 h-12">{name}</h3>

          <div className="flex items-baseline mb-1">
            {discount ? (
              <>
                <span className="text-xl font-bold">${discountedPrice.toLocaleString("es-AR")}</span>
                <span className="ml-2 text-sm text-muted-foreground line-through">
                  ${price.toLocaleString("es-AR")}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold">${price.toLocaleString("es-AR")}</span>
            )}
          </div>

          {installments > 1 && (
            <div className="text-xs text-muted-foreground mb-2">
              en {installments}x ${installmentPrice.toLocaleString("es-AR")} sin interés
            </div>
          )}

          <div className="flex flex-col gap-1 mb-3">
            {freeShipping && (
              <div className="flex items-center text-primary text-sm">
                <Truck className="h-4 w-4 mr-1" />
                <span>Envío gratis</span>
              </div>
            )}

            <div className="flex items-center text-muted-foreground text-xs">
              <CreditCard className="h-3 w-3 mr-1" />
              <span>Hasta 12 cuotas sin interés</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex">
              <Star className="h-4 w-4 text-primary fill-current" />
              <span className="ml-1 text-sm text-muted-foreground">{rating}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button className="w-full bg-primary hover:bg-accent">Agregar al carrito</Button>
      </div>
    </div>
  )
}
