"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    // Check for NextAuth session
    if (status === "loading") return;

    // If NextAuth session exists, use it
    if (session?.user) {
      setUser({
        id: (session.user as any).id,
        name:
          (session.user as any).name ||
          session.user.email?.split("@")[0] ||
          "User",
        email: session.user.email || "",
        role: (session.user as any).role || "USER",
      });
      setFormData({
        name:
          (session.user as any).name ||
          session.user.email?.split("@")[0] ||
          "User",
        email: session.user.email || "",
      });
      setLoading(false);
      return;
    }

    // If no NextAuth session, check for user data in localStorage (client-side only)
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      
      if (userData && token) {
        const parsedUser = JSON.parse(userData);
        setUser({
          id: parsedUser.id,
          name: parsedUser.name || parsedUser.email?.split("@")[0] || "User",
          email: parsedUser.email || "",
          role: parsedUser.role || "USER",
        });
        setFormData({
          name: parsedUser.name || parsedUser.email?.split("@")[0] || "User",
          email: parsedUser.email || "",
        });
        setLoading(false);
        return;
      }
      
      // If no user data but token exists, validate token
      if (token) {
        validateTokenAndSetUser(token);
        return;
      }
    }

    // If no session or token found, redirect to home
    router.push("/");
  }, [router, session, status]);

  const validateTokenAndSetUser = async (token: string) => {
    try {
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser({
          id: userData.id,
          name: userData.name || userData.email?.split("@")[0] || "User",
          email: userData.email || "",
          role: userData.role || "USER",
        });
        setFormData({
          name: userData.name || userData.email?.split("@")[0] || "User",
          email: userData.email || "",
        });
        setLoading(false);
        
        // Store user data in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } else {
        // Invalid token, remove it and redirect
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
        router.push("/");
      }
    } catch (error) {
      // Error validating token, remove it and redirect
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      router.push("/");
    }
  };

  // If no session or token, redirect (handled by useEffect)
  if (!session?.user && (typeof window === "undefined" || (!localStorage.getItem("token") && !localStorage.getItem("user")))) {
    return null;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // In a real app, you would have an API endpoint to update user profile
      // For now, we'll just show a success message
      toast.success("Profile updated successfully!");
      setIsEditing(false);

      // Update local user state
      if (user) {
        setUser({
          ...user,
          name: formData.name,
          email: formData.email,
        });
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Save Changes</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    if (user) {
                      setFormData({
                        name: user.name,
                        email: user.email,
                      });
                    }
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Full Name</Label>
                  <p className="font-medium">{user?.name}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Account Type</Label>
                  <p className="font-medium capitalize">
                    {user?.role.toLowerCase()}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Member Since</Label>
                  <p className="font-medium">-</p>
                </div>
              </div>
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Manage your password and security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">
                  Last changed 3 months ago
                </p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}