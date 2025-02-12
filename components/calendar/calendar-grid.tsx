"use client"

import { useState, useEffect } from "react"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"
import { AppointmentCard } from "./appointment-card"

interface CalendarGridProps {
  view: "month" | "week" | "day"
  currentDate: Date
}

interface Appointment {
  id: string
  clientName: string
  type: "Initial Consultation" | "Birth Support" | "Postpartum Visit" | "Lactation Support" | "Birth Plan Review"
  startTime: Date
  endTime: Date
  location: string
}

const HOURS = Array.from({ length: 17 }, (_, i) => i + 6) // 6 AM to 10 PM

export function CalendarGrid({ view, currentDate }: CalendarGridProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    // Fetch appointments here. For now, we'll use mock data.
    const mockAppointments: Appointment[] = [
      {
        id: "1",
        clientName: "Emma Thompson",
        type: "Initial Consultation",
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0),
        location: "Office",
      },
      {
        id: "2",
        clientName: "Sarah Johnson",
        type: "Birth Support",
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0),
        location: "Hospital",
      },
      // Add more mock appointments as needed
    ]
    setAppointments(mockAppointments)
  }, [currentDate])

  const renderDayView = () => (
    <div className="grid grid-cols-1 gap-2">
      {HOURS.map((hour) => (
        <div key={hour} className="flex items-start border-t border-soft-pink/20 py-2">
          <div className="w-16 text-sm text-dark-gray/60">{format(new Date().setHours(hour), "h a")}</div>
          <div className="flex-grow">
            {appointments
              .filter((apt) => apt.startTime.getHours() === hour && isSameDay(apt.startTime, currentDate))
              .map((apt) => (
                <AppointmentCard key={apt.id} appointment={apt} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderWeekView = () => {
    const startDate = startOfWeek(currentDate)
    const endDate = endOfWeek(currentDate)
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return (
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div key={day.toISOString()} className="border-r border-soft-pink/20 last:border-r-0">
            <div className="text-center font-semibold mb-2">{format(day, "EEE d")}</div>
            {HOURS.map((hour) => (
              <div key={hour} className="border-t border-soft-pink/20 py-2 px-1">
                {appointments
                  .filter((apt) => apt.startTime.getHours() === hour && isSameDay(apt.startTime, day))
                  .map((apt) => (
                    <AppointmentCard key={apt.id} appointment={apt} />
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-soft-pink/20 p-4">
      {view === "day" && renderDayView()}
      {view === "week" && renderWeekView()}
      {view === "month" && <div>Month view not implemented in this example</div>}
    </div>
  )
}

