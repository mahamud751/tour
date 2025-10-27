import { Tour, Testimonial, FAQ, Review, ItineraryDay } from '@/types';
import { Phone, Mail, MessageCircle, MapPin, Globe, Users, Star, Award } from 'lucide-react';

// Mock itinerary data that can be reused across tours
export const mockItinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Arrival and Welcome',
    description: 'Arrive at your destination where our representative will greet you. Transfer to your hotel and enjoy a welcome dinner with your group.',
    activities: [
      { type: 'transfer', time: '3:00 PM', description: 'Airport pickup' },
      { type: 'food', time: '7:00 PM', description: 'Welcome dinner' },
      { type: 'hotel', time: 'Overnight', description: 'Luxury hotel stay' }
    ]
  },
  {
    day: 2,
    title: 'City Exploration and Cultural Immersion',
    description: 'Discover the rich history and culture of the city with a guided tour of key landmarks and hidden gems.',
    activities: [
      { type: 'tour', time: '9:00 AM', description: 'Guided city tour' },
      { type: 'food', time: '1:00 PM', description: 'Local cuisine lunch' },
      { type: 'tour', time: '3:00 PM', description: 'Museum visit' }
    ]
  },
  {
    day: 3,
    title: 'Nature Adventure',
    description: 'Embark on an exciting outdoor adventure through breathtaking natural landscapes.',
    activities: [
      { type: 'tour', time: '8:00 AM', description: 'Hiking expedition' },
      { type: 'food', time: '12:30 PM', description: 'Picnic lunch' },
      { type: 'tour', time: '2:00 PM', description: 'Wildlife spotting' }
    ]
  }
];

// Updated tours with high-quality destination images
export const mockTours: Tour[] = [
  {
    id: '1',
    title: 'Bali Paradise Adventure',
    description: 'Experience the beautiful beaches and cultural wonders of Bali with our expert guides. Discover hidden temples, lush rice terraces, and vibrant local markets in this tropical paradise.',
    photo: 'https://media.zenfs.com/en/aol_the_independent_us_877/648eeaeb5642aaad30ebe299a3503457', // Lush Bali terraces
    price: 899,
    city: 'Bali',
    address: 'Denpasar, Bali',
    distance: '5km from center',
    maxGroupSize: 15,
    reviews: [
      { id: '1', username: 'Sarah Johnson', rating: 5, reviewText: 'Absolutely incredible experience! The guides were knowledgeable and the itinerary was perfectly paced.', createdAt: '2024-01-15' },
      { id: '2', username: 'Mike Chen', rating: 4, reviewText: 'Great tour overall. The accommodations were comfortable and the activities were well-organized.', createdAt: '2024-01-10' },
    ],
    avgRating: 4.5,
    featured: true,
    duration: '7 Days',
    season: 'All Year',
    itinerary: mockItinerary
  },
  {
    id: '2',
    title: 'Swiss Alpine Expedition',
    description: 'Discover the majestic Swiss Alps with breathtaking views and charming mountain villages. Perfect for adventure seekers and nature lovers.',
    photo: 'https://i0.wp.com/loveatfirstflighttravel.com/wp-content/uploads/2025/01/2419307.jpeg?fit=1024%2C749&ssl=1', // Majestic Interlaken peaks
    price: 1299,
    city: 'Interlaken',
    address: 'Bernese Oberland',
    distance: '2km from center',
    maxGroupSize: 12,
    reviews: [
      { id: '3', username: 'Emma Davis', rating: 5, reviewText: 'Breathtaking views and excellent hiking routes!', createdAt: '2024-01-08' },
    ],
    avgRating: 4.8,
    featured: true,
    duration: '5 Days',
    season: 'Summer',
    itinerary: mockItinerary
  },
  {
    id: '3',
    title: 'Japanese Cultural Journey',
    description: 'Immerse yourself in ancient traditions and modern wonders of Japan. From Tokyo to Kyoto, experience the perfect blend of old and new.',
    photo: 'https://static.japan-food.guide/uploads/article/cover_image/000/000/545/8afb681f50e24ee561d8f70ba397b2bc5788b717e1019057a3dbe82d4bbaef85/eye_catch_29747378_s.jpg?1759897950', // Kyoto temple with blossoms
    price: 1599,
    city: 'Kyoto',
    address: 'Kansai Region',
    distance: '3km from center',
    maxGroupSize: 10,
    reviews: [
      { id: '4', username: 'David Kim', rating: 5, reviewText: 'Cultural immersion at its best! The tea ceremony was unforgettable.', createdAt: '2024-01-05' },
    ],
    avgRating: 4.7,
    featured: true,
    duration: '10 Days',
    season: 'Spring/Fall',
    itinerary: mockItinerary
  },
  {
    id: '4',
    title: 'Greek Island Hopping',
    description: 'Sail through the stunning Greek islands and experience Mediterranean paradise. Crystal clear waters and ancient history await.',
    photo: 'https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/030/134/original/1daab9b4bf789e5eb219cbc35c713d5d/article-greece-santorini-sea-view.jpg', // Iconic Santorini whites & blues
    price: 1099,
    city: 'Santorini',
    address: 'Cyclades Islands',
    distance: '1km from center',
    maxGroupSize: 20,
    reviews: [
      { id: '5', username: 'Lisa Wang', rating: 5, reviewText: 'Island paradise! The sunsets in Santorini were magical.', createdAt: '2024-01-03' },
    ],
    avgRating: 4.8,
    featured: true,
    duration: '8 Days',
    season: 'Summer',
    itinerary: mockItinerary
  },
  {
    id: '5',
    title: 'Italian Renaissance Tour',
    description: 'Explore the art, history, and cuisine of Italy\'s most beautiful cities. A journey through Florence, Rome, and Venice.',
    photo: 'https://ca-times.brightspotcdn.com/dims4/default/fdbb142/2147483647/strip/true/crop/1200x630+0+77/resize/1200x630!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F35%2F4b%2Fe283cc4149658db755c1eb881b4a%2Fflorence-italty-sights-1.jpeg', // Florence Duomo & historic skyline
    price: 1399,
    city: 'Florence',
    address: 'Tuscany Region',
    distance: '4km from center',
    maxGroupSize: 15,
    reviews: [
      { id: '6', username: 'James Wilson', rating: 4, reviewText: 'Amazing food and art! The Vatican tour was incredible.', createdAt: '2024-01-01' },
    ],
    avgRating: 4.6,
    featured: true,
    duration: '9 Days',
    season: 'All Year',
    itinerary: mockItinerary
  },
  {
    id: '6',
    title: 'Thai Island Paradise',
    description: 'Relax on pristine beaches and explore vibrant marine life in Thailand. The ultimate tropical getaway.',
    photo: 'https://trovatrip.gumlet.io/public/static/611107917de7f00056d0322c/photos/1634723434099-humphrey-muleba-TejFa7VW5e4-unsplash', // Phuket turquoise paradise
    price: 799,
    city: 'Phuket',
    address: 'Andaman Coast',
    distance: '6km from center',
    maxGroupSize: 18,
    reviews: [
      { id: '7', username: 'Maria Garcia', rating: 5, reviewText: 'Perfect beach vacation! The snorkeling was amazing.', createdAt: '2023-12-28' },
    ],
    avgRating: 5.0,
    featured: true,
    duration: '6 Days',
    season: 'Winter',
    itinerary: mockItinerary
  }
];

