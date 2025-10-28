import { Gallery } from "@/components/sections/Gallery";
import { Stats } from "@/components/about/Stats";
import { Team } from "@/components/about/Team";

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: "About Us - Next Go | Our Story & Team",
    description:
      "Learn about Next Go's mission to connect travelers with unforgettable adventures. Meet our team of travel experts dedicated to creating amazing experiences.",
    openGraph: {
      title: "About Us - Next Go | Our Story & Team",
      description:
        "Learn about Next Go's mission to connect travelers with unforgettable adventures. Meet our team of travel experts dedicated to creating amazing experiences.",
      url: `${baseUrl}/about`,
      siteName: "Next Go",
      images: [
        {
          url: `${baseUrl}/images/og-about.jpg`,
          width: 1200,
          height: 630,
          alt: "Next Go About Us",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us - Next Go | Our Story & Team",
      description:
        "Learn about Next Go's mission to connect travelers with unforgettable adventures. Meet our team of travel experts dedicated to creating amazing experiences.",
      images: [`${baseUrl}/images/og-about.jpg`],
    },
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="heading-primary text-white mb-6">About Next Go</h1>
          <p className="body-large text-white/90 max-w-2xl mx-auto">
            Discover our story, mission, and the passionate team behind
            unforgettable travel experiences.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Our Journey in Photos</h2>
            <p className="body-large text-neutral-600 max-w-2xl mx-auto">
              Explore breathtaking moments from our travelers&apos; adventures.
              Each photo tells a story of discovery, joy, and unforgettable
              experiences around the world.
            </p>
          </div>
          <Gallery />
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">By The Numbers</h2>
            <p className="body-large text-neutral-600 max-w-2xl mx-auto">
              Our impact on travelers and destinations around the world
            </p>
          </div>
          <Stats />
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Meet Our Team</h2>
            <p className="body-large text-neutral-600 max-w-2xl mx-auto">
              The passionate professionals who make unforgettable travel
              experiences possible
            </p>
          </div>
          <Team />
        </div>
      </section>
    </div>
  );
}
