import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { stat } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

// Helper function to convert stream to buffer
async function streamToBuffer(
  stream: ReadableStream<Uint8Array>
): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  const reader = stream.getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
      }
    }
    return Buffer.concat(chunks);
  } finally {
    reader.releaseLock();
  }
}

// Helper function to ensure directory exists
async function ensureDirectoryExists(dirPath: string) {
  try {
    await stat(dirPath);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      await mkdir(dirPath, { recursive: true });
    } else {
      throw err;
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({
          error:
            "Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: "File too large. Maximum file size is 5MB." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Convert file to buffer
    const bytes = await streamToBuffer(file.stream());

    // Generate unique filename
    const fileParts = file.name.split(".");
    const fileExtension = fileParts.length > 1 ? fileParts.pop() : "";

    // Validate file extension
    if (!fileExtension) {
      throw new Error("Invalid file name: missing extension");
    }

    const uniqueFilename = `${uuidv4()}.${fileExtension}`;

    // Define upload path (public/uploads)
    const publicDir = join(process.cwd(), "public");
    const uploadsDir = join(publicDir, "uploads");
    const filePath = join(uploadsDir, uniqueFilename);

    // Ensure uploads directory exists
    await ensureDirectoryExists(uploadsDir);

    // Write file to disk
    await writeFile(filePath, bytes);

    // Return the URL where the file can be accessed
    const fileUrl = `/uploads/${uniqueFilename}`;

    return new Response(JSON.stringify({ url: fileUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ error: "Failed to upload file" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Configure the runtime to use Node.js APIs
export const runtime = "nodejs";