// Mock reviews for fallback when tour doesn't have reviews
export const mockReviews: Review[] = [
  {
    id: '1',
    username: 'Sarah Johnson',
    rating: 5,
    reviewText: 'Absolutely incredible experience! The guides were knowledgeable and the itinerary was perfectly paced. Will definitely book with Roamio again.',
    createdAt: '2024-01-15',
    avatar: 'https://thumbs.dreamstime.com/b/happy-hiking-woman-portrait-adventure-summer-explore-backpack-excited-smile-fitness-explorer-girl-mountain-travel-270033904.jpg' // Happy adventure woman
  },
  {
    id: '2',
    username: 'Mike Chen',
    rating: 4,
    reviewText: 'Great tour overall. The accommodations were comfortable and the activities were well-organized. Only minor issue was the early morning starts.',
    createdAt: '2024-01-10',
    avatar: 'https://images.pexels.com/photos/11532766/pexels-photo-11532766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' // Photographer man
  },
  {
    id: '3',
    username: 'Emma Davis',
    rating: 5,
    reviewText: 'This tour exceeded all my expectations. The local experiences and cultural immersion were authentic and memorable. Highly recommended!',
    createdAt: '2024-01-05',
    avatar: 'https://www.shutterstock.com/image-photo/cruise-ship-vacation-woman-enjoying-600nw-529240987.jpg' // Elegant luxury woman
  }
];

