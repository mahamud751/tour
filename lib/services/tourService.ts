import { PrismaClient } from "@prisma/client";
import { mockTours } from "@/data/mockData";

const prisma = new PrismaClient();

export class TourService {
  static async initializeTours() {
    try {
      // Check if tours already exist
      const existingTours = await prisma.tour.count();

      if (existingTours === 0) {
        // Insert mock tours into database
        for (const tour of mockTours) {
          await prisma.tour.create({
            data: {
              id: tour.id,
              title: tour.title,
              description: tour.description,
              photo: tour.photo,
              price: tour.price,
              city: tour.city,
              address: tour.address,
              distance: tour.distance,
              maxGroupSize: tour.maxGroupSize,
              duration: tour.duration,
              season: tour.season,
              featured: tour.featured,
              avgRating: tour.avgRating,
              // Note: We're not migrating reviews and itinerary in this initial setup
              // They would need separate handling if required
            },
          });
        }
        console.log("Tours initialized successfully");
      }
    } catch (error) {
      console.error("Error initializing tours:", error);
      throw error;
    }
  }

  static async getAllTours(page: number = 1, limit: number = 6) {
    try {
      // Handle "show all" case
      if (limit >= 1000) {
        const tours = await prisma.tour.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });

        const total = tours.length;

        console.log(
          "getAllTours result - tours count:",
          tours.length,
          "total:",
          total
        );

        return {
          tours,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: total,
            itemsPerPage: total,
          },
        };
      }

      const skip = (page - 1) * limit;

      const [tours, total] = await Promise.all([
        prisma.tour.findMany({
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.tour.count(),
      ]);

      console.log(
        "getAllTours result - tours count:",
        tours.length,
        "total:",
        total
      );

      return {
        tours,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error in getAllTours:", error);
      throw error;
    }
  }

  static async getTourById(id: string) {
    try {
      console.log("getTourById called with ID:", id);
      const tour = await prisma.tour.findUnique({
        where: { id },
      });
      console.log("getTourById result:", tour);
      return tour;
    } catch (error) {
      console.error("Error in getTourById:", error);
      throw error;
    }
  }

  static async getFeaturedTours() {
    try {
      const tours = await prisma.tour.findMany({
        where: {
          featured: true,
        },
        orderBy: {
          avgRating: "desc",
        },
        take: 6,
      });
      return tours;
    } catch (error) {
      throw error;
    }
  }
}
