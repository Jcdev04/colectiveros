"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bus, EyeOff } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const response = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (response?.error) {
        throw new Error(response.error);
      }
      toast.success("Ingreso exitoso");
      router.push("/colectivero");
    } catch (error) {
      console.error("Error during sign-in:", error);
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

        {/* Login Card */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Inicia sesión en Chapaturuta
            </h2>
            <p className="text-gray-600 mt-2">
              Accede a tu cuenta para continuar
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    className="h-12 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
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
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="h-12 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const passwordInput = document.getElementById(
                          "password"
                        ) as HTMLInputElement;
                        passwordInput.type =
                          passwordInput.type === "password"
                            ? "text"
                            : "password";
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <EyeOff className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm text-gray-600"
                    >
                      Recordarme
                    </label>
                  </div>
                  <Link
                    href="#"
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div> */}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-base font-medium"
              >
                Iniciar Sesión
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-600">
                ¿No tienes cuenta?{" "}
                <Link
                  href="/register"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Regístrate
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
