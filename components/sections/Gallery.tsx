'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { galleryImages } from '@/data/mockData';

// Gallery categories (derived from galleryImages for dynamism)
const categories = ['All', ...new Set(galleryImages.map(img => img.category))];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <ZoomIn className="w-4 h-4" />
            Travel Gallery
          </div>
          <h2 className="heading-secondary mb-6">
            Our <span className="text-primary-600">Gallery</span>
          </h2>
          <p className="body-large text-neutral-600">
            Unveil travel wonders in our gallery, a snapshot of Roamio&apos;s adventures 
            and the breathtaking destinations we explore.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                "border border-neutral-300 hover:border-primary-300",
                activeCategory === category
                  ? "bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/25"
                  : "bg-white text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredImages.map((image) => (
            <GalleryImage 
              key={image.id} 
              image={image} 
              onSelect={() => setSelectedImage(image)}
            />
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="group">
            View More Photos
            <ZoomIn className="w-4 h-4 ml-2 transition-transform group-hover:scale-110" />
          </Button>
        </div>

        {/* Image Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-0">
            {selectedImage && (
              <div className="relative">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white border-0"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Image */}
                <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  />
                </div>

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-heading font-semibold mb-1">
                        {selectedImage.alt}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-white/80">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {selectedImage.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

// Individual Gallery Image Component
interface GalleryImageProps {
  image: typeof galleryImages[0];
  onSelect: () => void;
}

const GalleryImage = ({ image, onSelect }: GalleryImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={cn(
        "relative group break-inside-avoid mb-4 cursor-pointer",
        "transform transition-all duration-500 hover:scale-105",
        "rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl"
      )}
      onClick={onSelect}
    >
      {/* Image Container */}
      <div className={cn(
        "relative bg-neutral-200",
        image.cols === 2 ? "aspect-square" : "aspect-[3/4]",
        !isLoaded && "animate-pulse"
      )}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className={cn(
            "object-cover transition-all duration-700",
            isLoaded ? 'opacity-100' : 'opacity-0',
            "group-hover:scale-110"
          )}
          onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500">
        {/* Zoom Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <ZoomIn className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <span className="bg-white/90 backdrop-blur-sm text-neutral-700 text-xs font-medium px-3 py-1 rounded-full">
            {image.category}
          </span>
        </div>

        {/* Gradient Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white text-sm font-medium line-clamp-2">
            {image.alt}
          </p>
        </div>
      </div>
    </div>
  );
};