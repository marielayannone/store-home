import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rutas que requieren autenticación
const protectedRoutes = ["/perfil", "/pedidos", "/favoritos", "/carrito/checkout", "/mensajes"]

// Rutas que requieren ser vendedor
const sellerRoutes = [
  "/vendedor",
  "/vendedor/productos",
  "/vendedor/pedidos",
  "/vendedor/estadisticas",
  "/vendedor/configuracion",
]

export function middleware(request: NextRequest) {
  // Simulación de middleware para desarrollo
  // En producción, esto verificaría tokens JWT y roles reales

  const { pathname } = request.nextUrl

  // Verificar si es una ruta protegida
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Verificar si es una ruta de vendedor
  const isSellerRoute = sellerRoutes.some((route) => pathname.startsWith(route))

  // Simulación de autenticación - en producción usaríamos cookies reales
  const isAuthenticated = true // Simulamos que el usuario está autenticado para desarrollo
  const isSellerUser = true // Simulamos que el usuario es vendedor para desarrollo

  // Si es una ruta protegida y no hay token, redirigir al login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Si es una ruta de vendedor y el usuario no es vendedor, redirigir al inicio
  if (isSellerRoute && (!isAuthenticated || !isSellerUser)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)",
  ],
}
