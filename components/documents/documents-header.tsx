import { Upload, Search, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DocumentsHeaderProps {
  view: "grid" | "list"
  setView: (view: "grid" | "list") => void
}

export function DocumentsHeader({ view, setView }: DocumentsHeaderProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <h1 className="font-gilda text-3xl text-dark-gray">Documents</h1>
      <div className="flex flex-wrap gap-4 items-center">
        <Button className="bg-soft-pink hover:bg-soft-pink/90 text-soft-pink-dark">
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dark-gray/40" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-10 bg-white border-soft-pink/20 focus:border-soft-pink/40 w-[200px] md:w-[300px]"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="birth-plan">Birth Plan</SelectItem>
            <SelectItem value="consent-form">Consent Form</SelectItem>
            <SelectItem value="medical-record">Medical Record</SelectItem>
            <SelectItem value="client-note">Client Note</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex border border-soft-pink/20 rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className={`px-3 py-2 ${view === "grid" ? "bg-soft-pink/10" : ""}`}
            onClick={() => setView("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`px-3 py-2 ${view === "list" ? "bg-soft-pink/10" : ""}`}
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

