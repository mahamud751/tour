"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package2, Users, User, LogOut } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useSession, signOut as nextAuthSignOut, getSession } from "next-auth/react";

// Custom hook to handle token synchronization
const useTokenSync = (session: any) => {
  useEffect(() => {
    if (session?.token && typeof window !== 'undefined') {
      const existingToken = localStorage.getItem("token");
      if (!existingToken || existingToken !== session.token) {
        localStorage.setItem("token", session.token);
        window.dispatchEvent(new Event("authChange"));
      }
    }
  }, [session]);
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync token when session changes
  useTokenSync(session);

  useEffect(() => {
    const checkAuth = async () => {
      // Wait for session to resolve before making redirect decisions
      if (status === "loading") {
        return;
      }

      // Check for NextAuth session first
      let currentSession = session;
      if (!currentSession) {
        currentSession = await getSession();
      }

      // If NextAuth session exists, use it
      if (currentSession?.user) {
        const name =
          (currentSession.user as any).name ||
          currentSession.user.email?.split("@")[0] ||
          "User";
        const role = (currentSession.user as any).role || "USER";
        setUser({ name, role });

        // Check if token exists in session
        const token = (currentSession as any).token;
        if (token) {
          localStorage.setItem("token", token);
          window.dispatchEvent(new Event("authChange"));
        }
        
        setIsLoading(false);
        return;
      }

      // Fallback to JWT token check
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Token is invalid, clear it and redirect
          localStorage.removeItem("token");
          router.push("/");
        }
      } catch (error) {
        localStorage.removeItem("token");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, session, status]);

  // Add event listener for auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem("token");
      if (!token && !session) {
        router.push("/");
      }
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, [router, session]);

  // Show loading state
  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Don't render if no user (will redirect)
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    // Clear both authentication methods
    localStorage.removeItem("token");
    
    // Sign out from NextAuth if session exists
    if (session) {
      nextAuthSignOut({ callbackUrl: "/" });
    } else {
      // If no NextAuth session, just redirect
      toast.success("Logged out successfully");
      window.dispatchEvent(new Event("authChange"));
      router.push("/");
      router.refresh();
    }
  };

  const navItems =
    user.role === "ADMIN"
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
              Welcome, {user.name}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {user.role === "ADMIN" ? "Admin" : "User"}
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