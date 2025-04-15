"use client"

import { useState } from "react"
import Link from "next/link"
import { CreditCard, Truck, ChevronRight, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  seller: string
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState<string>("shipping")

  // Datos de ejemplo del carrito
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Smartphone 128GB - Pantalla AMOLED 6.5" - 8GB RAM',
      price: 134999, // Precio con descuento
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      seller: "TecnoStore",
    },
    {
      id: 2,
      name: "Auriculares Bluetooth con cancelación de ruido",
      price: 24999,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      seller: "AudioPro",
    },
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 0 // Envío gratis
  const total = subtotal + shipping

  const handleContinue = () => {
    if (activeStep === "shipping") {
      setActiveStep("payment")
    } else if (activeStep === "payment") {
      setActiveStep("confirmation")
    }
  }

  const handleBack = () => {
    if (activeStep === "payment") {
      setActiveStep("shipping")
    } else if (activeStep === "confirmation") {
      setActiveStep("payment")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Finalizar compra</h1>

        {/* Stepper */}
        <div className="mb-8">
          <Tabs value={activeStep} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger
                value="shipping"
                onClick={() => activeStep !== "shipping" && setActiveStep("shipping")}
                disabled={activeStep === "confirmation"}
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                1. Envío
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                onClick={() => activeStep !== "payment" && activeStep !== "shipping" && setActiveStep("payment")}
                disabled={activeStep === "shipping" || activeStep === "confirmation"}
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                2. Pago
              </TabsTrigger>
              <TabsTrigger
                value="confirmation"
                disabled={activeStep !== "confirmation"}
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                3. Confirmación
              </TabsTrigger>
            </TabsList>

            <TabsContent value="shipping" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Truck className="mr-2 h-5 w-5" />
                        Información de envío
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Nombre</Label>
                            <Input id="firstName" placeholder="Ingresa tu nombre" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Apellido</Label>
                            <Input id="lastName" placeholder="Ingresa tu apellido" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="tu@email.com" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Teléfono</Label>
                          <Input id="phone" placeholder="Ingresa tu número de teléfono" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Dirección</Label>
                          <Input id="address" placeholder="Calle y número" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">Ciudad</Label>
                            <Input id="city" placeholder="Ciudad" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postalCode">Código Postal</Label>
                            <Input id="postalCode" placeholder="Código Postal" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="province">Provincia</Label>
                          <Input id="province" placeholder="Provincia" />
                        </div>

                        <div className="space-y-2 pt-4">
                          <Label>Método de envío</Label>
                          <RadioGroup defaultValue="standard">
                            <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                              <RadioGroupItem value="standard" id="standard" />
                              <Label htmlFor="standard" className="flex-1 cursor-pointer">
                                <div className="font-medium">Envío estándar</div>
                                <div className="text-sm text-gray-500">3-5 días hábiles</div>
                              </Label>
                              <div className="text-green-600 font-medium">Gratis</div>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-md p-3">
                              <RadioGroupItem value="express" id="express" />
                              <Label htmlFor="express" className="flex-1 cursor-pointer">
                                <div className="font-medium">Envío express</div>
                                <div className="text-sm text-gray-500">24-48 horas</div>
                              </Label>
                              <div className="font-medium">$1.200</div>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Resumen del pedido</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex space-x-3">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-16 h-16 object-contain border rounded-md"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.seller}</p>
                              <div className="flex justify-between mt-1">
                                <p className="text-sm">
                                  ${item.price.toLocaleString("es-AR")} x {item.quantity}
                                </p>
                                <p className="text-sm font-medium">
                                  ${(item.price * item.quantity).toLocaleString("es-AR")}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t mt-4 pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span>${subtotal.toLocaleString("es-AR")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Envío</span>
                          <span className="text-primary">Gratis</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t">
                          <span>Total</span>
                          <span>${total.toLocaleString("es-AR")}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" asChild>
                  <Link href="/carrito">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al carrito
                  </Link>
                </Button>
                <Button onClick={handleContinue} className="bg-primary hover:bg-accent">
                  Continuar al pago
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Información de pago
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2 pt-4">
                          <Label>Método de pago</Label>
                          <RadioGroup defaultValue="credit">
                            <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                              <RadioGroupItem value="credit" id="credit" />
                              <Label htmlFor="credit" className="flex-1 cursor-pointer">
                                <div className="font-medium">Tarjeta de crédito</div>
                                <div className="text-sm text-gray-500">Visa, Mastercard, American Express</div>
                              </Label>
                              <img
                                src="/placeholder.svg?height=30&width=120"
                                alt="Tarjetas de crédito"
                                className="h-8"
                              />
                            </div>
                            <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                              <RadioGroupItem value="debit" id="debit" />
                              <Label htmlFor="debit" className="flex-1 cursor-pointer">
                                <div className="font-medium">Tarjeta de débito</div>
                                <div className="text-sm text-gray-500">Débito inmediato</div>
                              </Label>
                              <img
                                src="/placeholder.svg?height=30&width=120"
                                alt="Tarjetas de débito"
                                className="h-8"
                              />
                            </div>
                            <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                              <RadioGroupItem value="mercadopago" id="mercadopago" />
                              <Label htmlFor="mercadopago" className="flex-1 cursor-pointer">
                                <div className="font-medium">Mercado Pago</div>
                                <div className="text-sm text-gray-500">QR, transferencia o saldo</div>
                              </Label>
                              <img src="/placeholder.svg?height=30&width=120" alt="Mercado Pago" className="h-8" />
                            </div>
                            <div className="flex items-center space-x-2 border rounded-md p-3">
                              <RadioGroupItem value="transfer" id="transfer" />
                              <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                                <div className="font-medium">Transferencia bancaria</div>
                                <div className="text-sm text-gray-500">Transferencia desde tu banco</div>
                              </Label>
                              <img src="/placeholder.svg?height=30&width=120" alt="Transferencia" className="h-8" />
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="pt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Número de tarjeta</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Fecha de vencimiento</Label>
                              <Input id="expiry" placeholder="MM/AA" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">Código de seguridad</Label>
                              <Input id="cvc" placeholder="CVC" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                            <Input id="cardName" placeholder="Nombre como aparece en la tarjeta" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="installments">Cuotas</Label>
                            <select
                              id="installments"
                              className="w-full rounded-md border border-input bg-background px-3 py-2"
                            >
                              <option value="1">1 cuota de ${total.toLocaleString("es-AR")}</option>
                              <option value="3">
                                3 cuotas sin interés de ${(total / 3).toFixed(2).toLocaleString("es-AR")}
                              </option>
                              <option value="6">
                                6 cuotas sin interés de ${(total / 6).toFixed(2).toLocaleString("es-AR")}
                              </option>
                              <option value="12">
                                12 cuotas sin interés de ${(total / 12).toFixed(2).toLocaleString("es-AR")}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Resumen del pedido</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex space-x-3">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-16 h-16 object-contain border rounded-md"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.seller}</p>
                              <div className="flex justify-between mt-1">
                                <p className="text-sm">
                                  ${item.price.toLocaleString("es-AR")} x {item.quantity}
                                </p>
                                <p className="text-sm font-medium">
                                  ${(item.price * item.quantity).toLocaleString("es-AR")}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t mt-4 pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span>${subtotal.toLocaleString("es-AR")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Envío</span>
                          <span className="text-primary">Gratis</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t">
                          <span>Total</span>
                          <span>${total.toLocaleString("es-AR")}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al envío
                </Button>
                <Button onClick={handleContinue}>
                  Confirmar compra
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="confirmation" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <div className="flex justify-center mb-4">
                      <CheckCircle2 className="h-16 w-16 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">¡Gracias por tu compra!</h2>
                    <p className="text-gray-600 mb-6">Tu pedido ha sido procesado correctamente.</p>
                    <div className="max-w-md mx-auto bg-gray-50 p-4 rounded-lg mb-6">
                      <p className="font-medium">Número de pedido: #ARG-12345678</p>
                      <p className="text-sm text-gray-600">
                        Hemos enviado un correo electrónico con los detalles de tu compra.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <Button asChild className="w-full md:w-auto">
                        <Link href="/pedidos">Ver mis pedidos</Link>
                      </Button>
                      <div>
                        <Button variant="outline" asChild className="w-full md:w-auto">
                          <Link href="/">Continuar comprando</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
