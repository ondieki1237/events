import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Script from 'next/script'

const JOB_URL = 'https://jobs.accordmedical.co.ke/'
const JOB_TITLE = 'Technical Sales Supervisor'

export default function JobsPage() {
  const whatsappHref = `https://wa.me/254729115000?text=${encodeURIComponent(`Hello, I'm interested in the ${JOB_TITLE} role. Please share how to apply.`)}`

  const jobPosting = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": JOB_TITLE,
    "description": "We are looking for a Technical Sales Supervisor to lead sales efforts for medical equipment and devices across the region. The ideal candidate has experience in technical sales, strong communication skills, and a background in medical devices or diagnostics.",
    "datePosted": new Date().toISOString().split('T')[0],
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Accord Medical",
      "sameAs": "https://accordmedical.co.ke/"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressCountry": "KE"
      }
    },
    "url": JOB_URL
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Structured data for JobPosting */}
      <Script id="jobposting-jsonld" type="application/ld+json">
        {JSON.stringify(jobPosting)}
      </Script>

      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">Careers at Accord Medical</h1>
          <p className="text-muted-foreground mt-2">We post open roles here. Apply via the link or WhatsApp.</p>
        </div>

        <div className="p-6 bg-muted/10 rounded-2xl border border-border/30 hover:shadow-lg transition-all max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-2">{JOB_TITLE}</h3>
          <p className="text-sm text-muted-foreground mb-4">Nairobi • Full-time</p>

          <p className="mb-4">We are seeking an experienced Technical Sales Supervisor to lead our sales team for medical equipment, build client relationships, and support technical pre-sales activities. Candidates should have a background in medical devices, strong sales skills, and the ability to travel within the region.</p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a href={JOB_URL} target="_blank" rel="noreferrer" className="inline-block bg-gradient-to-r from-primary to-accent text-white font-bold px-6 py-3 rounded-md text-center">View Job Listing</a>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-block border-2 border-primary text-primary px-6 py-3 rounded-md text-center">Apply via WhatsApp</a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
