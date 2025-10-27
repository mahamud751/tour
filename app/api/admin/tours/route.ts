import { NextRequest } from "next/server";
import { TourAdminService } from "@/lib/services/tourAdminService";
import { AuthService } from "@/lib/services/authService";

// POST /api/admin/tours - Create a new tour
export async function POST(request: NextRequest) {
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

    const body = await request.json();

    const tour = await TourAdminService.createTour({
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
      featured: body.featured || false,
    });

    return new Response(JSON.stringify({ tour }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
