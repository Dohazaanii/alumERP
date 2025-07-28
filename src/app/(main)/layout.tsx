import { Header } from "@/components/layout/header"
import { AppSidebar } from "@/components/layout/sidebar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar>
        <Header />
        <div className="flex-1 overflow-auto bg-background">
          {children}
        </div>
      </AppSidebar>
    </div>
  )
}
