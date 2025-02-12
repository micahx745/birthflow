import Link from "next/link"
import { ArrowLeft, Home, User, FileText, Heart, Users } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// This is mock data. In a real application, you'd fetch this data based on the client ID.
const clientData = {
  id: "1",
  name: "Emma Thompson",
  status: "active",
  dueDate: "June 15, 2024",
  supportType: "Birth",
  hospital: "Serene Valley Hospital",
  careProvider: "Dr. Sarah Johnson",
  partner: "Michael Thompson",
  insurance: "HealthGuard Insurance",
  upcomingAppointments: [
    { date: "May 30, 2024", type: "Prenatal Check-up" },
    { date: "June 10, 2024", type: "Birth Plan Review" },
  ],
  pastAppointments: [
    { date: "April 15, 2024", type: "Initial Consultation" },
    { date: "May 1, 2024", type: "Prenatal Check-up" },
  ],
  keyDates: [
    { date: "April 15, 2024", event: "Initial Consultation" },
    { date: "May 15, 2024", event: "Birth Plan Review" },
  ],
  birthPreferences: ["Natural pain management techniques", "Delayed cord clamping", "Immediate skin-to-skin contact"],
  medicalHistory: ["No significant medical conditions", "Previous cesarean section"],
  supportTeam: [
    { name: "Lisa Chen", role: "Backup Doula" },
    { name: "Dr. Robert Brown", role: "OB/GYN" },
  ],
  notes: [
    { date: "May 1, 2024", note: "Discussed birth plan options" },
    { date: "May 15, 2024", note: "Reviewed pain management techniques" },
  ],
  documents: [
    { name: "Birth Plan", status: "Completed" },
    { name: "Hospital Registration", status: "Pending" },
  ],
  communicationLog: [
    { date: "May 5, 2024", type: "Phone Call", summary: "Discussed upcoming appointments" },
    { date: "May 12, 2024", type: "Email", summary: "Sent birth plan draft for review" },
  ],
}

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  const client = clientData // In a real app, you'd fetch the client data based on params.id

  return (
    <div className="min-h-screen bg-warm-white">
      <Sidebar />
      <main className="pl-60">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <Link href="/clients" className="inline-flex items-center text-taupe hover:text-taupe/80 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clients
          </Link>

          <div className="mb-8">
            <h1 className="font-gilda text-4xl text-dark-gray mb-2">{client.name}</h1>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm capitalize bg-soft-pink text-soft-pink-dark`}>
                {client.status}
              </span>
              <p className="text-taupe text-lg font-serif">Due {client.dueDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-gilda text-xl">Key Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-taupe" />
                  <p>
                    <span className="font-semibold">Support Type:</span> {client.supportType}
                  </p>
                </div>
                <div className="flex items-center">
                  <Home className="mr-2 h-5 w-5 text-taupe" />
                  <p>
                    <span className="font-semibold">Hospital:</span> {client.hospital}
                  </p>
                </div>
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-taupe" />
                  <p>
                    <span className="font-semibold">Care Provider:</span> {client.careProvider}
                  </p>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-taupe" />
                  <p>
                    <span className="font-semibold">Partner:</span> {client.partner}
                  </p>
                </div>
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-taupe" />
                  <p>
                    <span className="font-semibold">Insurance:</span> {client.insurance}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-gilda text-xl">Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Upcoming Appointments</h3>
                  {client.upcomingAppointments.map((apt, index) => (
                    <p key={index} className="text-sm">
                      {apt.date}: {apt.type}
                    </p>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Past Appointments</h3>
                  {client.pastAppointments.map((apt, index) => (
                    <p key={index} className="text-sm">
                      {apt.date}: {apt.type}
                    </p>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Key Dates</h3>
                  {client.keyDates.map((date, index) => (
                    <p key={index} className="text-sm">
                      {date.date}: {date.event}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-gilda text-xl">Birth Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  {client.birthPreferences.map((pref, index) => (
                    <li key={index} className="text-sm">
                      {pref}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-gilda text-xl">Medical History</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  {client.medicalHistory.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-gilda text-xl">Support Team</CardTitle>
              </CardHeader>
              <CardContent>
                {client.supportTeam.map((member, index) => (
                  <p key={index} className="text-sm">
                    <span className="font-semibold">{member.role}:</span> {member.name}
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-gilda text-xl">Notes & Observations</CardTitle>
              </CardHeader>
              <CardContent>
                {client.notes.map((note, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-sm font-semibold">{note.date}</p>
                    <p className="text-sm">{note.note}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-gilda text-xl">Documents & Forms</CardTitle>
              </CardHeader>
              <CardContent>
                {client.documents.map((doc, index) => (
                  <p key={index} className="text-sm">
                    <span className="font-semibold">{doc.name}:</span> {doc.status}
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-gilda text-xl">Communication Log</CardTitle>
              </CardHeader>
              <CardContent>
                {client.communicationLog.map((log, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-sm font-semibold">
                      {log.date} - {log.type}
                    </p>
                    <p className="text-sm">{log.summary}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

