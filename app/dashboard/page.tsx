"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
  });

  useEffect(() => {
    // Check for NextAuth session
    if (status === "loading") return;

    // If NextAuth session exists, use it
    if (session?.user) {
      const name =
        (session.user as any).name ||
        session.user.email?.split("@")[0] ||
        "User";
      const role = (session.user as any).role || "USER";
      setUser({ name, role });
      fetchOrderStats();
      return;
    }

    // If no NextAuth session, check for user data in localStorage (client-side only)
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      
      if (userData && token) {
        const parsedUser = JSON.parse(userData);
        const name = parsedUser.name || parsedUser.email?.split("@")[0] || "User";
        const role = parsedUser.role || "USER";
        setUser({ name, role });
        fetchOrderStats();
        return;
      }
      
      // If no user data but token exists, validate token
      if (token) {
        validateTokenAndFetchStats(token);
        return;
      }
    }

    // If no session or token found, redirect to home
    router.push("/");
  }, [router, session, status]);

  const validateTokenAndFetchStats = async (token: string) => {
    try {
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        const name = userData.name || userData.email?.split("@")[0] || "User";
        const role = userData.role || "USER";
        setUser({ name, role });
        fetchOrderStats();
        
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

  const fetchOrderStats = async () => {
    try {
      // Try to get token from session first
      let token = null;
      
      if ((session as any)?.token) {
        token = (session as any).token;
      } else if (typeof window !== "undefined") {
        // Fallback to localStorage token (client-side only)
        token = localStorage.getItem("token");
      }
      
      if (!token) {
        router.push("/");
        return;
      }

      const response = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const orders = data.orders || [];
        
        setStats({
          totalOrders: orders.length,
          pendingOrders: orders.filter((order: any) => order.status === "PENDING").length,
          confirmedOrders: orders.filter((order: any) => order.status === "CONFIRMED").length,
        });
      }
    } catch (error) {
      console.error("Error fetching order stats:", error);
    }
  };

  // If no session or token, redirect (handled by useEffect)
  if (!session?.user && (typeof window === "undefined" || (!localStorage.getItem("token") && !localStorage.getItem("user")))) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Here's what's happening with your account.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Confirmed Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmedOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={user?.role === "ADMIN" ? "default" : "secondary"}>
              {user?.role === "ADMIN" ? "Admin" : "User"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your account and orders</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button
              onClick={() => router.push("/dashboard/orders")}
              className="w-full"
            >
              View All Orders
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/tours")}
              className="w-full"
            >
              Browse Tours
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest orders and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              No recent activity
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}