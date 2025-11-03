"use client";

import { useState } from "react";
import { TourDetails } from "@/components/tours/TourDetails";
import { AuthModal } from "@/components/auth/AuthModal";
import { Tour } from "@/types";

interface TourDetailsClientProps {
  tour: Tour;
}

export const TourDetailsClient = ({ tour }: TourDetailsClientProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <TourDetails tour={tour} onOpenAuthModal={() => openAuthModal("login")} />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};