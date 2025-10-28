'use client';

import Link from 'next/link';
import { BlogCard } from '@/components/shared/BlogCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getFeaturedBlogs } from '@/lib/blogData';

export const FeaturedBlogs = () => {
  const featuredBlogs = getFeaturedBlogs();

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-coral-50 text-coral-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Travel Stories
          </div>
          <h2 className="heading-secondary mb-6">
            Latest <span className="text-primary-600">Travel Insights</span>
          </h2>
          <p className="body-large text-neutral-600">
            Discover expert travel tips, destination guides, and inspiring stories 
            from fellow adventurers exploring the beauty of Bangladesh.
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredBlogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Button size="lg" variant="outline" asChild className="group">
            <Link href="/blog">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};