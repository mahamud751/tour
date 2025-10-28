'use client';

import { useState } from 'react';
import { BlogCard } from '@/components/shared/BlogCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { sampleBlogs, blogCategories, getFeaturedBlogs } from '@/lib/blogData';
import { Search, TrendingUp, BookOpen, Sparkles, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter blogs based on category and search
  const filteredBlogs = sampleBlogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlogs = getFeaturedBlogs();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb items={[{ label: 'Blog' }]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-coral-50 opacity-60" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-coral-100 rounded-full blur-3xl opacity-20" />

        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-primary-700 font-semibold text-sm">Travel Stories & Insights</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-800 mb-6 leading-tight">
            Roamio
            <span className="block mt-2 bg-gradient-to-r from-primary-600 to-coral-500 bg-clip-text text-transparent">
              Travel Blog
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Discover travel guides, destination tips, adventure stories, and expert advice for your next journey
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Posts Section */}
        {featuredBlogs.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="heading-secondary">Featured Stories</h2>
                <p className="body-small text-neutral-500">Handpicked articles you shouldn&apos;t miss</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBlogs.map(blog => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
          </section>
        )}

        {/* Search & Filter Section */}
        <div className="card-elevated p-6 md:p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Search */}
            <div className="relative">
              <label className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search Articles
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white hover:border-neutral-300"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white hover:border-neutral-300 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.25rem'
                }}
              >
                <option value="All">All Categories</option>
                {blogCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div>
            <p className="text-sm font-semibold text-neutral-700 mb-3">Quick Filters</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  selectedCategory === 'All'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                )}
              >
                All
              </button>
              {blogCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* All Posts Section */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-coral-500 to-coral-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="heading-secondary">
                {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
              </h2>
              <p className="body-small text-neutral-500">
                {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} found
              </p>
            </div>
          </div>

          {filteredBlogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map(blog => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-neutral-400" />
              </div>
              <h3 className="heading-tertiary text-neutral-900 mb-3">No Articles Found</h3>
              <p className="body-base text-neutral-600 mb-6 max-w-md mx-auto">
                We couldn&apos;t find any articles matching your search. Try adjusting your filters or search terms.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="bg-primary-500 text-white hover:bg-primary-600"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 py-16 px-4 mt-16">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Never Miss an Adventure
          </h2>
          <p className="text-primary-50 text-lg mb-8 leading-relaxed">
            Subscribe to our newsletter and get the latest travel stories, tips, and destination guides delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-primary-600 hover:bg-neutral-100 px-8 py-4 h-auto font-semibold shadow-xl whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}