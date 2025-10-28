import { Tour, Testimonial, FAQ, Review, ItineraryDay } from '@/types';
import { Phone, Mail, MessageCircle, MapPin, Globe, Users, Star, Award } from 'lucide-react';

// Mock itinerary data that can be reused across tours (kept generic but adaptable to Bangladesh contexts)
export const mockItinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Arrival and Welcome',
    description: 'Arrive at your destination where our representative will greet you. Transfer to your hotel and enjoy a welcome dinner with your group featuring local Bangladeshi cuisine.',
    activities: [
      { type: 'transfer', time: '3:00 PM', description: 'Airport or bus terminal pickup' },
      { type: 'food', time: '7:00 PM', description: 'Welcome dinner with fresh seafood or regional specialties' },
      { type: 'hotel', time: 'Overnight', description: 'Comfortable eco-resort or heritage stay' }
    ]
  },
  {
    day: 2,
    title: 'Local Exploration and Cultural Immersion',
    description: 'Discover the rich history and culture of the region with a guided tour of key landmarks and hidden gems.',
    activities: [
      { type: 'tour', time: '9:00 AM', description: 'Guided local tour' },
      { type: 'food', time: '1:00 PM', description: 'Authentic Bangladeshi lunch' },
      { type: 'tour', time: '3:00 PM', description: 'Cultural site visit' }
    ]
  },
  {
    day: 3,
    title: 'Nature Adventure',
    description: 'Embark on an exciting outdoor adventure through breathtaking natural landscapes unique to Bangladesh.',
    activities: [
      { type: 'tour', time: '8:00 AM', description: 'Hiking or boat expedition' },
      { type: 'food', time: '12:30 PM', description: 'Picnic with local fruits and snacks' },
      { type: 'tour', time: '2:00 PM', description: 'Wildlife or scenic spotting' }
    ]
  }
];

