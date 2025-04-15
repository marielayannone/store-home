"use client"

import { useState, useEffect } from "react"
import { Search, UserPlus, UserX, UserCheck, MoreHorizontal, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AdminLayout from "@/components/admin-layout"
import { useToast } from "@/hooks/use-toast"

// Datos de ejemplo para usuarios
const mockUsers = [
  {
    id: "1",
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan@example.com",
    dni: "12345678",
    role: "buyer",
    status: "active",
    createdAt: "2023-01-15",
    verificationStatus: "verified",
    avatar: "/placeholder.svg?height=40&width=40&text=JP",
  },
  {
    id: "2",
    firstName: "María",
    lastName: "González",
    email: "maria@example.com",
    dni: "23456789",
    role: "seller",
    status: "active",
    createdAt: "2023-02-20",
    verificationStatus: "verified",
    avatar: "/placeholder.svg?height=40&width=40&text=MG",
  },
  {
    id: "3",
    firstName: "Carlos",
    lastName: "Rodríguez",
    email: "carlos@example.com",
    dni: "34567890",
    role: "buyer",
    status: "blocked",
    createdAt: "2023-03-10",
    verificationStatus: "verified",
    avatar: "/placeholder.svg?height=40&width=40&text=CR",
  },
  {
    id: "4",
    firstName: "Ana",
    lastName: "Martínez",
    email: "ana@example.com",
    dni: "45678901",
    role: "seller",
    status: "active",
    createdAt: "2023-04-05",
    verificationStatus: "pending",
    avatar: "/placeholder.svg?height=40&width=40&text=AM",
  },
  {
    id: "5",
    firstName: "Luis",
    lastName: "Sánchez",
    email: "luis@example.com",
    dni: "56789012",
    role: "admin",
    status: "active",
    createdAt: "2023-05-15",
    verificationStatus: "not_required",
    avatar: "/placeholder.svg?height=40&width=40&text=LS",
  },
]

export default function UsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState(mockUsers)
  const [filteredUsers, setFilteredUsers] = useState(mockUsers)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showBlockDialog, setShowBlockDialog] = useState(false)
  const [showUnblockDialog, setShowUnblockDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)

  useEffect(() => {
    // Simulación de carga de datos
    const loadData = async () => {
      setIsLoading(true)
      // En una implementación real, aquí se cargarían los datos de los usuarios
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }

    loadData()
  }, [])

  useEffect(() => {
    // Filtrar usuarios
    let result = [...users]

    // Filtrar por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (user) =>
          user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.dni.includes(query),
      )
    }

    // Filtrar por rol
    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter)
    }

    // Filtrar por estado
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter)
    }

    setFilteredUsers(result)
  }, [users, searchQuery, roleFilter, statusFilter])

  const handleBlockUser = () => {
    if (!selectedUser) return

    // En una implementación real, aquí se bloquearía al usuario en la base de datos
    setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, status: "blocked" } : user)))

    toast({
      title: "Usuario bloqueado",
      description: `${selectedUser.firstName} ${selectedUser.lastName} ha sido bloqueado correctamente.`,
    })

    setShowBlockDialog(false)
    setSelectedUser(null)
  }

  const handleUnblockUser = () => {
    if (!selectedUser) return

    // En una implementación real, aquí se desbloquearía al usuario en la base de datos
    setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, status: "active" } : user)))

    toast({
      title: "Usuario desbloqueado",
      description: `${selectedUser.firstName} ${selectedUser.lastName} ha sido desbloqueado correctamente.`,
    })

    setShowUnblockDialog(false)
    setSelectedUser(null)
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-500">Activo</Badge>
      case "blocked":
        return <Badge className="bg-red-500/20 text-red-500">Bloqueado</Badge>
      default:
        return null
    }
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500/20 text-green-500">Verificado</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-500">Pendiente</Badge>
      case "not_required":
        return <Badge className="bg-gray-500/20 text-gray-500">No requerido</Badge>
      default:
        return null
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
          <Button className="bg-primary hover:bg-accent">
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usuarios</CardTitle>
            <CardDescription>Administra los usuarios de la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Buscar por nombre, email o DNI..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los roles</SelectItem>
                      <SelectItem value="buyer">Comprador</SelectItem>
                      <SelectItem value="seller">Vendedor</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="blocked">Bloqueado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Usuario</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>DNI</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Verificación</TableHead>
                      <TableHead>Fecha de registro</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      [...Array(5)].map((_, i) => (
                        <TableRow key={i} className="animate-pulse">
                          <TableCell>
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="h-8 bg-gray-200 rounded w-8 ml-auto"></div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                          No se encontraron usuarios
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Avatar>
                              <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                              <AvatarFallback>
                                {user.firstName.charAt(0)}
                                {user.lastName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="font-medium">
                            {user.firstName} {user.lastName}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.dni}</TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>{getVerificationBadge(user.verificationStatus)}</TableCell>
                          <TableCell>{user.createdAt}</TableCell>
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
                                <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                                <DropdownMenuItem>Editar usuario</DropdownMenuItem>
                                {user.status === "active" ? (
                                  <DropdownMenuItem
                                    className="text-red-500"
                                    onClick={() => {
                                      setSelectedUser(user)
                                      setShowBlockDialog(true)
                                    }}
                                  >
                                    <UserX className="mr-2 h-4 w-4" />
                                    Bloquear usuario
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem
                                    className="text-green-500"
                                    onClick={() => {
                                      setSelectedUser(user)
                                      setShowUnblockDialog(true)
                                    }}
                                  >
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    Desbloquear usuario
                                  </DropdownMenuItem>
                                )}
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

      {/* Diálogo de confirmación para bloquear usuario */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bloquear usuario</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas bloquear a este usuario? El usuario no podrá acceder a la plataforma mientras
              esté bloqueado.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={selectedUser.avatar} alt={`${selectedUser.firstName} ${selectedUser.lastName}`} />
                  <AvatarFallback>
                    {selectedUser.firstName.charAt(0)}
                    {selectedUser.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
              <div className="mt-4 flex items-start p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Advertencia</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Esta acción bloqueará al usuario y no podrá iniciar sesión ni realizar acciones en la plataforma.
                    Los administradores pueden desbloquear al usuario en cualquier momento.
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleBlockUser}>
              Bloquear usuario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para desbloquear usuario */}
      <Dialog open={showUnblockDialog} onOpenChange={setShowUnblockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Desbloquear usuario</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas desbloquear a este usuario? El usuario podrá volver a acceder a la plataforma.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={selectedUser.avatar} alt={`${selectedUser.firstName} ${selectedUser.lastName}`} />
                  <AvatarFallback>
                    {selectedUser.firstName.charAt(0)}
                    {selectedUser.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUnblockDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-accent" onClick={handleUnblockUser}>
              Desbloquear usuario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
