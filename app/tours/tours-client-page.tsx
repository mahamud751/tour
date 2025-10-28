"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { ToursGrid } from "@/components/tours/ToursGrid";
import { ToursFilter } from "@/components/tours/ToursFilter";
import { Tour } from "@/types";

export default function ToursClientPage() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("popular");
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 6,
  });

  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    fetchTours(currentPage);
  }, [currentPage]);

  const fetchTours = async (page: number = 1) => {
    setLoading(true);
    try {
      // Fetch all tours instead of just 6 per page
      const response = await fetch(`/api/tours?page=${page}&limit=all`);
      const data = await response.json();

      if (response.ok) {
        setTours(data.tours || []);
        setPagination(
          data.pagination || {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            itemsPerPage: 6,
          }
        );
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get search params from Hero search and filters
  const searchLocation = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice")
    ? parseInt(searchParams.get("minPrice")!)
    : 100;
  const maxPrice = searchParams.get("maxPrice")
    ? parseInt(searchParams.get("maxPrice")!)
    : 2000;
  const durationFilter = searchParams.get("duration") || "";
  const tourTypeFilter = searchParams.get("tourType") || "";
  const minRating = searchParams.get("rating")
    ? parseInt(searchParams.get("rating")!)
    : 0;

  // Filter tours based on search params
  const filteredTours = useMemo(() => {
    let toursList = tours;

    // Filter by location (search in title, city, or address)
    if (searchLocation) {
      toursList = toursList.filter(
        (tour) =>
          tour.title.toLowerCase().includes(searchLocation.toLowerCase()) ||
          tour.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
          tour.address.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    // Filter by price range
    toursList = toursList.filter(
      (tour) => tour.price >= minPrice && tour.price <= maxPrice
    );

    // Filter by duration
    if (durationFilter) {
      const durations = durationFilter.split(",");
      toursList = toursList.filter((tour) => {
        const durationDays = parseInt(tour.duration?.match(/\d+/)?.[0] || "0");
        return durations.some((duration) => {
          if (duration === "1-3") return durationDays >= 1 && durationDays <= 3;
          if (duration === "4-7") return durationDays >= 4 && durationDays <= 7;
          if (duration === "8-14")
            return durationDays >= 8 && durationDays <= 14;
          if (duration === "15+") return durationDays >= 15;
          return false;
        });
      });
    }

    // Filter by minimum rating
    if (minRating > 0) {
      toursList = toursList.filter((tour) => tour.avgRating >= minRating);
    }

    // Sort tours
    switch (sortBy) {
      case "price-low":
        toursList = [...toursList].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        toursList = [...toursList].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        toursList = [...toursList].sort((a, b) => b.avgRating - a.avgRating);
        break;
      case "duration":
        toursList = [...toursList].sort((a, b) => {
          const durationA = parseInt(a.duration?.match(/\d+/)?.[0] || "0");
          const durationB = parseInt(b.duration?.match(/\d+/)?.[0] || "0");
          return durationA - durationB;
        });
        break;
      default: // popular
        toursList = [...toursList].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
    }

    return toursList;
  }, [
    searchLocation,
    minPrice,
    maxPrice,
    durationFilter,
    minRating,
    sortBy,
    tours,
  ]);

  // Check if search was performed
  const hasSearchParams =
    searchLocation ||
    minPrice > 100 ||
    maxPrice < 2000 ||
    durationFilter ||
    tourTypeFilter ||
    minRating > 0;

  const handlePageChange = (page: number) => {
    // In a real implementation, you would update the URL and fetch new data
    fetchTours(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading tours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="heading-primary text-white mb-6">
            {hasSearchParams ? "Search Results" : "Discover Amazing Tours"}
          </h1>
          <p className="body-large text-white/90 max-w-2xl mx-auto">
            {hasSearchParams
              ? `Found ${filteredTours.length} tour${
                  filteredTours.length !== 1 ? "s" : ""
                } matching your search`
              : "Explore our handpicked collection of unforgettable adventures. From tropical paradises to mountain expeditions, find your perfect journey."}
          </p>
          {hasSearchParams && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {searchLocation && (
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  Location: {searchLocation}
                </span>
              )}
              {minPrice > 0 && (
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  Min: ${minPrice}
                </span>
              )}
              {maxPrice < Infinity && (
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  Max: ${maxPrice}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <ToursFilter />
            </aside>

            {/* Tours Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="heading-tertiary">
                    {hasSearchParams ? "Matching Tours" : "All Tours"}
                  </h2>
                  <p className="text-neutral-600">
                    {filteredTours.length} tour
                    {filteredTours.length !== 1 ? "s" : ""} available
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    className="input-base w-auto"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popular">Sort by: Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="duration">Duration</option>
                  </select>
                </div>
              </div>

              <ToursGrid
                tours={filteredTours}
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
