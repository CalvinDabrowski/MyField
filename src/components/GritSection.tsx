import { Button } from '@/components/ui/button';
import VerificationShield from './VerificationShield';

export default function VerificationSection() {
  return (
    <section id="verification" className="py-16 bg-nexfield-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left verification shield */}
          <div className="relative flex items-center justify-center">
            <VerificationShield className="max-w-md mx-auto hover-scale" />
          </div>

          {/* Right content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-nexfield-slate mb-6">
              Every contractor is verified. Every project is protected.
            </h2>
            <p className="text-lg text-nexfield-slate/70 mb-8 leading-relaxed">
              Safety first, quality always. Our comprehensive verification process ensures every contractor meets industry standards for certifications, insurance, and safety protocols. Build your reputation through verified completed projects and client reviews.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-nexfield-emerald rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-nexfield-slate">Safety Certifications</h4>
                  <p className="text-nexfield-slate/70 text-sm">OSHA, H2S, confined space, and industry-specific safety training</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-nexfield-sky rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-nexfield-slate">Insurance & Licensing</h4>
                  <p className="text-nexfield-slate/70 text-sm">Liability coverage, bonding, and professional licensing verification</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-nexfield-slate rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-nexfield-slate">Proven Track Record</h4>
                  <p className="text-nexfield-slate/70 text-sm">Verified project history and client ratings for peace of mind</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white px-8 py-3 font-semibold hover-lift">
                View Contractors
              </Button>
              <Button className="bg-nexfield-sky hover:bg-nexfield-sky/90 text-white px-8 py-3 font-semibold hover-lift">
                Get Verified
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
