import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculate average rating
export const calculateAvgRating = (reviews: { rating: number }[]): { avgRating: number; totalRating: number } => {
  if (!reviews || reviews.length === 0) {
    return { avgRating: 0, totalRating: 0 };
  }
  
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const avgRating = totalRating / reviews.length;
  
  return { avgRating: Number(avgRating.toFixed(1)), totalRating: reviews.length };
};

// Format price
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};