import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Upload } from "lucide-react"

export default function ImagesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Herramientas de Imágenes</h1>
      <p className="mb-8 text-muted-foreground">
        Selecciona una de las siguientes opciones para obtener imágenes para tus productos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opción 1: Placeholders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" />
              Imágenes Placeholder
            </CardTitle>
            <CardDescription>Genera imágenes placeholder automáticas para tus productos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Usa esta opción para generar imágenes placeholder con diferentes tamaños y categorías. No necesitas subir
              archivos, solo copiar las URLs generadas.
            </p>
            <Link href="/imagenes-placeholder">
              <Button className="w-full">Ver Placeholders</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Opción 2: Subir imágenes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Subir Imágenes
            </CardTitle>
            <CardDescription>Sube imágenes desde tu dispositivo para usarlas en tus productos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Usa esta opción para subir tus propias imágenes desde tu computadora o dispositivo móvil. Las imágenes se
              almacenarán temporalmente en tu navegador.
            </p>
            <Link href="/subir-imagenes">
              <Button className="w-full">Subir Imágenes</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
