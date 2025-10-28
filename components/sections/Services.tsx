"use client";

import {
  Bus,
  Plane,
  Hotel,
  Shield,
  HeartHandshake,
  MapPin,
  LucideIcon,
} from "lucide-react";
import { ServiceCard } from "@/components/shared/ServiceCard";

type ServiceData = {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  gradient: string;
};

const services: ServiceData[] = [
  {
    title: "Adventure Tours",
    description:
      "Explore thrilling Bangladesh destinations with our expertly guided adventure tours. From hill treks in Sajek to wildlife safaris in Sundarbans, we've got your adrenaline covered.",
    icon: Bus,
    features: ["Expert Local Guides", "Safety First", "Unique Routes"],
    gradient: "from-primary-500 to-primary-600",
  },
  {
    title: "Travel Planning",
    description:
      "Let us handle the details! Our Bangladesh travel experts craft personalized itineraries so you can focus on making memories in Cox's Bazar, Sylhet, and beyond.",
    icon: Plane,
    features: ["Custom Itineraries", "24/7 Support", "Best Local Deals"],
    gradient: "from-coral-500 to-coral-600",
  },
  {
    title: "Eco-Friendly Stays",
    description:
      "Experience comfort with our carefully selected accommodations. We partner with the finest eco-resorts, heritage homes, and beachfront stays across Bangladesh.",
    icon: Hotel,
    features: ["Eco-Resorts", "Prime Locations", "Local Amenities"],
    gradient: "from-green-500 to-green-600",
  },
  {
    title: "Travel Insurance",
    description:
      "Travel with complete peace of mind. Our comprehensive insurance covers medical, trip cancellation, and lost belongings for your Bangladesh adventures.",
    icon: Shield,
    features: ["Full Coverage", "24/7 Assistance", "Quick Claims"],
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Local Experiences",
    description:
      "Immerse yourself in Bangladeshi culture with authentic experiences curated by our network of local experts and guides, from tea garden walks to tribal village visits.",
    icon: HeartHandshake,
    features: ["Cultural Tours", "Local Cuisine", "Hidden Gems"],
    gradient: "from-orange-500 to-orange-600",
  },
  {
    title: "Bangladesh Destinations",
    description:
      "Discover breathtaking spots across our beautiful country. From tropical beaches to misty hills, your dream local trip awaits with Next Go.",
    icon: MapPin,
    features: ["8 Divisions", "All Seasons", "Group & Solo"],
    gradient: "from-cyan-500 to-cyan-600",
  },
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
            Discover Bangladesh: Unrivaled Services Tailored to Elevate Your
            Local Journey. From adventure to culture, we&apos;ve got every
            aspect of your Bangladeshi travel covered.
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
            <h3 className="heading-tertiary mb-4">
              Ready to Explore Bangladesh?
            </h3>
            <p className="body-base text-neutral-600 mb-6">
              Join thousands of satisfied travelers who trust Next Go for their
              dream local vacations.
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
