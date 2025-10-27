import { NextRequest } from "next/server";
import { AuthService } from "@/lib/services/authService";
import { UserService } from "@/lib/services/userService";

// GET /api/admin/users/[id] - Get user details (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Fetch user details from the database
    const userDetails = await UserService.getUserById(params.id);

    if (!userDetails) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ user: userDetails }), {
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

// PUT /api/admin/users/[id] - Update user role (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Update user role
    const updatedUser = await UserService.updateUserRole(params.id, body.role);

    return new Response(JSON.stringify({ user: updatedUser }), {
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
