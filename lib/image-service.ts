// Servicio para obtener imágenes de APIs externas

// Opción 1: Usando Unsplash API
export async function getUnsplashImages(query = "product", count = 10) {
  // Nota: En producción, deberías mover esta clave a una variable de entorno
  const accessKey = "tu_clave_de_api_de_unsplash"

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&count=${count}&client_id=${accessKey}`,
    )

    if (!response.ok) {
      throw new Error("Error al obtener imágenes de Unsplash")
    }

    const data = await response.json()
    return data.map((item: any) => ({
      id: item.id,
      url: item.urls.regular,
      thumb: item.urls.thumb,
      alt: item.alt_description || "Imagen de producto",
      author: item.user.name,
      authorUrl: item.user.links.html,
    }))
  } catch (error) {
    console.error("Error en el servicio de imágenes:", error)
    return getPlaceholderImages(count) // Fallback a imágenes de placeholder
  }
}

// Opción 2: Usando Pexels API
export async function getPexelsImages(query = "product", count = 10) {
  // Nota: En producción, deberías mover esta clave a una variable de entorno
  const apiKey = "tu_clave_de_api_de_pexels"

  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${count}`, {
      headers: {
        Authorization: apiKey,
      },
    })

    if (!response.ok) {
      throw new Error("Error al obtener imágenes de Pexels")
    }

    const data = await response.json()
    return data.photos.map((photo: any) => ({
      id: photo.id,
      url: photo.src.medium,
      thumb: photo.src.small,
      alt: photo.alt || "Imagen de producto",
      author: photo.photographer,
      authorUrl: photo.photographer_url,
    }))
  } catch (error) {
    console.error("Error en el servicio de imágenes:", error)
    return getPlaceholderImages(count) // Fallback a imágenes de placeholder
  }
}

// Opción 3: Imágenes de placeholder (fallback)
export function getPlaceholderImages(count = 10) {
  const categories = [
    "electronics",
    "clothing",
    "furniture",
    "food",
    "toys",
    "sports",
    "beauty",
    "books",
    "automotive",
    "jewelry",
  ]

  return Array.from({ length: count }, (_, i) => {
    const category = categories[i % categories.length]
    return {
      id: `placeholder-${i}`,
      url: `/placeholder.svg?height=400&width=600&text=${category}`,
      thumb: `/placeholder.svg?height=200&width=300&text=${category}`,
      alt: `Imagen de ${category}`,
      author: "Sistema",
      authorUrl: "#",
    }
  })
}

// Función principal que puedes usar en tus componentes
export async function getProductImages(category?: string, count = 10) {
  // Puedes cambiar entre las diferentes APIs según tus necesidades
  // return await getUnsplashImages(category, count);
  // return await getPexelsImages(category, count);
  return getPlaceholderImages(count) // Por defecto usamos placeholders
}
