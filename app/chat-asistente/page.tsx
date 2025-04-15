"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Bot, User, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Message {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Respuestas predefinidas del bot para simular la interacción
const botResponses: Record<string, string> = {
  default: "Gracias por tu mensaje. ¿En qué más puedo ayudarte?",
  greeting: "¡Hola! Soy el asistente virtual de Store Home. ¿En qué puedo ayudarte hoy?",
  products:
    "Tenemos una amplia variedad de productos en diferentes categorías como electrónica, hogar, ropa, deportes, belleza y alimentos. ¿Hay alguna categoría específica que te interese?",
  shipping:
    "Ofrecemos envíos a todo el país. El envío estándar tarda entre 3-5 días hábiles, y también tenemos opciones de envío express de 24-48 horas. Los envíos son gratuitos en compras superiores a cierto monto, dependiendo de tu ubicación.",
  payment:
    "Aceptamos múltiples métodos de pago: tarjetas de crédito (hasta 12 cuotas sin interés), tarjetas de débito, transferencia bancaria (con 5% de descuento) y billeteras virtuales como Mercado Pago.",
  returns:
    "Nuestra política de devoluciones te permite devolver productos dentro de los 10 días posteriores a la recepción si no estás satisfecho. El producto debe estar en su empaque original y sin señales de uso.",
  contact:
    "Puedes contactarnos por teléfono al 0800-123-4567, por email a info@storehome.com.ar o a través de nuestras redes sociales. Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00.",
  help: "Puedo ayudarte con información sobre productos, envíos, métodos de pago, devoluciones, seguimiento de pedidos y más. ¿Sobre qué tema necesitas ayuda?",
}

export default function ChatAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "¡Hola! Soy el asistente virtual de Store Home. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("hola") || lowerMessage.includes("buenos días") || lowerMessage.includes("buenas")) {
      return botResponses.greeting
    } else if (
      lowerMessage.includes("producto") ||
      lowerMessage.includes("artículo") ||
      lowerMessage.includes("catálogo")
    ) {
      return botResponses.products
    } else if (
      lowerMessage.includes("envío") ||
      lowerMessage.includes("entrega") ||
      lowerMessage.includes("shipping")
    ) {
      return botResponses.shipping
    } else if (lowerMessage.includes("pago") || lowerMessage.includes("tarjeta") || lowerMessage.includes("cuota")) {
      return botResponses.payment
    } else if (
      lowerMessage.includes("devolución") ||
      lowerMessage.includes("devolver") ||
      lowerMessage.includes("cambio")
    ) {
      return botResponses.returns
    } else if (
      lowerMessage.includes("contacto") ||
      lowerMessage.includes("teléfono") ||
      lowerMessage.includes("email")
    ) {
      return botResponses.contact
    } else if (lowerMessage.includes("ayuda") || lowerMessage.includes("help") || lowerMessage.includes("asistencia")) {
      return botResponses.help
    } else {
      return botResponses.default
    }
  }

  // Corregir la función handleSendMessage para manejar mejor los mensajes y el estado
  const handleSendMessage = (e: React.FormEvent | null, customMessage?: string) => {
    if (e) e.preventDefault()

    // Usar el mensaje personalizado si se proporciona, o el del input
    const messageText = customMessage || newMessage

    if (messageText.trim() === "" || isTyping) return

    const userMessage: Message = {
      id: Date.now(), // Usar timestamp para evitar colisiones de ID
      content: messageText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    if (!customMessage) setNewMessage("") // Solo limpiar si es un mensaje del input
    setIsTyping(true)

    // Simulate bot thinking and typing
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1, // Usar timestamp + 1 para evitar colisiones
        content: getBotResponse(messageText),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleReset = () => {
    setMessages([
      {
        id: 1,
        content: "¡Hola! Soy el asistente virtual de Store Home. ¿En qué puedo ayudarte hoy?",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Asistente Virtual</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2 text-primary" />
            Chat con nuestro asistente
          </CardTitle>
          <CardDescription>
            Nuestro asistente virtual está disponible 24/7 para responder tus consultas sobre productos, envíos, pagos y
            más.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Chat messages */}
            <div className="p-4 h-[60vh] overflow-y-auto bg-background">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user" ? "bg-primary text-white" : "bg-card border border-border"
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        {message.sender === "bot" ? (
                          <Bot className="h-4 w-4 mr-1 text-primary" />
                        ) : (
                          <User className="h-4 w-4 mr-1 text-primary-foreground/80" />
                        )}
                        <span
                          className={`text-xs ${
                            message.sender === "user" ? "text-primary-foreground/80" : "text-muted-foreground"
                          }`}
                        >
                          {message.sender === "bot" ? "Asistente" : "Tú"} • {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-card border border-border">
                      <div className="flex items-center">
                        <Bot className="h-4 w-4 mr-1 text-primary" />
                        <span className="text-xs text-muted-foreground">Asistente está escribiendo...</span>
                      </div>
                      <div className="flex space-x-1 mt-2">
                        <div
                          className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat input */}
            <div className="border-t border-border p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Escribe tu mensaje aquí..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value.slice(0, 500))} // Limitar a 500 caracteres
                  className="flex-1"
                  disabled={isTyping}
                  maxLength={500} // Añadir maxLength como restricción adicional
                  aria-label="Mensaje para el asistente virtual"
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-accent"
                  disabled={isTyping}
                  aria-label="Enviar mensaje"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  title="Reiniciar conversación"
                  aria-label="Reiniciar conversación"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Preguntas frecuentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-2 px-3"
                onClick={() => handleSendMessage(null, "¿Qué productos ofrecen?")}
                disabled={isTyping}
              >
                ¿Qué productos ofrecen?
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-2 px-3"
                onClick={() => handleSendMessage(null, "¿Cómo funcionan los envíos?")}
                disabled={isTyping}
              >
                ¿Cómo funcionan los envíos?
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-2 px-3"
                onClick={() => handleSendMessage(null, "¿Qué métodos de pago aceptan?")}
                disabled={isTyping}
              >
                ¿Qué métodos de pago aceptan?
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-2 px-3"
                onClick={() => handleSendMessage(null, "¿Cómo puedo devolver un producto?")}
                disabled={isTyping}
              >
                ¿Cómo puedo devolver un producto?
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contacto directo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Si prefieres hablar con un representante humano, puedes contactarnos por estos medios:
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="bg-primary/20 p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-sm text-gray-500">0800-123-4567 (Lun-Vie 9:00-18:00)</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-primary/20 p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-500">info@storehome.com.ar</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-primary/20 p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm text-gray-500">+54 11 1234-5678</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
