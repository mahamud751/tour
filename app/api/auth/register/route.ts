import { NextRequest } from "next/server";
import { AuthService } from "@/lib/services/authService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { user, token } = await AuthService.register({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return new Response(JSON.stringify({ user, token }), {
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
