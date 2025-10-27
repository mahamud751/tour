import { TourCard } from "@/components/shared/TourCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Tour } from "@/types";
import Link from "next/link";

export const FeaturedTours = async () => {
  // Fetch featured tours from API
  let featuredTours: Tour[] = [];

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/tours/featured`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (response.ok) {
      const data = await response.json();
      featuredTours = data.tours;
    }
  } catch (error) {
    console.error("Error fetching featured tours:", error);
    // Fallback to empty array
    featuredTours = [];
  }

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-current" />
            Featured Tours
          </div>
          <h2 className="heading-secondary mb-6">
            Discover <span className="text-primary-600">Featured Tours</span>
          </h2>
          <p className="body-large text-neutral-600">
            Embark on Unforgettable Journeys: Discover Our Featured Tours, Where
            Adventure Meets Extraordinary Experiences.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Button size="lg" className="btn-primary group" asChild>
            <Link href="/tours">
              View All Tours
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
