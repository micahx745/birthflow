import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function DocumentsSidebar() {
  const recentDocuments = [
    { id: "1", name: "Birth Plan - Emma Thompson", type: "Birth Plan" },
    { id: "2", name: "Consent Form - Sarah Johnson", type: "Consent Form" },
    { id: "3", name: "Medical History - Maria Garcia", type: "Medical Record" },
  ]

  const quickAccessTemplates = [
    { id: "1", name: "Standard Birth Plan" },
    { id: "2", name: "Consent Form" },
    { id: "3", name: "Client Intake Form" },
  ]

  const documentStatusOverview = [
    { status: "Draft", count: 5 },
    { status: "Pending", count: 3 },
    { status: "Completed", count: 12 },
  ]

  return (
    <div className="w-80 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-gilda text-xl">Recently Viewed</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentDocuments.map((doc) => (
              <li key={doc.id} className="text-sm">
                <Button variant="link" className="p-0 h-auto text-left">
                  <span className="font-semibold">{doc.name}</span>
                </Button>
                <p className="text-dark-gray/60">{doc.type}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-gilda text-xl">Quick Access Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {quickAccessTemplates.map((template) => (
              <li key={template.id}>
                <Button variant="outline" className="w-full justify-start text-left">
                  {template.name}
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-gilda text-xl">Document Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {documentStatusOverview.map((item) => (
              <li key={item.status} className="flex justify-between items-center">
                <span>{item.status}</span>
                <span className="font-semibold">{item.count}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-gilda text-xl">Storage Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={33} className="h-2 mb-2" />
          <p className="text-sm text-dark-gray/70">3.3 GB of 10 GB used</p>
        </CardContent>
      </Card>
    </div>
  )
}

