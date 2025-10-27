"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";

interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
  orders: {
    id: string;
    tour: {
      title: string;
    };
    status: string;
    totalPrice: number;
    createdAt: string;
  }[];
}

export default function AdminUserDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
      } else {
        toast.error(data.error || "Failed to fetch user details");
        router.push("/admin/users");
      }
    } catch (error) {
      toast.error("An error occurred while fetching user details");
      router.push("/admin/users");
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (role: "USER" | "ADMIN") => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({ ...user!, role: data.user.role });
        toast.success("User role updated successfully");
      } else {
        toast.error(data.error || "Failed to update user role");
      }
    } catch (error) {
      toast.error("An error occurred while updating user role");
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <Badge variant="default">Admin</Badge>;
      case "USER":
        return <Badge variant="secondary">User</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <Badge variant="default">Confirmed</Badge>;
      case "PENDING":
        return <Badge variant="secondary">Pending</Badge>;
      case "CANCELLED":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The requested user could not be found.
          </p>
          <Button onClick={() => router.push("/admin/users")}>
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Details</h1>
          <p className="text-muted-foreground">
            View and manage user account #{user.id.substring(0, 8)}
          </p>
        </div>
        <Button onClick={() => router.push("/admin/users")}>
          Back to Users
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Details about this user account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">User ID</p>
                  <p className="font-mono">{user.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <div className="flex items-center gap-2">
                    {getRoleBadge(user.role)}
                    <Select
                      value={user.role}
                      onValueChange={(value) =>
                        updateUserRole(value as "USER" | "ADMIN")
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p>{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Account Created
                  </p>
                  <p>
                    {format(new Date(user.createdAt), "MMMM d, yyyy h:mm a")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p>
                    {format(new Date(user.updatedAt), "MMMM d, yyyy h:mm a")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>All orders placed by this user</CardDescription>
            </CardHeader>
            <CardContent>
              {user.orders.length === 0 ? (
                <p className="text-muted-foreground">
                  No orders found for this user.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Order ID</th>
                        <th className="text-left py-2 px-3">Tour</th>
                        <th className="text-left py-2 px-3">Status</th>
                        <th className="text-left py-2 px-3">Amount</th>
                        <th className="text-left py-2 px-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.orders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-2 px-3 font-mono text-sm">
                            {order.id.substring(0, 6)}
                          </td>
                          <td className="py-2 px-3">{order.tour.title}</td>
                          <td className="py-2 px-3">
                            {getStatusBadge(order.status)}
                          </td>
                          <td className="py-2 px-3">
                            ${order.totalPrice.toFixed(2)}
                          </td>
                          <td className="py-2 px-3">
                            {format(new Date(order.createdAt), "MMM dd, yyyy")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* User Statistics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
              <CardDescription>Overview of user activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Orders</span>
                  <span className="font-semibold">{user.orders.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Spent</span>
                  <span className="font-semibold">
                    $
                    {user.orders
                      .reduce((sum, order) => sum + order.totalPrice, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Age</span>
                  <span className="font-semibold">
                    {Math.floor(
                      (Date.now() - new Date(user.createdAt).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
