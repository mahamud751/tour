import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BackToTop } from "@/components/shared/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: "Next Go - Go where your heart roams",
    template: "%s | Next Go - Go where your heart roams",
  },
  description:
    "Your travel starts with Next Go. Fly. Explore. Next Go. Book amazing tours and create unforgettable memories.",
  keywords: ["travel", "tours", "adventure", "vacation", "booking", "tourism"],
  authors: [{ name: "Next Go" }],
  creator: "Next Go",
  publisher: "Next Go",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextgo.com", // Replace with your actual domain
    title: "Next Go - Go where your heart roams",
    description:
      "Your travel starts with Next Go. Fly. Explore. Next Go. Book amazing tours and create unforgettable memories.",
    siteName: "Next Go",
    images: [
      {
        url: "/images/og-image.jpg", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "Next Go - Go where your heart roams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Go - Go where your heart roams",
    description:
      "Your travel starts with Next Go. Fly. Explore. Next Go. Book amazing tours and create unforgettable memories.",
    images: ["/images/og-image.jpg"], // You'll need to add this image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://nextgo.com", // Replace with your actual domain
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        {/* Back to Top Button */}
        <BackToTop />

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
