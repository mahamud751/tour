import { NextRequest, NextFetchEvent } from "next/server";
import { AuthService } from "@/lib/services/authService";

export async function authMiddleware(
  request: NextRequest,
  event: NextFetchEvent
) {
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

    // Verify token and get user
    const user = await AuthService.getCurrentUser(token);

    // Add user info to request headers for use in route handlers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("user-id", user.id);
    requestHeaders.set("user-role", user.role);

    // Create a new request with updated headers
    const nextUrl = request.nextUrl.clone();
    const newRequest = new NextRequest(nextUrl, {
      headers: requestHeaders,
      method: request.method,
      body: request.body,
    });

    return newRequest;
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Unauthorized: Invalid token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function adminMiddleware(
  request: NextRequest,
  event: NextFetchEvent
) {
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

    // Verify token and get user
    const user = await AuthService.getCurrentUser(token);

    // Check if user is admin
    if (user.role !== "ADMIN") {
      return new Response(
        JSON.stringify({ error: "Forbidden: Admin access required" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Add user info to request headers for use in route handlers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("user-id", user.id);
    requestHeaders.set("user-role", user.role);

    // Create a new request with updated headers
    const nextUrl = request.nextUrl.clone();
    const newRequest = new NextRequest(nextUrl, {
      headers: requestHeaders,
      method: request.method,
      body: request.body,
    });

    return newRequest;
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Unauthorized: Invalid token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}
