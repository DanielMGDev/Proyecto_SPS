"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "Nombre requerido"
    if (!formData.lastName.trim()) newErrors.lastName = "Apellido requerido"
    if (!formData.email.trim()) newErrors.email = "Email requerido"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email inválido"
    if (!formData.phone.trim()) newErrors.phone = "Teléfono requerido"
    if (!formData.address.trim()) newErrors.address = "Dirección requerida"
    if (!formData.city.trim()) newErrors.city = "Ciudad requerida"
    if (!formData.postalCode.trim()) newErrors.postalCode = "Código postal requerido"
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Número de tarjeta requerido"
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) newErrors.cardNumber = "Número de tarjeta inválido"
    if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Fecha de vencimiento requerida"
    if (!formData.cardCvc.trim()) newErrors.cardCvc = "CVC requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setOrderPlaced(true)
      clearCart()
      setTimeout(() => {
        router.push("/")
      }, 3000)
    }
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12 flex flex-col items-center justify-center">
          <p className="text-xl text-muted-foreground mb-4">Tu carrito está vacío</p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Continuar Comprando</Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-serif font-bold mb-4 text-foreground">¡Orden Confirmada!</h1>
            <p className="text-lg text-muted-foreground mb-2">Gracias por tu compra</p>
            <p className="text-muted-foreground mb-8">Te enviaremos un email con los detalles de tu pedido</p>
            <p className="text-2xl font-bold text-primary mb-8">Total: ${total.toFixed(2)}</p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Volver al Inicio</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
        <Link href="/cart" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          Volver al Carrito
        </Link>

        <h1 className="text-4xl font-serif font-bold mb-8 text-foreground">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Nombre</label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Juan"
                        className={`bg-secondary border-none ${errors.firstName ? "ring-2 ring-destructive" : ""}`}
                      />
                      {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Apellido</label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="García"
                        className={`bg-secondary border-none ${errors.lastName ? "ring-2 ring-destructive" : ""}`}
                      />
                      {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="juan@example.com"
                      className={`bg-secondary border-none ${errors.email ? "ring-2 ring-destructive" : ""}`}
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Teléfono</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+34 912 345 678"
                      className={`bg-secondary border-none ${errors.phone ? "ring-2 ring-destructive" : ""}`}
                    />
                    {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Dirección de Envío</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Dirección</label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Calle Principal 123"
                      className={`bg-secondary border-none ${errors.address ? "ring-2 ring-destructive" : ""}`}
                    />
                    {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Ciudad</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Madrid"
                        className={`bg-secondary border-none ${errors.city ? "ring-2 ring-destructive" : ""}`}
                      />
                      {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Código Postal</label>
                      <Input
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="28001"
                        className={`bg-secondary border-none ${errors.postalCode ? "ring-2 ring-destructive" : ""}`}
                      />
                      {errors.postalCode && <p className="text-sm text-destructive mt-1">{errors.postalCode}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Información de Pago</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Número de Tarjeta</label>
                    <Input
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "")
                        if (/^\d*$/.test(value) && value.length <= 16) {
                          handleInputChange({
                            ...e,
                            target: { ...e.target, value: value.replace(/(\d{4})/g, "$1 ").trim() },
                          } as React.ChangeEvent<HTMLInputElement>)
                        }
                      }}
                      placeholder="1234 5678 9012 3456"
                      className={`bg-secondary border-none ${errors.cardNumber ? "ring-2 ring-destructive" : ""}`}
                    />
                    {errors.cardNumber && <p className="text-sm text-destructive mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Vencimiento</label>
                      <Input
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "")
                          if (value.length <= 4) {
                            handleInputChange({
                              ...e,
                              target: {
                                ...e.target,
                                value: value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value,
                              },
                            } as React.ChangeEvent<HTMLInputElement>)
                          }
                        }}
                        placeholder="MM/YY"
                        className={`bg-secondary border-none ${errors.cardExpiry ? "ring-2 ring-destructive" : ""}`}
                      />
                      {errors.cardExpiry && <p className="text-sm text-destructive mt-1">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">CVC</label>
                      <Input
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "")
                          if (value.length <= 3) {
                            handleInputChange({
                              ...e,
                              target: { ...e.target, value },
                            } as React.ChangeEvent<HTMLInputElement>)
                          }
                        }}
                        placeholder="123"
                        className={`bg-secondary border-none ${errors.cardCvc ? "ring-2 ring-destructive" : ""}`}
                      />
                      {errors.cardCvc && <p className="text-sm text-destructive mt-1">{errors.cardCvc}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Completar Compra - ${total.toFixed(2)}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-serif">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-muted-foreground">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center">Tu información está segura y encriptada</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
