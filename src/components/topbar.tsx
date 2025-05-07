import { signOut } from "next-auth/react";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { BuildingOfficeIcon, HomeIcon, MapIcon, StopIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

const navItems = [
  {
    title: "Página principal",
    href: "/admin",
    icon: HomeIcon,
  },
  {
    title: "Lugares",
    href: "/admin/lugares",
    icon: MapIcon,
  },
  {
    title: "Empresas",
    href: "/admin/empresas",
    icon: BuildingOfficeIcon,
  },
  {
    title: "Paraderos",
    href: "/admin/paraderos",
    icon: StopIcon,
  },
]

export default function Topbar() {
  
  const handleLogout = ()  => {
    signOut()
  }

  const pathname = usePathname()

  return (
    <div className="flex w-full md:flex-row justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center gap-2 w-full ">
        {navItems.map((item) => (
          <Link className = { `${pathname === item.href ? "bg-gray-100" : ""} ${buttonVariants({variant: "ghost"})}`} key={item.href} href={item.href}>
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
      <Button onClick={handleLogout} type="button" variant="outline">Salir</Button>
    </div>
  )
}
