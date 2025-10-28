import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { Tour } from "@/types";
import { NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch the tour data
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/tours/${id}`);

    if (!response.ok) {
      throw new Error("Tour not found");
    }

    const data = await response.json();
    const tour: Tour = data.tour;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundImage: "linear-gradient(to right, #4338ca, #6366f1)",
            padding: "40px",
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: "bold",
              marginBottom: 30,
              lineHeight: 1.2,
            }}
          >
            {tour.title}
          </div>
          <div
            style={{
              fontSize: 30,
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            {tour.city}, {tour.address}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                fontSize: 35,
                fontWeight: "bold",
              }}
            >
              ${tour.price}
            </div>
            <div
              style={{
                fontSize: 25,
                opacity: 0.8,
              }}
            >
              {tour.duration}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 25,
              }}
            >
              <span>★</span>
              <span>{tour.avgRating}</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}