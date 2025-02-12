import { Calendar, Home, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EssentialInfoProps {
  client: {
    dueDate: string
    birthPreferences: string
    careType: string
    birthLocation: string
    careProvider: string
  }
}

export function EssentialInfo({ client }: EssentialInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-gilda text-xl">Essential Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-taupe" />
          <div>
            <p className="text-sm text-dark-gray/70">Due Date</p>
            <p className="font-gilda text-lg text-dark-gray">{client.dueDate}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-dark-gray/70">Birth Preferences</p>
          <p className="text-dark-gray">{client.birthPreferences}</p>
        </div>
        <div>
          <p className="text-sm text-dark-gray/70">Care Type</p>
          <p className="text-dark-gray">{client.careType}</p>
        </div>
        <div className="flex items-center">
          <Home className="mr-2 h-5 w-5 text-taupe" />
          <div>
            <p className="text-sm text-dark-gray/70">Birth Location</p>
            <p className="text-dark-gray">{client.birthLocation}</p>
          </div>
        </div>
        <div className="flex items-center">
          <User className="mr-2 h-5 w-5 text-taupe" />
          <div>
            <p className="text-sm text-dark-gray/70">Care Provider</p>
            <p className="text-dark-gray">{client.careProvider}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

