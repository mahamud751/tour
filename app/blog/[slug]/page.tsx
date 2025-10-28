// app/blog/[slug]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { BlogCard } from '@/components/shared/BlogCard';
import { getBlogBySlug, getRelatedBlogs, sampleBlogs } from '@/lib/blogData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Tag, Share2, Facebook, Twitter, Linkedin, BookOpen, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  return sampleBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(blog.id, blog.category);

  // Format date
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container mx-auto px-4 py-4 max-w-5xl">
          <Breadcrumb
            items={[
              { label: 'Blog', href: '/blog' },
              { label: blog.title }
            ]}
          />
        </div>
      </div>

      {/* Article Header */}
      <article className="bg-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Category Badge */}
          <div className="mb-6">
            <Link href={`/blog?category=${blog.category}`}>
              <Badge 
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white border-0 px-4 py-2 cursor-pointer shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
              >
                <Tag className="w-3.5 h-3.5" />
                {blog.category}
              </Badge>
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-neutral-900 mb-8 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-10 pb-8 border-b border-neutral-200">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50 ring-2 ring-primary-200">
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">{blog.author.name}</p>
                <p className="text-xs text-neutral-500">Author</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 px-3 py-2 bg-neutral-100 rounded-lg">
              <Calendar className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-neutral-700">{formattedDate}</span>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-2 px-3 py-2 bg-neutral-100 rounded-lg">
              <Clock className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-neutral-700">{blog.readTime}</span>
            </div>

            {/* Share Button */}
            <div className="ml-auto">
              <Button 
                variant="outline"
                className="rounded-lg border-2 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-2xl ring-1 ring-neutral-200">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div 
            className={cn(
              "prose prose-lg max-w-none",
              "prose-headings:font-heading prose-headings:font-bold prose-headings:text-neutral-900",
              "prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6",
              "prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4",
              "prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg",
              "prose-a:text-primary-600 prose-a:no-underline prose-a:font-medium hover:prose-a:underline",
              "prose-strong:text-neutral-900 prose-strong:font-semibold",
              "prose-ul:my-6 prose-li:text-neutral-700 prose-li:mb-2 prose-li:marker:text-primary-500",
              "prose-ol:my-6 prose-ol:marker:text-primary-600",
              "prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-neutral-700",
              "prose-code:text-primary-600 prose-code:bg-primary-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none",
              "prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:rounded-xl",
              "prose-img:rounded-xl prose-img:shadow-lg prose-img:ring-1 prose-img:ring-neutral-200"
            )}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags Section */}
          <div className="mt-16 pt-8 border-t border-neutral-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <h3 className="heading-tertiary">Related Topics</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-4 py-2 bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 text-neutral-700 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 transition-all cursor-pointer text-sm"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Social Share Section */}
          <div className="mt-8 pt-8 border-t border-neutral-200">
            <div className="card-elevated p-6 bg-gradient-to-br from-neutral-50 to-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-coral-500 to-coral-600 rounded-xl flex items-center justify-center shadow-md">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="heading-tertiary">Share this article</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button className="bg-sky-500 hover:bg-sky-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="bg-white py-16 border-t border-neutral-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-gradient-to-br from-coral-500 to-coral-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="heading-secondary">Related Articles</h2>
                <p className="body-small text-neutral-500">Continue reading on similar topics</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map(relatedBlog => (
                <BlogCard key={relatedBlog.id} {...relatedBlog} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Enjoyed This Article?
          </h2>
          <p className="text-primary-50 text-lg mb-8 leading-relaxed">
            Subscribe to our newsletter and never miss out on the latest stories and exclusive travel content
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