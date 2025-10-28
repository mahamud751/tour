import Link from "next/link";
import {
  Plane,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Newsletter } from "@/components/shared/Newsletter";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about#team" },
      { name: "Careers", href: "/" },
      { name: "Press Kit", href: "/" },
      { name: "Blog", href: "/blog" },
    ],
    services: [
      { name: "Adventure Tours", href: "/tours?type=adventure" },
      { name: "Luxury Travel", href: "/tours?type=luxury" },
      { name: "Group Tours", href: "/tours?type=group" },
      { name: "Custom Itineraries", href: "/" },
      { name: "Travel Insurance", href: "/" },
    ],
    support: [
      { name: "Help Center", href: "/" },
      { name: "Contact Us", href: "/contact" },
      { name: "Booking Terms", href: "/" },
      { name: "Privacy Policy", href: "/" },
      { name: "Cookie Policy", href: "/" },
    ],
    destinations: [
      { name: "Bali, Indonesia", href: "/tours?destination=bali" },
      { name: "Swiss Alps", href: "/tours?destination=swiss-alps" },
      { name: "Greek Islands", href: "/tours?destination=greek-islands" },
      { name: "Japan Culture", href: "/tours?destination=japan" },
      { name: "Italian Cities", href: "/tours?destination=italy" },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-sky-500",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: Youtube,
      href: "#",
      label: "YouTube",
      color: "hover:text-red-600",
    },
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Plane className="h-8 w-8 text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-primary-400/20 rounded-full scale-150 group-hover:scale-125 transition-transform duration-300" />
              </div>
              <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary-400 to-coral-400 bg-clip-text text-transparent">
                Next Go
              </span>
            </Link>

            <p className="text-neutral-400 leading-relaxed max-w-md text-sm md:text-base">
              Go where your heart roams. We create unforgettable travel
              experiences that connect you with the world&apos;s most beautiful
              destinations and cultures.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+8801603795302"
                className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm md:text-base"
              >
                <Phone className="w-4 h-4 flex-shrink-0 text-primary-400" />
                <span>+8801603795302</span>
              </a>
              <a
                href="mailto:nextGo@gmail.com"
                className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm md:text-base"
              >
                <Mail className="w-4 h-4 flex-shrink-0 text-primary-400" />
                <span>nextGo@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-neutral-400 text-sm md:text-base">
                <MapPin className="w-4 h-4 flex-shrink-0 text-primary-400 mt-1" />
                <span>Mirpur 10</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`p-2 bg-neutral-800 rounded-lg text-neutral-400 ${social.color} hover:bg-neutral-700 transition-all duration-300 hover:scale-110`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-white text-base md:text-lg">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2 group text-sm md:text-base"
                  >
                    <ArrowRight className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-white text-base md:text-lg">
              Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2 group text-sm md:text-base"
                  >
                    <ArrowRight className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-white text-base md:text-lg">
              Support
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2 group text-sm md:text-base"
                  >
                    <ArrowRight className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-white text-base md:text-lg">
              Top Destinations
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.destinations.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2 group text-sm md:text-base"
                  >
                    <ArrowRight className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Newsletter />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="text-neutral-400 text-xs md:text-sm">
              © {currentYear} Next Go. All rights reserved.
              <span className="hidden sm:inline mx-2">•</span>
              <span className="block sm:inline mt-1 sm:mt-0">
                Made with ❤️ for travelers
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-neutral-400">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-neutral-400 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="whitespace-nowrap">SSL Secure Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="whitespace-nowrap">Best Price Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="whitespace-nowrap">24/7 Customer Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="whitespace-nowrap">Verified Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