// Updated tours with Bangladesh-based destinations and Taka pricing
export const mockTours: Tour[] = [
  {
    id: '1',
    title: 'Cox\'s Bazar Beach Paradise',
    description: 'Experience the world\'s longest sea beach and vibrant coastal culture of Cox\'s Bazar. Relax on golden sands, explore nearby islands, and savor fresh seafood in this ultimate beach getaway.',
    photo: '/images/tour/01.jpg', // Cox's Bazar beach
    price: 15000,
    city: 'Cox\'s Bazar',
    address: 'Marine Drive, Cox\'s Bazar',
    distance: '2km from center',
    maxGroupSize: 15,
    reviews: [
      { id: '1', username: 'Fatima Rahman', rating: 5, reviewText: 'The beach is stunning! Guides were amazing, and the itinerary perfectly balanced relaxation and adventure.', createdAt: '2025-01-15' },
      { id: '2', username: 'Ahmed Khan', rating: 4, reviewText: 'Great value for money. Loved the sunset boat rides and local food experiences.', createdAt: '2025-01-10' },
    ],
    avgRating: 4.5,
    featured: true,
    duration: '7 Days',
    season: 'All Year',
    itinerary: mockItinerary
  },
  {
    id: '2',
    title: 'Sundarbans Wildlife Expedition',
    description: 'Venture into the UNESCO-listed Sundarbans mangrove forest for thrilling tiger safaris and boat cruises. Discover biodiversity hotspots and eco-adventures in Bangladesh\'s natural wonder.',
    photo: '/images/tour/02.jpg', // Sundarbans mangroves
    price: 20000,
    city: 'Khulna',
    address: 'Sundarbans National Park',
    distance: '10km from entry point',
    maxGroupSize: 12,
    reviews: [
      { id: '3', username: 'Ayesha Begum', rating: 5, reviewText: 'Unforgettable wildlife spotting! The eco-cruise was safe and informative.', createdAt: '2025-01-08' },
    ],
    avgRating: 4.8,
    featured: true,
    duration: '5 Days',
    season: 'Winter',
    itinerary: mockItinerary
  },
  {
    id: '3',
    title: 'Sylhet Tea Gardens Journey',
    description: 'Immerse in the lush tea estates and misty hills of Sylhet. Trek through rolling gardens, visit waterfalls, and experience the serene beauty of Northeast Bangladesh.',
    photo: '/images/tour/03.jpg', // Tea gardens
    price: 12000,
    city: 'Sylhet',
    address: 'Sreemangal Tea Estate',
    distance: '5km from center',
    maxGroupSize: 10,
    reviews: [
      { id: '4', username: 'Karim Hossain', rating: 5, reviewText: 'Tea tasting and hill treks were highlights. Sylhet\'s tranquility is magical.', createdAt: '2025-01-05' },
    ],
    avgRating: 4.7,
    featured: true,
    duration: '5 Days',
    season: 'All Year',
    itinerary: mockItinerary
  },
  {
    id: '4',
    title: 'Sajek Valley Hill Trek',
    description: 'Trek through the remote hills of Sajek Valley in the Chittagong Hill Tracts. Enjoy panoramic views, tribal villages, and cloud-kissed landscapes in this offbeat paradise.',
    photo: '/images/tour/04.jpg', // Hill valleys (adapt for Sajek)
    price: 18000,
    city: 'Khagrachari',
    address: 'Sajek Valley, Chittagong Hill Tracts',
    distance: '3km from base camp',
    maxGroupSize: 20,
    reviews: [
      { id: '5', username: 'Nasrin Akter', rating: 5, reviewText: 'Breathtaking views from the hills! The tribal cultural experiences were enriching.', createdAt: '2025-01-03' },
    ],
    avgRating: 4.8,
    featured: true,
    duration: '6 Days',
    season: 'Dry Season',
    itinerary: mockItinerary
  },
  {
    id: '5',
    title: 'St. Martin\'s Island Coral Escape',
    description: 'Escape to Bangladesh\'s only coral island, St. Martin\'s, for snorkeling in turquoise waters, beachcombing, and island hopping. A slice of tropical serenity.',
    photo: '/images/tour/05.jpg', // Coral island beach
    price: 25000,
    city: 'Teknaf',
    address: 'St. Martin\'s Island',
    distance: '1km from jetty',
    maxGroupSize: 15,
    reviews: [
      { id: '6', username: 'Rahul Islam', rating: 4, reviewText: 'Snorkeling was world-class. Island vibes are pure relaxation.', createdAt: '2025-01-01' },
    ],
    avgRating: 4.6,
    featured: true,
    duration: '8 Days',
    season: 'Summer',
    itinerary: mockItinerary
  },
  {
    id: '6',
    title: 'Bandarban Hill Country Adventure',
    description: 'Explore the rugged hills of Bandarban with jeep safaris, bamboo boating on lakes, and visits to indigenous communities. Adventure awaits in the Chittagong Hills.',
    photo: '/images/tour/06.jpg', // Hill country
    price: 16000,
    city: 'Bandarban',
    address: 'Nilgiri Hills',
    distance: '4km from center',
    maxGroupSize: 18,
    reviews: [
      { id: '7', username: 'Ruma Sultana', rating: 5, reviewText: 'Jeep rides through the hills were thrilling. Loved the local hospitality.', createdAt: '2024-12-28' },
    ],
    avgRating: 5.0,
    featured: true,
    duration: '7 Days',
    season: 'All Year',
    itinerary: mockItinerary
  }
];

// Mock reviews for fallback when tour doesn't have reviews (updated to Bangladesh context)
export const mockReviews: Review[] = [
  {
    id: '1',
    username: 'Fatima Rahman',
    rating: 5,
    reviewText: 'Roamio turned our Cox\'s Bazar trip into a dream! The beach activities and local guides were top-notch. Planning our next to Sundarbans already.',
    createdAt: '2025-01-15',
    avatar: '/images/testimonials/01.png' // Smiling woman
  },
  {
    id: '2',
    username: 'Ahmed Khan',
    rating: 4,
    reviewText: 'Excellent organization for the Sylhet tour. Tea gardens were lush, though early starts for hikes. Highly recommend for nature lovers.',
    createdAt: '2025-01-10',
    avatar: '/images/testimonial/03.jpeg' // Man in nature
  },
  {
    id: '3',
    username: 'Ayesha Begum',
    rating: 5,
    reviewText: 'Sajek Valley exceeded expectations! The hill treks and cultural immersion were authentic. Roamio handles all logistics seamlessly.',
    createdAt: '2025-01-05',
    avatar: '/images/testimonials/05.jpg' // Woman traveler
  }
];

