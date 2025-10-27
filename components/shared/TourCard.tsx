"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Users, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tour } from "@/types";

interface TourCardProps {
  tour: Tour;
}

export const TourCard = ({ tour }: TourCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    title,
    description,
    price,
    city,
    address,
    distance,
    maxGroupSize,
    reviews,
    avgRating,
    featured,
    duration = "7 Days",
    season = "All Year",
  } = tour;

  const reviewCount = reviews?.length || 0;

  return (
    <Card className="card group overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <div className="aspect-[4/3] relative bg-neutral-200">
            {tour.photo && tour.photo.startsWith("/") ? (
              <Image
                src={tour.photo}
                alt={`${tour.title} preview`}
                fill
                className={cn(
                  "object-cover transition-all duration-700 group-hover:scale-110",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                onError={() => setImageLoaded(true)}
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-neutral-400" />
              </div>
            )}

            {/* Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
            )}
          </div>

          {/* Overlay Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {featured && (
              <Badge className="bg-primary-500 hover:bg-primary-600 text-white border-0">
                Featured
              </Badge>
            )}
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              {season}
            </Badge>
          </div>

          {/* Like Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm",
              "hover:bg-white transition-all duration-300",
              isLiked ? "text-coral-500" : "text-neutral-400"
            )}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-all duration-300",
                isLiked && "fill-current scale-110"
              )}
            />
          </Button>

          {/* Quick Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{maxGroupSize}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs font-medium">{avgRating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
            <MapPin className="w-4 h-4" />
            <span>
              {city}, {address}
            </span>
          </div>

          {/* Title */}
          <h3 className="heading-tertiary mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="body-small text-neutral-600 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Rating and Reviews */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="text-sm font-medium text-neutral-700">
                  {avgRating.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-neutral-500">
                ({reviewCount} review{reviewCount !== 1 ? "s" : ""})
              </span>
            </div>
            <div className="text-sm text-neutral-500">{distance}</div>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-heading font-bold text-primary-600">
                ${price}
              </span>
              <span className="text-sm text-neutral-500">/person</span>
            </div>

            <Button asChild className="btn-primary">
              <Link href={`/tours/${tour.id}`}>Book Now</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
