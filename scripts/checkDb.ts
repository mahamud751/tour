import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkTours() {
  try {
    const tours = await prisma.tour.findMany();
    console.log("Tours in DB:", JSON.stringify(tours, null, 2));

    const count = await prisma.tour.count();
    console.log("Total tours count:", count);
  } catch (error) {
    console.error("Error checking tours:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTours();
