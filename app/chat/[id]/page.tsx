"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Message {
  id: number
  content: string
  sender: "user" | "seller"
  timestamp: Date
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const sellerId = params.id
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hola, ¿en qué puedo ayudarte?",
      sender: "seller",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    const userMessage: Message = {
      id: messages.length + 1,
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate seller response after 1 second
    setTimeout(() => {
      const sellerMessage: Message = {
        id: messages.length + 2,
        content: "Gracias por tu mensaje. Te responderé a la brevedad.",
        sender: "seller",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, sellerMessage])
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Chat header */}
        <div className="border-b border-gray-200 p-4 flex items-center">
          <Link href="/mensajes" className="mr-2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Seller"
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <h2 className="font-medium">TecnoStore</h2>
              <p className="text-xs text-gray-500">En línea</p>
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="p-4 h-[60vh] overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user" ? "bg-primary text-white" : "bg-card border border-border"
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`text-xs mt-1 text-right ${
                      message.sender === "user" ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat input */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-primary hover:bg-accent">
              <Send className="h-4 w-4 mr-2" />
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
