import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { FeaturedTours } from "@/components/sections/FeaturedTours";
import { FeaturedBlogs } from "@/components/sections/FeaturedBlogs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: "Next Go - Go where your heart roams | Book Amazing Tours",
    description:
      "Discover and book amazing tours around the world with Next Go. Your travel starts here. Fly. Explore. Next Go.",
    openGraph: {
      title: "Next Go - Go where your heart roams | Book Amazing Tours",
      description:
        "Discover and book amazing tours around the world with Next Go. Your travel starts here. Fly. Explore. Next Go.",
      url: baseUrl,
      siteName: "Next Go",
      images: [
        {
          url: `${baseUrl}/images/og-home.jpg`,
          width: 1200,
          height: 630,
          alt: "Next Go - Go where your heart roams",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Next Go - Go where your heart roams | Book Amazing Tours",
      description:
        "Discover and book amazing tours around the world with Next Go. Your travel starts here. Fly. Explore. Next Go.",
      images: [`${baseUrl}/images/og-home.jpg`],
    },
  };
}

export default function Home() {
  return (
    <div className="space-y-20">
      <Hero />
      <Services />
      <FeaturedTours />
      <Gallery />
      <FeaturedBlogs />
      <Testimonials />
      <FAQ />
    </div>
  );
}
