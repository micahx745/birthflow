import { format } from "date-fns"
import { Edit, X, FileText, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Appointment {
  id: string
  clientName: string
  type: "Initial Consultation" | "Birth Support" | "Postpartum Visit" | "Lactation Support" | "Birth Plan Review"
  startTime: Date
  endTime: Date
  location: string
}

interface AppointmentCardProps {
  appointment: Appointment
}

const typeColors = {
  "Initial Consultation": "bg-soft-pink text-soft-pink-dark",
  "Birth Support": "bg-taupe/20 text-taupe",
  "Postpartum Visit": "bg-muted-blue/20 text-muted-blue",
  "Lactation Support": "bg-green-100 text-green-800",
  "Birth Plan Review": "bg-yellow-100 text-yellow-800",
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <div className={`rounded-md p-2 mb-1 shadow-sm ${typeColors[appointment.type]} group`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-gilda text-sm font-semibold">{appointment.clientName}</h3>
          <p className="text-xs">{appointment.type}</p>
          <p className="text-xs">
            {format(appointment.startTime, "h:mm a")} - {format(appointment.endTime, "h:mm a")}
          </p>
          <div className="flex items-center text-xs mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {appointment.location}
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1">
                  <Edit className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Appointment</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1">
                  <X className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cancel Appointment</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1">
                  <FileText className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Notes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

