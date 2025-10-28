import { NextRequest } from "next/server";
import { AuthService } from "@/lib/services/authService";
import { OrderService } from "@/lib/services/orderService";
import { NextResponse } from "next/server";

// GET /api/admin/orders - Get all orders (admin only)
export async function GET(request: NextRequest) {
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

    // Fetch all orders from the database
    const orders = await OrderService.getAllOrders();

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}