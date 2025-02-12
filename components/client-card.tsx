import Link from "next/link"
import { Calendar, MessageCircle, FileText, User2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ClientCardProps {
  id: string
  name: string
  dueDate: string
  status: "active" | "upcoming" | "past"
  serviceType: "Birth" | "Postpartum" | "Lactation"
  nextAppointment: string | null
}

const statusColors = {
  active: "bg-soft-pink text-soft-pink-dark",
  upcoming: "bg-taupe/20 text-taupe",
  past: "bg-muted-blue/20 text-muted-blue",
}

const serviceTypeColors = {
  Birth: "text-soft-pink-dark",
  Postpartum: "text-taupe",
  Lactation: "text-muted-blue",
}

export function ClientCard({ id, name, dueDate, status, serviceType, nextAppointment }: ClientCardProps) {
  return (
    <Link href={`/clients/${id}`} className="block">
      <div className="bg-white rounded-stat border border-soft-pink/20 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-gilda text-lg text-dark-gray">{name}</h3>
            <p className="text-taupe text-sm font-serif">Due {dueDate}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs capitalize ${statusColors[status]}`}>{status}</span>
        </div>

        <div className="space-y-2 mb-4">
          <p className={`text-sm font-serif ${serviceTypeColors[serviceType]}`}>{serviceType} Support</p>
          {nextAppointment && <p className="text-sm font-serif text-dark-gray/70">Next: {nextAppointment}</p>}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <TooltipProvider>
              {[
                { icon: User2, label: "View Profile" },
                { icon: Calendar, label: "Schedule" },
                { icon: MessageCircle, label: "Message" },
                { icon: FileText, label: "Notes" },
              ].map(({ icon: Icon, label }) => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-dark-gray/70 hover:text-dark-gray hover:bg-soft-pink/10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="sr-only">{label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
          <ChevronRight className="h-5 w-5 text-dark-gray/40 group-hover:text-dark-gray/70 transition-colors" />
        </div>
      </div>
    </Link>
  )
}

