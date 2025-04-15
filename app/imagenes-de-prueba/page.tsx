import TestImagesGallery from "@/components/test-images-gallery"

export default function TestImagesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Imágenes de Prueba</h1>
      <p className="mb-8 text-muted-foreground">
        Utiliza esta página para encontrar y copiar URLs de imágenes para usar en tus productos de prueba.
      </p>

      <TestImagesGallery />
    </div>
  )
}
