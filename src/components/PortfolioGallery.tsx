'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, ZoomIn, ExternalLink, Calendar, MapPin, Award } from 'lucide-react';
import type { PortfolioProject, ProjectPhoto } from '@/types/portfolio';

interface PortfolioGalleryProps {
  projects: PortfolioProject[];
  contractorName: string;
}

export default function PortfolioGallery({ projects, contractorName }: PortfolioGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<ProjectPhoto | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'pipeline', 'drilling', 'safety', 'maintenance', 'inspection'];

  const filteredProjects = projects.filter(project =>
    filter === 'all' || project.technologies.some(tech =>
      tech.toLowerCase().includes(filter.toLowerCase())
    )
  );

  const openLightbox = (photo: ProjectPhoto) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const openProjectDetail = (project: PortfolioProject) => {
    setSelectedProject(project);
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-nexfield-slate mb-4">
          {contractorName}'s Project Portfolio
        </h2>
        <p className="text-nexfield-slate/70 max-w-2xl mx-auto">
          Explore our completed projects showcasing expertise, quality, and safety standards in the oil & energy sector.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
              filter === category
                ? 'bg-nexfield-emerald text-white shadow-lg'
                : 'bg-white text-nexfield-slate hover:bg-nexfield-emerald/10 border border-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
            {category === 'all' && (
              <span className="ml-2 text-xs bg-nexfield-emerald/20 px-2 py-1 rounded">
                {projects.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
            <div className="relative">
              {/* Featured Badge */}
              {project.featured && (
                <Badge className="absolute top-3 left-3 z-10 bg-nexfield-sky text-white">
                  ⭐ Featured
                </Badge>
              )}

              {/* Main Project Image */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.photos[0]?.url || '/api/placeholder/400/300'}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Photo Count */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                  <span>📸</span>
                  <span>{project.photos.length} photos</span>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-nexfield-slate mb-2 line-clamp-2">
                {project.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {project.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {project.date} • {project.duration}
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <Button
                onClick={() => openProjectDetail(project)}
                className="w-full bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white"
              >
                <ZoomIn className="w-4 h-4 mr-2" />
                View Project Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
          <p className="text-gray-500">Try selecting a different category filter</p>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-nexfield-slate">{selectedProject.title}</h2>
              <button
                onClick={closeProjectDetail}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-nexfield-slate mb-3">Project Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-20 text-gray-600">Client:</span>
                      <span className="font-medium">{selectedProject.client}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{selectedProject.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{selectedProject.date} • {selectedProject.duration}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-nexfield-slate mb-3">Certifications Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.certifications.map((cert, index) => (
                      <Badge key={index} className="bg-nexfield-sky/10 text-nexfield-sky">
                        <Award className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-nexfield-slate mb-3">Project Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
              </div>

              {/* Photo Gallery */}
              <div>
                <h3 className="font-semibold text-nexfield-slate mb-4">Project Photos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedProject.photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
                      onClick={() => openLightbox(photo)}
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          {photo.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            <div className="mt-4 text-white">
              <h3 className="text-xl font-semibold mb-2">{selectedPhoto.title}</h3>
              <p className="text-gray-300">{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
