'use client';

import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    features: string[];
    gradient: string;
  };
  index: number;
  iconComponent?: LucideIcon;
}

export const ServiceCard = ({ service, iconComponent: IconComponent }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "card-elevated group cursor-pointer transition-all duration-500 hover:scale-105",
        "border-0 bg-gradient-to-br from-white to-neutral-50/50",
        "hover:shadow-2xl hover:border-primary-100"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-8">
        {/* Icon with Gradient Background */}
        <div className="relative mb-6">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500",
            "bg-gradient-to-r",
            service.gradient,
            isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"
          )}>
            {IconComponent ? (
              <IconComponent className="w-8 h-8 text-white" />
            ) : (
              <div className="text-white text-2xl font-bold">?</div>
            )}
          </div>
          
          {/* Floating decoration */}
          <div className={cn(
            "absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r opacity-0 transition-all duration-500",
            service.gradient,
            isHovered && "opacity-20 animate-pulse"
          )} />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="heading-tertiary text-neutral-800 group-hover:text-primary-600 transition-colors">
            {service.title}
          </h3>
          
          <p className="body-base text-neutral-600 leading-relaxed">
            {service.description}
          </p>

          {/* Features List */}
          <ul className="space-y-2">
            {service.features.map((feature, featureIndex) => (
              <li 
                key={`${service.title}-${featureIndex}`}
                className={cn(
                  "flex items-center gap-3 text-sm transition-all duration-300",
                  "text-neutral-500 group-hover:text-neutral-700",
                  isHovered && featureIndex === 0 && "delay-75",
                  isHovered && featureIndex === 1 && "delay-150",
                  isHovered && featureIndex === 2 && "delay-225"
                )}
              >
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full bg-current transition-all duration-300",
                  isHovered && "scale-150"
                )} />
                {feature}
              </li>
            ))}
          </ul>

          {/* Learn More Button */}
          <Button 
            variant="ghost" 
            className={cn(
              "mt-4 px-0 text-primary-600 hover:text-primary-700 hover:bg-transparent",
              "group-hover:translate-x-2 transition-transform duration-300"
            )}
          >
            Learn More
            <svg 
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>

        {/* Background Pattern */}
        <div className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 pointer-events-none",
          "bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]",
          isHovered && "opacity-100"
        )} />
      </CardContent>
    </Card>
  );
};