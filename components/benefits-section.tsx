import { Shield, Truck, CreditCard, Clock, Award } from "lucide-react"

export default function BenefitsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 py-6">
      <div className="flex flex-col items-center text-center p-4 bg-card border border-border rounded-lg">
        <Shield className="h-10 w-10 text-primary mb-3" />
        <h3 className="font-medium mb-1">Compra Protegida</h3>
        <p className="text-sm text-muted-foreground">Recibe el producto que esperabas o te devolvemos tu dinero</p>
      </div>

      <div className="flex flex-col items-center text-center p-4 bg-card border border-border rounded-lg">
        <Truck className="h-10 w-10 text-primary mb-3" />
        <h3 className="font-medium mb-1">Envío Gratis</h3>
        <p className="text-sm text-muted-foreground">En miles de productos a todo el país</p>
      </div>

      <div className="flex flex-col items-center text-center p-4 bg-card border border-border rounded-lg">
        <CreditCard className="h-10 w-10 text-primary mb-3" />
        <h3 className="font-medium mb-1">Cuotas Sin Interés</h3>
        <p className="text-sm text-muted-foreground">Hasta 12 cuotas sin interés con tarjetas seleccionadas</p>
      </div>

      <div className="flex flex-col items-center text-center p-4 bg-card border border-border rounded-lg">
        <Clock className="h-10 w-10 text-primary mb-3" />
        <h3 className="font-medium mb-1">Entregas Rápidas</h3>
        <p className="text-sm text-muted-foreground">Recibe tus compras en 24-48 horas</p>
      </div>

      <div className="flex flex-col items-center text-center p-4 bg-card border border-border rounded-lg">
        <Award className="h-10 w-10 text-primary mb-3" />
        <h3 className="font-medium mb-1">Vendedores Verificados</h3>
        <p className="text-sm text-muted-foreground">Compra con confianza a vendedores de calidad</p>
      </div>
    </div>
  )
}
