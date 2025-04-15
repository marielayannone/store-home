import ImageUploader from "@/components/image-uploader"

export default function UploadImagesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Subir Imágenes</h1>
      <p className="mb-6 text-muted-foreground">
        Usa esta herramienta para subir imágenes desde tu dispositivo y usarlas en tus productos.
      </p>

      <ImageUploader />
    </div>
  )
}