// Full testimonials data 
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Adventure Traveler',
    avatar: 'https://thumbs.dreamstime.com/b/happy-hiking-woman-portrait-adventure-summer-explore-backpack-excited-smile-fitness-explorer-girl-mountain-travel-270033904.jpg', // Smiling hiker
    rating: 5,
    description: 'Roamio made our dream vacation to Bali absolutely perfect! The attention to detail, friendly guides, and unforgettable experiences made it truly special. Can\'t wait for our next adventure with Roamio!',
    location: 'New York, USA',
    trip: 'Bali Paradise Adventure'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Photography Enthusiast',
    avatar: 'https://images.pexels.com/photos/11532766/pexels-photo-11532766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Man with camera
    rating: 5,
    description: 'As a photographer, I\'m always looking for unique perspectives. Roamio exceeded my expectations with their off-the-beaten-path locations and expert local guides who knew all the hidden gems.',
    location: 'Toronto, Canada',
    trip: 'Japanese Cultural Journey'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Luxury Traveler',
    avatar: 'https://www.shutterstock.com/image-photo/cruise-ship-vacation-woman-enjoying-600nw-529240987.jpg', // Elegant on cruise
    rating: 4,
    description: 'The luxury stays curated by Roamio were exceptional. From 5-star resorts to boutique hotels, every accommodation was perfectly matched to our preferences. The personalized service was outstanding.',
    location: 'Madrid, Spain',
    trip: 'Greek Island Hopping'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Family Traveler',
    avatar: 'https://images.seattleschild.com/wp-content/uploads/2024/09/Murren-e1727644512104.jpg', // Family in mountains
    rating: 5,
    description: 'Traveling with kids can be challenging, but Roamio made it effortless. They handled all the logistics and provided family-friendly activities that everyone enjoyed. Highly recommended for families!',
    location: 'Seoul, South Korea',
    trip: 'Swiss Alpine Expedition'
  },
  {
    id: '5',
    name: 'Amanda Thompson',
    role: 'Solo Traveler',
    avatar: 'https://thumbs.dreamstime.com/b/happy-hiking-woman-portrait-adventure-summer-explore-backpack-excited-smile-fitness-explorer-girl-mountain-travel-270033904.jpg', // Solo adventure woman
    rating: 5,
    description: 'As a solo female traveler, safety is my top priority. Roamio provided excellent support throughout my journey. The group tours were well-organized and I made lifelong friends along the way.',
    location: 'London, UK',
    trip: 'Italian Renaissance Tour'
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Business Executive',
    avatar: 'https://media.istockphoto.com/id/1413766112/photo/successful-mature-businessman-looking-at-camera-with-confidence.jpg?s=612x612&w=0&k=20&c=NJSugBzNuZqb7DJ8ZgLfYKb3qPr2EJMvKZ21Sj5Sfq4=', // Professional exec
    rating: 4,
    description: 'After a stressful year, the Thai Island Paradise tour was exactly what I needed. Roamio\'s seamless planning allowed me to completely disconnect and recharge. The service was impeccable.',
    location: 'Sydney, Australia',
    trip: 'Thai Island Paradise'
  }
];

// Full FAQs data (with string IDs to match FAQ type)
export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I book a tour with Roamio?',
    answer: 'Booking with Roamio is simple! You can book directly through our website by selecting your desired tour, choose your dates and number of travelers, and complete the secure payment process. Alternatively, you can contact our travel experts who will help you plan and book your perfect trip.',
    category: 'Booking'
  },
  {
    id: '2',
    question: 'What is included in the tour price?',
    answer: 'Our tour prices typically include accommodation, guided tours, transportation during the tour, some meals as specified in the itinerary, and entrance fees to attractions. Flights, travel insurance, and personal expenses are usually not included. Each tour page has a detailed "What\'s Included" section for complete transparency.',
    category: 'Pricing'
  },
  {
    id: '3',
    question: 'Can I customize my travel itinerary?',
    answer: 'Absolutely! We specialize in creating personalized travel experiences. You can customize existing tours or work with our travel designers to create a completely bespoke itinerary tailored to your preferences, interests, and budget.',
    category: 'Customization'
  },
  {
    id: '4',
    question: 'What is your cancellation policy?',
    answer: 'We offer flexible cancellation policies that vary by tour. Generally, you can cancel up to 30 days before departure for a full refund. Some premium tours may have different terms. We always recommend purchasing travel insurance for complete peace of mind.',
    category: 'Cancellation'
  },
  {
    id: '5',
    question: 'Do you offer group discounts?',
    answer: 'Yes! We offer special discounts for groups of 6 or more people. Group discounts can range from 5% to 15% depending on the tour and group size. Contact our group travel specialists for customized quotes and special arrangements.',
    category: 'Group Travel'
  },
  {
    id: '6',
    question: 'What safety measures do you have in place?',
    answer: 'Your safety is our top priority. We work with certified guides, maintain small group sizes, conduct regular safety audits of our partners, and provide 24/7 emergency support. All our tours comply with local regulations and international safety standards.',
    category: 'Safety'
  },
  {
    id: '7',
    question: 'How far in advance should I book my tour?',
    answer: 'We recommend booking 2-3 months in advance for the best availability and prices, especially for popular destinations and peak seasons. Some exclusive tours require booking 6+ months ahead. Last-minute bookings are sometimes available, subject to availability.',
    category: 'Booking'
  },
  {
    id: '8',
    question: 'Do you offer travel insurance?',
    answer: 'Yes, we partner with leading travel insurance providers to offer comprehensive coverage options. You can add travel insurance during the booking process, or our team can help you choose the right plan for your needs.',
    category: 'Insurance'
  }
];

