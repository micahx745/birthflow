import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dark-gray/40" />
      <Input
        type="search"
        placeholder="Search clients..."
        className="pl-10 bg-white border-soft-pink/20 focus:border-soft-pink/40 w-[300px]"
      />
    </div>
  )
}

