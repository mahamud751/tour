import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { mockTours } from "@/data/mockData";
import { writeFile, mkdir, readFile } from "fs/promises";
import { join } from "path";
import { stat } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with local images...");

  // Check if tours already exist
  const existingTours = await prisma.tour.count();

  if (existingTours === 0) {
    console.log("Inserting tours with local images...");

    // Get existing images from the images directory
    const imageDir = join(process.cwd(), "public", "images", "tour");
    const sampleImages = [
      "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"
    ];

    for (let i = 0; i < mockTours.length && i < sampleImages.length; i++) {
      const tour = mockTours[i];
      const sampleImage = sampleImages[i];
      
      // Generate a unique filename for each tour image
      const fileExtension = sampleImage.split(".").pop() || "jpg";
      const uniqueFilename = `${uuidv4()}.${fileExtension}`;

      // Copy the sample image to the uploads directory
      try {
        const sourcePath = join(imageDir, sampleImage);
        const destPath = join(process.cwd(), "public", "uploads", uniqueFilename);
        
        // Read the source image
        const imageBuffer = await readFile(sourcePath);
        
        // Ensure uploads directory exists
        const uploadsDir = join(process.cwd(), "public", "uploads");
        try {
          await stat(uploadsDir);
        } catch (err: any) {
          if (err.code === "ENOENT") {
            await mkdir(uploadsDir, { recursive: true });
          } else {
            throw err;
          }
        }
        
        // Write the image to the uploads directory
        await writeFile(destPath, imageBuffer);
        
        const localImageUrl = `/uploads/${uniqueFilename}`;

        await prisma.tour.create({
          data: {
            id: tour.id,
            title: tour.title,
            description: tour.description,
            photo: localImageUrl, // Use local image URL instead of external
            price: tour.price,
            city: tour.city,
            address: tour.address,
            distance: tour.distance,
            maxGroupSize: tour.maxGroupSize,
            duration: tour.duration,
            season: tour.season,
            featured: tour.featured,
            avgRating: tour.avgRating,
          },
        });
        
        console.log(`Successfully copied ${sampleImage} to ${uniqueFilename}`);
      } catch (error) {
        console.error(`Error copying image for tour ${tour.id}:`, error);
        
        // Fallback to a placeholder if image copy fails
        const localImageUrl = `/images/tour/${sampleImage}`;
        await prisma.tour.create({
          data: {
            id: tour.id,
            title: tour.title,
            description: tour.description,
            photo: localImageUrl,
            price: tour.price,
            city: tour.city,
            address: tour.address,
            distance: tour.distance,
            maxGroupSize: tour.maxGroupSize,
            duration: tour.duration,
            season: tour.season,
            featured: tour.featured,
            avgRating: tour.avgRating,
          },
        });
      }
    }

    console.log("Tours inserted successfully with local images!");
  } else {
    console.log("Tours already exist in database, skipping...");
  }

  // Create an admin user if one doesn't exist
  const adminEmail = "admin@roamio.com";
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    console.log("Creating admin user...");

    // Hash the password
    const hashedPassword = await bcrypt.hash("password", 10);

    await prisma.user.create({
      data: {
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("Admin user created!");
    console.log("Admin login credentials:");
    console.log("Email: admin@roamio.com");
    console.log("Password: password");
  } else {
    console.log("Admin user already exists, skipping...");
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });