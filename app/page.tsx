import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import FeaturedProducts from "@/components/featured-products"
import CategoryGrid from "@/components/category-grid"
import MainBanner from "@/components/main-banner"
import TrustBadges from "@/components/trust-badges"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section con buscador */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Compra y vende en el marketplace más grande de Argentina
            </h1>
            <p className="text-lg mb-8">Miles de productos con envío a todo el país</p>
            <div className="relative max-w-xl mx-auto">
              <Input
                type="text"
                placeholder="¿Qué estás buscando?"
                className="pl-4 pr-12 py-6 rounded-full text-black"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 rounded-full h-10 w-10 bg-orange-500 hover:bg-orange-600"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Banner principal */}
        <MainBanner />

        {/* Categorías destacadas */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Categorías</h2>
            <Link href="/categorias" className="text-orange-500 hover:underline">
              Ver todas
            </Link>
          </div>
          <CategoryGrid />
        </section>

        {/* Productos destacados */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Productos destacados</h2>
            <Link href="/productos" className="text-orange-500 hover:underline">
              Ver todos
            </Link>
          </div>
          <FeaturedProducts />
        </section>

        {/* Sellos de confianza */}
        <section className="py-12 mt-8 bg-gray-50 rounded-lg">
          <TrustBadges />
        </section>
      </div>
    </div>
  )
}
