import { NextRequest } from "next/server";
import { AuthService } from "@/lib/services/authService";
import { UserService } from "@/lib/services/userService";

// GET /api/admin/users - Get all users (admin only)
export async function GET(request: NextRequest) {
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

    // Fetch all users from the database
    const users = await UserService.getAllUsers();

    return new Response(JSON.stringify({ users }), {
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
