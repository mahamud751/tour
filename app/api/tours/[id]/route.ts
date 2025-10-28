import { NextRequest } from "next/server";
import { TourService } from "@/lib/services/tourService";
import { NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("Tour API route called");

  // Extract ID from URL as fallback
  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/");
  const idFromPath = pathSegments[pathSegments.length - 1];

  console.log("ID from path:", idFromPath);

  try {
    // Await the params promise
    const { id: tourIdFromParams } = await params;
    const tourId = tourIdFromParams || idFromPath;

    console.log("Final tour ID to fetch:", tourId);

    if (!tourId) {
      console.log("No tour ID provided");
      return NextResponse.json({ error: "Tour ID is required" }, { status: 400 });
    }

    const tour = await TourService.getTourById(tourId);
    
    console.log("Tour fetched from database:", tour);

    if (!tour) {
      console.log("Tour not found in database");
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    console.log("Returning tour data");
    return NextResponse.json({ tour }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching tour:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}