// Contact methods data (icons imported for completeness, but assign in component if SSR issues)
export const contactMethods = [
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our travel experts',
    details: '+1 (555) 123-ROAM',
    action: 'Call now',
    color: 'text-green-600'
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us your questions and requests',
    details: 'hello@roamio.com',
    action: 'Send email',
    color: 'text-blue-600'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Instant help from our support team',
    details: 'Available 24/7',
    action: 'Start chat',
    color: 'text-purple-600'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Meet us at our headquarters',
    details: '123 Travel Street, San Francisco, CA',
    action: 'Get directions',
    color: 'text-orange-600'
  }
];

// Business hours data
export const businessHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' }
];

// Team members data with professional travel-themed headshots
export const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    bio: 'With over 15 years in the travel industry, Sarah founded Roamio to make extraordinary travel accessible to everyone.',
    email: 'sarah@roamio.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    image: 'https://plus.unsplash.com/premium_photo-1664369473031-7027676fa909?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' // Confident female exec
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Head of Operations',
    bio: 'Marcus ensures every tour operates seamlessly, drawing from his extensive experience in hospitality and logistics.',
    email: 'marcus@roamio.com',
    phone: '+1 (555) 123-4568',
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1567564967039-a5839aa2d89c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=435' // Professional male manager
  },
  {
    name: 'Elena Petrova',
    role: 'Travel Experience Designer',
    bio: 'Elena crafts immersive itineraries that blend local authenticity with luxury experiences.',
    email: 'elena@roamio.com',
    phone: '+1 (555) 123-4569',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/flagged/photo-1561539757-ad1cfcf512ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' // Creative travel woman
  },
  {
    name: 'David Kim',
    role: 'Adventure Specialist',
    bio: 'David is our expert in adventure travel, ensuring every expedition is both thrilling and safe.',
    email: 'david@roamio.com',
    phone: '+1 (555) 123-4570',
    location: 'Denver, CO',
    image: 'https://cdn.shopify.com/s/files/1/0578/3820/7151/files/gifts-for-outdoorsmen.jpg?v=1749427223' // Rugged adventure man
  }
];

// Stats data
export const stats = [
  {
    icon: Globe,
    number: '50+',
    label: 'Countries Covered',
    description: 'Exploring destinations across all continents'
  },
  {
    icon: Users,
    number: '10K+',
    label: 'Happy Travelers',
    description: 'Creating unforgettable memories worldwide'
  },
  {
    icon: Star,
    number: '4.9/5',
    label: 'Average Rating',
    description: 'Rated excellent by our travelers'
  },
  {
    icon: Award,
    number: '12',
    label: 'Awards Won',
    description: 'Recognized for excellence in travel'
  }
];

// Gallery images data with thematic high-res travel shots
export const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1658287413780-3032556b9ea4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=435', // Beach sunset
    alt: 'Beautiful beach sunset',
    category: 'Beach',
    cols: 2,
    rows: 2
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1541542684-be0c46417a12?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=415', // Mountain hike
    alt: 'Mountain hiking adventure',
    category: 'Adventure',
    cols: 1,
    rows: 1
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1531819177115-428566ccfb50?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=327', // City night
    alt: 'City skyline at night',
    category: 'Urban',
    cols: 1,
    rows: 2
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1657639272614-c472c3c643f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387', // Temple
    alt: 'Cultural temple visit',
    category: 'Cultural',
    cols: 1,
    rows: 1
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1664876080601-acf03b40c5e3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=580', // Resort pool
    alt: 'Luxury resort pool',
    category: 'Luxury',
    cols: 2,
    rows: 1
  },
  {
    id: 6,
    src: 'https://plus.unsplash.com/premium_photo-1661887943256-ccfa487d0dff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Safari
    alt: 'Wildlife safari experience',
    category: 'Wildlife',
    cols: 1,
    rows: 1
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1430132594682-16e1185b17c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Aurora
    alt: 'Northern lights spectacle',
    category: 'Nature',
    cols: 1,
    rows: 2
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1739193936611-2b3d01a8058e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // Market
    alt: 'Traditional local market',
    category: 'Cultural',
    cols: 2,
    rows: 1
  }
];