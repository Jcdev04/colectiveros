"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { signIn, useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignInForm() {
  const router = useRouter()
  const session = useSession()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log("session", session)
    if (session.status === "authenticated") {
      router.push("/admin")
    }
  }, [session.status])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })
      setTimeout(() => {
        console.log(response)
      }, 5000)

      if (response?.error) {
        throw new Error(response.error)
      }
      toast.success("Ingreso exitoso")
      router.push("/admin/dashboard")
    } catch (error) {
      toast.error("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.email.trim() !== "" && formData.password.trim() !== ""

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
    <Card className="w-full max-w-md bg-white ">
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl text-center">Panel de administración</CardTitle>
        <CardDescription className="text-center">Ingresa tus credenciales para acceder al sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@colectiveros.pe"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {isLoading ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>
      </CardContent>
    </Card>
    </div>

  )
}
