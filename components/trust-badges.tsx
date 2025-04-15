import { Shield, Truck, CreditCard, RotateCcw } from "lucide-react"

export default function TrustBadges() {
  const badges = [
    {
      icon: <Shield className="h-8 w-8 text-orange-500" />,
      title: "Compra Segura",
      description: "Protegemos tus datos y transacciones",
    },
    {
      icon: <Truck className="h-8 w-8 text-orange-500" />,
      title: "Envío a Todo el País",
      description: "Recibe tus productos donde estés",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-orange-500" />,
      title: "Múltiples Formas de Pago",
      description: "Elige cómo quieres pagar",
    },
    {
      icon: <RotateCcw className="h-8 w-8 text-orange-500" />,
      title: "Devoluciones Sin Complicaciones",
      description: "30 días para cambios y devoluciones",
    },
  ]

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">¿Por qué elegir STORE HOME?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4">
            <div className="mb-4">{badge.icon}</div>
            <h3 className="text-lg font-medium mb-2">{badge.title}</h3>
            <p className="text-gray-600">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
