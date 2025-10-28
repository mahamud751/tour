'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  featured?: boolean;
}

export function BlogCard({
  title,
  slug,
  excerpt,
  image,
  category,
  author,
  date,
  readTime,
  featured = false
}: BlogCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card 
      className="card-elevated group overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Image Section */}
        <Link href={`/blog/${slug}`} className="block">
          <div className="relative overflow-hidden">
            <div className="aspect-[16/10] relative bg-neutral-200">
              <Image
                src={image}
                alt={title}
                fill
                className={cn(
                  "object-cover transition-all duration-700 group-hover:scale-110",
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Loading Skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
              )}
            </div>

            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-primary-500 hover:bg-primary-600 text-white border-0">
                <Tag className="w-3 h-3 mr-1" />
                {category}
              </Badge>
            </div>

            {/* Featured Badge */}
            {featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-coral-500 hover:bg-coral-600 text-white border-0">
                  Featured
                </Badge>
              </div>
            )}

            {/* Quick Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-6">
          {/* Title */}
          <Link href={`/blog/${slug}`}>
            <h3 className="heading-tertiary mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="body-small text-neutral-600 mb-4 line-clamp-3">
            {excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-200">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium text-neutral-700">
                {author.name}
              </span>
            </div>

            {/* Read More Button */}
            <Button 
              variant="ghost" 
              size="sm"
              asChild
              className={cn(
                "text-primary-600 hover:text-primary-700 hover:bg-transparent",
                "transition-transform duration-300",
                isHovered && "translate-x-1"
              )}
            >
              <Link href={`/blog/${slug}`}>
                <span className="hidden sm:inline">Read</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Background Pattern */}
        <div className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 pointer-events-none",
          "bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)]",
          isHovered && "opacity-100"
        )} />
      </CardContent>
    </Card>
  );
}