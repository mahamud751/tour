'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tour } from '@/types';
import { galleryImages } from '@/data/mockData'; 

interface TourGalleryProps {
  tour: Tour;
}

export const TourGallery = ({ tour }: TourGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!galleryImages.length) {
    return (
      <div className="space-y-6">
        <h2 className="heading-tertiary">Tour Gallery</h2>
        <p className="text-neutral-600 italic">Gallery images coming soon for {tour.title}!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="heading-tertiary">Tour Gallery</h2>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className="relative aspect-square bg-neutral-200 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setSelectedImage(image.src)}
          >
            <Image
              src={image.src}
              alt={`${tour.title} - ${image.alt}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={index === 0}  // Boost LCP for first image
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-0">
          {selectedImage && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white border-0"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden">
                <Image
                  src={selectedImage}
                  alt="Tour gallery image"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};