import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const documents = ["Birth Plan", "Medical History", "Insurance Information", "Hospital Registration"]

export function DocumentChecklist() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-gilda text-xl">Document Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox id={`doc-${index}`} />
              <Label htmlFor={`doc-${index}`}>{doc}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

