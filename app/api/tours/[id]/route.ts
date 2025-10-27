import { NextRequest } from "next/server";
import { TourService } from "@/lib/services/tourService";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  console.log("Full context object:", JSON.stringify(context, null, 2));
  console.log("Params object:", JSON.stringify(context.params, null, 2));

  // Extract ID from URL as fallback
  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/");
  const idFromPath = pathSegments[pathSegments.length - 1];

  console.log("ID from path:", idFromPath);

  try {
    const tourId = context.params?.id || idFromPath;

    if (!tourId) {
      return new Response(JSON.stringify({ error: "Tour ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const tour = await TourService.getTourById(tourId);

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
