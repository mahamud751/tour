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
import { useSession, getSession } from "next-auth/react";

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
    const fetchDashboardData = async () => {
      // Wait for session to resolve before making decisions
      if (status === "loading") return;

      // Prefer NextAuth session token if available
      let token: string | null = (session as any)?.token ?? null;
      if (session?.user && token) {
        // Persist token for API calls and notify app
        localStorage.setItem("token", token);
        window.dispatchEvent(new Event("authChange"));

        // Set user info from session immediately
        const name =
          (session.user as any).name ||
          session.user.email?.split("@")[0] ||
          "User";
        const role = (session.user as any).role || "USER";
        setUser({ name, role });
      } else {
        // Fallback to existing JWT/localStorage flow
        token = localStorage.getItem("token");
      }

      // If we still don't have a token, check if we just came from Google sign-in
      // In this case, wait a bit for the session to be established
      if (!token && status === "unauthenticated") {
        // Wait briefly and check again
        await new Promise(resolve => setTimeout(resolve, 1000));
        const refreshedSession: any = await getSession();
        token = refreshedSession?.token ?? null;
        
        if (token) {
          localStorage.setItem("token", token);
          window.dispatchEvent(new Event("authChange"));
          
          // Set user info from session
          const name =
            (refreshedSession.user as any).name ||
            refreshedSession.user.email?.split("@")[0] ||
            "User";
          const role = (refreshedSession.user as any).role || "USER";
          setUser({ name, role });
        }
      }

      if (!token) {
        router.push("/");
        return;
      }

      try {
        // Fetch user info if not set from session
        if (!user) {
          const userResponse = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userData = await userResponse.json();

          if (userResponse.ok) {
            setUser(userData.user);
          } else {
            localStorage.removeItem("token");
            router.push("/");
            return;
          }
        }

        // Fetch orders
        const ordersResponse = await fetch("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const ordersData = await ordersResponse.json();

        if (ordersResponse.ok) {
          const orders = ordersData.orders;
          setStats({
            totalOrders: orders.length,
            pendingOrders: orders.filter(
              (order: any) => order.status === "PENDING"
            ).length,
            confirmedOrders: orders.filter(
              (order: any) => order.status === "CONFIRMED"
            ).length,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [router, session, status]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Here's what's happening with your account.
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
            <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
              {user.role === "ADMIN" ? "Admin" : "User"}
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
