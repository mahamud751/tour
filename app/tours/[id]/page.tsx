import { notFound } from "next/navigation";
import { TourDetails } from "@/components/tours/TourDetails";
import { Tour } from "@/types";
import { TourService } from "@/lib/services/tourService";

interface TourPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TourPage({ params }: TourPageProps) {
  // In Next.js 16, we need to await the params Promise
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Fetch the tour directly from the database instead of making an API call
  let tour: Tour | null = null;

  try {
    console.log("Fetching tour directly from database with ID:", id);
    tour = await TourService.getTourById(id) as Tour | null;
    console.log("Tour fetched from database:", tour);
  } catch (error) {
    console.error("Error fetching tour from database:", error);
  }

  if (!tour) {
    console.log("Tour not found, showing 404");
    notFound();
  }

  return <TourDetails tour={tour} />;
}

// Generate static params for build time
export async function generateStaticParams() {
  // For now, we'll return an empty array since we're fetching from the database
  // In a production app, you might want to fetch all tour IDs here
  return [];
}

// Generate metadata for SEO
export async function generateMetadata({ params }: TourPageProps) {
  // In Next.js 16, we need to await the params Promise
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  // Fetch the tour directly from the database instead of making an API call
  let tour: Tour | null = null;

  try {
    console.log("Fetching tour for metadata directly from database with ID:", id);
    tour = await TourService.getTourById(id) as Tour | null;
    console.log("Tour for metadata fetched from database:", tour);
  } catch (error) {
    console.error("Error fetching tour for metadata from database:", error);
  }

  if (!tour) {
    return {
      title: "Tour Not Found",
    };
  }

  // Create a structured description
  const description = `${tour.description.substring(
    0,
    150
  )}... Book now with Next Go for the best travel experience.`;

  // Use the NEXT_PUBLIC_BASE_URL for OG image
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3061}`;
  const ogImage = `${baseUrl}/api/og/tour/${id}`;

  return {
    title: `${tour.title} - Next Go`,
    description: description,
    openGraph: {
      title: `${tour.title} - Next Go`,
      description: description,
      url: `${baseUrl}/tours/${id}`,
      siteName: "Next Go",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.title} - Next Go`,
      description: description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}/tours/${id}`,
    },
  };
}