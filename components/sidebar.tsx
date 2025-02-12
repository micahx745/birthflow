import Link from "next/link"
import { LayoutDashboard, Users, Calendar, FileText } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Documents", href: "/documents", icon: FileText },
]

export function Sidebar() {
  return (
    <div className="fixed inset-y-0 left-0 w-60 bg-white border-r border-soft-pink/20">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-soft-pink/20">
          <h1 className="font-gilda text-2xl text-dark-gray">BirthFlow</h1>
        </div>
        <nav className="flex-1 px-4 pt-8 space-y-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-dark-gray/80 hover:bg-soft-pink/5 rounded-lg transition-colors group"
            >
              <item.icon className="w-5 h-5 mr-3 text-taupe" />
              <span className="font-serif">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

