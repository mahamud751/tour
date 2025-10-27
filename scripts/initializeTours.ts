import { TourService } from "@/lib/services/tourService";

async function initializeTours() {
  try {
    console.log("Initializing tours...");
    await TourService.initializeTours();
    console.log("Tours initialized successfully!");
  } catch (error) {
    console.error("Error initializing tours:", error);
  }
}

initializeTours();
