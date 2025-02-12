"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { CalendarHeader } from "@/components/calendar/calendar-header"
import { CalendarGrid } from "@/components/calendar/calendar-grid"
import { CalendarSidePanel } from "@/components/calendar/calendar-side-panel"

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "week" | "day">("week")
  const [currentDate, setCurrentDate] = useState(new Date())

  return (
    <div className="min-h-screen bg-warm-white">
      <Sidebar />
      <main className="pl-60">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <CalendarHeader view={view} setView={setView} currentDate={currentDate} setCurrentDate={setCurrentDate} />
          <div className="flex gap-6 mt-6">
            <div className="flex-grow">
              <CalendarGrid view={view} currentDate={currentDate} />
            </div>
            <CalendarSidePanel />
          </div>
        </div>
      </main>
    </div>
  )
}

