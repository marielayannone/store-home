"use client"

import { useState } from "react"
import Link from "next/link"
import { Settings, PlusCircle, Trash2, Edit, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import AdminLayout from "@/components/admin-layout"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  // Datos de ejemplo para el panel de administrador
  const stats = {
    users: 1245,
    products: 3567,
    orders: 892,
    revenue: 1250000,
  }

  const recentProducts = [
    {
      id: "PROD-001",
      name: "Smartphone 128GB",
      price: 149999,
      category: "Electrónica",
      status: "active",
      seller: "TecnoStore",
      date: "2023-06-15",
    },
    {
      id: "PROD-002",
      name: "Auriculares Bluetooth",
      price: 24999,
      category: "Electrónica",
      status: "active",
      seller: "AudioPro",
      date: "2023-06-14",
    },
    {
      id: "PROD-003",
      name: "Zapatillas deportivas",
      price: 18999,
      category: "Deportes",
      status: "pending",
      seller: "DeportesOnline",
      date: "2023-06-13",
    },
    {
      id: "PROD-004",
      name: "Set de asado premium",
      price: 12999,
      category: "Hogar",
      status: "active",
      seller: "ElParrillero",
      date: "2023-06-12",
    },
  ]

  const recentUsers = [
    {
      id: "USER-001",
      name: "Juan Pérez",
      email: "juan@example.com",
      role: "buyer",
      date: "2023-06-15",
      status: "active",
    },
    {
      id: "USER-002",
      name: "María González",
      email: "maria@example.com",
      role: "seller",
      date: "2023-06-14",
      status: "active",
    },
    {
      id: "USER-003",
      name: "Carlos Rodríguez",
      email: "carlos@example.com",
      role: "buyer",
      date: "2023-06-13",
      status: "inactive",
    },
    {
      id: "USER-004",
      name: "Ana Martínez",
      email: "ana@example.com",
      role: "seller",
      date: "2023-06-12",
      status: "active",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-500">Activo</Badge>
      case "inactive":
        return <Badge className="bg-gray-500/20 text-gray-400">Inactivo</Badge>
      case "pending":
        return <Badge className="bg-orange-500/20 text-orange-500">Pendiente</Badge>
      default:
        return null
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "buyer":
        return <Badge className="bg-blue-500/20 text-blue-500">Comprador</Badge>
      case "seller":
        return <Badge className="bg-purple-500/20 text-purple-500">Vendedor</Badge>
      case "admin":
        return <Badge className="bg-red-500/20 text-red-500">Administrador</Badge>
      default:
        return null
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </Button>
            <Button className="bg-primary hover:bg-accent">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva Funcionalidad
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+12%</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.products.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+8%</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.orders.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+15%</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+10%</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contenido principal */}
        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="categories">Categorías</TabsTrigger>
            <TabsTrigger value="features">Funcionalidades</TabsTrigger>
          </TabsList>

          {/* Pestaña de Productos */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Productos Recientes</CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Buscar productos..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button>
                      <Link href="/admin/productos/nuevo" className="flex items-center">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Agregar Producto
                      </Link>
                    </Button>
                  </div>
                </div>
                <CardDescription>Gestiona los productos de la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Producto
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Precio
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Categoría
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Vendedor
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {recentProducts.map((product) => (
                        <tr key={product.id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{product.id}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{product.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">${product.price.toLocaleString()}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{product.category}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{getStatusBadge(product.status)}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{product.seller}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{product.date}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Usuarios */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Usuarios Recientes</CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Buscar usuarios..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button>
                      <Link href="/admin/usuarios/nuevo" className="flex items-center">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Agregar Usuario
                      </Link>
                    </Button>
                  </div>
                </div>
                <CardDescription>Gestiona los usuarios de la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Rol
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {recentUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{user.id}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{user.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{user.email}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{getRoleBadge(user.role)}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{getStatusBadge(user.status)}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{user.date}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Categorías */}
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Categorías</CardTitle>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Categoría
                  </Button>
                </div>
                <CardDescription>Gestiona las categorías de productos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["Electrónica", "Ropa", "Hogar", "Deportes", "Belleza", "Alimentos"].map((category, index) => (
                    <Card key={index} className="flex justify-between items-center p-4">
                      <div>
                        <h3 className="font-medium">{category}</h3>
                        <p className="text-sm text-muted-foreground">{(index + 1) * 123} productos</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Funcionalidades */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Funcionalidades del Sistema</CardTitle>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Funcionalidad
                  </Button>
                </div>
                <CardDescription>Gestiona las funcionalidades disponibles en la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Chat entre compradores y vendedores", status: "active" },
                    { name: "Sistema de reseñas y calificaciones", status: "active" },
                    { name: "Integración con Mercado Pago", status: "active" },
                    { name: "Sistema de envíos", status: "active" },
                    { name: "Notificaciones por email", status: "inactive" },
                    { name: "Aplicación móvil", status: "pending" },
                    { name: "Sistema de descuentos y cupones", status: "pending" },
                    { name: "Programa de fidelización", status: "inactive" },
                  ].map((feature, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">{feature.name}</h3>
                        <div className="mt-1">{getStatusBadge(feature.status)}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Configurar
                        </Button>
                        <Button variant={feature.status === "active" ? "destructive" : "default"} size="sm">
                          {feature.status === "active" ? "Desactivar" : "Activar"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
