import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const timelineItems = [
  { date: "May 15, 2024", event: "Initial consultation" },
  { date: "May 22, 2024", event: "Birth plan review" },
  { date: "June 1, 2024", event: "Prenatal visit" },
]

export function Timeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-gilda text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-soft-pink/30 ml-3">
          {timelineItems.map((item, index) => (
            <li key={index} className="mb-6 ml-4">
              <div className="absolute w-3 h-3 bg-soft-pink rounded-full mt-1.5 -left-1.5 border border-white"></div>
              <time className="mb-1 text-sm font-normal leading-none text-taupe">{item.date}</time>
              <p className="text-base font-normal text-dark-gray">{item.event}</p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}

