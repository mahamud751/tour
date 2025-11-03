import { TourService } from "@/lib/services/tourService";

async function main() {
  console.log("Updating tours with new pricing and requirements...");
  
  try {
    await TourService.updateAllTours();
    console.log("Tours updated successfully!");
  } catch (error) {
    console.error("Error updating tours:", error);
    process.exit(1);
  }
}

main();