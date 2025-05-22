"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bus, EyeOff, User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const acceptedTerms = formData.get("terms") === "on";

    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          role: "manager",
        }),
      });
      toast.success("Cuenta registrada con éxito");
      router.push("/login");
    } catch (error) {
      console.error("Error al registrar la cuenta:", error);
      toast.error("Error al registrar la cuenta");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-2xl">
              <Bus className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-indigo-900">Chapaturuta</h1>
        </div>

        {/* Register Card */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <h2 className="text-2xl font-bold text-gray-900">Crea tu cuenta</h2>
            <p className="text-gray-600 mt-2">
              Únete a nuestra comunidad de transporte
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={onRegister} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nombre completo
                  </Label>
                  <div className="relative">
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Juan Pérez"
                      className="h-12 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Correo electrónico
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="h-12 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-12 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10 pr-10"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <EyeOff className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Mínimo 8 caracteres</p>
                </div>

                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    name="terms"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    Acepto los{" "}
                    <Link
                      href="#"
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      términos y condiciones
                    </Link>{" "}
                    y la{" "}
                    <Link
                      href="#"
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      política de privacidad
                    </Link>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-base font-medium"
              >
                Registrarse
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <Link
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 Chapaturuta. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
