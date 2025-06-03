import ContractorProfileClient from './ContractorProfileClient';
import type { Contractor } from '@/types/portfolio';

// Mock contractor data (in a real app, this would be fetched based on the ID)
const contractorData: Record<number, Contractor> = {
  1: {
    id: 1,
    name: "Marcus Rodriguez",
    title: "Senior Pipeline Welder",
    location: "Houston, TX",
    lat: 29.7604,
    lng: -95.3698,
    hourlyRate: "$95-120",
    rating: 4.9,
    reviewCount: 47,
    completedJobs: 156,
    isOnline: true,
    lastSeen: "Active now",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&crop=face",
    specializations: ["Pipeline Welding", "GTAW/TIG", "API 1104"],
    certifications: ["API 1104", "OSHA 30", "H2S Alive", "TWIC Card"],
    experience: "12+ years",
    description: "Highly experienced pipeline welder with expertise in critical infrastructure projects. Certified in multiple welding processes with an excellent safety record. Specialized in high-pressure natural gas and oil pipeline construction with zero incident record over 12 years.",
    availability: "Available immediately",
    verified: true,
    portfolio: [
      {
        id: "p1",
        title: "Gulf Coast Pipeline Extension Project",
        client: "Energy Transfer Partners",
        location: "Houston, TX",
        date: "2024",
        duration: "6 months",
        description: "Led welding operations for a critical 5-mile pipeline extension project, ensuring zero safety incidents and 100% weld quality compliance. Project involved 24-inch diameter high-pressure natural gas transmission pipeline with API 1104 specifications.",
        technologies: ["API 1104", "GTAW", "Pipeline Welding", "X-Ray Testing"],
        certifications: ["API 1104", "OSHA 30", "H2S Alive"],
        featured: true,
        photos: [
          {
            id: "ph1",
            url: "https://cdn.shopify.com/s/files/1/0024/3249/9821/files/Untitled_1620_x_911_px_810_x_456_px_8_600x600.png?v=1641296361",
            title: "Pipeline Welding in Progress",
            description: "Professional TIG welding on 24-inch diameter pipeline with proper safety equipment",
            category: "during"
          },
          {
            id: "ph2",
            url: "https://cdn.shopify.com/s/files/1/0024/3249/9821/files/pipeline_nation_245305337_2667381626888716_5020313872523303915_n_600x600.jpg?v=1641297520",
            title: "Underground Pipeline Installation",
            description: "Completed pipeline joint installation with certified welding techniques",
            category: "after"
          },
          {
            id: "ph3",
            url: "https://sydneywelders.com.au/wp-content/uploads/2023/05/Depositphotos_222526724_S-min-min.jpg",
            title: "Pipeline Welding Precision Work",
            description: "Professional welder demonstrating API 1104 compliant welding on natural gas pipeline",
            category: "equipment"
          }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        client: "Energy Transfer Partners",
        project: "Gulf Coast Pipeline Extension",
        rating: 5,
        comment: "Marcus exceeded all expectations. His welding quality is outstanding and he maintained perfect safety standards throughout the project.",
        date: "2024-01-15"
      },
      {
        id: 2,
        client: "Kinder Morgan",
        project: "Interstate Pipeline Repair",
        rating: 5,
        comment: "Exceptional work quality and professionalism. Completed the emergency repair ahead of schedule.",
        date: "2023-11-22"
      }
    ]
  },
  2: {
    id: 2,
    name: "Sarah Chen",
    title: "Safety Inspector & Compliance Officer",
    location: "Midland, TX",
    lat: 31.9973,
    lng: -102.0779,
    hourlyRate: "$75-95",
    rating: 4.8,
    reviewCount: 32,
    completedJobs: 89,
    isOnline: true,
    lastSeen: "Active now",
    avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face",
    specializations: ["Safety Inspection", "OSHA Compliance", "Risk Assessment"],
    certifications: ["OSHA 500", "First Aid/CPR", "H2S Safety", "Confined Space"],
    experience: "8+ years",
    description: "Dedicated safety professional with extensive experience in oil & gas operations. Expert in regulatory compliance and risk management with proven track record of zero-incident project completions.",
    availability: "Available this week",
    verified: true,
    portfolio: [
      {
        id: "p2",
        title: "Refinery Safety Audit & Compliance",
        client: "Marathon Petroleum",
        location: "Midland, TX",
        date: "2024",
        duration: "3 months",
        description: "Comprehensive safety audit resulting in 100% OSHA compliance and implementation of enhanced safety protocols for a mid-scale refinery operations unit.",
        technologies: ["OSHA Compliance", "Risk Assessment", "Safety Training"],
        certifications: ["OSHA 500", "First Aid/CPR", "H2S Safety"],
        featured: true,
        photos: [
          {
            id: "ph4",
            url: "https://www.trccompanies.com/wp-content/uploads/2024/10/747edb5a-group-of-industrial-workers-in-a-refinery-1039705312-1440x962-1.webp",
            title: "Refinery Safety Inspection Team",
            description: "Professional safety inspection team conducting comprehensive OSHA compliance audit",
            category: "during"
          },
          {
            id: "ph5",
            url: "https://internalsafety.tractel.com/safetygate/wp-content/uploads/2021/10/oil-gas-refinery-osha-fall-protection.jpg",
            title: "OSHA Fall Protection Implementation",
            description: "Installing and verifying fall protection systems in refinery environment",
            category: "equipment"
          }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        client: "Marathon Petroleum",
        project: "Refinery Safety Audit",
        rating: 5,
        comment: "Sarah's attention to detail and comprehensive safety protocols helped us achieve perfect OSHA compliance.",
        date: "2024-02-10"
      }
    ]
  },
  3: {
    id: 3,
    name: "Jake Thompson",
    title: "Drilling Operations Supervisor",
    location: "Odessa, TX",
    lat: 31.8457,
    lng: -102.3676,
    hourlyRate: "$85-110",
    rating: 4.7,
    reviewCount: 28,
    completedJobs: 73,
    isOnline: false,
    lastSeen: "2 hours ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&crop=face",
    specializations: ["Drilling Operations", "Rig Management", "Team Leadership"],
    certifications: ["Well Control", "IADC Rig Pass", "OSHA 30", "First Aid"],
    experience: "15+ years",
    description: "Experienced drilling supervisor with a proven track record of safe and efficient operations. Strong leadership and technical skills.",
    availability: "Available next week",
    verified: true,
    portfolio: [],
    reviews: []
  },
  4: {
    id: 4,
    name: "Maria Santos",
    title: "Process Engineer",
    location: "Port Arthur, TX",
    lat: 29.8850,
    lng: -93.9400,
    hourlyRate: "$90-125",
    rating: 4.9,
    reviewCount: 51,
    completedJobs: 124,
    isOnline: true,
    lastSeen: "Active now",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    specializations: ["Process Optimization", "Refinery Operations", "HAZOP Studies"],
    certifications: ["PE License", "Six Sigma", "Process Safety", "HAZOP Leader"],
    experience: "10+ years",
    description: "Chemical engineer specializing in refinery processes and optimization. Expert in process safety and continuous improvement methodologies.",
    availability: "Available for projects",
    verified: true,
    portfolio: [],
    reviews: []
  },
  5: {
    id: 5,
    name: "David Kim",
    title: "Maintenance Technician",
    location: "Galveston, TX",
    lat: 29.2694,
    lng: -94.7847,
    hourlyRate: "$65-85",
    rating: 4.6,
    reviewCount: 19,
    completedJobs: 45,
    isOnline: false,
    lastSeen: "1 day ago",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    specializations: ["Mechanical Maintenance", "Offshore Platforms", "Preventive Maintenance"],
    certifications: ["Millwright", "Crane Operator", "Rigging", "Medical Clearance"],
    experience: "6+ years",
    description: "Skilled maintenance technician with offshore experience. Proficient in mechanical systems and equipment troubleshooting.",
    availability: "Available for rotational work",
    verified: false,
    portfolio: [],
    reviews: []
  },
  6: {
    id: 6,
    name: "Rebecca Johnson",
    title: "NDT Inspector",
    location: "Texas City, TX",
    lat: 29.3838,
    lng: -94.9027,
    hourlyRate: "$80-105",
    rating: 4.8,
    reviewCount: 35,
    completedJobs: 98,
    isOnline: true,
    lastSeen: "Active now",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    specializations: ["NDT Testing", "Ultrasonic Testing", "Radiographic Testing"],
    certifications: ["ASNT Level III", "UT", "RT", "MT", "PT"],
    experience: "9+ years",
    description: "Certified NDT inspector with Level III qualifications. Extensive experience in pipeline and structural inspections.",
    availability: "Available immediately",
    verified: true,
    portfolio: [],
    reviews: []
  }
};

interface ContractorPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params for the contractors we have data for
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' }
  ];
}

export default async function ContractorPage({ params }: ContractorPageProps) {
  const { id } = await params;

  // Get contractor data on server side
  const contractor = contractorData[Number(id) as keyof typeof contractorData];

  return <ContractorProfileClient contractor={contractor} contractorId={id} />;
}
