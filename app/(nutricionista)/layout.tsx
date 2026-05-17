import { SidebarNutricionista } from '@/components/nutricionista/Sidebar'

export default function LayoutNutricionista({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNutricionista />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  )
}
