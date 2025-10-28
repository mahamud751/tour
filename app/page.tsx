import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Gallery } from '@/components/sections/Gallery';
import { FeaturedTours } from '@/components/sections/FeaturedTours';
import { FeaturedBlogs } from '@/components/sections/FeaturedBlogs';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';

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