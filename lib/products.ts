// Datos de ejemplo para productos
const mockProducts = [
  {
    id: "1",
    name: 'Smartphone 128GB - Pantalla AMOLED 6.5" - 8GB RAM',
    price: 149999,
    discount: 10,
    rating: 4.7,
    reviewCount: 128,
    seller: {
      id: "3",
      name: "TecnoStore",
      rating: 4.8,
    },
    stock: 15,
    description:
      "Smartphone de última generación con pantalla AMOLED de 6.5 pulgadas, procesador octa-core, 8GB de RAM y 128GB de almacenamiento interno. Cámara principal de 64MP + 12MP + 5MP y cámara frontal de 32MP. Batería de 5000mAh con carga rápida de 25W.",
    features: [
      'Pantalla AMOLED 6.5" FHD+',
      "Procesador Octa-core 2.4GHz",
      "8GB RAM + 128GB almacenamiento",
      "Cámara principal: 64MP + 12MP + 5MP",
      "Cámara frontal: 32MP",
      "Batería: 5000mAh",
      "Carga rápida: 25W",
      "Android 13",
      "Dual SIM",
      "NFC",
    ],
    images: [
      "/placeholder.svg?height=500&width=500&text=Smartphone",
      "/placeholder.svg?height=500&width=500&text=Smartphone+2",
      "/placeholder.svg?height=500&width=500&text=Smartphone+3",
      "/placeholder.svg?height=500&width=500&text=Smartphone+4",
    ],
    colors: ["Negro", "Azul", "Blanco"],
    shipping: [
      {
        method: "Envío estándar",
        price: 0,
        time: "3-5 días hábiles",
      },
      {
        method: "Envío express",
        price: 1200,
        time: "24-48 horas",
      },
    ],
    payment: ["Tarjeta de crédito - hasta 12 cuotas sin interés", "Tarjeta de débito", "Transferencia bancaria"],
    category: "electronica",
    condition: "new",
    free_shipping: true,
    featured: true,
  },
  {
    id: "2",
    name: "Smart TV 55 pulgadas 4K UHD",
    price: 199999,
    discount: 15,
    rating: 4.5,
    reviewCount: 87,
    seller: {
      id: "3",
      name: "TecnoStore",
      rating: 4.8,
    },
    stock: 8,
    description:
      "Smart TV de 55 pulgadas con resolución 4K UHD. Sistema operativo Android TV, conectividad WiFi, Bluetooth y múltiples puertos HDMI y USB. Sonido envolvente y diseño sin bordes para una experiencia visual inmersiva.",
    features: [
      "Pantalla 55 pulgadas 4K UHD",
      "Android TV",
      "WiFi y Bluetooth",
      "3 puertos HDMI, 2 puertos USB",
      "Sonido envolvente",
      "Diseño sin bordes",
      "Control por voz",
      "Modo juego",
    ],
    images: [
      "/placeholder.svg?height=500&width=500&text=Smart+TV",
      "/placeholder.svg?height=500&width=500&text=Smart+TV+2",
      "/placeholder.svg?height=500&width=500&text=Smart+TV+3",
    ],
    colors: ["Negro"],
    shipping: [
      {
        method: "Envío estándar",
        price: 0,
        time: "3-5 días hábiles",
      },
      {
        method: "Envío express",
        price: 1500,
        time: "24-48 horas",
      },
    ],
    payment: ["Tarjeta de crédito - hasta 12 cuotas sin interés", "Tarjeta de débito", "Transferencia bancaria"],
    category: "electronica",
    condition: "new",
    free_shipping: true,
    featured: true,
  },
  {
    id: "3",
    name: "Zapatillas deportivas running",
    price: 24999,
    discount: 0,
    rating: 4.6,
    reviewCount: 156,
    seller: {
      id: "5",
      name: "DeportesOnline",
      rating: 4.7,
    },
    stock: 25,
    description:
      "Zapatillas deportivas ideales para running. Diseño ergonómico con amortiguación superior y suela antideslizante. Material transpirable y plantilla extraíble. Perfectas para entrenamientos diarios y competiciones.",
    features: [
      "Material exterior: malla transpirable",
      "Suela: caucho antideslizante",
      "Amortiguación superior",
      "Plantilla extraíble",
      "Peso ligero",
      "Refuerzo en talón",
      "Tecnología anti-impacto",
    ],
    images: [
      "/placeholder.svg?height=500&width=500&text=Zapatillas",
      "/placeholder.svg?height=500&width=500&text=Zapatillas+2",
      "/placeholder.svg?height=500&width=500&text=Zapatillas+3",
    ],
    colors: ["Negro/Rojo", "Azul/Blanco", "Gris/Verde"],
    shipping: [
      {
        method: "Envío estándar",
        price: 0,
        time: "3-5 días hábiles",
      },
      {
        method: "Envío express",
        price: 800,
        time: "24-48 horas",
      },
    ],
    payment: ["Tarjeta de crédito - hasta 6 cuotas sin interés", "Tarjeta de débito", "Transferencia bancaria"],
    category: "ropa",
    condition: "new",
    free_shipping: true,
    featured: true,
  },
  {
    id: "4",
    name: "Set de 3 sartenes antiadherentes",
    price: 18999,
    discount: 20,
    rating: 4.8,
    reviewCount: 92,
    seller: {
      id: "7",
      name: "HogarYCocina",
      rating: 4.9,
    },
    stock: 12,
    description:
      "Set de 3 sartenes con revestimiento antiadherente de alta calidad. Incluye sartenes de 20, 24 y 28 cm de diámetro. Base de inducción compatible con todo tipo de cocinas. Mangos ergonómicos resistentes al calor.",
    features: [
      "Revestimiento antiadherente premium",
      "Base de inducción",
      "Compatible con todo tipo de cocinas",
      "Mangos ergonómicos",
      "Resistentes al calor hasta 240°C",
      "Libre de PFOA",
      "Fácil limpieza",
    ],
    images: [
      "/placeholder.svg?height=500&width=500&text=Sartenes",
      "/placeholder.svg?height=500&width=500&text=Sartenes+2",
      "/placeholder.svg?height=500&width=500&text=Sartenes+3",
    ],
    colors: ["Negro", "Rojo"],
    shipping: [
      {
        method: "Envío estándar",
        price: 0,
        time: "3-5 días hábiles",
      },
      {
        method: "Envío express",
        price: 1000,
        time: "24-48 horas",
      },
    ],
    payment: ["Tarjeta de crédito - hasta 3 cuotas sin interés", "Tarjeta de débito", "Transferencia bancaria"],
    category: "hogar",
    condition: "new",
    free_shipping: true,
    featured: true,
  },
]

