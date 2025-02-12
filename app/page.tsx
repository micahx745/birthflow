"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { StatCard } from "@/components/stat-card"
import { ActivityList } from "@/components/activity-list"
import { Calendar } from "@/components/calendar"
import { Users, Baby, CalendarIcon, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewClientModal } from "@/components/modals/new-client-modal"
import { AppointmentModal } from "@/components/modals/appointment-modal"
import { DocumentUploadModal } from "@/components/modals/document-upload-modal"

export default function Dashboard() {
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false)
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [isDocumentUploadModalOpen, setIsDocumentUploadModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-warm-white">
      <Sidebar />
      <main className="pl-60">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-gilda text-3xl text-dark-gray">Welcome back, Sarah</h1>
            <div className="space-x-4">
              <Button
                onClick={() => setIsNewClientModalOpen(true)}
                className="bg-soft-pink hover:bg-soft-pink/90 text-soft-pink-dark"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Client
              </Button>
              <Button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="bg-soft-pink hover:bg-soft-pink/90 text-soft-pink-dark"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
              <Button
                onClick={() => setIsDocumentUploadModalOpen(true)}
                className="bg-soft-pink hover:bg-soft-pink/90 text-soft-pink-dark"
              >
                <Plus className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard title="Active Clients" value="24" icon={Users} color="pink" />
            <StatCard title="Upcoming Births" value="3" icon={Baby} color="taupe" />
            <StatCard title="Consultations This Week" value="8" icon={CalendarIcon} color="blue" />
            <StatCard title="Documents Pending" value="12" icon={FileText} color="pink" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ActivityList />
            <Calendar />
          </div>
        </div>
      </main>

      <NewClientModal isOpen={isNewClientModalOpen} onClose={() => setIsNewClientModalOpen(false)} />
      <AppointmentModal isOpen={isAppointmentModalOpen} onClose={() => setIsAppointmentModalOpen(false)} />
      <DocumentUploadModal isOpen={isDocumentUploadModalOpen} onClose={() => setIsDocumentUploadModalOpen(false)} />
    </div>
  )
}

