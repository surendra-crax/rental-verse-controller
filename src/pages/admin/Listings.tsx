
import React, { useState } from "react";
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
  Plus,
  Filter,
  Building2,
  Home,
  Hotel,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Listings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock listing data
  const listings = [
    {
      id: "lst_1",
      title: "Modern Apartment in Downtown",
      owner: "Alice Johnson",
      type: "apartment",
      status: "active",
      location: "New York, NY",
      price: "$1,800/month",
      created: "Jan 12, 2023",
    },
    {
      id: "lst_2",
      title: "Cozy Beachside Cottage",
      owner: "Robert Smith",
      type: "house",
      status: "pending",
      location: "Miami, FL",
      price: "$2,500/month",
      created: "Feb 3, 2023",
    },
    {
      id: "lst_3",
      title: "Luxury Penthouse Suite",
      owner: "Emily Davis",
      type: "apartment",
      status: "active",
      location: "Los Angeles, CA",
      price: "$4,200/month",
      created: "Mar 17, 2023",
    },
    {
      id: "lst_4",
      title: "Family Home with Garden",
      owner: "Michael Brown",
      type: "house",
      status: "inactive",
      location: "Chicago, IL",
      price: "$2,900/month",
      created: "Apr 5, 2023",
    },
    {
      id: "lst_5",
      title: "Studio in Arts District",
      owner: "Jessica Wilson",
      type: "studio",
      status: "active",
      location: "Portland, OR",
      price: "$1,400/month",
      created: "May 22, 2023",
    },
    {
      id: "lst_6",
      title: "Mountain View Cabin",
      owner: "David Moore",
      type: "house",
      status: "pending",
      location: "Denver, CO",
      price: "$1,950/month",
      created: "Jun 8, 2023",
    },
    {
      id: "lst_7",
      title: "Downtown Loft Space",
      owner: "Sarah Taylor",
      type: "apartment",
      status: "active",
      location: "Austin, TX",
      price: "$2,100/month",
      created: "Jul 14, 2023",
    },
  ];

  const filteredListings = listings.filter(
    (listing) =>
      (activeTab === "all" ||
        (activeTab === "active" && listing.status === "active") ||
        (activeTab === "pending" && listing.status === "pending") ||
        (activeTab === "inactive" && listing.status === "inactive")) &&
      (listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleListingAction = (listingId: string, action: string) => {
    toast({
      title: `Listing ${action}`,
      description: `Listing ID: ${listingId} has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Listings</h1>
          <p className="text-muted-foreground mt-1">
            Manage property listings across the platform
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Listing
        </Button>
      </div>

      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>All Listings</CardTitle>
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
                  <DropdownMenuItem>Feature Selected</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Remove Selected
                  </DropdownMenuItem>
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
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search listings..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredListings.map((listing) => (
                  <TableRow key={listing.id} className="transition-apple">
                    <TableCell className="font-medium">
                      <div>
                        <div>{listing.title}</div>
                        <div className="text-xs text-muted-foreground">
                          Owner: {listing.owner}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {listing.type === "apartment" ? (
                          <Building2 className="h-4 w-4 mr-1 text-primary" />
                        ) : listing.type === "house" ? (
                          <Home className="h-4 w-4 mr-1 text-primary" />
                        ) : (
                          <Hotel className="h-4 w-4 mr-1 text-primary" />
                        )}
                        <span className="capitalize">{listing.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        variant={
                          listing.status === "active"
                            ? "success"
                            : listing.status === "pending"
                            ? "default"
                            : "secondary"
                        }
                        size="sm"
                      >
                        {listing.status}
                      </Chip>
                    </TableCell>
                    <TableCell>{listing.location}</TableCell>
                    <TableCell>{listing.price}</TableCell>
                    <TableCell>{listing.created}</TableCell>
                    <TableCell>
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
                              handleListingAction(listing.id, "Approved")
                            }
                          >
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleListingAction(listing.id, "Featured")
                            }
                          >
                            Feature
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleListingAction(listing.id, "Removed")
                            }
                            className="text-destructive"
                          >
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Listings;
