import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function QuickNotes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-gilda text-xl">Quick Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea placeholder="Add a quick note..." className="mb-4" />
        <Button className="w-full bg-soft-pink hover:bg-soft-pink/90 text-soft-pink-dark">Save Note</Button>
      </CardContent>
    </Card>
  )
}

