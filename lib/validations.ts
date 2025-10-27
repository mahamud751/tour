import { z } from 'zod';

export const contactFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const searchFormSchema = z.object({
  location: z.string().min(1, 'Please enter a location'),
  minPrice: z.number().min(0, 'Price must be positive'),
  maxPrice: z.number().min(0, 'Price must be positive'),
}).refine((data) => data.maxPrice >= data.minPrice, {
  message: 'Max price must be greater than or equal to min price',
  path: ['maxPrice'],
});

export const reviewFormSchema = z.object({
  rating: z.number().min(1).max(5),
  reviewText: z.string().min(1, 'Review cannot be empty'),
});