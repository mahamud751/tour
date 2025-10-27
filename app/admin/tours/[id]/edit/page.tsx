"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // Add useParams here
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Remove { params } prop—use useParams() hook instead
export default function EditTourPage() {
  const router = useRouter();
  // Use the hook to get dynamic params
  const params = useParams();
  // Destructure for stability (id is string | undefined)
  const id = params?.id as string | undefined;

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [tour, setTour] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photo: "",
    price: "",
    city: "",
    address: "",
    distance: "",
    maxGroupSize: "",
    duration: "",
    season: "",
    featured: false,
  });

  useEffect(() => {
    // Check for id from hook (safer than prop)
    console.log("Params from useParams:", params);

    if (id) {
      fetchTour(id);
    } else {
      // If no id, redirect to tours list
      console.log("No tour ID found, redirecting to tours list");
      router.push("/admin/tours");
    }
  }, [id, router]); // Depend on id (string) instead of params (object)—prevents loops

  const fetchTour = async (tourId: string) => {
    // Rename param for clarity
    try {
      console.log("Fetching tour with ID:", tourId);

      // First try fetching the specific tour directly
      const response = await fetch(`/api/tours?id=${tourId}`);
      console.log("API response status:", response.status);
      const data = await response.json();
      console.log("API response data:", data);

      if (response.ok && data.tour) {
        const tourData = data.tour;
        console.log("Tour data received:", tourData);
        setTour(tourData);
        setFormData({
          title: tourData.title,
          description: tourData.description,
          photo: tourData.photo,
          price: tourData.price.toString(),
          city: tourData.city,
          address: tourData.address,
          distance: tourData.distance,
          maxGroupSize: tourData.maxGroupSize.toString(),
          duration: tourData.duration || "",
          season: tourData.season || "",
          featured: tourData.featured || false,
        });
      } else {
        console.log("Direct fetch failed, trying to fetch all tours");
        // If direct fetch fails, try fetching all tours and filtering
        const allToursResponse = await fetch(`/api/tours`);
        console.log("All tours API response status:", allToursResponse.status);
        const allToursData = await allToursResponse.json();
        console.log("All tours API response data:", allToursData);

        if (allToursResponse.ok && allToursData.tours) {
          const foundTour = allToursData.tours.find(
            (t: any) => t.id === tourId
          );
          if (foundTour) {
            console.log("Tour found in all tours:", foundTour);
            setTour(foundTour);
            setFormData({
              title: foundTour.title,
              description: foundTour.description,
              photo: foundTour.photo,
              price: foundTour.price.toString(),
              city: foundTour.city,
              address: foundTour.address,
              distance: foundTour.distance,
              maxGroupSize: foundTour.maxGroupSize.toString(),
              duration: foundTour.duration || "",
              season: foundTour.season || "",
              featured: foundTour.featured || false,
            });
          } else {
            console.log("Tour not found in all tours");
            toast.error("Tour not found");
            router.push("/admin/tours");
          }
        } else {
          console.log("Failed to fetch all tours");
          toast.error("Failed to fetch tours");
          router.push("/admin/tours");
        }
      }
    } catch (error) {
      console.error("Error fetching tour:", error);
      toast.error("Failed to fetch tour");
      router.push("/admin/tours");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type before upload
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed."
      );
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum file size is 5MB.");
      return;
    }

    setIsUploading(true);
    const imageFormData = new FormData();
    imageFormData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: imageFormData,
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({
          ...formData,
          photo: data.url,
        });
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.error || "Failed to upload image");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit called");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);

      if (!token) {
        console.log("No token found, redirecting to login");
        router.push("/login");
        return;
      }

      // Use id from useParams hook
      console.log("Tour ID for update:", id);

      if (!id) {
        toast.error("Invalid tour ID");
        return;
      }

      console.log("Sending update request with formData:", formData);

      const response = await fetch(`/api/admin/tours/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          photo: formData.photo,
          price: parseFloat(formData.price),
          city: formData.city,
          address: formData.address,
          distance: formData.distance,
          maxGroupSize: parseInt(formData.maxGroupSize),
          duration: formData.duration,
          season: formData.season,
          featured: formData.featured,
        }),
      });

      console.log("Update API response status:", response.status);
      const data = await response.json();
      console.log("Update API response data:", data);

      if (response.ok) {
        toast.success("Tour updated successfully!");
        router.push("/admin/tours");
      } else {
        toast.error(data.error || "Failed to update tour");
      }
    } catch (error) {
      console.error("Error updating tour:", error);
      toast.error("Failed to update tour");
    } finally {
      setIsLoading(false);
    }
  };

  if (!tour) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Tour</h1>
        <p className="text-muted-foreground">
          Update the details for your tour
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tour Details</CardTitle>
          <CardDescription>Edit the details for your tour</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tour Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Tour Image</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="photo"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  placeholder="Upload an image or enter URL"
                  className="flex-1"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                  id="image-upload"
                  ref={(ref) => {
                    // Store reference to file input for manual triggering
                    if (ref) {
                      (window as any).tourImageUploadInput = ref;
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={isUploading}
                  onClick={() => {
                    // Manually trigger the file input
                    const fileInput = document.getElementById("image-upload");
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
              {formData.photo && (
                <div className="mt-2">
                  <img
                    src={formData.photo}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxGroupSize">Max Group Size</Label>
                <Input
                  id="maxGroupSize"
                  name="maxGroupSize"
                  type="number"
                  value={formData.maxGroupSize}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distance">Distance</Label>
                <Input
                  id="distance"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 7 Days"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="season">Best Season</Label>
                <Input
                  id="season"
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  placeholder="e.g., All Year"
                />
              </div>
              <div className="space-y-2 flex items-end">
                <div className="flex items-center space-x-2">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <Label htmlFor="featured">Featured Tour</Label>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading || isUploading}>
                {isLoading ? "Updating..." : "Update Tour"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/tours")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
