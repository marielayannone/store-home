"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Tag,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Productos",
      path: "/admin/productos",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      name: "Usuarios",
      path: "/admin/usuarios",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Categorías",
      path: "/admin/categorias",
      icon: <Tag className="h-5 w-5" />,
    },
    {
      name: "Mensajes",
      path: "/admin/mensajes",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: "Estadísticas",
      path: "/admin/estadisticas",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Configuración",
      path: "/admin/configuracion",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar para desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border">
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">Admin</span>
            <span className="text-xl font-bold text-foreground">Panel</span>
          </Link>
        </div>

        <div className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive(item.path) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-card/80"
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start mt-4 text-red-500 hover:text-red-600 hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Sidebar móvil */}
      <div className={`fixed inset-0 z-50 md:hidden ${isSidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
        <div className="fixed top-0 left-0 bottom-0 w-64 bg-card">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">Admin</span>
              <span className="text-xl font-bold text-foreground">Panel</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 py-6 px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.path) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-card/80"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">Administrador</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start mt-4 text-red-500 hover:text-red-600 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1">
        {/* Header móvil */}
        <header className="md:hidden bg-card border-b border-border sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>

            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">Admin</span>
              <span className="text-xl font-bold text-foreground">Panel</span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/configuracion">
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Contenido */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
