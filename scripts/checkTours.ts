import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tours = await prisma.tour.findMany();
  console.log("Tours in database:");
  tours.forEach((tour) => {
    console.log(`- ${tour.title}: ${tour.photo}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
