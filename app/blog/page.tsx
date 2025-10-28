export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: "Travel Blog - Next Go | Travel Guides & Stories",
    description:
      "Discover travel guides, destination tips, adventure stories, and expert advice for your next journey with Next Go.",
    openGraph: {
      title: "Travel Blog - Next Go | Travel Guides & Stories",
      description:
        "Discover travel guides, destination tips, adventure stories, and expert advice for your next journey with Next Go.",
      url: `${baseUrl}/blog`,
      siteName: "Next Go",
      images: [
        {
          url: `${baseUrl}/images/og-blog.jpg`,
          width: 1200,
          height: 630,
          alt: "Next Go Travel Blog",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Travel Blog - Next Go | Travel Guides & Stories",
      description:
        "Discover travel guides, destination tips, adventure stories, and expert advice for your next journey with Next Go.",
      images: [`${baseUrl}/images/og-blog.jpg`],
    },
  };
}

import dynamic from "next/dynamic";

// Dynamically import the client component
const BlogClientContent = dynamic(() => import("./blog-client-content"), {
  loading: () => (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        <p className="mt-4 text-neutral-600">Loading blog...</p>
      </div>
    </div>
  ),
});

export default function BlogPage() {
  return <BlogClientContent />;
}
