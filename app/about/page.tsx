import { Gallery } from '@/components/sections/Gallery';
import { Stats } from '@/components/about/Stats';
import { Team } from '@/components/about/Team';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="heading-primary text-white mb-6">
            Our Gallery
          </h1>
          <p className="body-large text-white/90 max-w-2xl mx-auto">
            Explore breathtaking moments from our travelers&apos; adventures. 
            Each photo tells a story of discovery, joy, and unforgettable experiences around the world.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding">
        <Gallery />
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-neutral-50">
        <Stats />
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <Team />
      </section>
    </div>
  );
}