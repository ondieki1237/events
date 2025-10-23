import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'

const jobs = [
  { id: '1', title: 'Sales Representative - Medical Equipment', location: 'Nairobi', type: 'Full-time' },
  { id: '2', title: 'Service Engineer - Imaging', location: 'Nairobi', type: 'Full-time' },
]

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Careers at Accord Medical</h1>
          <p className="text-muted-foreground mt-2">Join our team and help us deliver quality medical solutions across East Africa.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="p-6 bg-muted/10 rounded-2xl border border-border/30 hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{job.location} • {job.type}</p>
              <div className="flex gap-3">
                <Link href={`/jobs/${job.id}`} className="text-sm font-medium text-primary">View details →</Link>
                <a href={`https://wa.me/254729115000?text=${encodeURIComponent(`Hello, I'm interested in the ${job.title} role.`)}`} className="text-sm font-medium text-primary">Apply via WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
