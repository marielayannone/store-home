"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart, Heart, Bell, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSupabaseAuth } from "@/lib/auth"

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useSupabaseAuth()

  const isActive = (path: string) => {
    return pathname === path
  }

  const mainCategories = [
    { name: "Electrónica", href: "/categoria/electronica" },
    { name: "Ropa", href: "/categoria/ropa" },
    { name: "Hogar", href: "/categoria/hogar" },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">
                STORE<span className="text-orange-500">HOME</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium ${
                isActive("/") ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
              }`}
            >
              Inicio
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sm font-medium text-gray-700 hover:text-orange-500">
                  Categorías <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {mainCategories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link href={category.href}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/categorias">Ver todas las categorías</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/productos"
              className={`text-sm font-medium ${
                isActive("/productos") ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
              }`}
            >
              Productos
            </Link>
            <Link
              href="/vender"
              className={`text-sm font-medium ${
                isActive("/vender") ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
              }`}
            >
              Vender
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/favoritos" className="text-gray-700 hover:text-orange-500">
                  <Heart className="h-5 w-5" />
                </Link>
                <Link href="/notificaciones" className="text-gray-700 hover:text-orange-500">
                  <Bell className="h-5 w-5" />
                </Link>
                <Link href="/carrito" className="text-gray-700 hover:text-orange-500">
                  <ShoppingCart className="h-5 w-5" />
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.email || ""} />
                        <AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/perfil">Mi Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/mis-compras">Mis Compras</Link>
                    </DropdownMenuItem>
                    {user.user_metadata?.role === "seller" && (
                      <DropdownMenuItem asChild>
                        <Link href="/vendedor">Panel de Vendedor</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>Cerrar Sesión</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-orange-500">
                    Ingresar
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">Registrarse</Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="text-lg font-medium">
                    Inicio
                  </Link>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Categorías</p>
                    {mainCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block pl-4 text-gray-600 hover:text-orange-500"
                      >
                        {category.name}
                      </Link>
                    ))}
                    <Link href="/categorias" className="block pl-4 text-gray-600 hover:text-orange-500">
                      Ver todas
                    </Link>
                  </div>
                  <Link href="/productos" className="text-lg font-medium">
                    Productos
                  </Link>
                  <Link href="/vender" className="text-lg font-medium">
                    Vender
                  </Link>
                  {!user && (
                    <>
                      <Link href="/login" className="text-lg font-medium">
                        Ingresar
                      </Link>
                      <Link href="/registro" className="text-lg font-medium">
                        Registrarse
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
