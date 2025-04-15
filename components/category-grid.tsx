import Link from "next/link"
import { Smartphone, Home, ShoppingBag } from "lucide-react"

export default function CategoryGrid() {
  const categories = [
    {
      id: "electronica",
      name: "Electrónica",
      icon: <Smartphone className="h-8 w-8 mb-2" />,
      color: "bg-blue-500",
      href: "/categoria/electronica",
    },
    {
      id: "hogar",
      name: "Hogar",
      icon: <Home className="h-8 w-8 mb-2" />,
      color: "bg-green-500",
      href: "/categoria/hogar",
    },
    {
      id: "ropa",
      name: "Ropa",
      icon: <ShoppingBag className="h-8 w-8 mb-2" />,
      color: "bg-purple-500",
      href: "/categoria/ropa",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link key={category.id} href={category.href}>
          <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all">
            <div className={`${category.color} text-white p-3 rounded-full`}>{category.icon}</div>
            <h3 className="text-lg font-medium mt-2">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
