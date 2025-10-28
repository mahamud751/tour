import { NextRequest } from "next/server";
import { TourAdminService } from "@/lib/services/tourAdminService";
import { AuthService } from "@/lib/services/authService";
import { NextResponse } from "next/server";

// PUT /api/admin/tours/[id] - Update a tour
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("Update tour route called with params promise");

  try {
    // Check if user is admin
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No valid authorization header found");
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    console.log("Token extracted from header:", token);

    const user = await AuthService.getCurrentUser(token);
    console.log("User from token:", user);

    if (user.role !== "ADMIN") {
      console.log("User is not admin, access denied");
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    // Await the params promise
    const { id: tourId } = await params;
    console.log("Tour ID for update:", tourId);

    if (!tourId) {
      console.log("No tour ID provided");
      return NextResponse.json(
        { error: "Tour ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log("Request body for update:", body);

    const tour = await TourAdminService.updateTour({
      id: tourId,
      data: {
        title: body.title,
        description: body.description,
        photo: body.photo,
        price: parseFloat(body.price),
        city: body.city,
        address: body.address,
        distance: body.distance,
        maxGroupSize: parseInt(body.maxGroupSize),
        duration: body.duration,
        season: body.season,
        featured: body.featured,
      },
    });

    console.log("Tour updated successfully:", tour);

    return NextResponse.json({ tour }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating tour:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE /api/admin/tours/[id] - Delete a tour
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("Delete tour route called with params promise");

  try {
    // Check if user is admin
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const user = await AuthService.getCurrentUser(token);

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    // Await the params promise
    const { id: tourId } = await params;

    if (!tourId) {
      return NextResponse.json(
        { error: "Tour ID is required" },
        { status: 400 }
      );
    }

    const tour = await TourAdminService.deleteTour(tourId);

    return NextResponse.json({ tour }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting tour:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}