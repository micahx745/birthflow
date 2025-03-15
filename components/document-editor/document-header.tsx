"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, Save, Download, Loader2 } from "lucide-react"

interface DocumentData {
  id: string
  name: string
  fileUrl: string
  createdAt: string
  updatedAt: string
}

interface DocumentHeaderProps {
  document: DocumentData
  onBack: () => void
  onSave: () => void
  onExport: () => void
  saving: boolean
}

export function DocumentHeader({
  document,
  onBack,
  onSave,
  onExport,
  saving
}: DocumentHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 justify-between items-start md:items-center">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <div>
          <h1 className="text-xl font-bold">{document.name}</h1>
          <p className="text-sm text-gray-500">
            Last updated: {new Date(document.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              <span>Export PDF</span>
            </>
          )}
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              <span>Save</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
} 