"use client"

import { useState } from "react"
import { PlusCircle, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminLayout from "@/components/admin-layout"
import { useToast } from "@/hooks/use-toast"

interface Feature {
  id: string
  name: string
  description: string
  status: "active" | "inactive" | "pending"
  type: "core" | "addon" | "experimental"
}

export default function FeaturesPage() {
  const { toast } = useToast()
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: "1",
      name: "Chat entre compradores y vendedores",
      description: "Sistema de mensajería en tiempo real entre compradores y vendedores",
      status: "active",
      type: "core",
    },
    {
      id: "2",
      name: "Sistema de reseñas y calificaciones",
      description: "Permite a los usuarios calificar productos y vendedores",
      status: "active",
      type: "core",
    },
    {
      id: "3",
      name: "Integración con Mercado Pago",
      description: "Procesamiento de pagos a través de Mercado Pago",
      status: "active",
      type: "core",
    },
    {
      id: "4",
      name: "Sistema de envíos",
      description: "Cálculo de costos de envío y seguimiento de pedidos",
      status: "active",
      type: "core",
    },
    {
      id: "5",
      name: "Notificaciones por email",
      description: "Envío de notificaciones por email a usuarios",
      status: "inactive",
      type: "addon",
    },
    {
      id: "6",
      name: "Aplicación móvil",
      description: "Versión móvil de la plataforma",
      status: "pending",
      type: "addon",
    },
    {
      id: "7",
      name: "Sistema de descuentos y cupones",
      description: "Gestión de descuentos y cupones para productos",
      status: "pending",
      type: "addon",
    },
    {
      id: "8",
      name: "Programa de fidelización",
      description: "Sistema de puntos y recompensas para usuarios frecuentes",
      status: "inactive",
      type: "experimental",
    },
  ])

  const [newFeature, setNewFeature] = useState<Omit<Feature, "id">>({
    name: "",
    description: "",
    status: "inactive",
    type: "addon",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleToggleFeature = (id: string) => {
    setFeatures(
      features.map((feature) => {
        if (feature.id === id) {
          const newStatus = feature.status === "active" ? "inactive" : "active"
          return { ...feature, status: newStatus }
        }
        return feature
      }),
    )

    toast({
      title: "Funcionalidad actualizada",
      description: "El estado de la funcionalidad ha sido actualizado correctamente",
    })
  }

  const handleAddFeature = () => {
    if (!newFeature.name.trim()) {
      toast({
        title: "Error",
        description: "El nombre de la funcionalidad es obligatorio",
        variant: "destructive",
      })
      return
    }

    const id = (features.length + 1).toString()
    setFeatures([...features, { ...newFeature, id }])
    setNewFeature({
      name: "",
      description: "",
      status: "inactive",
      type: "addon",
    })
    setIsDialogOpen(false)

    toast({
      title: "Funcionalidad agregada",
      description: "La funcionalidad ha sido agregada correctamente",
    })
  }

  const getStatusBadge = (status: Feature["status"]) => {
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

  const getTypeBadge = (type: Feature["type"]) => {
    switch (type) {
      case "core":
        return <Badge className="bg-blue-500/20 text-blue-500">Core</Badge>
      case "addon":
        return <Badge className="bg-purple-500/20 text-purple-500">Add-on</Badge>
      case "experimental":
        return <Badge className="bg-yellow-500/20 text-yellow-500">Experimental</Badge>
      default:
        return null
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de Funcionalidades</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-accent">
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Funcionalidad
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nueva Funcionalidad</DialogTitle>
                <DialogDescription>
                  Completa los detalles para agregar una nueva funcionalidad al sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={newFeature.name}
                    onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                    placeholder="Nombre de la funcionalidad"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={newFeature.description}
                    onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                    placeholder="Descripción de la funcionalidad"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select
                    value={newFeature.type}
                    onValueChange={(value) => setNewFeature({ ...newFeature, type: value as Feature["type"] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="core">Core</SelectItem>
                      <SelectItem value="addon">Add-on</SelectItem>
                      <SelectItem value="experimental">Experimental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={newFeature.status}
                    onValueChange={(value) => setNewFeature({ ...newFeature, status: value as Feature["status"] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddFeature}>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Funcionalidades del Sistema</CardTitle>
            <CardDescription>
              Gestiona las funcionalidades disponibles en la plataforma. Activa o desactiva funciones según sea
              necesario.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex flex-col md:flex-row md:justify-between md:items-center p-4 border rounded-md gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{feature.name}</h3>
                      {getTypeBadge(feature.type)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    <div className="mt-2">{getStatusBadge(feature.status)}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`toggle-${feature.id}`}
                        checked={feature.status === "active"}
                        onCheckedChange={() => handleToggleFeature(feature.id)}
                      />
                      <Label htmlFor={`toggle-${feature.id}`}>
                        {feature.status === "active" ? "Activado" : "Desactivado"}
                      </Label>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
