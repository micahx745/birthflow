import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns"

interface CalendarHeaderProps {
  view: "month" | "week" | "day"
  setView: (view: "month" | "week" | "day") => void
  currentDate: Date
  setCurrentDate: (date: Date) => void
}

export function CalendarHeader({ view, setView, currentDate, setCurrentDate }: CalendarHeaderProps) {
  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    switch (view) {
      case "month":
        direction === "prev" ? subMonths(newDate, 1) : addMonths(newDate, 1)
        break
      case "week":
        newDate.setDate(newDate.getDate() + (direction === "prev" ? -7 : 7))
        break
      case "day":
        newDate.setDate(newDate.getDate() + (direction === "prev" ? -1 : 1))
        break
    }
    setCurrentDate(newDate)
  }

  const formatDateRange = () => {
    switch (view) {
      case "month":
        return format(currentDate, "MMMM yyyy")
      case "week":
        const start = startOfWeek(currentDate)
        const end = endOfWeek(currentDate)
        return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`
      case "day":
        return format(currentDate, "MMMM d, yyyy")
    }
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="font-gilda text-3xl text-dark-gray">Calendar</h1>
      <div className="flex items-center gap-4">
        <div className="flex border border-soft-pink/20 rounded-md">
          <Button
            variant="ghost"
            className={`px-4 py-2 ${view === "month" ? "bg-soft-pink/10" : ""}`}
            onClick={() => setView("month")}
          >
            Month
          </Button>
          <Button
            variant="ghost"
            className={`px-4 py-2 ${view === "week" ? "bg-soft-pink/10" : ""}`}
            onClick={() => setView("week")}
          >
            Week
          </Button>
          <Button
            variant="ghost"
            className={`px-4 py-2 ${view === "day" ? "bg-soft-pink/10" : ""}`}
            onClick={() => setView("day")}
          >
            Day
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigateDate("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-gilda text-xl text-dark-gray">{formatDateRange()}</span>
          <Button variant="ghost" size="icon" onClick={() => navigateDate("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
          Today
        </Button>
        <Button className="bg-soft-pink hover:bg-soft-pink/90 text-soft-pink-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add Appointment
        </Button>
      </div>
    </div>
  )
}

