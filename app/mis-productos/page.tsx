"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Plus, Edit, Trash2, ArrowUpDown, MoreHorizontal, Eye, AlertCircle } from "lucide-react"
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
import { useToast } from "@/hooks/use-toast"
import { getProducts, deleteProduct, type Product as ProductType } from "@/lib/supabase"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function MyProductsPage() {
  const { toast } = useToast()
  const [products, setProducts] = useState<ProductType[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("created_at")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [totalCount, setTotalCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [statusFilter, categoryFilter, sortBy, sortOrder])

  const fetchProducts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const options: any = {
        sortBy,
        sortOrder,
      }

      if (statusFilter !== "all") {
        options.status = statusFilter
      }

      if (categoryFilter !== "all") {
        options.category = categoryFilter
      }

      const { data, count } = await getProducts(options)

      if (data) {
        setProducts(data)
        setFilteredProducts(data)
        setTotalCount(count || 0)
      }
    } catch (err) {
      console.error("Error fetching products:", err)
      setError("No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.")
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Filtrar productos por búsqueda
    if (searchQuery) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [products, searchQuery])

  const confirmDeleteProduct = (id: string) => {
    setProductToDelete(id)
  }

  const handleDeleteProduct = async () => {
    if (!productToDelete) return

    setIsDeleting(true)

    try {
      await deleteProduct(productToDelete)

      setProducts(products.filter((product) => product.id !== productToDelete))

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
    } finally {
      setIsDeleting(false)
      setProductToDelete(null)
    }
  }

  // Cambiar los colores de los badges de estado
  const getStatusBadge = (status: ProductType["status"]) => {
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

  const getConditionBadge = (condition: ProductType["condition"]) => {
    switch (condition) {
      case "new":
        return <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/20">Nuevo</Badge>
      case "used":
        return <Badge className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/20">Usado</Badge>
      default:
        return null
    }
  }

  // Obtener categorías únicas para el filtro
  const categories = [...new Set(products.map((product) => product.category))]

  const getCategoryName = (categoryKey: string) => {
    const categoryMap = {
      electronics: "Electrónica",
      clothing: "Ropa",
      home: "Hogar",
      sports: "Deportes",
      beauty: "Belleza",
      food: "Alimentos",
    }
    return categoryMap[categoryKey as keyof typeof categoryMap] || categoryKey
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mis Productos</h1>
          <Button asChild className="bg-primary hover:bg-accent">
            <Link href="/vender">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gestión de Productos</CardTitle>
            <CardDescription>Administra todos tus productos publicados</CardDescription>
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
                          {getCategoryName(category)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

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
                      <TableHead>Estado</TableHead>
                      <TableHead>Condición</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="p-0 font-medium"
                          onClick={() => {
                            setSortBy("sales_count")
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                          }}
                        >
                          Ventas
                          {sortBy === "sales_count" && <ArrowUpDown className="ml-2 h-4 w-4" />}
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
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
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
                              src={product.product_images?.[0]?.url || "/placeholder.svg?height=40&width=40"}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-md"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>${product.price.toLocaleString("es-AR")}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>{getStatusBadge(product.status)}</TableCell>
                          <TableCell>{getConditionBadge(product.condition)}</TableCell>
                          <TableCell>{product.sales_count || 0}</TableCell>
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
                                  <Link href={`/vender/editar/${product.id}`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => confirmDeleteProduct(product.id)}
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

      <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
