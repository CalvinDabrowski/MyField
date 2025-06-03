export interface ProjectPhoto {
  id: string;
  url: string;
  title: string;
  description: string;
  category: 'before' | 'during' | 'after' | 'equipment' | 'team' | 'certification';
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  location: string;
  date: string;
  duration: string;
  description: string;
  technologies: string[];
  certifications: string[];
  featured: boolean;
  photos: ProjectPhoto[];
}

export interface Review {
  id: number;
  client: string;
  project: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Contractor {
  id: number;
  name: string;
  title: string;
  location: string;
  lat: number;
  lng: number;
  hourlyRate: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  isOnline: boolean;
  lastSeen: string;
  avatar: string;
  specializations: string[];
  certifications: string[];
  experience: string;
  description: string;
  availability: string;
  verified: boolean;
  portfolio?: PortfolioProject[];
  reviews?: Review[];
}