// Función para obtener productos con filtros
export async function getProducts(options: {
  category?: string
  search?: string
  limit?: number
  offset?: number
  featured?: boolean
}) {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 800))

  let filteredProducts = [...mockProducts]

  // Aplicar filtros
  if (options.category) {
    filteredProducts = filteredProducts.filter((product) => product.category === options.category)
  }

  if (options.search) {
    const searchLower = options.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) || product.description.toLowerCase().includes(searchLower),
    )
  }

  if (options.featured) {
    filteredProducts = filteredProducts.filter((product) => product.featured)
  }

  // Aplicar paginación
  if (options.limit) {
    const start = options.offset || 0
    const end = start + options.limit
    filteredProducts = filteredProducts.slice(start, end)
  }

  return filteredProducts
}

// Función para obtener un producto por ID
export async function getProductById(id: string) {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mockProducts.find((product) => product.id === id) || null
}

// Función para crear un producto (simulada)
export async function createProduct(productData: any) {
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // En una implementación real, aquí se conectaría con Supabase
  console.log("Producto creado:", productData)

  // Generar ID único
  const newId = (mockProducts.length + 1).toString()

  // Crear nuevo producto
  const newProduct = {
    id: newId,
    ...productData,
  }

  // Añadir a la lista de productos (solo para simulación)
  mockProducts.push(newProduct as any)

  return newProduct
}
