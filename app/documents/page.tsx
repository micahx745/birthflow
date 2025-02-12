"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DocumentsHeader } from "@/components/documents/documents-header"
import { DocumentsContent } from "@/components/documents/documents-content"
import { DocumentsSidebar } from "@/components/documents/documents-sidebar"

export default function DocumentsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [activeCategory, setActiveCategory] = useState("Birth Plans")

  return (
    <div className="min-h-screen bg-warm-white">
      <Sidebar />
      <main className="pl-60">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <DocumentsHeader view={view} setView={setView} />
          <div className="flex gap-6 mt-6">
            <div className="flex-grow">
              <DocumentsContent view={view} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            </div>
            <DocumentsSidebar />
          </div>
        </div>
      </main>
    </div>
  )
}

