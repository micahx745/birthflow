import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { SearchBar } from "@/components/search-bar"
import { FilterPanel } from "@/components/filter-panel"
import { ClientCard } from "@/components/client-card"

const clients = [
  {
    id: "1",
    name: "Emma Thompson",
    dueDate: "June 15, 2024",
    status: "active" as const,
    serviceType: "Birth" as const,
    nextAppointment: "Tomorrow at 10:00 AM",
  },
  {
    id: "2",
    name: "Maria Garcia",
    dueDate: "July 22, 2024",
    status: "upcoming" as const,
    serviceType: "Postpartum" as const,
    nextAppointment: "May 30 at 2:00 PM",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    dueDate: "August 8, 2024",
    status: "upcoming" as const,
    serviceType: "Birth" as const,
    nextAppointment: null,
  },
  {
    id: "4",
    name: "Lisa Chen",
    dueDate: "May 1, 2024",
    status: "past" as const,
    serviceType: "Lactation" as const,
    nextAppointment: null,
  },
  {
    id: "5",
    name: "Rachel Williams",
    dueDate: "June 30, 2024",
    status: "active" as const,
    serviceType: "Birth" as const,
    nextAppointment: "Next week",
  },
  {
    id: "6",
    name: "Amanda Miller",
    dueDate: "July 15, 2024",
    status: "upcoming" as const,
    serviceType: "Postpartum" as const,
    nextAppointment: "June 1 at 11:00 AM",
  },
]

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Sidebar />
      <main className="pl-60">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-gilda text-3xl text-dark-gray">Clients</h1>
            <Button className="bg-soft-pink hover:bg-soft-pink/90 text-soft-pink-dark">
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <SearchBar />
            <FilterPanel />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <ClientCard key={client.id} {...client} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

