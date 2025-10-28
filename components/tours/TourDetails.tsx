"use client";

import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { Star, MapPin, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { TourItinerary } from "@/components/tours/TourItinerary";
import { TourReviews } from "@/components/tours/TourReviews";
import { TourGallery } from "@/components/tours/TourGallery";
import { Tour } from "@/types";
import { cn } from "@/lib/utils";

interface TourDetailsProps {
  tour: Tour;
}

export const TourDetails = ({ tour }: TourDetailsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLiked, setIsLiked] = useState(false);

  console.log("TourDetails received tour data:", tour);

  const {
    id,
    title,
    description,
    city,
    address,
    reviews,
    avgRating,
    featured,
    duration = "7 Days",
    season = "All Year",
    price,
    maxGroupSize,
  } = tour;

  console.log("Destructured tour data:", { id, title, price, duration, season });

  const reviewCount = reviews?.length || 0;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: title,
    description: description,
    image: tour.photo.startsWith("http")
      ? tour.photo
      : `${baseUrl}${tour.photo}`,
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/tours/${id}`,
    },
    touristType: "AdventureTraveler",
    location: {
      "@type": "Place",
      name: city,
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressLocality: city,
      },
    },
    duration: duration,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: reviewCount,
    },
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "reviews", label: `Reviews (${reviewCount})` },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Image */}
        <div className="relative h-96 md:h-[500px] bg-neutral-200">
          <Image
            src={tour.photo}
            alt={`${title} hero image`}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Header Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container-custom">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featured && (
                      <Badge className="bg-primary-500 hover:bg-primary-600 border-0">
                        Featured
                      </Badge>
                    )}
                    <Badge
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm"
                    >
                      {season}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm"
                    >
                      {duration}
                    </Badge>
                  </div>

                  <h1 className="heading-primary text-white text-4xl md:text-5xl mb-2">
                    {title}
                  </h1>

                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {city}, {address}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-amber-500" />
                      <span>
                        {avgRating.toFixed(1)} ({reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart
                      className={cn("w-4 h-4", isLiked && "fill-current")}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Navigation Tabs */}
              <div className="border-b border-neutral-200">
                <nav className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
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
              <div className="py-4">
                {activeTab === "overview" && (
                  <div className="prose max-w-none">
                    <h2 className="heading-tertiary mb-4">Tour Overview</h2>
                    <p className="body-large text-neutral-700 leading-relaxed">
                      {description}
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="space-y-4">
                        <h3 className="font-heading font-semibold text-neutral-800">
                          Tour Highlights
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full" />
                            <span>Expert local guides</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full" />
                            <span>
                              Small group sizes ({maxGroupSize} people max)
                            </span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full" />
                            <span>Handpicked accommodations</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-heading font-semibold text-neutral-800">
                          What&apos;s Included
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full" />
                            <span>All accommodation</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full" />
                            <span>Professional guides</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full" />
                            <span>Transportation during tour</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "itinerary" && <TourItinerary tour={tour} />}
                {activeTab === "reviews" && <TourReviews tour={tour} />}
                {activeTab === "gallery" && <TourGallery tour={tour} />}
              </div>
            </div>

            {/* Right Sidebar - Booking Widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <BookingWidget tour={tour} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
