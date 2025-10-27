import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { mockTours } from "@/data/mockData";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Check if tours already exist
  const existingTours = await prisma.tour.count();

  if (existingTours === 0) {
    console.log("Inserting tours...");

    for (const tour of mockTours) {
      await prisma.tour.create({
        data: {
          id: tour.id,
          title: tour.title,
          description: tour.description,
          photo: tour.photo,
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

    console.log("Tours inserted successfully!");
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
