"use client";

import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { TourCard } from "@/components/shared/TourCard";
import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { Tour } from "@/types";

interface ToursGridProps {
  tours?: Tour[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const ToursGrid = ({
  tours: initialTours,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: ToursGridProps) => {
  const [tours, setTours] = useState<Tour[]>(initialTours || []);

  // Update tours when initialTours prop changes
  useEffect(() => {
    if (initialTours) {
      setTours(initialTours);
    }
  }, [initialTours]);

  return (
    <div className="space-y-8">
      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>

      {/* No Results State */}
      {tours.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="heading-tertiary mb-2">No tours found</h3>
          <p className="text-neutral-600 mb-6">
            Try adjusting your search filters or browse our popular tours.
          </p>
          <Button variant="outline">Clear Filters</Button>
        </div>
      )}

      {/* Pagination */}
      {tours.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
