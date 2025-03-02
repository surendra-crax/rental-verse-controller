
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  Users,
  Building2,
  Star,
  Bell,
  FileCheck,
  LogOut,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { toast } = useToast();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Listings", href: "/admin/listings", icon: Building2 },
    { name: "Reviews", href: "/admin/reviews", icon: Star },
    { name: "Notifications", href: "/admin/notifications", icon: Bell },
    { name: "KYC Verification", href: "/admin/kyc", icon: FileCheck },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    // Implement actual logout logic here
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button
          className="fixed z-50 top-4 left-4 p-2 rounded-full bg-primary text-white shadow-md transition-apple"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out bg-white border-r border-border shadow-sm",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-border">
            <Link to="/admin" className="flex items-center space-x-2">
              <span className="text-xl font-semibold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                RentalVerse
              </span>
            </Link>
          </div>

          <div className="flex-1 px-4 space-y-1 overflow-y-auto py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md group transition-apple",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    location.pathname === item.href
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          !isMobile && "ml-64"
        )}
      >
        <main className="p-6 max-w-7xl mx-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
