import { X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ClientProfileSliderProps {
  client: {
    name: string
    status: "active" | "upcoming" | "past"
    dueDate: string
    serviceType: "Birth" | "Postpartum" | "Lactation"
    nextAppointment: string | null
  } | null
  onClose: () => void
}

const statusColors = {
  active: "bg-soft-pink text-soft-pink-dark",
  upcoming: "bg-taupe/20 text-taupe",
  past: "bg-muted-blue/20 text-muted-blue",
}

export function ClientProfileSlider({ client, onClose }: ClientProfileSliderProps) {
  if (!client) return null

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-gilda text-2xl text-dark-gray">{client.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm capitalize ${statusColors[client.status]}`}>
              {client.status}
            </span>
          </div>

          <div>
            <p className="text-sm text-dark-gray/70">Due Date</p>
            <p className="font-gilda text-xl text-dark-gray">{client.dueDate}</p>
          </div>

          <div>
            <p className="text-sm text-dark-gray/70">Support Type</p>
            <p className="text-dark-gray">{client.serviceType}</p>
          </div>

          {client.nextAppointment && (
            <div>
              <p className="text-sm text-dark-gray/70">Next Appointment</p>
              <div className="flex items-center mt-1">
                <Calendar className="h-5 w-5 text-taupe mr-2" />
                <p className="text-dark-gray">{client.nextAppointment}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