// Full testimonials data (updated to Bangladesh trips and local/international names)
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Fatima Rahman',
    role: 'Beach Lover',
    avatar: '/images/testimonials/01.png',
    rating: 5,
    description: 'Roamio made our Cox\'s Bazar vacation unforgettable! The endless beach, sunset cruises, and attentive guides created magical moments. Eager for more Bangladesh adventures!',
    location: 'Dhaka, Bangladesh',
    trip: 'Cox\'s Bazar Beach Paradise'
  },
  {
    id: '2',
    name: 'Karim Hossain',
    role: 'Nature Photographer',
    avatar: '/images/testimonials/02.jpeg',
    rating: 5,
    description: 'As a photographer, Sundarbans offered endless shots of mangroves and wildlife. Roamio\'s eco-tours hit all the hidden spots with expert local knowledge.',
    location: 'Chittagong, Bangladesh',
    trip: 'Sundarbans Wildlife Expedition'
  },
  {
    id: '3',
    name: 'Nasrin Akter',
    role: 'Family Traveler',
    avatar: '/images/testimonials/03.jpeg',
    rating: 4,
    description: 'The Sylhet tea gardens were perfect for our family. Comfortable stays and kid-friendly activities made it stress-free. Roamio\'s service shines.',
    location: 'Sylhet, Bangladesh',
    trip: 'Sylhet Tea Gardens Journey'
  },
  {
    id: '4',
    name: 'Rahul Islam',
    role: 'Adventure Seeker',
    avatar: '/images/testimonials/04.jpeg',
    rating: 5,
    description: 'Sajek\'s hill treks were exhilarating! Roamio ensured safe paths and cultural respect. Best way to explore Bangladesh\'s highlands.',
    location: 'Khulna, Bangladesh',
    trip: 'Sajek Valley Hill Trek'
  },
  {
    id: '5',
    name: 'Ruma Sultana',
    role: 'Solo Explorer',
    avatar: '/images/testimonials/05.jpg',
    rating: 5,
    description: 'St. Martin\'s snorkeling was a highlight for solo travel. Roamio provided secure group options and made new friends easy to meet.',
    location: 'Rajshahi, Bangladesh',
    trip: 'St. Martin\'s Island Coral Escape'
  },
  {
    id: '6',
    name: 'Abdul Karim',
    role: 'Retired Traveler',
    avatar: '/images/testimonials/06.jpeg', 
    rating: 4,
    description: 'Bandarban\'s jeep safaris suited my pace perfectly. Roamio\'s thoughtful planning allowed relaxation amid the adventures.',
    location: 'Barisal, Bangladesh',
    trip: 'Bandarban Hill Country Adventure'
  }
];

// Full FAQs data (kept similar, with minor localization)
export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I book a tour with Roamio?',
    answer: 'Booking with Roamio is simple! You can book directly through our website by selecting your desired Bangladesh tour, choose your dates and number of travelers, and complete the secure payment in BDT. Alternatively, contact our Dhaka-based travel experts.',
    category: 'Booking'
  },
  {
    id: '2',
    question: 'What is included in the tour price?',
    answer: 'Our tour prices in BDT include accommodation, guided tours, transportation during the tour, some meals with local Bangladeshi flavors, and entrance fees. Flights/trains, insurance, and personal expenses are extra. Check each tour for details.',
    category: 'Pricing'
  },
  {
    id: '3',
    question: 'Can I customize my travel itinerary?',
    answer: 'Absolutely! We specialize in personalized Bangladesh experiences. Customize tours to Bangladesh destinations or create bespoke itineraries for places like Cox\'s Bazar or Sundarbans.',
    category: 'Customization'
  },
  {
    id: '4',
    question: 'What is your cancellation policy?',
    answer: 'Flexible policies: Cancel up to 30 days before for full refund in BDT. Premium tours may vary. We recommend travel insurance for Bangladesh trips.',
    category: 'Cancellation'
  },
  {
    id: '5',
    question: 'Do you offer group discounts?',
    answer: 'Yes! Discounts for groups of 6+ on Bangladesh tours, 5-15% off based on size. Contact for quotes on trips to Sylhet or Sajek.',
    category: 'Group Travel'
  },
  {
    id: '6',
    question: 'What safety measures do you have in place?',
    answer: 'Safety first: Certified guides, small groups, 24/7 support, and compliance with Bangladesh tourism standards. Eco-friendly practices for Sundarbans and hills.',
    category: 'Safety'
  },
  {
    id: '7',
    question: 'How far in advance should I book my tour?',
    answer: 'Book 2-3 months ahead for popular spots like Cox\'s Bazar. Exclusive hill tracts tours need 6+ months. Last-minute available seasonally.',
    category: 'Booking'
  },
  {
    id: '8',
    question: 'Do you offer travel insurance?',
    answer: 'Yes, partner with local providers for Bangladesh-focused coverage. Add during booking or get help from our team.',
    category: 'Insurance'
  }
];

