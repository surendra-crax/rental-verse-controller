
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Chip } from "@/components/ui/chip";
import { Progress } from "@/components/ui/progress";
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Home,
  Users,
  Star,
  Bell,
  FileCheck,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data for the dashboard
  const stats = [
    {
      title: "Total Users",
      value: "4,326",
      change: "+12%",
      trend: "up",
      icon: Users,
      link: "/admin/users",
    },
    {
      title: "Total Listings",
      value: "843",
      change: "+5.2%",
      trend: "up",
      icon: Building2,
      link: "/admin/listings",
    },
    {
      title: "Pending Reviews",
      value: "24",
      change: "-3%",
      trend: "down",
      icon: Star,
      link: "/admin/reviews",
    },
    {
      title: "KYC Requests",
      value: "18",
      change: "+2",
      trend: "up",
      icon: FileCheck,
      link: "/admin/kyc",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: "John Doe",
      action: "created a new listing",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      user: "Alice Smith",
      action: "submitted KYC documents",
      time: "15 minutes ago",
      status: "pending",
    },
    {
      id: 3,
      user: "Robert Johnson",
      action: "reported an issue with listing #1245",
      time: "1 hour ago",
      status: "warning",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "left a 5-star review",
      time: "3 hours ago",
      status: "success",
    },
    {
      id: 5,
      user: "Michael Brown",
      action: "requested account deletion",
      time: "5 hours ago",
      status: "destructive",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your rental platform
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">View Reports</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Link to={stat.link} key={i} className="transition-apple">
            <Card className="hover-lift border-border/40">
              <CardHeader className="pb-2 pt-6 px-6 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="flex items-center mt-1">
                  <span
                    className={`inline-flex items-center text-xs font-medium ${
                      stat.trend === "up"
                        ? "text-green-500"
                        : "text-destructive"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 border-border/40">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent/50 transition-apple hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className="font-medium">{activity.user}</div>
                    <Chip
                      variant={
                        activity.status === "success"
                          ? "success"
                          : activity.status === "warning"
                          ? "secondary"
                          : activity.status === "destructive"
                          ? "destructive"
                          : "default"
                      }
                      size="sm"
                    >
                      {activity.status}
                    </Chip>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <CardTitle>KYC Verification Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Documentation</span>
                <span className="font-medium">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Identity Verification</span>
                <span className="font-medium">64%</span>
              </div>
              <Progress value={64} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Address Verification</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <Separator />
            <div className="pt-2">
              <Button variant="outline" className="w-full">
                View Verification Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
