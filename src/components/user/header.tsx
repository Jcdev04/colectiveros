import Link from "next/link";
import { Button } from "../ui/button";
import { Bus } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Bus className="h-6 w-6 text-indigo-600 mr-2" />
            <span className="font-bold text-xl text-indigo-900">
              Chapaturuta
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#"
              className="text-gray-600 hover:text-indigo-600 text-sm font-medium"
            >
              Inicio
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-indigo-600 text-sm font-medium"
            >
              Cómo funciona
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-indigo-600 text-sm font-medium"
            >
              Paraderos
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-indigo-600 text-sm font-medium"
            >
              Contacto
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href={"/register"}>
              <Button
                variant="ghost"
                className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                ¿Eres un colectivero? Regístrate
              </Button>
            </Link>
            {/* <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Registrarse
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