// Contact methods data (localized to Bangladesh)
export const contactMethods = [
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak with our Dhaka travel experts',
    details: '+880 1711 123-ROAM',
    action: 'Call now',
    color: 'text-green-600'
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send questions about Bangladesh tours',
    details: 'hello@roamio.bd',
    action: 'Send email',
    color: 'text-blue-600'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Instant support for trip planning',
    details: 'Available 24/7',
    action: 'Start chat',
    color: 'text-purple-600'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Our office in the heart of Dhaka',
    details: 'House 123, Road 5, Dhanmondi, Dhaka-1205',
    action: 'Get directions',
    color: 'text-orange-600'
  }
];

// Business hours data (adjusted for Bangladesh time)
export const businessHours = [
  { day: 'Sunday - Thursday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Friday', hours: 'Closed (Prayer Day)' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' }
];

// Team members data with Bangladeshi professionals
export const teamMembers = [
  {
    name: 'Rahima Begum',
    role: 'Founder & CEO',
    bio: 'With 15+ years in Bangladesh tourism, Rahima founded Roamio to showcase our hidden gems like Sundarbans and tea gardens.',
    email: 'rahima@roamio.bd',
    phone: '+880 1711 123456',
    location: 'Dhaka',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' // Confident female exec
  },
  {
    name: 'Faruq Ahmed',
    role: 'Head of Operations',
    bio: 'Faruq manages seamless tours across Bangladesh, from Cox\'s Bazar to Chittagong Hills, with hospitality expertise.',
    email: 'faruq@roamio.bd',
    phone: '+880 1711 123457',
    location: 'Chittagong',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' // Professional male
  },
  {
    name: 'Lubna Islam',
    role: 'Travel Experience Designer',
    bio: 'Lubna crafts immersive itineraries blending Bangladesh\'s culture, nature, and adventure.',
    email: 'lubna@roamio.bd',
    phone: '+880 1711 123458',
    location: 'Sylhet',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b9b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' // Creative woman
  },
  {
    name: 'Shafiqul Alam',
    role: 'Adventure Specialist',
    bio: 'Shafiq ensures thrilling yet safe expeditions in Sajek, Bandarban, and beyond.',
    email: 'shafiq@roamio.bd',
    phone: '+880 1711 123459',
    location: 'Khagrachari',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' // Adventure man
  }
];

// Stats data (adjusted for Bangladesh focus)
export const stats = [
  {
    icon: Globe,
    number: '8+',
    label: 'Divisions Covered',
    description: 'Exploring Bangladesh\'s diverse regions'
  },
  {
    icon: Users,
    number: '5K+',
    label: 'Happy Travelers',
    description: 'Memories from local adventures'
  },
  {
    icon: Star,
    number: '4.8/5',
    label: 'Average Rating',
    description: 'Loved by Bangladesh explorers'
  },
  {
    icon: Award,
    number: '5',
    label: 'Awards Won',
    description: 'Excellence in local tourism'
  }
];

// Gallery images data with Bangladesh-themed high-res shots
export const galleryImages = [
  {
    id: 1,
    src: '/images/gallery/01.jpg', // Cox's Bazar beach
    alt: 'Endless sands of Cox\'s Bazar',
    category: 'Beach',
    cols: 2,
    rows: 2
  },
  {
    id: 2,
    src: '/images/gallery/02.webp', // Sundarbans boat
    alt: 'Aerial view of the great Sundarbans',
    category: 'Wildlife',
    cols: 1,
    rows: 1
  },
  {
    id: 3,
    src: '/images/gallery/03.png', // Sylhet night
    alt: 'Misty hills of Sylhet',
    category: 'Nature',
    cols: 1,
    rows: 2
  },
  {
    id: 4,
    src: '/images/gallery/04.png', // Sajek trek
    alt: 'Best view in Sajek Valley',
    category: 'Adventure',
    cols: 1,
    rows: 1
  },
  {
    id: 5,
    src: '/images/gallery/05.jpeg', // St. Martin's snorkel
    alt: 'Coral reefs at St. Martin\'s',
    category: 'Island',
    cols: 2,
    rows: 1
  },
  {
    id: 6,
    src: '/images/gallery/06.jpg', // Bandarban hills
    alt: 'Touching the clouds in Bandarban',
    category: 'Hills',
    cols: 1,
    rows: 1
  },
  {
    id: 7,
    src: '/images/gallery/07.webp', // Tea garden panorama
    alt: 'Lush tea estates in Sylhet',
    category: 'Cultural',
    cols: 1,
    rows: 2
  },
  {
    id: 8,
    src: '/images/gallery/08.jpg', // Mangrove sunset
    alt: 'Sunset over Sundarbans',
    category: 'Eco',
    cols: 2,
    rows: 1
  }
];