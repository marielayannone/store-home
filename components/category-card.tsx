import Link from "next/link"
import { Smartphone, Home, Shirt, Dumbbell, Utensils, Sparkles } from "lucide-react"
import type { JSX } from "react"

interface CategoryCardProps {
  category: {
    id: number
    name: string
    icon: string
    count: number
  }
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { id, name, icon, count } = category

  const getIcon = (): JSX.Element => {
    const iconProps = { className: "h-6 w-6 text-primary" }

    switch (icon) {
      case "smartphone":
        return <Smartphone {...iconProps} />
      case "home":
        return <Home {...iconProps} />
      case "shirt":
        return <Shirt {...iconProps} />
      case "dumbbell":
        return <Dumbbell {...iconProps} />
      case "utensils":
        return <Utensils {...iconProps} />
      case "sparkles":
        return <Sparkles {...iconProps} />
      default:
        return <Smartphone {...iconProps} />
    }
  }

  return (
    <Link href={`/categoria/${id}`}>
      <div className="bg-card rounded-lg border border-border p-4 text-center hover:shadow-md hover:shadow-primary/20 transition-shadow duration-300">
        <div className="flex justify-center mb-3">{getIcon()}</div>
        <h3 className="font-medium text-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">{count} productos</p>
      </div>
    </Link>
  )
}
