import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const preferences = [
  "Natural pain management",
  "Delayed cord clamping",
  "Immediate skin-to-skin contact",
  "Breastfeeding support",
]

export function BirthPreferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-gilda text-xl">Birth Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {preferences.map((pref, index) => (
            <li key={index} className="text-dark-gray">
              {pref}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

