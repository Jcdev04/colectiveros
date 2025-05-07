"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { HomeIcon } from "@heroicons/react/16/solid"
import { Bars4Icon, MapIcon } from "@heroicons/react/24/outline"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Places",
    href: "/admin/places",
    icon: MapIcon,
  },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="absolute left-4 top-3 z-50">
          <Button variant="outline" size="icon" className="h-10 w-10" type="button">
            <Bars4Icon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64" onOpenChange={setOpen}>
          <MobileSidebar pathname={pathname} setOpen={setOpen} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar 
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50">
        <DesktopSidebar pathname={pathname} />
      </div>*/}
    </>
  )
}

function MobileSidebar({
  pathname,
  setOpen,
}: {
  pathname: string
  setOpen: (open: boolean) => void
}) {
  return (
    <div className="flex h-full flex-col border-r bg-white">
      <div className="h-16 flex items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
          <span className="text-lg">Colectiveros</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
/*
function DesktopSidebar({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col border-r bg-white">
      <div className="h-16 flex items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="text-lg">Colectiveros</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
*/