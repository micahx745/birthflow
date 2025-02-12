interface Activity {
  id: number
  description: string
  time: string
  type: "client" | "document" | "appointment"
}

const activities: Activity[] = [
  {
    id: 1,
    description: "New client intake form submitted",
    time: "2 hours ago",
    type: "client",
  },
  {
    id: 2,
    description: "Birth plan review requested",
    time: "4 hours ago",
    type: "document",
  },
  {
    id: 3,
    description: "Consultation scheduled with Sarah",
    time: "5 hours ago",
    type: "appointment",
  },
]

export function ActivityList() {
  return (
    <div className="space-y-4">
      <h2 className="font-gilda text-xl text-dark-gray">Recent Activity</h2>
      <div className="space-y-2">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 border-l-4 border-soft-pink bg-white rounded-r-lg">
            <p className="font-serif text-dark-gray">{activity.description}</p>
            <p className="text-sm text-dark-gray/60 mt-1">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

