// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, MapPin, Compass } from "lucide-react";
import Head from "next/head";

export function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: "Page Not Found - Next Go",
    description:
      "Oops! The page you're looking for doesn't exist. Return to our homepage or explore our amazing tours.",
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: "Page Not Found - Next Go",
      description:
        "Oops! The page you're looking for doesn't exist. Return to our homepage or explore our amazing tours.",
      url: `${baseUrl}/404`,
      siteName: "Next Go",
      images: [
        {
          url: `${baseUrl}/images/og-404.jpg`,
          width: 1200,
          height: 630,
          alt: "Page Not Found - Next Go",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default function NotFound() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-coral-50 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-30 animate-float" />
          <div
            className="absolute bottom-20 left-10 w-64 h-64 bg-coral-100 rounded-full blur-3xl opacity-30 animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-20 animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-8 relative">
            {/* Large 404 Text */}
            <div className="relative inline-block">
              <h1 className="text-[120px] md:text-[180px] lg:text-[220px] font-heading font-bold leading-none">
                <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-coral-500 bg-clip-text text-transparent">
                  404
                </span>
              </h1>

              {/* Floating Compass Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full shadow-2xl flex items-center justify-center animate-pulse-slow">
                  <Compass
                    className="w-10 h-10 md:w-12 md:h-12 text-primary-600 animate-spin"
                    style={{ animationDuration: "8s" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-coral-50 text-coral-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-coral-100">
              <MapPin className="w-4 h-4" />
              Lost Your Way?
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Looks like you&apos;ve wandered off the beaten path. The page
              you&apos;re looking for doesn&apos;t exist or has been moved to a
              new destination.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" asChild className="btn-primary group">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="group border-2"
            >
              <Link href="/tours">
                <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Explore Tours
              </Link>
            </Button>
          </div>

          {/* Popular Links */}
          <div className="card-elevated p-8 bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="text-lg font-heading font-semibold text-neutral-900 mb-6 flex items-center justify-center gap-2">
              <Compass className="w-5 h-5 text-primary-600" />
              Quick Navigation
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-primary-50 transition-all group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Home className="w-6 h-6 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-600">
                  Home
                </span>
              </Link>

              <Link
                href="/tours"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-primary-50 transition-all group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-600">
                  Tours
                </span>
              </Link>

              <Link
                href="/blog"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-primary-50 transition-all group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-600">
                  Blog
                </span>
              </Link>

              <Link
                href="/contact"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-primary-50 transition-all group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-600">
                  Contact
                </span>
              </Link>
            </div>
          </div>

          {/* Help Text */}
          <p className="mt-8 text-sm text-neutral-500">
            Need assistance?{" "}
            <Link
              href="/contact"
              className="text-primary-600 hover:text-primary-700 font-medium hover:underline"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
