import { useState } from "react"
import { format, addDays } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function CalendarSidePanel() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const upcomingAppointments = [
    { id: "1", clientName: "Emma Thompson", type: "Initial Consultation", date: addDays(new Date(), 1) },
    { id: "2", clientName: "Sarah Johnson", type: "Birth Support", date: addDays(new Date(), 3) },
    { id: "3", clientName: "Maria Garcia", type: "Postpartum Visit", date: addDays(new Date(), 5) },
  ]

  return (
    <div className="w-80 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-gilda text-xl">Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {upcomingAppointments.map((apt) => (
              <li key={apt.id} className="text-sm">
                <p className="font-semibold">{apt.clientName}</p>
                <p>{apt.type}</p>
                <p className="text-dark-gray/60">{format(apt.date, "MMM d, yyyy")}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-gilda text-xl">Quick Add Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="client">Client</Label>
              <Input id="client" placeholder="Client name" />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input id="type" placeholder="Appointment type" />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" />
            </div>
            <Button className="w-full bg-soft-pink hover:bg-soft-pink/90 text-soft-pink-dark">Add Appointment</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-gilda text-xl">Mini Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </CardContent>
      </Card>
    </div>
  )
}

