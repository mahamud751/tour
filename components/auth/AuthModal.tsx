"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register";
  onModeChange: (mode: "login" | "register") => void;
}

export const AuthModal = ({
  isOpen,
  onClose,
  mode,
  onModeChange,
}: AuthModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Reset form when mode changes
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, [mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "register" && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint =
        mode === "login" ? "/api/auth/login" : "/api/auth/register";

      const payload =
        mode === "login"
          ? { email: formData.email, password: formData.password }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        toast.success(
          mode === "login" ? "Login successful!" : "Registration successful!"
        );

        // Dispatch auth change event
        window.dispatchEvent(new Event("authChange"));

        // Close modal and redirect to dashboard
        onClose();
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error(
          data.error || `${mode === "login" ? "Login" : "Registration"} failed`
        );
      }
    } catch (error) {
      toast.error(
        `An error occurred during ${
          mode === "login" ? "login" : "registration"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "login" ? "Welcome back" : "Create an account"}
          </DialogTitle>
          <DialogDescription>
            {mode === "login"
              ? "Enter your credentials to access your account"
              : "Enter your information to get started"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required={mode === "register"}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={mode === "register"}
              />
            </div>
          )}

          <div className="flex flex-col gap-2 pt-2">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading
                ? mode === "login"
                  ? "Signing in..."
                  : "Creating account..."
                : mode === "login"
                ? "Sign in"
                : "Create account"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                onModeChange(mode === "login" ? "register" : "login")
              }
              className="w-full"
            >
              {mode === "login"
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
