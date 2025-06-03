import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Blog post data - marketplace focused
const blogPosts = {
  'build-strong-contractor-profile-results': {
    title: 'How to Build a Strong Contractor Profile That Gets Results',
    date: 'January 15, 2025',
    author: 'Calvin DuBois',
    image: 'https://cdn.prod.website-files.com/62e85be3bc97006d300135f1/65d7894e4c56ee7b590590f6_iStock-1494248167%20(1).jpg',
    content: `
      <p class="mb-4">In the competitive oil & energy contractor marketplace, your profile is your first impression. A well-crafted profile can be the difference between landing high-paying projects and being overlooked by potential clients.</p>

      <h2 class="text-2xl font-bold mb-4 text-nexfield-slate">The Foundation of Success</h2>
      <p class="mb-4">Your contractor profile serves as your digital resume, portfolio, and sales pitch all in one. Companies use these profiles to quickly assess whether you're the right fit for their projects, making every detail crucial.</p>

      <h2 class="text-2xl font-bold mb-4 text-nexfield-slate">Essential Elements of a Winning Profile</h2>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Professional headshot and company branding</li>
        <li class="mb-2">Detailed skills and certification listings</li>
        <li class="mb-2">High-quality photos of completed projects</li>
        <li class="mb-2">Client testimonials and ratings</li>
        <li class="mb-2">Clear pricing and availability information</li>
      </ul>

      <h2 class="text-2xl font-bold mb-4 text-nexfield-slate">Showcasing Your Expertise</h2>
      <p class="mb-4">Use specific examples and metrics when describing your experience. Instead of "experienced welder," try "certified pipeline welder with 500+ successful joints and zero safety incidents over 8 years."</p>

      <p class="mb-4">Remember, your profile is a living document. Update it regularly with new certifications, completed projects, and client feedback to maintain your competitive edge in the marketplace.</p>
    `
  },
  'essential-safety-certifications-oil-gas-contractors': {
    title: 'Essential Safety Certifications for Oil & Gas Contractors',
    date: 'January 10, 2025',
    author: 'Calvin DuBois',
    image: 'https://thumbs.dreamstime.com/b/industrial-safety-professionals-ascending-stairs-offshore-oil-rig-facility-two-workers-protective-gear-ascend-metal-371144780.jpg',
    content: `
      <p class="mb-4">Safety certifications are non-negotiable in the oil & gas industry. Having the right credentials not only ensures compliance but also opens doors to higher-paying projects and premium clients.</p>

      <h2 class="text-2xl font-bold mb-4 text-nexfield-slate">Core Safety Certifications</h2>
      <p class="mb-4">Every oil & gas contractor should maintain these essential certifications to remain competitive in the marketplace:</p>

      <h3 class="text-xl font-bold mb-3 text-nexfield-slate">OSHA 30-Hour Construction</h3>
      <p class="mb-4">The foundation of workplace safety, covering hazard recognition, fall protection, and emergency procedures.</p>

      <h3 class="text-xl font-bold mb-3 text-nexfield-slate">H2S Alive or H2S Safety</h3>
      <p class="mb-4">Critical for working in environments where hydrogen sulfide may be present. Required for most upstream operations.</p>

      <h3 class="text-xl font-bold mb-3 text-nexfield-slate">Confined Space Entry</h3>
      <p class="mb-4">Essential for tank cleaning, vessel maintenance, and pipeline work. Includes atmospheric monitoring and rescue procedures.</p>

      <h2 class="text-2xl font-bold mb-4 text-nexfield-slate">Specialized Certifications</h2>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">SafeGulf/SafeLand - Regional safety orientation programs</li>
        <li class="mb-2">PEC SafeChemicals - Chemical plant safety</li>
        <li class="mb-2">TWIC Card - Transportation Worker Identification</li>
        <li class="mb-2">Crane Operation - NCCCO certification</li>
        <li class="mb-2">Rigging and Signaling - Certified rigger credentials</li>
      </ul>

      <p class="mb-4">Keep your certifications current and easily accessible. Many contractors use digital badge systems to showcase their credentials and ensure they never miss a renewal deadline.</p>
    `
  },
  'nexfield-marketplace-streamlining-energy-project-staffing': {
    title: 'NexField Marketplace: Streamlining Energy Project Staffing',
    date: 'January 5, 2025',
    author: 'Calvin DuBois',
    image: 'https://thumbs.dreamstime.com/b/workers-oil-rig-performing-maintenance-protective-gear-height-two-perform-elevated-equipment-wearing-great-365241228.jpg',
    content: `
      <p class="mb-4">The energy industry faces constant pressure to complete projects safely, on time, and within budget. Traditional staffing methods often fall short, leading to delays and cost overruns. NexField's marketplace platform is changing how companies approach contractor hiring.</p>

      <h2 class="text-2xl font-bold mb-4 text-nexfield-slate">The Traditional Hiring Challenge</h2>
      <p class="mb-4">Energy companies typically rely on staffing agencies, word-of-mouth referrals, or lengthy procurement processes to find contractors. This approach often results in limited candidate pools, extended timelines, and uncertainty about contractor qualifications.</p>

      <h2 class="text-2xl font-bold mb-4 text-nexfield-slate">The NexField Solution</h2>
      <p class="mb-4">Our marketplace platform connects companies directly with pre-verified contractors, eliminating middlemen and reducing hiring time from weeks to days.</p>

      <h3 class="text-xl font-bold mb-3 text-nexfield-slate">Key Platform Benefits:</h3>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Instant access to thousands of verified contractors</li>
        <li class="mb-2">Advanced filtering by skills, location, and availability</li>
        <li class="mb-2">Integrated compliance and documentation management</li>
        <li class="mb-2">Real-time communication and project tracking</li>
        <li class="mb-2">Transparent pricing and rating systems</li>
      </ul>

      <h2 class="text-2xl font-bold mb-4 text-nexfield-slate">Success Stories</h2>
      <p class="mb-4">Companies using NexField have reported 60% faster hiring times and 25% cost savings compared to traditional staffing methods. One major operator filled 50 turnaround positions in under 48 hours using our platform.</p>

      <p class="mb-4">The future of energy project staffing is here, and it's more efficient, transparent, and effective than ever before.</p>
    `
  },
  'managing-remote-contractor-teams-oil-energy-projects': {
    title: 'Managing Remote Contractor Teams in Oil & Energy Projects',
    date: 'December 20, 2024',
    author: 'Calvin DuBois',
    image: 'https://www.ey.com/adobe/dynamicmedia/deliver/dm-aid--598b4129-a891-4131-b0bb-194fa6de7083/ey-group-of-multiracial-staff-members-engaged-in-briefing.jpg?quality=85&preferwebp=true',
    content: `
      <p class="mb-4">Managing contractors across multiple remote locations presents unique challenges in the oil & energy sector. Effective coordination requires the right combination of technology, communication protocols, and management strategies.</p>

      <h2 class="text-2xl font-bold mb-4 text-nexfield-slate">Communication is Critical</h2>
      <p class="mb-4">Establish clear communication channels from day one. Use platforms that support both real-time messaging and formal documentation. Regular check-ins help maintain project momentum and identify issues early.</p>

      <h2 class="text-2xl font-bold mb-4 text-nexfield-slate">Technology Tools for Success</h2>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Project management platforms with mobile access</li>
        <li class="mb-2">Digital time tracking and reporting systems</li>
        <li class="mb-2">Video conferencing for complex discussions</li>
        <li class="mb-2">Document sharing with version control</li>
        <li class="mb-2">GPS tracking for safety and accountability</li>
      </ul>

      <h2 class="text-2xl font-bold mb-4 text-nexfield-slate">Best Practices for Remote Team Management</h2>
      <p class="mb-4">Set clear expectations for availability, response times, and deliverables. Create standardized reporting procedures and conduct regular virtual safety meetings. Use performance metrics that focus on outcomes rather than hours worked.</p>

      <h2 class="text-2xl font-bold mb-4 text-nexfield-slate">Building Trust and Accountability</h2>
      <p class="mb-4">Trust is earned through consistent performance and transparent communication. Implement milestone-based payment structures and provide regular feedback. Recognize good performance publicly to maintain team morale.</p>

      <p class="mb-4">Remember that remote work in energy projects requires extra attention to safety protocols. Ensure all contractors have proper emergency procedures and know how to report incidents immediately.</p>
    `
  }
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-nexfield-ivory">
      {/* Header with back button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-nexfield-emerald hover:text-nexfield-emerald/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Article content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero image */}
        <div className="aspect-video mb-8 rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article header */}
        <header className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-nexfield-slate mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-nexfield-slate/60 text-sm">
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.date}</span>
          </div>
        </header>

        {/* Article content */}
        <div
          className="prose prose-lg max-w-none text-nexfield-slate/80"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA section */}
        <div className="mt-12 p-8 bg-gradient-hero rounded-lg text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to join the NexField marketplace?
          </h3>
          <p className="text-white/90 mb-6">
            Connect with top energy companies or find qualified contractors for your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-nexfield-emerald hover:bg-white/90 px-8 py-3 font-semibold">
              Hire Contractors
            </Button>
            <Button className="bg-nexfield-slate text-white hover:bg-nexfield-slate/90 px-8 py-3 font-semibold">
              Find Work
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
