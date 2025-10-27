import { NextRequest } from "next/server";
import { TourService } from "@/lib/services/tourService";

export async function GET(request: NextRequest) {
  try {
    const tours = await TourService.getFeaturedTours();

    return new Response(JSON.stringify({ tours }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
