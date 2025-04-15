import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MainBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 aspect-[21/9] md:aspect-[21/7] flex items-center">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-20 bg-cover bg-center"></div>
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-24">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ofertas Especiales</h2>
            <p className="text-gray-200 text-lg mb-6">
              Descubre productos increíbles con hasta 50% de descuento. ¡Ofertas por tiempo limitado!
            </p>
            <Link href="/ofertas">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Ver Ofertas</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
