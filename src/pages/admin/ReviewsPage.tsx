
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chip } from "@/components/ui/chip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  MoreHorizontal,
  Filter,
  Star,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ReviewsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock review data
  const reviews = [
    {
      id: "rev_1",
      user: "Alice Johnson",
      property: "Modern Apartment in Downtown",
      rating: 5,
      comment: "Beautiful apartment with amazing views. Had a great stay!",
      status: "approved",
      date: "Jan 15, 2023",
    },
    {
      id: "rev_2",
      user: "Robert Smith",
      property: "Cozy Beachside Cottage",
      rating: 4,
      comment: "Lovely place with great amenities. Just a short walk to the beach.",
      status: "pending",
      date: "Feb 23, 2023",
    },
    {
      id: "rev_3",
      user: "Emily Davis",
      property: "Luxury Penthouse Suite",
      rating: 2,
      comment: "The property was not as advertised. Many amenities were not working.",
      status: "rejected",
      date: "Mar 8, 2023",
      rejectionReason: "Contains inappropriate content",
    },
    {
      id: "rev_4",
      user: "Michael Brown",
      property: "Family Home with Garden",
      rating: 5,
      comment: "Perfect for our family vacation. The kids loved the garden.",
      status: "approved",
      date: "Apr 12, 2023",
    },
    {
      id: "rev_5",
      user: "Jessica Wilson",
      property: "Studio in Arts District",
      rating: 3,
      comment: "Good location but a bit noisy at night.",
      status: "pending",
      date: "May 19, 2023",
    },
  ];

  const filteredReviews = reviews.filter(
    (review) =>
      (activeTab === "all" ||
        (activeTab === "pending" && review.status === "pending") ||
        (activeTab === "approved" && review.status === "approved") ||
        (activeTab === "rejected" && review.status === "rejected")) &&
      (review.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleReviewAction = (reviewId: string, action: string) => {
    toast({
      title: `Review ${action}`,
      description: `Review ID: ${reviewId} has been ${action.toLowerCase()}.`,
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}.0</span>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Reviews</h1>
            <p className="text-muted-foreground mt-1">
              Manage user reviews for properties
            </p>
          </div>
        </div>

        <Card className="border-border/40">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>All Reviews</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Bulk Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Approve Selected</DropdownMenuItem>
                    <DropdownMenuItem>Reject Selected</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              className="mb-6"
              onValueChange={setActiveTab}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.map((review) => (
                    <TableRow key={review.id} className="transition-apple">
                      <TableCell className="font-medium">{review.user}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {review.property}
                      </TableCell>
                      <TableCell>{renderStars(review.rating)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {review.status === "approved" ? (
                            <Chip variant="success" size="sm">
                              Approved
                            </Chip>
                          ) : review.status === "rejected" ? (
                            <Chip variant="destructive" size="sm">
                              Rejected
                            </Chip>
                          ) : (
                            <Chip variant="default" size="sm">
                              Pending
                            </Chip>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{review.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                size="sm"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleReviewAction(review.id, "Approved")
                                }
                              >
                                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleReviewAction(review.id, "Rejected")
                                }
                              >
                                <XCircle className="h-4 w-4 mr-2 text-destructive" />
                                Reject
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleReviewAction(review.id, "Highlighted")
                                }
                              >
                                <Star className="h-4 w-4 mr-2 text-amber-500" />
                                Highlight
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ReviewsPage;
