import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  Users,
  ChevronRight,
  Bus,
  Building,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Header/Navigation */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 leading-tight">
                      Encuentra tu Colectivo
                    </h1>
                    <p className="text-lg text-gray-700 max-w-lg">
                      En Chapaturuta te ayudamos a descubrir paraderos y rutas
                      en tu ciudad de manera rápida, segura y actualizada.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={"/region"}>
                      <Button
                        size="lg"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-6 h-auto text-base rounded-xl"
                      >
                        Encuentra tu Ruta Ahora
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href={"/register"}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 px-6 py-6 h-auto text-base rounded-xl"
                      >
                        <Building className="mr-2 h-5 w-5" />
                        Registra tu Empresa
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="order-first md:order-last">
                  <div className="relative">
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-200 rounded-full opacity-50"></div>
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-200 rounded-full opacity-50"></div>
                    <div className="relative bg-white rounded-2xl shadow-xl p-6 aspect-[4/3]">
                      <div className="h-full w-full bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <Bus className="h-16 w-16 text-indigo-500 mx-auto mb-4" />
                          <div className="space-y-2">
                            <div className="h-2 w-32 bg-indigo-200 rounded-full mx-auto"></div>
                            <div className="h-2 w-24 bg-indigo-200 rounded-full mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-indigo-900 mb-4">
                  ¿Por qué usar Chapaturuta?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Nuestra plataforma colaborativa te ofrece la mejor experiencia
                  para encontrar y compartir información sobre rutas de
                  transporte.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Benefit 1 */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-md">
                  <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <MapPin className="h-7 w-7 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-3">
                    Cobertura total
                  </h3>
                  <p className="text-gray-600">
                    Encuentra paraderos en todas las zonas de tu ciudad.
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-md">
                  <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <Clock className="h-7 w-7 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-3">
                    Información actualizada
                  </h3>
                  <p className="text-gray-600">
                    Horarios y tarifas siempre al día.
                  </p>
                </div>

                {/* Benefit 3 */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-md">
                  <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <Users className="h-7 w-7 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-3">
                    Colaborativo
                  </h3>
                  <p className="text-gray-600">
                    Reporta cambios y contribuye a tu comunidad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-900 text-indigo-200 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Bus className="h-6 w-6 text-white mr-2" />
                  <span className="font-bold text-xl text-white">
                    Chapaturuta
                  </span>
                </div>
                <p className="text-sm">
                  Plataforma colaborativa para encontrar paraderos y rutas de
                  transporte en tu ciudad.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-white mb-4">Plataforma</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="hover:text-white">
                      Cómo funciona
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Paraderos
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Rutas
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Empresas
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-white mb-4">Recursos</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="hover:text-white">
                      Centro de ayuda
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Tutoriales
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-white mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="hover:text-white">
                      Términos de servicio
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Política de privacidad
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-indigo-800 mt-8 pt-8 text-sm text-center">
              <p>
                © {new Date().getFullYear()} Chapaturuta. Todos los derechos
                reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
