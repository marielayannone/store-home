import Link from "next/link"
import { ArrowLeft, CreditCard, Wallet, BanknoteIcon as Bank, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentMethodsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" asChild className="mr-2" aria-label="Volver a la página principal">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Métodos de pago aceptados</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-lg mb-6">
            En Store Home nos adaptamos a tus necesidades ofreciendo múltiples opciones de pago seguras y convenientes
            para que puedas elegir la que mejor se adapte a ti.
          </p>
          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
            <h3 className="text-xl font-semibold mb-3 text-primary">¿Por qué comprar con nosotros?</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Pagos 100% seguros con encriptación SSL</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Hasta 12 cuotas sin interés en productos seleccionados</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Descuentos exclusivos pagando con transferencia bancaria</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Proceso de pago rápido y sencillo</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/placeholder.svg?height=300&width=400"
            alt="Métodos de pago"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Tarjetas de crédito</CardTitle>
              <CardDescription>Hasta 12 cuotas sin interés</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <img src="/placeholder.svg?height=40&width=60" alt="Visa" className="h-10 object-contain" />
              <img src="/placeholder.svg?height=40&width=60" alt="Mastercard" className="h-10 object-contain" />
              <img src="/placeholder.svg?height=40&width=60" alt="American Express" className="h-10 object-contain" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Tarjetas de débito</CardTitle>
              <CardDescription>Pago inmediato y seguro</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <img src="/placeholder.svg?height=40&width=60" alt="Visa Débito" className="h-10 object-contain" />
              <img src="/placeholder.svg?height=40&width=60" alt="Maestro" className="h-10 object-contain" />
              <img src="/placeholder.svg?height=40&width=60" alt="Cabal" className="h-10 object-contain" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <QrCode className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Billeteras virtuales</CardTitle>
              <CardDescription>Rápido y sin complicaciones</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <img src="/placeholder.svg?height=40&width=60" alt="Mercado Pago" className="h-10 object-contain" />
              <img src="/placeholder.svg?height=40&width=60" alt="MODO" className="h-10 object-contain" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <Bank className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Transferencia bancaria</CardTitle>
              <CardDescription>5% de descuento adicional</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <img src="/placeholder.svg?height=40&width=60" alt="Banco Nación" className="h-10 object-contain" />
              <img src="/placeholder.svg?height=40&width=60" alt="Banco Galicia" className="h-10 object-contain" />
              <img src="/placeholder.svg?height=40&width=60" alt="Banco Santander" className="h-10 object-contain" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Preguntas frecuentes sobre pagos</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">¿Cómo puedo pagar en cuotas sin interés?</h3>
            <p className="text-gray-600">
              Selecciona tu tarjeta de crédito participante al momento de realizar el pago y elige la cantidad de cuotas
              disponibles sin interés para tu compra.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">¿Es seguro comprar en Store Home?</h3>
            <p className="text-gray-600">
              Sí, todas nuestras transacciones están protegidas con encriptación SSL de 256 bits y no almacenamos datos
              sensibles de tus tarjetas.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">¿Cuándo se realiza el cargo a mi tarjeta?</h3>
            <p className="text-gray-600">
              El cargo se realiza inmediatamente después de confirmar tu compra. En caso de productos personalizados o
              bajo pedido, se puede solicitar un anticipo.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">¿Puedo cancelar mi compra después de pagar?</h3>
            <p className="text-gray-600">
              Puedes cancelar tu compra dentro de las primeras 24 horas si el pedido aún no ha sido procesado. Contacta
              a nuestro servicio al cliente para asistencia.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
