
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Bell, Check, Clock, User, Building2, FileCheck, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const NotificationsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");

  // Mock notification data
  const notifications = [
    {
      id: "notif_1",
      type: "user",
      title: "New User Registration",
      message: "User John Doe has registered on the platform.",
      time: "2 minutes ago",
      isRead: false,
      icon: User,
    },
    {
      id: "notif_2",
      type: "listing",
      title: "New Property Listed",
      message: "Alice Johnson has added a new property in New York.",
      time: "1 hour ago",
      isRead: false,
      icon: Building2,
    },
    {
      id: "notif_3",
      type: "kyc",
      title: "KYC Verification Request",
      message: "Robert Smith has submitted documents for KYC verification.",
      time: "3 hours ago",
      isRead: false,
      icon: FileCheck,
    },
    {
      id: "notif_4",
      type: "review",
      title: "New Property Review",
      message: "Emily Davis left a 5-star review for 'Modern Apartment in Downtown'.",
      time: "1 day ago",
      isRead: true,
      icon: Star,
    },
    {
      id: "notif_5",
      type: "user",
      title: "Account Deletion Request",
      message: "User Michael Brown has requested account deletion.",
      time: "2 days ago",
      isRead: true,
      icon: User,
    },
  ];

  const filteredNotifications = notifications.filter(
    (notification) =>
      activeTab === "all" ||
      (activeTab === "unread" && !notification.isRead) ||
      (activeTab === "read" && notification.isRead)
  );

  const handleMarkAsRead = (notificationId: string) => {
    toast({
      title: "Notification marked as read",
      description: `Notification ID: ${notificationId} has been marked as read.`,
    });
  };

  const handleMarkAllAsRead = () => {
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground mt-1">
              Manage system notifications and alerts
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </Button>
        </div>

        <Card className="border-border/40">
          <CardHeader className="pb-3">
            <CardTitle>All Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              className="mb-6"
              onValueChange={setActiveTab}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-apple ${
                    notification.isRead
                      ? "bg-background border-border/40"
                      : "bg-accent/50 border-primary/20"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`rounded-full p-2 ${
                        notification.type === "user"
                          ? "bg-blue-100 text-blue-700"
                          : notification.type === "listing"
                          ? "bg-green-100 text-green-700"
                          : notification.type === "kyc"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      <notification.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium mb-1 flex items-center">
                            {notification.title}
                            {!notification.isRead && (
                              <Chip
                                variant="default"
                                size="sm"
                                className="ml-2 bg-primary/10 text-primary"
                              >
                                New
                              </Chip>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default NotificationsPage;
