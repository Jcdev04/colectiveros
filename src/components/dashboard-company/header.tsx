"use client";
import { signOut } from "next-auth/react";
import { Button, buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { MapIcon, StopIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

const navItems = [
  {
    title: "Paraderos",
    href: "/colectivero/paraderos",
    icon: StopIcon,
  },
  {
    title: "Rutas",
    href: "/colectivero/rutas",
    icon: MapIcon,
  },
];

export default function Topbar() {
  const handleLogout = () => {
    signOut();
  };

  const pathname = usePathname();

  return (
    <div className="flex w-full md:flex-row justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center gap-2 w-full ">
        {navItems.map((item) => (
          <Link
            className={`${
              pathname === item.href ? "bg-gray-100" : ""
            } ${buttonVariants({ variant: "ghost" })}`}
            key={item.href}
            href={item.href}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
      <Button onClick={handleLogout} type="button" variant="outline">
        Salir
      </Button>
    </div>
  );
}
