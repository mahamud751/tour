'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tour } from '@/types';
import { cn } from '@/lib/utils';
import { mockReviews } from '@/data/mockData';

interface TourReviewsProps {
  tour: Tour;
}

export const TourReviews = ({ tour }: TourReviewsProps) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  // Use tour.reviews if available, otherwise use mock reviews
  const [reviews, setReviews] = useState(tour.reviews?.length ? tour.reviews : mockReviews);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !reviewText.trim()) return;

    const newReview = {
      id: (reviews.length + 1).toString(),
      username: 'You',
      rating,
      reviewText,
      createdAt: new Date().toISOString().split('T')[0],
      avatar: ''
    };

    setReviews(prev => [newReview, ...prev]);
    setRating(0);
    setReviewText('');
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: (reviews.filter(r => r.rating === stars).length / reviews.length) * 100
  }));

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <Card className="card">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-5xl font-heading font-bold text-primary-600 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "w-5 h-5",
                      star <= Math.round(averageRating)
                        ? "text-amber-500 fill-current"
                        : "text-neutral-300"
                    )}
                  />
                ))}
              </div>
              <p className="text-neutral-600">
                Based on {reviews.length} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ stars, count, percentage }) => (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium w-4">{stars}</span>
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                  </div>
                  <div className="flex-1 bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-neutral-600 w-8">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write Review */}
      <Card className="card">
        <CardContent className="p-6">
          <h3 className="font-heading font-semibold text-xl mb-4">Write a Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Your Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "w-8 h-8",
                        star <= rating
                          ? "text-amber-500 fill-current"
                          : "text-neutral-300"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-neutral-700 mb-2">
                Your Review
              </label>
              <Textarea
                id="review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this tour..."
                rows={4}
                className="input-base"
              />
            </div>

            <Button 
              type="submit" 
              disabled={rating === 0 || !reviewText.trim()}
              className="btn-primary"
            >
              Submit Review
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="font-heading font-semibold text-xl">Recent Reviews</h3>
        
        {reviews.map((review) => (
          <Card key={review.id} className="card">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  {review.avatar ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={review.avatar}
                        alt={review.username}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <User className="w-6 h-6 text-primary-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h4 className="font-semibold text-neutral-800">
                      {review.username}
                    </h4>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-4 h-4",
                            star <= review.rating
                              ? "text-amber-500 fill-current"
                              : "text-neutral-300"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-neutral-500">
                      {review.createdAt}
                    </span>
                  </div>
                  
                  <p className="text-neutral-700 leading-relaxed">
                    {review.reviewText}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};