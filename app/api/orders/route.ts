import { NextRequest } from "next/server";
import { OrderService } from "@/lib/services/orderService";
import { AuthService } from "@/lib/services/authService";

export async function POST(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: No token provided" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Get current user
    const user = await AuthService.getCurrentUser(token);

    const body = await request.json();

    const order = await OrderService.createOrder({
      userId: user.id,
      tourId: body.tourId,
      fullName: body.fullName,
      phone: body.phone,
      guestSize: body.guestSize,
      bookAt: new Date(body.bookAt),
    });

    return new Response(JSON.stringify({ order }), {
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

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: No token provided" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Get current user
    const user = await AuthService.getCurrentUser(token);

    // If user is admin, return all orders, otherwise return user's orders
    let orders;
    if (user.role === "ADMIN") {
      orders = await OrderService.getAllOrders();
    } else {
      orders = await OrderService.getUserOrders(user.id);
    }

    return new Response(JSON.stringify({ orders }), {
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
