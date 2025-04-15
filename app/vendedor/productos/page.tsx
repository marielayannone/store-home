"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Plus, Edit, Trash2, ArrowUpDown, MoreHorizontal, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import VendorLayout from "@/components/vendor-layout"
import { getVendorProducts, deleteProduct } from "@/lib/vendor"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  status: "active" | "inactive" | "draft"
  sales: number
  image: string
  createdAt: string
}

export default function VendorProducts() {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const data = await getVendorProducts()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los productos",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [toast])

  useEffect(() => {
    // Filtrar productos
    let result = [...products]

    // Filtrar por búsqueda
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filtrar por estado
    if (statusFilter !== "all") {
      result = result.filter((product) => product.status === statusFilter)
    }

    // Filtrar por categoría
    if (categoryFilter !== "all") {
      result = result.filter((product) => product.category === categoryFilter)
    }

    // Ordenar
    result.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "price":
          comparison = a.price - b.price
          break
        case "stock":
          comparison = a.stock - b.stock
          break
        case "sales":
          comparison = a.sales - b.sales
          break
        case "date":
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        default:
          comparison = 0
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    setFilteredProducts(result)
  }, [products, searchQuery, statusFilter, categoryFilter, sortBy, sortOrder])

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await deleteProduct(id)
        setProducts(products.filter((product) => product.id !== id))
        toast({
          title: "Producto eliminado",
          description: "El producto ha sido eliminado correctamente",
        })
      } catch (error) {
        console.error("Error deleting product:", error)
        toast({
          title: "Error",
          description: "No se pudo eliminar el producto",
          variant: "destructive",
        })
      }
    }
  }

  // Cambiar los colores de los badges de estado
  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/20">Activo</Badge>
      case "inactive":
        return <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20">Inactivo</Badge>
      case "draft":
        return <Badge className="bg-gray-500/20 text-gray-400 hover:bg-gray-500/20">Borrador</Badge>
      default:
        return null
    }
  }

  // Obtener categorías únicas para el filtro
  const categories = [...new Set(products.map((product) => product.category))]

  return (
    <VendorLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mis Productos</h1>
          {/* Cambiar el color del botón de nuevo producto */}
          <Button asChild className="bg-primary hover:bg-accent">
            <Link href="/vendedor/productos/nuevo">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gestión de Productos</CardTitle>
            <CardDescription>Administra todos los productos de tu tienda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Buscar productos..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                      <SelectItem value="draft">Borrador</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Imagen</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="p-0 font-medium"
                          onClick={() => {
                            setSortBy("name")
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                          }}
                        >
                          Producto
                          {sortBy === "name" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="p-0 font-medium"
                          onClick={() => {
                            setSortBy("price")
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                          }}
                        >
                          Precio
                          {sortBy === "price" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="p-0 font-medium"
                          onClick={() => {
                            setSortBy("stock")
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                          }}
                        >
                          Stock
                          {sortBy === "stock" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </Button>
                      </TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="p-0 font-medium"
                          onClick={() => {
                            setSortBy("sales")
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                          }}
                        >
                          Ventas
                          {sortBy === "sales" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      [...Array(5)].map((_, i) => (
                        <TableRow key={i} className="animate-pulse">
                          <TableCell>
                            <div className="w-10 h-10 bg-gray-200 rounded"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 bg-gray-200 rounded w-12"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 bg-gray-200 rounded w-12"></div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="h-8 bg-gray-200 rounded w-8 ml-auto"></div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          No se encontraron productos
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <img
                              src={product.image || "/placeholder.svg?height=40&width=40"}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-md"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>${product.price.toLocaleString("es-AR")}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{getStatusBadge(product.status)}</TableCell>
                          <TableCell>{product.sales}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link href={`/producto/${product.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Ver producto
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/vendedor/productos/editar/${product.id}`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  )
}
