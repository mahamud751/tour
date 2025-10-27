import { NextRequest } from "next/server";
import { TourService } from "@/lib/services/tourService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    console.log(
      "Tours API called with searchParams:",
      Object.fromEntries(searchParams)
    );

    // Check if requesting a specific tour by ID
    const id = searchParams.get("id");
    if (id) {
      console.log("Fetching tour by ID:", id);
      const tour = await TourService.getTourById(id);
      console.log("Tour found:", tour);

      if (!tour) {
        console.log("Tour not found for ID:", id);
        return new Response(JSON.stringify({ error: "Tour not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ tour }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Otherwise, handle the general tours listing with pagination
    const page = parseInt(searchParams.get("page") || "1");
    // Allow showing all tours by setting limit to 0 or a high number
    const limitParam = searchParams.get("limit");
    const limit = limitParam === "all" ? 1000 : parseInt(limitParam || "6");

    console.log("Fetching all tours with page:", page, "limit:", limit);
    const result = await TourService.getAllTours(page, limit);
    console.log("All tours result:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in tours API:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
