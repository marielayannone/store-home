"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BarChart3, Package, ShoppingCart, Users, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import VendorLayout from "@/components/vendor-layout"
import { getVendorStats, getRecentOrders, getPopularProducts } from "@/lib/vendor"

interface Stats {
  sales: {
    total: number
    percentage: number
    trend: "up" | "down"
  }
  orders: {
    total: number
    percentage: number
    trend: "up" | "down"
  }
  customers: {
    total: number
    percentage: number
    trend: "up" | "down"
  }
  products: {
    total: number
    active: number
  }
}

interface Order {
  id: string
  customer: string
  date: string
  amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
}

interface Product {
  id: string
  name: string
  price: number
  sales: number
  stock: number
  image: string
}

export default function VendorDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [popularProducts, setPopularProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("week")

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const statsData = await getVendorStats(timeframe)
        const ordersData = await getRecentOrders()
        const productsData = await getPopularProducts()

        setStats(statsData)
        setRecentOrders(ordersData)
        setPopularProducts(productsData)
      } catch (error) {
        console.error("Error fetching vendor data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [timeframe])

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <VendorLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Vendedor</h1>
          <Tabs value={timeframe} onValueChange={setTimeframe} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="month">Mes</TabsTrigger>
              <TabsTrigger value="year">Año</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-foreground">Ventas Totales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">${stats?.sales.total.toLocaleString("es-AR")}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  {stats?.sales.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stats?.sales.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {stats?.sales.percentage}%
                  </span>
                  <span className="text-muted-foreground ml-1">desde el período anterior</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.orders.total}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  {stats?.orders.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stats?.orders.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {stats?.orders.percentage}%
                  </span>
                  <span className="text-muted-foreground ml-1">desde el período anterior</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.customers.total}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  {stats?.customers.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stats?.customers.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {stats?.customers.percentage}%
                  </span>
                  <span className="text-muted-foreground ml-1">desde el período anterior</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Productos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.products.total}</div>
                <p className="text-xs text-muted-foreground mt-1">{stats?.products.active} productos activos</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Pedidos Recientes</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-border text-foreground hover:text-primary hover:border-primary"
                >
                  <Link href="/vendedor/pedidos">Ver todos</Link>
                </Button>
              </div>
              <CardDescription>Los últimos pedidos recibidos en tu tienda</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center animate-pulse">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">${order.amount.toLocaleString("es-AR")}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status === "pending" && "Pendiente"}
                          {order.status === "processing" && "Procesando"}
                          {order.status === "shipped" && "Enviado"}
                          {order.status === "delivered" && "Entregado"}
                          {order.status === "cancelled" && "Cancelado"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Productos Populares</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/vendedor/productos">Ver todos</Link>
                </Button>
              </div>
              <CardDescription>Los productos más vendidos de tu tienda</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 animate-pulse">
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {popularProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4">
                      <img
                        src={product.image || "/placeholder.svg?height=48&width=48"}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-medium line-clamp-1">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} vendidos</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${product.price.toLocaleString("es-AR")}</p>
                        <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rendimiento de Ventas</CardTitle>
            <CardDescription>Análisis de ventas para el período seleccionado</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            {isLoading ? (
              <div className="w-full h-full bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-muted-foreground">Gráfico de ventas para el período seleccionado</p>
                <p className="text-sm text-muted-foreground mt-2">
                  (En una implementación real, aquí se mostraría un gráfico de ventas)
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  )
}
