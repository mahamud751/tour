export interface Service {
  title: string;
  description: string;
  icon: 'Bus' | 'Plane' | 'Hotel' | 'Shield' | 'HeartHandshake' | 'Globe';
  features: string[];
  gradient: string;
}

export interface Activity {
  type: 'transfer' | 'food' | 'hotel' | 'tour';
  time: string;
  description: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: Activity[];
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  photo: string;
  price: number;
  city: string;
  address: string;
  distance: string;
  maxGroupSize: number;
  reviews: Review[];
  avgRating: number;
  featured?: boolean;
  duration?: string;
  season?: string;
  itinerary?: ItineraryDay[];
}

export interface Review {
  id: string;
  username: string;
  reviewText: string;
  rating: number;
  createdAt: string;
  avatar?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  description: string;
  location: string;
  trip: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string; 
}

export interface SearchParams {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ContactFormData {
  email: string;
  subject: string;
  message: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  guestSize: number;
  bookAt: string;
}

export interface ContactMethod {
  icon: React.ComponentType<{ className?: string }>;  // Lucide icons
  title: string;
  description: string;
  details: string;
  action: string;
  color: string;
}