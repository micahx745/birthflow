import { MessageCircle, Calendar, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ClientHeaderProps {
  client: {
    name: string
    status: string
  }
}

export function ClientHeader({ client }: ClientHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="font-gilda text-3xl text-dark-gray">{client.name}</h1>
        <span className="inline-block px-3 py-1 rounded-full text-sm capitalize bg-soft-pink text-soft-pink-dark mt-2">
          {client.status}
        </span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <MessageCircle className="mr-2 h-4 w-4" />
          Message
        </Button>
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule
        </Button>
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>
    </div>
  )
}

