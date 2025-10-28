import { Suspense } from "react";
import ToursClientPage from "./tours-client-page";

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: "Tours - Next Go | Book Your Dream Adventure",
    description:
      "Discover and book amazing tours around the world. Find the perfect adventure for your next vacation with Next Go.",
    openGraph: {
      title: "Tours - Next Go | Book Your Dream Adventure",
      description:
        "Discover and book amazing tours around the world. Find the perfect adventure for your next vacation with Next Go.",
      url: `${baseUrl}/tours`,
      siteName: "Next Go",
      images: [
        {
          url: `${baseUrl}/images/og-tours.jpg`,
          width: 1200,
          height: 630,
          alt: "Next Go Tours",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Tours - Next Go | Book Your Dream Adventure",
      description:
        "Discover and book amazing tours around the world. Find the perfect adventure for your next vacation with Next Go.",
      images: [`${baseUrl}/images/og-tours.jpg`],
    },
  };
}

export default function ToursPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-neutral-600">Loading tours...</p>
          </div>
        </div>
      }
    >
      <ToursClientPage />
    </Suspense>
  );
}
