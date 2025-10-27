"use client";

import { useRouter } from "next/navigation";

export default function TestPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Test Page</h1>
      <p className="mb-4">Params ID: {params?.id || "No ID found"}</p>
      <button
        onClick={() => router.push("/admin/tours")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Tours
      </button>
    </div>
  );
}
