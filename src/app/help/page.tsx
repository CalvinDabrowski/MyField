import Link from 'next/link';
import { ArrowLeft, Search, FileText, Users, Shield, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I create a contractor profile?",
        a: "Click 'Get Started' and select 'Individual Contractor'. Fill out your profile with skills, certifications, and experience. Upload your safety certifications and complete the verification process."
      },
      {
        q: "How do I post a job as a company?",
        a: "Create a company account, then navigate to 'Post a Job'. Provide project details, required skills, location, and budget. Our system will match you with qualified contractors."
      },
      {
        q: "What certifications do I need?",
        a: "Basic requirements include OSHA 30, H2S safety, and industry-specific certifications. View our safety resources section for a complete list of recommended certifications."
      }
    ]
  },
  {
    category: "Verification & Safety",
    questions: [
      {
        q: "How does contractor verification work?",
        a: "We verify certifications, insurance, licenses, and conduct background checks. All contractors must maintain current safety training and insurance coverage."
      },
      {
        q: "What insurance is required?",
        a: "General liability insurance with minimum $1M coverage, workers' compensation, and professional liability insurance are required for most projects."
      },
      {
        q: "How do you ensure safety compliance?",
        a: "We maintain detailed safety records, require current certifications, and provide ongoing safety training resources. All incidents must be reported immediately."
      }
    ]
  },
  {
    category: "Payments & Billing",
    questions: [
      {
        q: "How do payments work?",
        a: "Payments are processed securely through our platform. Contractors are paid upon milestone completion or project completion, depending on the agreement."
      },
      {
        q: "What are the platform fees?",
        a: "We charge a small service fee on completed projects. Contractors pay 5% and companies pay 3% of the project value. No upfront fees."
      },
      {
        q: "When do I get paid?",
        a: "Payments are released 24-48 hours after project milestone approval or completion, depending on the payment terms agreed upon."
      }
    ]
  }
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-nexfield-ivory">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-nexfield-emerald hover:text-nexfield-emerald/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-nexfield-slate mb-4">
            Help Center
          </h1>
          <p className="text-lg text-nexfield-slate/70 max-w-2xl mx-auto">
            Find answers to common questions and get the support you need to succeed on the NexField marketplace.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-nexfield-emerald rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-nexfield-slate mb-2">Search Help</h3>
              <p className="text-sm text-nexfield-slate/70">Find specific answers</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-nexfield-sky rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-nexfield-slate mb-2">User Guides</h3>
              <p className="text-sm text-nexfield-slate/70">Step-by-step tutorials</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-nexfield-slate rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-nexfield-slate mb-2">Community</h3>
              <p className="text-sm text-nexfield-slate/70">Connect with others</p>
            </CardContent>
          </Card>

          <Link href="/contact">
            <Card className="text-center hover:shadow-lg transition-shadow hover-lift">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-nexfield-emerald rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-nexfield-slate mb-2">Contact Support</h3>
                <p className="text-sm text-nexfield-slate/70">Get personal help</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-nexfield-slate mb-6">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <Card key={faqIndex}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.q}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-nexfield-slate/70">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-nexfield-emerald" />
                Safety Resources
              </CardTitle>
              <CardDescription>Essential safety information and training materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/#verification" className="block text-nexfield-emerald hover:text-nexfield-emerald/80">
                → Certification Requirements
              </Link>
              <Link href="/#verification" className="block text-nexfield-emerald hover:text-nexfield-emerald/80">
                → Safety Training Programs
              </Link>
              <Link href="/#verification" className="block text-nexfield-emerald hover:text-nexfield-emerald/80">
                → Incident Reporting
              </Link>
              <Link href="/#verification" className="block text-nexfield-emerald hover:text-nexfield-emerald/80">
                → Emergency Procedures
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-nexfield-sky" />
                Training & Webinars
              </CardTitle>
              <CardDescription>Enhance your skills and stay updated with industry trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/#insights" className="block text-nexfield-emerald hover:text-nexfield-emerald/80">
                → Upcoming Webinars
              </Link>
              <Link href="/#insights" className="block text-nexfield-emerald hover:text-nexfield-emerald/80">
                → Skill Development Courses
              </Link>
              <Link href="/#insights" className="block text-nexfield-emerald hover:text-nexfield-emerald/80">
                → Industry Best Practices
              </Link>
              <Link href="/#insights" className="block text-nexfield-emerald hover:text-nexfield-emerald/80">
                → Certification Prep
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-gradient-hero rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Still need help?
          </h3>
          <p className="text-white/90 mb-6">
            Our support team is ready to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-nexfield-emerald hover:bg-white/90 px-8 py-3 font-semibold">
                Contact Support
              </Button>
            </Link>
            <Button className="bg-nexfield-slate text-white hover:bg-nexfield-slate/90 px-8 py-3 font-semibold">
              Call: (936) 314-7030
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
