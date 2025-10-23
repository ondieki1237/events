import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function JobDetails({ params }: { params: { id: string } }) {
  const { id } = params
  // In a real app you'd fetch job details by id
  const job = { id, title: 'Sales Representative - Medical Equipment', location: 'Nairobi', type: 'Full-time', description: 'We are looking for a motivated sales representative...' }

  const jobJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": new Date().toISOString(),
    "employmentType": job.type,
    "hiringOrganization": { "@type": "Organization", "name": "Accord Medical Supplies Ltd", "sameAs": process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' },
    "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": job.location, "addressCountry": "KE" } }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobJsonLd) }} />
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <p className="text-sm text-muted-foreground mb-6">{job.location} • {job.type}</p>
        <article className="prose">
          <p>{job.description}</p>
        </article>
        <div className="mt-8">
          <a href={`https://wa.me/254729115000?text=${encodeURIComponent(`Hello, I'm interested in the ${job.title} role.`)}`} className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold">Apply via WhatsApp</a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
