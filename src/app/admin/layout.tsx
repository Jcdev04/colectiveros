"use client"
import Topbar from "@/components/topbar"

/*import DashboardSidebar from "@/components/sidebar"*/

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <Topbar />
      {children}
    </div>
  )
}
