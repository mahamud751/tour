import { NextRequest } from "next/server";
import { TourService } from "@/lib/services/tourService";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  console.log("Fetching tour with ID:", context.params.id);

  try {
    if (!context.params.id) {
      return new Response(JSON.stringify({ error: "Tour ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const tour = await TourService.getTourById(context.params.id);

    if (!tour) {
      return new Response(JSON.stringify({ error: "Tour not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ tour }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error fetching tour:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
