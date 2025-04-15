import PlaceholderImages from "@/components/placeholder-images"

export default function PlaceholderPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Imágenes Placeholder</h1>
      <p className="mb-6 text-muted-foreground">
        Usa esta herramienta para generar y copiar URLs de imágenes placeholder para tus productos.
      </p>

      <PlaceholderImages />
    </div>
  )
}
