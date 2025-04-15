import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function MercadoPagoIntegration() {
  return (
    <Card className="border-2 border-primary bg-gradient-to-br from-card to-background">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Paga seguro con Mercado Pago</CardTitle>
            <CardDescription>La plataforma de pagos más confiable de Argentina</CardDescription>
          </div>
          <div className="bg-white p-2 rounded-lg">
            <img src="/placeholder.svg?height=40&width=120&text=Mercado Pago" alt="Mercado Pago" className="h-8" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="flex flex-col items-center text-center p-2 bg-white rounded-lg border">
              <img src="/placeholder.svg?height=30&width=30&text=QR" alt="QR" className="h-6 mb-1" />
              <span className="text-black">Pago con QR</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 bg-white rounded-lg border">
              <img src="/placeholder.svg?height=30&width=30&text=Tarjeta" alt="Tarjeta" className="h-6 mb-1" />
              <span className="text-black">Tarjetas</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 bg-white rounded-lg border">
              <img src="/placeholder.svg?height=30&width=30&text=Cuotas" alt="Cuotas" className="h-6 mb-1" />
              <span className="text-black">Hasta 12 cuotas</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 bg-white rounded-lg border">
              <img src="/placeholder.svg?height=30&width=30&text=Protección" alt="Protección" className="h-6 mb-1" />
              <span className="text-black">Compra protegida</span>
            </div>
          </div>

          <div className="bg-primary/10 p-3 rounded-lg text-sm">
            <p className="font-medium text-primary">¿Por qué elegir Mercado Pago?</p>
            <ul className="mt-2 space-y-1 text-foreground">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Protección de datos con encriptación avanzada</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Programa de protección al comprador</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Múltiples opciones de pago en un solo lugar</span>
              </li>
            </ul>
          </div>

          <Button className="w-full bg-primary hover:bg-accent text-primary-foreground">
            <Link href="/metodos-de-pago" className="w-full">
              Conoce más sobre nuestros métodos de pago
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
