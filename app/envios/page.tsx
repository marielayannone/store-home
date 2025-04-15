import Link from "next/link"
import { ArrowLeft, Truck, Clock, MapPin, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" asChild className="mr-2" aria-label="Volver a la página principal">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Envíos a todo el país</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-lg mb-6">
            En Store Home nos aseguramos de que tus compras lleguen de manera segura y rápida a cualquier punto de
            Argentina. Trabajamos con los mejores servicios de logística para garantizar la mejor experiencia.
          </p>
          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
            <h3 className="text-xl font-semibold mb-3 text-primary">Beneficios de nuestro servicio</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Envío gratis en compras superiores a $20.000</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Seguimiento en tiempo real de tu pedido</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Embalaje seguro para proteger tus productos</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Opciones de envío express para pedidos urgentes</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/placeholder.svg?height=300&width=400"
            alt="Envíos a todo el país"
            className="max-w-full h-auto rounded-lg shadow-lg"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=300&width=400&text=Imagen no disponible"
              e.currentTarget.alt = "Imagen no disponible"
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Empresas de logística</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=40&width=100"
                  alt="Correo Argentino"
                  className="h-10 object-contain"
                />
              </div>
              <div className="border rounded-lg p-3 flex items-center justify-center">
                <img src="/placeholder.svg?height=40&width=100" alt="OCA" className="h-10 object-contain" />
              </div>
              <div className="border rounded-lg p-3 flex items-center justify-center">
                <img src="/placeholder.svg?height=40&width=100" alt="Andreani" className="h-10 object-contain" />
              </div>
              <div className="border rounded-lg p-3 flex items-center justify-center">
                <img src="/placeholder.svg?height=40&width=100" alt="Mercado Envíos" className="h-10 object-contain" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Tiempos de entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border-b pb-2">
                <p className="font-medium">Envío estándar</p>
                <p className="text-sm text-gray-500">3-5 días hábiles</p>
              </div>
              <div className="border-b pb-2">
                <p className="font-medium">Envío express</p>
                <p className="text-sm text-gray-500">24-48 horas</p>
              </div>
              <div>
                <p className="font-medium">Retiro en sucursal</p>
                <p className="text-sm text-gray-500">Disponible en 24 horas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Cobertura</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3">Llegamos a todas las provincias de Argentina:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <p>• Buenos Aires</p>
              <p>• CABA</p>
              <p>• Catamarca</p>
              <p>• Chaco</p>
              <p>• Chubut</p>
              <p>• Córdoba</p>
              <p>• Corrientes</p>
              <p>• Entre Ríos</p>
              <p>• Formosa</p>
              <p>• Jujuy</p>
              <p>• La Pampa</p>
              <p>• La Rioja</p>
              <p>• Mendoza</p>
              <p>• Misiones</p>
              <p>• Neuquén</p>
              <p>• Río Negro</p>
              <p>• Salta</p>
              <p>• San Juan</p>
              <p>• San Luis</p>
              <p>• Santa Cruz</p>
              <p>• Santa Fe</p>
              <p>• Santiago del Estero</p>
              <p>• Tierra del Fuego</p>
              <p>• Tucumán</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Tarifas de envío por región</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Región</TableHead>
                <TableHead>Envío estándar</TableHead>
                <TableHead>Envío express</TableHead>
                <TableHead>Envío gratis a partir de</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">CABA</TableCell>
                <TableCell>$800</TableCell>
                <TableCell>$1.500</TableCell>
                <TableCell>$15.000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">GBA</TableCell>
                <TableCell>$1.000</TableCell>
                <TableCell>$1.800</TableCell>
                <TableCell>$15.000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Buenos Aires</TableCell>
                <TableCell>$1.200</TableCell>
                <TableCell>$2.200</TableCell>
                <TableCell>$18.000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Centro</TableCell>
                <TableCell>$1.500</TableCell>
                <TableCell>$2.500</TableCell>
                <TableCell>$20.000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Litoral</TableCell>
                <TableCell>$1.800</TableCell>
                <TableCell>$2.800</TableCell>
                <TableCell>$20.000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Norte</TableCell>
                <TableCell>$2.000</TableCell>
                <TableCell>$3.200</TableCell>
                <TableCell>$25.000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cuyo</TableCell>
                <TableCell>$2.000</TableCell>
                <TableCell>$3.200</TableCell>
                <TableCell>$25.000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Patagonia</TableCell>
                <TableCell>$2.500</TableCell>
                <TableCell>$4.000</TableCell>
                <TableCell>$30.000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-2xl font-bold">Información importante</h2>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Seguimiento de pedidos</h3>
            <p className="text-gray-600">
              Una vez que tu pedido sea despachado, recibirás un correo electrónico con el número de seguimiento y el
              enlace para rastrear tu envío en tiempo real.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Recepción del pedido</h3>
            <p className="text-gray-600">
              Es importante que al recibir tu pedido verifiques que el paquete esté sellado y en buenas condiciones. En
              caso de encontrar alguna anomalía, regístrala en el comprobante de entrega.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Zonas de difícil acceso</h3>
            <p className="text-gray-600">
              Para zonas rurales o de difícil acceso, los tiempos de entrega pueden extenderse 1-2 días adicionales. Te
              recomendamos considerar esta información al realizar tu compra.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">¿Necesitas ayuda con tu envío?</h3>
            <p className="text-gray-600">
              Si tienes alguna duda o inconveniente con tu envío, no dudes en contactar a nuestro equipo de atención al
              cliente a través del chat o al correo envios@storehome.com.ar
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
