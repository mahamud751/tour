import { NextRequest } from "next/server";
import { TourAdminService } from "@/lib/services/tourAdminService";
import { AuthService } from "@/lib/services/authService";

// PUT /api/admin/tours/[id] - Update a tour
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(
    "Update tour route called with params:",
    JSON.stringify(params, null, 2)
  );

  // Extract ID from URL as fallback
  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/");
  const idFromPath = pathSegments[pathSegments.length - 1];

  console.log("ID from path:", idFromPath);

  try {
    // Check if user is admin
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No valid authorization header found");
      return new Response(
        JSON.stringify({ error: "Unauthorized: No token provided" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.substring(7);
    console.log("Token extracted from header:", token);

    const user = await AuthService.getCurrentUser(token);
    console.log("User from token:", user);

    if (user.role !== "ADMIN") {
      console.log("User is not admin, access denied");
      return new Response(
        JSON.stringify({ error: "Forbidden: Admin access required" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const tourId = params.id || idFromPath;
    console.log("Tour ID for update:", tourId);

    if (!tourId) {
      console.log("No tour ID provided");
      return new Response(JSON.stringify({ error: "Tour ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
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

    return new Response(JSON.stringify({ tour }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error updating tour:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE /api/admin/tours/[id] - Delete a tour
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(
    "Delete tour route called with params:",
    JSON.stringify(params, null, 2)
  );

  // Extract ID from URL as fallback
  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/");
  const idFromPath = pathSegments[pathSegments.length - 1];

  console.log("ID from path:", idFromPath);

  try {
    // Check if user is admin
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: No token provided" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.substring(7);
    const user = await AuthService.getCurrentUser(token);

    if (user.role !== "ADMIN") {
      return new Response(
        JSON.stringify({ error: "Forbidden: Admin access required" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const tourId = params.id || idFromPath;

    if (!tourId) {
      return new Response(JSON.stringify({ error: "Tour ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const tour = await TourAdminService.deleteTour(tourId);

    return new Response(JSON.stringify({ tour }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error deleting tour:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
