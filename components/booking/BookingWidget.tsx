"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, Shield, Check, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Tour } from "@/types";

interface BookingWidgetProps {
  tour: Tour;
}

export const BookingWidget = ({ tour }: BookingWidgetProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    guests: "1",
    fullName: "",
    phone: "",
  });

  const { price, maxGroupSize } = tour;

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const guestOptions = Array.from({ length: maxGroupSize }, (_, i) =>
    (i + 1).toString()
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication Required", {
        description: "Please log in to book a tour.",
      });
      router.push("/login");
      return;
    }

    setIsLoading(true);

    try {
      // Validate form
      if (!bookingData.date || !bookingData.fullName) {
        toast.error("Missing Information", {
          description: "Please fill in all required fields.",
        });
        setIsLoading(false);
        return;
      }

      // Validate date is not in the past
      const selectedDate = new Date(bookingData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        toast.error("Invalid Date", {
          description: "Please select a future date for your tour.",
        });
        setIsLoading(false);
        return;
      }

      // Prepare booking data
      const bookingPayload = {
        tourId: tour.id,
        fullName: bookingData.fullName,
        phone: bookingData.phone,
        guestSize: parseInt(bookingData.guests),
        bookAt: bookingData.date,
      };

      // Show loading toast
      const loadingToast = toast.loading("Processing your booking...");

      // Call our API to create the order
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingPayload),
      });

      const data = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success("🎉 Booking Confirmed!", {
          description: `Your booking for "${tour.title}" has been confirmed.`,
          duration: 8000,
          action: {
            label: "View Details",
            onClick: () => router.push("/dashboard/orders"),
          },
        });

        // Reset form on success
        setBookingData({
          date: "",
          guests: "1",
          fullName: "",
          phone: "",
        });
      } else {
        toast.error("Booking Failed", {
          description: data.error || "Something went wrong. Please try again.",
          duration: 5000,
          action: {
            label: "Retry",
            onClick: () => handleSubmit(e),
          },
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Unexpected Error", {
        description: "An unexpected error occurred. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const totalPrice = price * parseInt(bookingData.guests) + 49;

  return (
    <Card className="card-elevated sticky top-8">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>Book This Tour</span>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Available
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price */}
        <div className="text-center p-4 bg-primary-50 rounded-lg">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-3xl font-heading font-bold text-primary-600">
              ${price}
            </span>
            <span className="text-neutral-600">per person</span>
          </div>
          <p className="text-sm text-neutral-600 mt-1">+ taxes & fees</p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-500" />
              Select Date *
            </Label>
            <Input
              id="date"
              type="date"
              required
              value={bookingData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="input-base"
              min={new Date().toISOString().split("T")[0]} // Prevent past dates
              disabled={isLoading}
            />
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests" className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary-500" />
              Number of Guests *
            </Label>
            <Select
              value={bookingData.guests}
              onValueChange={(value) => handleInputChange("guests", value)}
              disabled={isLoading}
            >
              <SelectTrigger className="input-base">
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent>
                {guestOptions.map((num) => (
                  <SelectItem key={num} value={num}>
                    {num} {num === "1" ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 pt-4 border-t border-neutral-200">
            <h4 className="font-semibold text-neutral-800">
              Contact Information
            </h4>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                required
                value={bookingData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={bookingData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 000-0000"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Total Price */}
          <div className="p-4 bg-neutral-50 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                ${price} × {bookingData.guests} guests
              </span>
              <span>${price * parseInt(bookingData.guests)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Service fee</span>
              <span>$49</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t border-neutral-200 pt-2">
              <span>Total</span>
              <span className="text-primary-600">${totalPrice}</span>
            </div>
          </div>

          {/* Book Now Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary h-12 text-base font-semibold relative"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Booking...
              </>
            ) : (
              `Book Now · $${totalPrice}`
            )}
          </Button>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Secure booking · Free cancellation</span>
          </div>
        </form>

        {/* Features */}
        <div className="space-y-3 pt-4 border-t border-neutral-200">
          <h4 className="font-semibold text-neutral-800">
            What&apos;s Included
          </h4>
          <div className="space-y-2">
            {[
              "Expert local guide",
              "All entrance fees",
              "Comfortable transportation",
              "Hotel pickup & drop-off",
              "Bottled water",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-neutral-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
