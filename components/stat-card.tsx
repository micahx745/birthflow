import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: "pink" | "taupe" | "blue"
}

const colorMap = {
  pink: "bg-soft-pink/10",
  taupe: "bg-taupe/10",
  blue: "bg-muted-blue/10",
}

const iconColorMap = {
  pink: "text-soft-pink",
  taupe: "text-taupe",
  blue: "text-muted-blue",
}

export function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className={`p-6 rounded-stat shadow-sm ${colorMap[color]}`}>
      <div className="flex items-center justify-between">
        <p className="text-dark-gray/70 font-serif">{title}</p>
        <Icon className={`w-5 h-5 ${iconColorMap[color]}`} />
      </div>
      <p className="mt-4 text-3xl font-gilda text-dark-gray">{value}</p>
    </div>
  )
}

