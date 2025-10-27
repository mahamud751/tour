"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Tour } from "@/types";
import { toast } from "sonner";

export default function AdminToursPage() {
  const router = useRouter();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      // Fetch all tours instead of just the first 6
      const response = await fetch("/api/tours?limit=all");
      const data = await response.json();

      if (response.ok) {
        setTours(data.tours);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
      toast.error("Failed to fetch tours");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTour = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this tour? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`/api/admin/tours/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Tour deleted successfully");
        // Refresh the tours list
        fetchTours();
      } else {
        toast.error(data.error || "Failed to delete tour");
      }
    } catch (error) {
      toast.error("Failed to delete tour");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Tours</h1>
          <p className="text-muted-foreground">
            Create, edit, and delete tours
          </p>
        </div>
        <Button onClick={() => router.push("/admin/tours/create")}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Tour
        </Button>
      </div>

      {tours.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">No tours yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by creating a new tour.
              </p>
              <Button onClick={() => router.push("/admin/tours/create")}>
                <Plus className="w-4 h-4 mr-2" />
                Create Tour
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <Card key={tour.id} className="flex flex-col">
              <div className="relative h-48">
                {tour.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tour.photo}
                    alt={tour.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{tour.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {tour.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${tour.price}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        router.push(`/admin/tours/${tour.id}/edit`)
                      }
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTour(tour.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
