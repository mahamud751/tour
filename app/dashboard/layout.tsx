"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package2, Users, User, LogOut } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      return;
    }

    // If no NextAuth session, check for token in localStorage (client-side only)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        // Validate token and get user info
        validateToken(token);
        return;
      }
    }

    // If no session or token found, redirect to home
    router.push("/");
  }, [router, session, status]);

  const validateToken = async (token: string) => {
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

  const handleLogout = () => {
    // Clear localStorage token and user data if they exist (client-side only)
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    
    // Sign out from NextAuth
    if (session) {
      nextAuthSignOut({ callbackUrl: "/" });
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const navItems =
    user?.role === "ADMIN"
      ? [
          { name: "Dashboard", href: "/dashboard", icon: Package2 },
          { name: "All Orders", href: "/dashboard/orders", icon: Users },
          { name: "Profile", href: "/dashboard/profile", icon: User },
        ]
      : [
          { name: "Dashboard", href: "/dashboard", icon: Package2 },
          { name: "My Orders", href: "/dashboard/orders", icon: Users },
          { name: "Profile", href: "/dashboard/profile", icon: User },
        ];

  // If no session or token, redirect (handled by useEffect)
  if (!session?.user && (typeof window === "undefined" || !localStorage.getItem("token"))) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Mobile menu */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Next Go</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden border-r bg-background md:block fixed left-0 top-0 h-full w-64">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="">Next Go</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:ml-64">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-2xl">
              Welcome, {user?.name}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {user?.role === "ADMIN" ? "Admin" : "User"}
            </span>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}