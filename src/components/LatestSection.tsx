// Instructions: Update latest section with NexField content and add hover animations

import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "How to Build a Strong Contractor Profile That Gets Results",
    author: "Calvin DuBois",
    image: "https://cdn.prod.website-files.com/62e85be3bc97006d300135f1/65d7894e4c56ee7b590590f6_iStock-1494248167%20(1).jpg",
    link: "/blog/build-strong-contractor-profile-results"
  },
  {
    id: 2,
    title: "Essential Safety Certifications for Oil & Gas Contractors",
    author: "Calvin DuBois",
    image: "https://thumbs.dreamstime.com/b/industrial-safety-professionals-ascending-stairs-offshore-oil-rig-facility-two-workers-protective-gear-ascend-metal-371144780.jpg",
    link: "/blog/essential-safety-certifications-oil-gas-contractors"
  },
  {
    id: 3,
    title: "NexField Marketplace: Streamlining Energy Project Staffing",
    author: "Calvin DuBois",
    image: "https://thumbs.dreamstime.com/b/workers-oil-rig-performing-maintenance-protective-gear-height-two-perform-elevated-equipment-wearing-great-365241228.jpg",
    link: "/blog/nexfield-marketplace-streamlining-energy-project-staffing"
  },
  {
    id: 4,
    title: "Managing Remote Contractor Teams in Oil & Energy Projects",
    author: "Calvin DuBois",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/blog/managing-remote-contractor-teams-oil-energy-projects"
  }
];

export default function LatestSection() {
  return (
    <section id="insights" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-nexfield-slate text-center mb-4">
          MARKETPLACE INSIGHTS
        </h2>
        <p className="text-lg text-nexfield-slate/70 text-center mb-12 max-w-2xl mx-auto">
          Stay informed with the latest trends, best practices, and industry insights for contractors and companies in the oil & energy sector.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow hover-lift">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover-scale"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-nexfield-slate mb-4 leading-tight">
                  {post.title}
                </h3>
                <Link
                  href={post.link}
                  className="text-nexfield-emerald hover:text-nexfield-emerald/80 font-medium transition-colors"
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
