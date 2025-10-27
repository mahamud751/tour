import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tour = await prisma.tour.findUnique({
    where: { id: "1" },
  });
  console.log("Tour with ID 1:", tour);

  const allTours = await prisma.tour.findMany();
  console.log("All tours:", allTours);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
