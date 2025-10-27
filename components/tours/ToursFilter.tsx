"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const ToursFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    priceRange: [
      parseInt(searchParams.get("minPrice") || "100"),
      parseInt(searchParams.get("maxPrice") || "2000"),
    ],
    duration: [] as string[],
    rating: 0,
    amenities: [] as string[],
  });

  const durations = [
    { id: "1-3", label: "1-3 Days" },
    { id: "4-7", label: "4-7 Days" },
    { id: "8-14", label: "8-14 Days" },
    { id: "15+", label: "15+ Days" },
  ];

  const amenitiesList = [
    { id: "guide", label: "Expert Guide" },
    { id: "meals", label: "Meals Included" },
    { id: "transport", label: "Transportation" },
    { id: "hotel", label: "Hotel Stay" },
    { id: "insurance", label: "Travel Insurance" },
    { id: "pickup", label: "Airport Pickup" },
  ];

  // Update URL params when filters change
  const updateURLParams = (newFilters: typeof filters) => {
    const params = new URLSearchParams(searchParams.toString());

    // Keep existing search params
    const searchLocation = searchParams.get("search");
    if (searchLocation) params.set("search", searchLocation);

    // Update price range
    params.set("minPrice", newFilters.priceRange[0].toString());
    params.set("maxPrice", newFilters.priceRange[1].toString());

    // Add other filters as needed
    if (newFilters.duration.length > 0) {
      params.set("duration", newFilters.duration.join(","));
    } else {
      params.delete("duration");
    }

    if (newFilters.rating > 0) {
      params.set("rating", newFilters.rating.toString());
    } else {
      params.delete("rating");
    }

    router.push(`/tours?${params.toString()}`, { scroll: false });
  };

  const handleDurationChange = (durationId: string) => {
    const newDuration = filters.duration.includes(durationId)
      ? filters.duration.filter((id) => id !== durationId)
      : [...filters.duration, durationId];

    const newFilters = { ...filters, duration: newDuration };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handleAmenityChange = (amenityId: string) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter((id) => id !== amenityId)
      : [...filters.amenities, amenityId];

    setFilters({ ...filters, amenities: newAmenities });
  };

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: value };
    setFilters(newFilters);
    // Debounce URL update for price slider
  };

  const handlePriceChangeComplete = () => {
    updateURLParams(filters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      priceRange: [100, 2000],
      duration: [],
      rating: 0,
      amenities: [],
    };
    setFilters(clearedFilters);

    // Keep only the search param if it exists
    const params = new URLSearchParams();
    const searchLocation = searchParams.get("search");
    if (searchLocation) {
      params.set("search", searchLocation);
    }
    router.push(`/tours${params.toString() ? "?" + params.toString() : ""}`, {
      scroll: false,
    });
  };

  const activeFilterCount = [
    filters.duration.length,
    filters.amenities.length,
    filters.rating > 0 ? 1 : 0,
    filters.priceRange[0] > 100 || filters.priceRange[1] < 2000 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <>
      {/* Mobile Filter Trigger */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </span>
          <span>↓</span>
        </Button>
      </div>

      {/* Filter Sidebar */}
      <div
        className={cn(
          "lg:block space-y-6",
          isMobileFilterOpen
            ? "fixed inset-0 z-50 bg-white p-6 overflow-auto"
            : "hidden"
        )}
      >
        {/* Mobile Header */}
        {isMobileFilterOpen && (
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h3 className="font-heading font-semibold text-xl">Filters</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}

        <Card className="card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-lg">
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-primary-600 hover:text-primary-700 h-auto p-0"
                >
                  Clear all
                </Button>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Price Range */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Price Range</Label>
              <div className="space-y-4">
                <Slider
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  onValueCommit={handlePriceChangeComplete}
                  min={100}
                  max={2000}
                  step={50}
                  className="my-6"
                />
                <div className="flex items-center justify-between text-sm text-neutral-600">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Duration</Label>
              <div className="space-y-3">
                {durations.map((duration) => (
                  <div
                    key={duration.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`duration-${duration.id}`}
                      checked={filters.duration.includes(duration.id)}
                      onCheckedChange={() => handleDurationChange(duration.id)}
                    />
                    <label
                      htmlFor={`duration-${duration.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {duration.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Minimum Rating</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      const newRating = filters.rating === star ? 0 : star;
                      const newFilters = { ...filters, rating: newRating };
                      setFilters(newFilters);
                      updateURLParams(newFilters);
                    }}
                    className={cn(
                      "px-3 py-2 rounded-lg border text-sm font-medium transition-all",
                      filters.rating >= star
                        ? "bg-amber-500 text-white border-amber-500"
                        : "bg-white text-neutral-700 border-neutral-300 hover:border-amber-300"
                    )}
                  >
                    {star}+
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Amenities</Label>
              <div className="space-y-3">
                {amenitiesList.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity.id}`}
                      checked={filters.amenities.includes(amenity.id)}
                      onCheckedChange={() => handleAmenityChange(amenity.id)}
                    />
                    <label
                      htmlFor={`amenity-${amenity.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {amenity.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Apply Button */}
            {isMobileFilterOpen && (
              <Button
                className="w-full btn-primary mt-6"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Apply Filters
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="card">
          <CardContent className="p-6">
            <h4 className="font-semibold text-neutral-800 mb-4">
              Why Choose Roamio?
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-neutral-600">Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-neutral-600">24/7 Customer Support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-neutral-600">Free Cancellation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-neutral-600">Verified Reviews</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
