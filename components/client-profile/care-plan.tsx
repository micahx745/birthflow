import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const carePlan = [
  { event: "36 Week Visit", date: "May 20, 2024" },
  { event: "38 Week Visit", date: "June 3, 2024" },
  { event: "40 Week Visit", date: "June 17, 2024" },
  { event: "Estimated Due Date", date: "June 15, 2024" },
]

export function CarePlan() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-gilda text-xl">Care Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {carePlan.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span className="text-dark-gray">{item.event}</span>
              <span className="text-taupe">{item.date}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

