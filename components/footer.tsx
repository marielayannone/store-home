import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              STORE<span className="text-orange-500">HOME</span>
            </h3>
            <p className="mb-4">El marketplace más grande de Argentina. Compra y vende productos de manera segura.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categoria/electronica" className="hover:text-orange-500">
                  Electrónica
                </Link>
              </li>
              <li>
                <Link href="/categoria/ropa" className="hover:text-orange-500">
                  Ropa
                </Link>
              </li>
              <li>
                <Link href="/categoria/hogar" className="hover:text-orange-500">
                  Hogar
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="hover:text-orange-500">
                  Ver todas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre-nosotros" className="hover:text-orange-500">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-orange-500">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-orange-500">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/ayuda" className="hover:text-orange-500">
                  Centro de Ayuda
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contacto@storehome.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+54 11 1234-5678</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} STORE HOME. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
