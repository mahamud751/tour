import { Clock, MapPin, Utensils, Hotel } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tour } from '@/types';
import { mockItinerary } from '@/data/mockData';

interface TourItineraryProps {
  tour: Tour;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'transfer':
      return <MapPin className="w-4 h-4 text-blue-500" />;
    case 'food':
      return <Utensils className="w-4 h-4 text-green-500" />;
    case 'hotel':
      return <Hotel className="w-4 h-4 text-purple-500" />;
    default:
      return <Clock className="w-4 h-4 text-orange-500" />;
  }
};

export const TourItinerary = ({ tour }: TourItineraryProps) => {
  // Use tour itinerary if available, otherwise fall back to mock data
  const itinerary = tour.itinerary || mockItinerary;
  
  return (
    <div className="space-y-6">
      <h2 className="heading-tertiary">Tour Itinerary</h2>
      
      <div className="space-y-8">
       {itinerary.map((day) => (
          <Card key={day.day} className="card">
            <CardContent className="p-6">
              {/* Day Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-heading font-bold text-lg">
                  {day.day}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-xl text-neutral-800 mb-2">
                    {day.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {day.description}
                  </p>
                </div>
              </div>

              {/* Activities */}
              <div className="space-y-4">
                <h4 className="font-semibold text-neutral-800">Daily Activities</h4>
                <div className="space-y-3">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-neutral-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-neutral-800">
                          {activity.description}
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-sm text-neutral-600 font-medium">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Important Notes */}
      <Card className="card border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <h3 className="font-heading font-semibold text-amber-800 mb-3">
            Important Information
          </h3>
          <ul className="space-y-2 text-amber-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
              <span>Please arrive at meeting points 15 minutes before scheduled time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
              <span>Comfortable walking shoes and weather-appropriate clothing recommended</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
              <span>Dietary restrictions must be communicated at least 48 hours in advance</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};