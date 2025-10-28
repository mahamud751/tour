'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { testimonials } from '@/data/mockData';

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  // Determine which testimonials to show - always return 3 for SSR
  const getVisibleTestimonials = () => {
    // Always show 3 items during SSR to match initial client render
    const count = !mounted ? 3 : 
      window.innerWidth < 768 ? 1 : 
      window.innerWidth < 1024 ? 2 : 3;

    return Array(count).fill(null).map((_, i) =>
      testimonials[(currentIndex + i) % testimonials.length]
    );
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-coral-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-coral-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
            <Quote className="w-4 h-4" />
            Traveler Stories
          </div>
          <h2 className="heading-secondary mb-6">
            What Our <span className="text-primary-600">Travelers Say</span>
          </h2>
          <p className="body-large text-neutral-600">
            Read what our travelers have to say in their own words. Real stories, real experiences
            from adventurers who have explored the world with Roamio.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <div className="hidden md:flex justify-between items-center absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 pointer-events-none">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 bg-white/80 backdrop-blur-sm border-neutral-300 hover:bg-white hover:border-primary-500 pointer-events-auto shadow-lg"
              onClick={prevTestimonial}
              onMouseEnter={() => setIsAutoPlaying(false)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 bg-white/80 backdrop-blur-sm border-neutral-300 hover:bg-white hover:border-primary-500 pointer-events-auto shadow-lg"
              onClick={nextTestimonial}
              onMouseEnter={() => setIsAutoPlaying(false)}
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Testimonials Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {visibleTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={true}
              />
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-primary-500 w-8"
                    : "bg-neutral-300 hover:bg-neutral-400"
                )}
                onMouseEnter={() => setIsAutoPlaying(false)}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-neutral-200/50">
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary-600 mb-2">4.9/5</div>
            <div className="text-sm text-neutral-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary-600 mb-2">10K+</div>
            <div className="text-sm text-neutral-600">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary-600 mb-2">98%</div>
            <div className="text-sm text-neutral-600">Would Recommend</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary-600 mb-2">50+</div>
            <div className="text-sm text-neutral-600">Countries Covered</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Individual Testimonial Card Component
interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
  isActive: boolean;
}

const TestimonialCard = ({ testimonial, isActive }: TestimonialCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className={cn(
      "card-elevated group transition-all duration-500",
      isActive ? "opacity-100 scale-100" : "opacity-0 scale-95",
      "hover:shadow-xl hover:border-primary-200"
    )}>
      <CardContent className="p-6">
        {/* Quote Icon */}
        <div className="mb-4">
          <Quote className="w-8 h-8 text-primary-200" />
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4",
                i < testimonial.rating
                  ? "text-amber-500 fill-current"
                  : "text-neutral-300"
              )}
            />
          ))}
        </div>

        {/* Testimonial Content */}
        <blockquote className="body-base text-neutral-700 mb-6 line-clamp-5">
          &quot;{testimonial.description}&quot;
        </blockquote>

        {/* Travel Info */}
        <div className="mb-6 p-3 bg-neutral-50 rounded-lg">
          <div className="text-xs text-neutral-600">
            <div className="font-medium text-primary-600">{testimonial.trip}</div>
            <div>{testimonial.location}</div>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                className={cn(
                  "object-cover transition-all duration-500",
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                )}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            {/* Online Indicator */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-heading font-semibold text-neutral-800 truncate">
              {testimonial.name}
            </h4>
            <p className="text-sm text-neutral-600 truncate">{testimonial.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};