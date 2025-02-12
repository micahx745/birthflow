interface Appointment {
  id: number
  time: string
  clientName: string
  type: string
}

const appointments: Appointment[] = [
  {
    id: 1,
    time: "9:00 AM",
    clientName: "Emma Thompson",
    type: "Initial Consultation",
  },
  {
    id: 2,
    time: "2:00 PM",
    clientName: "Maria Garcia",
    type: "Birth Planning",
  },
]

export function Calendar() {
  return (
    <div className="space-y-4">
      <h2 className="font-gilda text-xl text-dark-gray">Today's Schedule</h2>
      <div className="bg-white rounded-stat p-4 space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="flex items-center space-x-4 p-2">
            <div className="w-20 text-taupe font-serif">{appointment.time}</div>
            <div>
              <p className="font-serif text-dark-gray">{appointment.clientName}</p>
              <p className="text-sm text-dark-gray/60">{appointment.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

