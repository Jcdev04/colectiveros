import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-semibold text-indigo-800 leading-tight">
                  Encuentra tu Colectivo
                </h1>

                <p className="text-lg text-gray-700">
                  En Chapaturuta te ayudamos a descubrir paraderos y rutas en tu
                  ciudad en solo 4 pasos. Viaja seguro, rápido y al mejor
                  precio.
                </p>

                {/* Feature Bullets */}
                <div className="space-y-4 py-2">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-indigo-800">
                        Cobertura total
                      </h3>
                      <p className="text-gray-600">
                        Encuentra paraderos en todas las zonas de tu ciudad.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-indigo-800">
                        Información actualizada
                      </h3>
                      <p className="text-gray-600">
                        Horarios y tarifas siempre al día.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-indigo-800">
                        Colaborativo
                      </h3>
                      <p className="text-gray-600">
                        Reporta cambios y ayuda a tu comunidad.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="pt-4 space-y-4">
                  <Link href="/region">
                    <Button className="bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200 ease-in-out">
                      Comienza tu búsqueda
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Hero Image */}
              <div className="order-first md:order-last">
                <div className="bg-indigo-50 rounded-xl p-6 h-64 md:h-80 flex items-center justify-center">
                  <svg
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full max-w-md"
                  >
                    <path
                      fill="#4f46e5"
                      d="M40,60 L160,60 L160,140 C160,151.046 151.046,160 140,160 L60,160 C48.954,160 40,151.046 40,140 L40,60 Z"
                      opacity="0.2"
                    />
                    <rect
                      x="30"
                      y="50"
                      width="140"
                      height="30"
                      rx="5"
                      fill="#4f46e5"
                      opacity="0.7"
                    />
                    <rect
                      x="40"
                      y="90"
                      width="120"
                      height="60"
                      rx="5"
                      fill="#ffffff"
                      stroke="#4f46e5"
                      strokeWidth="2"
                    />
                    <circle
                      cx="60"
                      cy="120"
                      r="10"
                      fill="#4f46e5"
                      opacity="0.6"
                    />
                    <circle
                      cx="100"
                      cy="120"
                      r="10"
                      fill="#4f46e5"
                      opacity="0.4"
                    />
                    <circle
                      cx="140"
                      cy="120"
                      r="10"
                      fill="#4f46e5"
                      opacity="0.2"
                    />
                    <path
                      d="M30,80 L30,140 C30,151.046 38.954,160 50,160 L150,160 C161.046,160 170,151.046 170,140 L170,80"
                      stroke="#4f46e5"
                      strokeWidth="2"
                      fill="none"
                    />
                    <rect
                      x="70"
                      y="40"
                      width="60"
                      height="10"
                      rx="5"
                      fill="#4f46e5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;
