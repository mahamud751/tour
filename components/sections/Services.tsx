'use client';

import { Bus, Plane, Hotel, Shield, HeartHandshake, Globe, LucideIcon } from 'lucide-react';
import { ServiceCard } from '@/components/shared/ServiceCard';

type ServiceData = {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  gradient: string;
};

// Self-contained services data with icon components
const services: ServiceData[] = [
  {
    title: 'Adventure Tours',
    description: 'Explore thrilling destinations with our expertly guided adventure tours. From hiking to water sports, we\'ve got your adrenaline covered.',
    icon: Bus,
    features: ['Expert Guides', 'Safety First', 'Unique Routes'],
    gradient: 'from-primary-500 to-primary-600'
  },
  {
    title: 'Travel Planning',
    description: 'Let us handle the details! Our travel experts craft personalized itineraries so you can focus on making memories.',
    icon: Plane,
    features: ['Custom Itineraries', '24/7 Support', 'Best Deals'],
    gradient: 'from-coral-500 to-coral-600'
  },
  {
    title: 'Luxury Stays',
    description: 'Experience ultimate comfort with our carefully selected accommodations. We partner with the finest hotels and resorts worldwide.',
    icon: Hotel,
    features: ['5-Star Hotels', 'Best Locations', 'Premium Amenities'],
    gradient: 'from-green-500 to-green-600'
  },
  {
    title: 'Travel Insurance',
    description: 'Travel with complete peace of mind. Our comprehensive insurance covers medical, trip cancellation, and lost belongings.',
    icon: Shield,
    features: ['Full Coverage', '24/7 Assistance', 'Quick Claims'],
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Local Experiences',
    description: 'Immerse yourself in local culture with authentic experiences curated by our network of local experts and guides.',
    icon: HeartHandshake,
    features: ['Cultural Tours', 'Local Cuisine', 'Hidden Gems'],
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    title: 'Global Destinations',
    description: 'Discover breathtaking destinations across all continents. From tropical paradises to urban adventures, your dream trip awaits.',
    icon: Globe,
    features: ['100+ Countries', 'All Seasons', 'Group & Solo'],
    gradient: 'from-cyan-500 to-cyan-600'
  }
];

export const Services = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Trusted Services
          </div>
          <h2 className="heading-secondary mb-6">
            Our <span className="text-primary-600">Best Services</span>
          </h2>
          <p className="body-large text-neutral-600">
            Empowering Your Journey: Unrivaled Services Tailored to Elevate Your Experience. 
            From adventure to luxury, we&apos;ve got every aspect of your travel covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              iconComponent={service.icon}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-coral-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="heading-tertiary mb-4">Ready to Start Your Adventure?</h3>
            <p className="body-base text-neutral-600 mb-6">
              Join thousands of satisfied travelers who trust Roamio for their dream vacations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3">
                Explore All Tours
              </button>
              <button className="btn-outline px-8 py-3">
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};