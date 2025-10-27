'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Users, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface SearchParams {
  location: string;
  minPrice: string;
  maxPrice: string;
}

export const SearchBar = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { location, minPrice, maxPrice } = searchParams;

    if (!location || !minPrice || !maxPrice) {
      toast.error('Please fill all the fields');
      return;
    }

    if (parseInt(maxPrice) < parseInt(minPrice)) {
      toast.error('Maximum price must be greater than minimum price');
      return;
    }

    // Navigate to search results page
    const queryParams = new URLSearchParams({
      search: location,
      minPrice,
      maxPrice,
    }).toString();

    router.push(`/tours?${queryParams}`);
  };

  const handleInputChange = (field: keyof SearchParams, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Desktop Search */}
      <div className="hidden md:flex items-end gap-4 p-1">
        {/* Location */}
        <div className="flex-1 space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
            <Users className="w-4 h-4 text-primary-500" />
            Location
          </Label>
          <Input
            id="location"
            type="text"
            placeholder="Where are you going?"
            value={searchParams.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="input-base"
          />
        </div>

        {/* Min Price */}
        <div className="flex-1 space-y-2">
          <Label htmlFor="minPrice" className="flex items-center gap-2 text-sm font-medium">
            <Tag className="w-4 h-4 text-primary-500" />
            Min Price
          </Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="$0"
            value={searchParams.minPrice}
            onChange={(e) => handleInputChange('minPrice', e.target.value)}
            className="input-base"
          />
        </div>

        {/* Max Price */}
        <div className="flex-1 space-y-2">
          <Label htmlFor="maxPrice" className="flex items-center gap-2 text-sm font-medium">
            <Tag className="w-4 h-4 text-primary-500" />
            Max Price
          </Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="$1000"
            value={searchParams.maxPrice}
            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
            className="input-base"
          />
        </div>

        {/* Search Button */}
        <Button type="submit" size="lg" className="btn-primary h-12 px-8">
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mobile-location" className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary-500" />
              Location
            </Label>
            <Input
              id="mobile-location"
              type="text"
              placeholder="Where are you going?"
              value={searchParams.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mobile-minPrice" className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary-500" />
                Min Price
              </Label>
              <Input
                id="mobile-minPrice"
                type="number"
                placeholder="$0"
                value={searchParams.minPrice}
                onChange={(e) => handleInputChange('minPrice', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile-maxPrice" className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary-500" />
                Max Price
              </Label>
              <Input
                id="mobile-maxPrice"
                type="number"
                placeholder="$1000"
                value={searchParams.maxPrice}
                onChange={(e) => handleInputChange('maxPrice', e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full btn-primary">
          <Search className="w-5 h-5 mr-2" />
          Search Tours
        </Button>
      </div>
    </form>
  );
};