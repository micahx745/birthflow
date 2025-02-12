import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const supportTeam = [
  { role: "Primary Care Provider", name: "Dr. Sarah Johnson" },
  { role: "Partner", name: "Michael Thompson" },
  { role: "Backup Doula", name: "Lisa Chen" },
]

export function SupportTeam() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-gilda text-xl">Support Team</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {supportTeam.map((member, index) => (
            <li key={index}>
              <p className="text-sm text-dark-gray/70">{member.role}</p>
              <p className="text-dark-gray">{member.name}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

