import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { MapPin } from "lucide-react";

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: "Contact Us - Next Go | Get In Touch",
    description:
      "Get in touch with Next Go for travel assistance, bookings, and inquiries. Our team of travel experts is ready to help plan your next adventure.",
    openGraph: {
      title: "Contact Us - Next Go | Get In Touch",
      description:
        "Get in touch with Next Go for travel assistance, bookings, and inquiries. Our team of travel experts is ready to help plan your next adventure.",
      url: `${baseUrl}/contact`,
      siteName: "Next Go",
      images: [
        {
          url: `${baseUrl}/images/og-contact.jpg`,
          width: 1200,
          height: 630,
          alt: "Contact Next Go",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us - Next Go | Get In Touch",
      description:
        "Get in touch with Next Go for travel assistance, bookings, and inquiries. Our team of travel experts is ready to help plan your next adventure.",
      images: [`${baseUrl}/images/og-contact.jpg`],
    },
  };
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="heading-primary text-white mb-6">Contact Us</h1>
          <p className="body-large text-white/90 max-w-2xl mx-auto">
            Ready to start your next adventure? We&apos;re here to help! Get in
            touch with our travel experts for personalized assistance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-neutral-50">
        <div className="container-custom py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-secondary mb-6">
              Visit Our <span className="text-primary-600">Office</span>
            </h2>
            <p className="body-large text-neutral-600">
              Stop by our headquarters to meet the team and discuss your travel
              plans in person.
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="bg-neutral-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <p className="text-neutral-600 font-medium">Interactive Map</p>
              <p className="text-neutral-500 text-sm">Mirpur 10, Dhaka</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
