'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, MapPin, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { TourItinerary } from '@/components/tours/TourItinerary';
import { TourReviews } from '@/components/tours/TourReviews';
import { TourGallery } from '@/components/tours/TourGallery';
import { Tour } from '@/types';
import { cn } from '@/lib/utils';

interface TourDetailsProps {
  tour: Tour;
}

export const TourDetails = ({ tour }: TourDetailsProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);

  const {
    title,
    description,
    city,
    address,
    reviews,
    avgRating,
    featured,
    duration = '7 Days',
    season = 'All Year'
  } = tour;

  const reviewCount = reviews?.length || 0;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'reviews', label: `Reviews (${reviewCount})` },
    { id: 'gallery', label: 'Gallery' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-neutral-200">
        <Image
          src={tour.photo} 
          alt={`${title} hero image`}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        
        {/* Header Content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-12 text-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  {featured && (
                    <Badge className="bg-primary-500 hover:bg-primary-600 border-0 text-xs sm:text-sm">
                      Featured
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-xs sm:text-sm">
                    {season}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-xs sm:text-sm">
                    {duration}
                  </Badge>
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-3 sm:mb-4 leading-tight">
                  {title}
                </h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base text-white/90">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="line-clamp-1">{city}, {address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 flex-shrink-0 fill-current text-amber-400" />
                    <span>{avgRating.toFixed(1)} ({reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={cn("w-4 h-4", isLiked && "fill-current text-red-500")} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Navigation Tabs */}
              <div className="border-b border-neutral-200 -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto">
                <nav className="flex space-x-6 sm:space-x-8 min-w-max sm:min-w-0">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors whitespace-nowrap",
                        activeTab === tab.id
                          ? "border-primary-500 text-primary-600"
                          : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="py-2 sm:py-4">
                {activeTab === 'overview' && (
                  <div className="prose max-w-none">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-neutral-800 mb-4 sm:mb-6">
                      Tour Overview
                    </h2>
                    <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-6 sm:mb-8">
                      {description}
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
                      <div className="space-y-4">
                        <h3 className="text-lg sm:text-xl font-heading font-semibold text-neutral-800">
                          Tour Highlights
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                            <span className="text-sm sm:text-base text-neutral-700">Expert local guides</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                            <span className="text-sm sm:text-base text-neutral-700">Small group sizes</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                            <span className="text-sm sm:text-base text-neutral-700">Handpicked accommodations</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg sm:text-xl font-heading font-semibold text-neutral-800">
                          What&apos;s Included
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                            <span className="text-sm sm:text-base text-neutral-700">All accommodation</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                            <span className="text-sm sm:text-base text-neutral-700">Professional guides</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                            <span className="text-sm sm:text-base text-neutral-700">Transportation during tour</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'itinerary' && <TourItinerary tour={tour} />}
                {activeTab === 'reviews' && <TourReviews tour={tour} />}
                {activeTab === 'gallery' && <TourGallery tour={tour} />}
              </div>
            </div>

            {/* Right Sidebar - Booking Widget */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8">
                <BookingWidget tour={tour} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};