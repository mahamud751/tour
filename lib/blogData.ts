// lib/blogData.ts

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export const blogCategories = [
  "Destination Guides",
  "Travel Tips",
  "Adventure Stories",
  "Cultural Insights",
  "Sustainable Travel",
  "Seasonal Trips",
];

export const sampleBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Ultimate Guide to Cox's Bazar: Bangladesh's Endless Beach Paradise",
    slug: "ultimate-guide-coxs-bazar-bangladesh-endless-beach-paradise",
    excerpt:
      "Discover the world's longest natural sea beach with Next Go. From sunset strolls to island hopping, plan your perfect coastal escape.",
    content: `
      <p>Cox\'s Bazar, stretching 120km of golden sands, is Bangladesh\'s crown jewel for beach lovers. At Next Go, our tours unlock its hidden charms beyond the crowds.</p>
      
      <h2>Beachfront Bliss</h2>
      <p>Start your day with yoga at dawn, then relax under palm shades. Evenings call for fresh seafood barbecues as the sun dips into the Bay of Bengal.</p>
      
      <h2>Island Adventures</h2>
      <p>Boat to Sonadia or Chera Dwip for snorkeling in turquoise lagoons. Spot migratory birds or collect unique shells - nature\'s treasures await.</p>
      
      <h2>Local Culture</h2>
      <p>Visit Himchari waterfalls or the Buddhist temple at Ramu. Engage with Rakhine communities for authentic stories and crafts.</p>
      
      <h2>Next Go Tips</h2>
      <p>Book our 7-day Beach Paradise tour for seamless transfers and eco-stays. Travel light and let the waves wash away your worries.</p>
    `,
    category: "Destination Guides",
    image: "/images/blog/cox-bazar-beach.webp",
    author: {
      name: "Rahima Begum",
      avatar: "/images/blog/avatar-4.png",
    },
    date: "2025-10-25",
    readTime: "6 min read",
    tags: ["Cox's Bazar", "Beaches", "Island Hopping"],
    featured: true,
  },
  {
    id: 2,
    title: "Sundarbans Safari: Spotting Tigers and Mangrove Magic",
    slug: "sundarbans-safari-spotting-tigers-mangrove-magic",
    excerpt:
      "Venture into UNESCO's mangrove wilderness with Next Go. Learn safe wildlife viewing and eco-practices for an unforgettable expedition.",
    content: `
      <p>The Sundarbans, home to the Royal Bengal Tiger, is a biodiversity hotspot. Next Go\'s expert-guided cruises ensure thrilling yet responsible encounters.</p>
      
      <h2>Tiger Tracking</h2>
      <p>Glide through narrow creeks at dawn; listen for alarm calls from deer. Patience rewards with paw prints or distant roars - pure adrenaline.</p>
      
      <h2>Flora and Fauna</h2>
      <p>Beyond tigers, spot otters, crocodiles, and over 300 bird species. Honey collectors\' tales add cultural depth to your journey.</p>
      
      <h2>Eco-Safety</h2>
      <p>Our small boats minimize disturbance. Follow no-trace principles and support conservation through tour fees.</p>
      
      <h2>Next Go Experience</h2>
      <p>Join our 5-day Wildlife Expedition for luxury houseboat stays and onboard naturalists. The Sundarbans will change how you see nature.</p>
    `,
    category: "Adventure Stories",
    image: "/images/blog/sundarbans-tiger.webp",
    author: {
      name: "Faruq Ahmed",
      avatar: "/images/blog/avatar-1.png",
    },
    date: "2025-10-23",
    readTime: "7 min read",
    tags: ["Sundarbans", "Wildlife", "Eco-Tours"],
    featured: true,
  },
  {
    id: 3,
    title: "Sylhet's Tea Gardens: A Serene Escape into Green Hills",
    slug: "sylhet-tea-gardens-serene-escape-green-hills",
    excerpt:
      "Wander through rolling tea estates and misty waterfalls with Next Go. Unwind in Northeast Bangladesh's tranquil paradise.",
    content: `
      <p>Sylhet\'s lush tea gardens offer a peaceful retreat from city hustle. Next Go tours blend plantation walks with cultural immersion.</p>
      
      <h2>Tea Tasting Trails</h2>
      <p>Pluck fresh leaves and learn seven-stage processing. Savor aromatic brews at heritage bungalows overlooking endless green waves.</p>
      
      <h2>Natural Wonders</h2>
      <p>Hike to Jaflong\'s boulder-strewn river or Ratargul\'s submerged forest. Monsoon mists create ethereal photo ops.</p>
      
      <h2>Local Life</h2>
      <p>Visit Khasia tribal markets for pineapples and handicrafts. Homestays reveal the rhythm of rural Sylhet.</p>
      
      <h2>Next Go Itinerary</h2>
      <p>Our 5-day Tea Gardens Journey includes organic farm-to-cup experiences. Recharge your soul amid the hills.</p>
    `,
    category: "Destination Guides",
    image: "/images/blog/sylhet-tea-gardens.webp",
    author: {
      name: "Lubna Islam",
      avatar: "/images/blog/avatar-5.png",
    },
    date: "2025-10-20",
    readTime: "5 min read",
    tags: ["Sylhet", "Tea Gardens", "Nature Walks"],
    featured: true,
  },
  {
    id: 4,
    title: "Trekking Sajek Valley: Clouds, Tribes, and Hilltop Views",
    slug: "trekking-sajek-valley-clouds-tribes-hilltop-views",
    excerpt:
      "Conquer misty trails in the Chittagong Hill Tracts with Next Go. Meet indigenous communities and chase sunrises from the roof of Bangladesh.",
    content: `
      <p>Sajek Valley, at 2000ft, is a trekker\'s dream of bamboo bridges and cloud seas. Next Go ensures guided, culturally sensitive adventures.</p>
      
      <h2>Hill Hikes</h2>
      <p>From Khagrachari, jeep up to base camp then trek to viewpoints. Capture 360° panoramas where hills meet sky.</p>
      
      <h2>Tribal Encounters</h2>
      <p>Stay in Chakma bamboo huts; learn weaving or cooking jum cultivation. Respectful interactions foster genuine connections.</p>
      
      <h2>Seasonal Magic</h2>
      <p>Winter brings frost flowers; dry season, clear trails. Pack layers for chilly nights under starlit skies.</p>
      
      <h2>Next Go Safety</h2>
      <p>Our 6-day Hill Trek includes porters, permits, and emergency kits. Sajek\'s serenity awaits the bold.</p>
    `,
    category: "Adventure Stories",
    image: "/images/blog/sajek-valley-trek.jpg",
    author: {
      name: "Shafiqul Alam",
      avatar: "/images/blog/avatar-2.png",
    },
    date: "2025-10-18",
    readTime: "6 min read",
    tags: ["Sajek", "Trekking", "Tribal Culture"],
    featured: false,
  },
  {
    id: 5,
    title: "St. Martin's Island: Snorkeling in Bangladesh's Coral Haven",
    slug: "st-martins-island-snorkeling-bangladesh-coral-haven",
    excerpt:
      "Dive into turquoise waters and deserted beaches on Next Go's island escape. Bangladesh's only coral reef calls for underwater exploration.",
    content: `
      <p>St. Martin\'s, a 3-hour boat from Teknaf, is a slice of Maldives in Bangladesh. Next Go tours focus on sustainable marine adventures.</p>
      
      <h2>Reef Revelations</h2>
      <p>Snorkel among clownfish and sea turtles; colorful corals thrive in shallow bays. Guided dives reveal hidden underwater gardens.</p>
      
      <h2>Beach Hopping</h2>
      <p>Cycle to Narikeldia for coconuts or picnic on Chera Dip. No motor vehicles - pure, pedal-powered tranquility.</p>
      
      <h2>Marine Conservation</h2>
      <p>Avoid touching reefs; support turtle hatcheries. Next Go promotes reef-safe sunscreen and waste-free travel.</p>
      
      <h2>Island Itinerary</h2>
      <p>Our 8-day Coral Escape offers beachfront eco-resorts and boat charters. Disconnect and dive deep.</p>
    `,
    category: "Sustainable Travel",
    image: "/images/blog/st-martins-coral.jpg",
    author: {
      name: "Rahima Begum",
      avatar: "/images/blog/avatar-6.png",
    },
    date: "2025-10-15",
    readTime: "5 min read",
    tags: ["St. Martin's", "Snorkeling", "Coral Reefs"],
    featured: false,
  },
  {
    id: 6,
    title: "Bandarban's Hidden Gems: Jeep Safaris and Bamboo Lakes",
    slug: "bandarban-hidden-gems-jeep-safaris-bamboo-lakes",
    excerpt:
      "Roam the Chittagong Hills with Next Go: from Nilgiri's cloud views to tribal boat rides. Adventure meets serenity in Bangladesh's hill capital.",
    content: `
      <p>Bandarban pulses with Mro and Marma heritage amid rugged peaks. Next Go curates offbeat routes for authentic hill country vibes.</p>
      
      <h2>Jeep Thrills</h2>
      <p>Bounce along mountain roads to viewpoints; stop for bamboo groves swaying in the breeze. Adrenaline with scenic payoffs.</p>
      
      <h2>Lake Escapes</h2>
      <p>Paddle dugout canoes on serene Sangu or Keokradong. Fishing or floating - choose your pace in nature\'s lap.</p>
      
      <h2>Cultural Immersion</h2>
      <p>Explore bazaars for bamboo crafts; join festivals if timed right. Homestays share stories around evening fires.</p>
      
      <h2>Next Go Routes</h2>
      <p>Our 7-day Hill Country Adventure includes all-terrain access and local feasts. Hills heal the wandering soul.</p>
    `,
    category: "Cultural Insights",
    image: "/images/blog/bandarban-hills.webp",
    author: {
      name: "Faruq Ahmed",
      avatar: "/images/blog/avatar-3.png",
    },
    date: "2025-10-12",
    readTime: "6 min read",
    tags: ["Bandarban", "Jeep Safaris", "Hill Tribes"],
    featured: false,
  },
];

// Helper functions
export function getFeaturedBlogs(): BlogPost[] {
  return sampleBlogs.filter((blog) => blog.featured);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return sampleBlogs.find((blog) => blog.slug === slug);
}

export function getBlogsByCategory(category: string): BlogPost[] {
  return sampleBlogs.filter((blog) => blog.category === category);
}

export function getRelatedBlogs(
  currentBlogId: number,
  category: string,
  limit: number = 3
): BlogPost[] {
  return sampleBlogs
    .filter((blog) => blog.id !== currentBlogId && blog.category === category)
    .slice(0, limit);
}
