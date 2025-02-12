import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentCard } from "./document-card"

interface DocumentsContentProps {
  view: "grid" | "list"
  activeCategory: string
  setActiveCategory: (category: string) => void
}

const categories = ["Birth Plans", "Consent Forms", "Medical Records", "Client Notes", "Templates", "Completed Forms"]

const documents = [
  {
    id: "1",
    name: "Birth Plan - Emma Thompson",
    client: "Emma Thompson",
    type: "Birth Plan",
    modified: "2023-05-15",
    status: "Draft",
  },
  {
    id: "2",
    name: "Consent Form - Sarah Johnson",
    client: "Sarah Johnson",
    type: "Consent Form",
    modified: "2023-05-14",
    status: "Completed",
  },
  {
    id: "3",
    name: "Medical History - Maria Garcia",
    client: "Maria Garcia",
    type: "Medical Record",
    modified: "2023-05-13",
    status: "Pending",
  },
  {
    id: "4",
    name: "Postpartum Care Notes - Lisa Chen",
    client: "Lisa Chen",
    type: "Client Note",
    modified: "2023-05-12",
    status: "Completed",
  },
  {
    id: "5",
    name: "Standard Birth Plan Template",
    client: "N/A",
    type: "Template",
    modified: "2023-05-11",
    status: "N/A",
  },
  {
    id: "6",
    name: "Completed Intake Form - Rachel Williams",
    client: "Rachel Williams",
    type: "Completed Form",
    modified: "2023-05-10",
    status: "Completed",
  },
]

export function DocumentsContent({ view, activeCategory, setActiveCategory }: DocumentsContentProps) {
  return (
    <Tabs value={activeCategory} onValueChange={setActiveCategory}>
      <TabsList className="bg-white border-b border-soft-pink/20 mb-6">
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="px-4 py-2 text-dark-gray/70 hover:text-dark-gray data-[state=active]:text-dark-gray data-[state=active]:border-b-2 data-[state=active]:border-soft-pink"
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category) => (
        <TabsContent key={category} value={category}>
          <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {documents
              .filter((doc) => doc.type === category || (category === "Completed Forms" && doc.status === "Completed"))
              .map((doc) => (
                <DocumentCard key={doc.id} document={doc} view={view} />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

