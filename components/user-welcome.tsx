"use client"

import { useState, useEffect } from "react"
import { User } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

export default function UserWelcome() {
  const [userName, setUserName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = getCurrentUser()
        if (user) {
          setUserName(user.firstName)
        }
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  if (isLoading) {
    return <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
  }

  if (!userName) {
    return null
  }

  return (
    <div className="flex items-center text-sm">
      <User className="h-4 w-4 mr-1 text-primary" />
      <span>
        Hola, <span className="font-medium">{userName}</span>
      </span>
    </div>
  )
}
