"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function TestImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type before upload
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed."
      );
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum file size is 5MB.");
      return;
    }

    setIsUploading(true);
    const imageFormData = new FormData();
    imageFormData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: imageFormData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadedUrl(data.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.error || "Failed to upload image");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Test Image Upload</h1>
        <p className="text-muted-foreground">
          Use this page to test the image upload functionality
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-upload">Upload Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="hidden"
              id="image-upload"
            />
            <Label htmlFor="image-upload">
              <Button
                type="button"
                variant="outline"
                disabled={isUploading}
                className="cursor-pointer"
              >
                {isUploading ? "Uploading..." : "Select Image"}
              </Button>
            </Label>
          </div>

          {uploadedUrl && (
            <div className="space-y-2">
              <Label>Uploaded Image</Label>
              <img
                src={uploadedUrl}
                alt="Uploaded preview"
                className="h-64 w-auto object-contain rounded-md border"
              />
              <p className="text-sm text-muted-foreground">
                URL: {uploadedUrl}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
