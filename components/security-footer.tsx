import Link from "next/link"
import { Shield, Lock } from "lucide-react"

export default function SecurityFooter() {
  return (
    <div className="border-t border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm">Sitio seguro y protegido</span>
            <Lock className="h-5 w-5 text-primary mx-2" />
            <span className="text-sm">Encriptación SSL</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <img src="/placeholder.svg?height=30&width=60&text=Visa" alt="Visa" className="h-8" />
            <img src="/placeholder.svg?height=30&width=60&text=Mastercard" alt="Mastercard" className="h-8" />
            <img src="/placeholder.svg?height=30&width=60&text=Amex" alt="American Express" className="h-8" />
            <img src="/placeholder.svg?height=30&width=100&text=Mercado Pago" alt="Mercado Pago" className="h-8" />
            <img src="/placeholder.svg?height=30&width=60&text=Transferencia" alt="Transferencia" className="h-8" />
          </div>
        </div>

        <div className="text-center mt-4 text-xs text-muted-foreground">
          <p>
            Todas las transacciones son procesadas de forma segura. La información de pago nunca se almacena en nuestros
            servidores.
          </p>
          <p className="mt-1">
            <Link href="/politicas/privacidad" className="hover:underline">
              Política de Privacidad
            </Link>{" "}
            |
            <Link href="/politicas/terminos" className="hover:underline ml-2">
              Términos y Condiciones
            </Link>{" "}
            |
            <Link href="/politicas/cookies" className="hover:underline ml-2">
              Política de Cookies
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
