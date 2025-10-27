import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return new Response(JSON.stringify({ receivedId: params.id }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
