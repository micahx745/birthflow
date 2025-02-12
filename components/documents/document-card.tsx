import { format } from "date-fns"
import { Eye, Download, Share2, Edit, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Document {
  id: string
  name: string
  client: string
  type: string
  modified: string
  status: string
}

interface DocumentCardProps {
  document: Document
  view: "grid" | "list"
}

const typeColors = {
  "Birth Plan": "bg-soft-pink text-soft-pink-dark",
  "Consent Form": "bg-taupe/20 text-taupe",
  "Medical Record": "bg-muted-blue/20 text-muted-blue",
  "Client Note": "bg-green-100 text-green-800",
  Template: "bg-yellow-100 text-yellow-800",
  "Completed Form": "bg-purple-100 text-purple-800",
}

const statusColors = {
  Draft: "bg-yellow-100 text-yellow-800",
  Pending: "bg-orange-100 text-orange-800",
  Completed: "bg-green-100 text-green-800",
}

export function DocumentCard({ document, view }: DocumentCardProps) {
  const cardClass =
    view === "grid"
      ? "bg-white rounded-lg shadow-sm border border-soft-pink/20 p-4 flex flex-col h-full"
      : "bg-white rounded-lg shadow-sm border border-soft-pink/20 p-4 flex items-center justify-between"

  return (
    <div className={`${cardClass} group`}>
      <div className={view === "grid" ? "mb-4" : "flex-grow"}>
        <h3 className="font-gilda text-lg text-dark-gray mb-2">{document.name}</h3>
        <p className="text-sm text-dark-gray/70 mb-1">Client: {document.client}</p>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs px-2 py-1 rounded-full ${typeColors[document.type as keyof typeof typeColors]}`}>
            {document.type}
          </span>
          {document.status !== "N/A" && (
            <span
              className={`text-xs px-2 py-1 rounded-full ${statusColors[document.status as keyof typeof statusColors]}`}
            >
              {document.status}
            </span>
          )}
        </div>
        <p className="text-xs text-dark-gray/60">Modified: {format(new Date(document.modified), "MMM d, yyyy")}</p>
      </div>
      <div className={`flex ${view === "grid" ? "mt-auto" : ""} gap-2`}>
        <TooltipProvider>
          {[
            { icon: Eye, label: "View" },
            { icon: Download, label: "Download" },
            { icon: Share2, label: "Share" },
            { icon: Edit, label: "Edit" },
            { icon: Archive, label: "Archive" },
          ].map(({ icon: Icon, label }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-dark-gray/70 hover:text-dark-gray hover:bg-soft-pink/10"
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  )
}

