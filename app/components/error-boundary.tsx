"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Actualizar el estado para que el siguiente renderizado muestre la UI alternativa
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error capturado:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] flex flex-col items-center justify-center p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Algo salió mal</h2>
          <p className="text-gray-600 mb-4">
            Ha ocurrido un error al cargar esta sección. Por favor, intenta recargar la página.
          </p>
          <Button onClick={() => window.location.reload()} className="bg-primary hover:bg-accent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Recargar página
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
