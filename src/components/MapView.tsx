'use client';

import { useEffect, useState, useRef } from 'react';
import type * as L from 'leaflet';
import { Search, Filter, MapPin, Navigation, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Define types for our contractor data
interface ContractorLocation {
  id: number;
  name: string;
  title: string;
  location: string;
  lat: number;
  lng: number;
  hourlyRate: string;
  rating: number;
  reviewCount: number;
  isOnline: boolean;
  specializations: string[];
  avatar: string;
  verified: boolean;
}

interface MapViewProps {
  contractors: ContractorLocation[];
  onContractorSelect: (contractor: ContractorLocation) => void;
}

export default function MapView({ contractors, onContractorSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [markers, setMarkers] = useState<L.Marker[]>([]);
  const [searchRadius, setSearchRadius] = useState('25');
  const [mapCenter, setMapCenter] = useState({ lat: 29.7604, lng: -95.3698 }); // Houston center
  const [selectedContractor, setSelectedContractor] = useState<ContractorLocation | null>(null);
  const [filteredContractors, setFilteredContractors] = useState(contractors);
  const [mapStyle, setMapStyle] = useState('standard');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // Initialize map when component mounts
  useEffect(() => {
    const initializeMap = async () => {
      if (typeof window !== 'undefined' && mapRef.current) {
        const L = (await import('leaflet')).default;

        // @ts-expect-error - Leaflet icon fix
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        const mapInstance = L.map(mapRef.current).setView([mapCenter.lat, mapCenter.lng], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstance);

        setMap(mapInstance);

        // Get user location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              setUserLocation(userPos);

              const userIcon = L.divIcon({
                html: `<div class="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg"></div>`,
                className: 'custom-user-marker',
                iconSize: [16, 16],
                iconAnchor: [8, 8]
              });

              L.marker([userPos.lat, userPos.lng], { icon: userIcon })
                .addTo(mapInstance)
                .bindPopup('<b>Your Location</b>')
                .openPopup();
            },
            (error) => {
              console.log('Geolocation error:', error);
            }
          );
        }
      }
    };

    initializeMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  // Add missing dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapCenter.lat, mapCenter.lng]);

  // Update markers when contractors change
  useEffect(() => {
    if (map && typeof window !== 'undefined') {
      const updateMarkers = async () => {
        const L = (await import('leaflet')).default;

        // Clear existing markers
        markers.forEach(marker => map.removeLayer(marker));

        const newMarkers: L.Marker[] = [];

        filteredContractors.forEach((contractor) => {
          // Create custom marker icon based on contractor status
          const markerColor = contractor.isOnline ? '#22c55e' : '#6b7280';
          const verifiedBadge = contractor.verified ? '✓' : '';

          const customIcon = L.divIcon({
            html: `
              <div class="relative">
                <div class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
                     style="background-color: ${markerColor}">
                  ${verifiedBadge || '👤'}
                </div>
                ${contractor.isOnline ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border border-white rounded-full animate-pulse"></div>' : ''}
              </div>
            `,
            className: 'custom-contractor-marker',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
          });

          const marker = L.marker([contractor.lat, contractor.lng], { icon: customIcon })
            .addTo(map);

          // Create popup content
          const popupContent = `
            <div class="p-2 min-w-[250px]">
              <div class="flex items-start space-x-3">
                <img src="${contractor.avatar}" alt="${contractor.name}" class="w-12 h-12 rounded-full object-cover" crossorigin="anonymous" />
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-1">
                    <h3 class="font-semibold text-sm">${contractor.name}</h3>
                    ${contractor.verified ? '<div class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"><span class="text-white text-xs">✓</span></div>' : ''}
                  </div>
                  <p class="text-xs text-gray-600 mb-2">${contractor.title}</p>
                  <div class="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                    <span>${contractor.hourlyRate}/hr</span>
                    <span>•</span>
                    <span>⭐ ${contractor.rating} (${contractor.reviewCount})</span>
                  </div>
                  <div class="flex flex-wrap gap-1 mb-3">
                    ${contractor.specializations.slice(0, 2).map(spec =>
                      `<span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">${spec}</span>`
                    ).join('')}
                  </div>
                  <button onclick="window.selectContractor(${contractor.id})"
                          class="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
          });

          marker.on('click', () => {
            setSelectedContractor(contractor);
          });

          newMarkers.push(marker);
        });

        setMarkers(newMarkers);
      };

      updateMarkers();
    }
  }, [map, filteredContractors]);

  // Global function for popup buttons
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-expect-error - Global function for Leaflet popup
      window.selectContractor = (contractorId: number) => {
        const contractor = contractors.find(c => c.id === contractorId);
        if (contractor) {
          onContractorSelect(contractor);
        }
      };
    }
  }, [contractors, onContractorSelect]);

  const handleSearch = (location: string) => {
    // In a real app, you'd geocode the location
    // For demo, we'll just filter by location name
    const filtered = contractors.filter(contractor =>
      contractor.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredContractors(filtered);
  };

  const handleRadiusChange = (radius: string) => {
    setSearchRadius(radius);
    // In a real app, you'd filter contractors by distance from user location
    // For demo, we'll show all contractors
  };

  const centerOnUser = () => {
    if (userLocation && map) {
      map.setView([userLocation.lat, userLocation.lng], 12);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Map Controls Header */}
      <div className="bg-white shadow-sm border-b p-4 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search location or zip code..."
                className="pl-10"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Radius and Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Radius:</span>
              <Select value={searchRadius} onValueChange={handleRadiusChange}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 mi</SelectItem>
                  <SelectItem value="25">25 mi</SelectItem>
                  <SelectItem value="50">50 mi</SelectItem>
                  <SelectItem value="100">100 mi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={centerOnUser}
              disabled={!userLocation}
              className="flex items-center space-x-2"
            >
              <Navigation className="w-4 h-4" />
              <span>My Location</span>
            </Button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Style:</span>
              <Select value={mapStyle} onValueChange={setMapStyle}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="satellite">Satellite</SelectItem>
                  <SelectItem value="terrain">Terrain</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>{contractors.filter(c => c.isOnline).length} online</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>{contractors.filter(c => c.verified).length} verified</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{filteredContractors.length} contractors in view</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <div ref={mapRef} className="w-full h-full" />

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <h4 className="text-sm font-semibold mb-2">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Online contractors</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span>Offline contractors</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Your location</span>
            </div>
          </div>
        </div>

        {/* Contractor Info Panel */}
        {selectedContractor && (
          <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-xl p-4">
            <div className="flex items-start space-x-3">
              <img
                src={selectedContractor.avatar}
                alt={selectedContractor.name}
                className="w-16 h-16 rounded-full object-cover"
                crossOrigin="anonymous"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold">{selectedContractor.name}</h3>
                  {selectedContractor.verified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  {selectedContractor.isOnline && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">{selectedContractor.title}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                  <span>{selectedContractor.hourlyRate}/hr</span>
                  <span>•</span>
                  <span>⭐ {selectedContractor.rating} ({selectedContractor.reviewCount})</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {selectedContractor.specializations.slice(0, 3).map((spec, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
                <Button
                  onClick={() => onContractorSelect(selectedContractor)}
                  className="w-full bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white"
                  size="sm"
                >
                  View Full Profile
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Leaflet CSS */}
      <style jsx global>{`
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');

        .custom-contractor-marker {
          background: transparent !important;
          border: none !important;
        }

        .custom-user-marker {
          background: transparent !important;
          border: none !important;
        }

        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .custom-popup .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }

        .custom-popup .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </div>
  );
}
