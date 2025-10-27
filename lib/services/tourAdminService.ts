import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateTourInput {
  title: string;
  description: string;
  photo: string;
  price: number;
  city: string;
  address: string;
  distance: string;
  maxGroupSize: number;
  duration?: string;
  season?: string;
  featured?: boolean;
  avgRating?: number;
}

interface UpdateTourInput {
  id: string;
  data: Partial<CreateTourInput>;
}

export class TourAdminService {
  static async createTour(data: CreateTourInput) {
    try {
      const tour = await prisma.tour.create({
        data: {
          title: data.title,
          description: data.description,
          photo: data.photo,
          price: data.price,
          city: data.city,
          address: data.address,
          distance: data.distance,
          maxGroupSize: data.maxGroupSize,
          duration: data.duration,
          season: data.season,
          featured: data.featured,
          avgRating: data.avgRating || 0, // Default value
        },
      });

      return tour;
    } catch (error) {
      throw error;
    }
  }

  static async updateTour({ id, data }: UpdateTourInput) {
    try {
      console.log("updateTour called with id:", id, "data:", data);

      // First, get the existing tour to preserve required fields
      const existingTour = await prisma.tour.findUnique({
        where: { id },
      });

      if (!existingTour) {
        console.log("Tour not found for update with ID:", id);
        throw new Error("Tour not found");
      }

      // Merge the existing data with the update data
      const updatedData = {
        ...existingTour,
        ...data,
        // Ensure required fields are not null
        title: data.title || existingTour.title,
        description: data.description || existingTour.description,
        photo: data.photo || existingTour.photo,
        price: data.price !== undefined ? data.price : existingTour.price,
        city: data.city || existingTour.city,
        address: data.address || existingTour.address,
        distance: data.distance || existingTour.distance,
        maxGroupSize: data.maxGroupSize || existingTour.maxGroupSize,
        avgRating:
          data.avgRating !== undefined
            ? data.avgRating
            : existingTour.avgRating,
      };

      console.log("Updating tour with data:", updatedData);

      const tour = await prisma.tour.update({
        where: { id },
        data: updatedData,
      });

      console.log("Tour updated successfully:", tour);
      return tour;
    } catch (error) {
      console.error("Error updating tour:", error);
      throw error;
    }
  }

  static async deleteTour(id: string) {
    try {
      const tour = await prisma.tour.delete({
        where: { id },
      });

      return tour;
    } catch (error) {
      throw error;
    }
  }
}
