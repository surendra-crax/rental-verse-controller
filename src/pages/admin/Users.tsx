
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
  UserPlus,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Users = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock user data
  const users = [
    {
      id: "usr_1",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      joined: "Jan 15, 2023",
      status: "active",
      verified: true,
      listings: 3,
    },
    {
      id: "usr_2",
      name: "Robert Smith",
      email: "robert.smith@example.com",
      joined: "Feb 23, 2023",
      status: "active",
      verified: true,
      listings: 2,
    },
    {
      id: "usr_3",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      joined: "Mar 8, 2023",
      status: "inactive",
      verified: false,
      listings: 0,
    },
    {
      id: "usr_4",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      joined: "Apr 12, 2023",
      status: "active",
      verified: true,
      listings: 5,
    },
    {
      id: "usr_5",
      name: "Jessica Wilson",
      email: "jessica.wilson@example.com",
      joined: "May 19, 2023",
      status: "pending",
      verified: false,
      listings: 1,
    },
    {
      id: "usr_6",
      name: "David Moore",
      email: "david.moore@example.com",
      joined: "Jun 7, 2023",
      status: "active",
      verified: true,
      listings: 4,
    },
    {
      id: "usr_7",
      name: "Sarah Taylor",
      email: "sarah.taylor@example.com",
      joined: "Jul 25, 2023",
      status: "suspended",
      verified: true,
      listings: 0,
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusAction = (userId: string, action: string) => {
    toast({
      title: `User ${action}`,
      description: `User ID: ${userId} has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage user accounts and permissions
          </p>
        </div>
        <Button size="sm">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>All Users</CardTitle>
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
                  <DropdownMenuItem>Verify Selected</DropdownMenuItem>
                  <DropdownMenuItem>Suspend Selected</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Delete Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Listings</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="transition-apple">
                    <TableCell className="font-medium">
                      <div>
                        <div>{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        variant={
                          user.status === "active"
                            ? "success"
                            : user.status === "pending"
                            ? "default"
                            : user.status === "inactive"
                            ? "secondary"
                            : "destructive"
                        }
                        size="sm"
                      >
                        {user.status}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      {user.verified ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span className="text-xs">Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-amber-600">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span className="text-xs">Unverified</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell>{user.listings}</TableCell>
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
                              handleStatusAction(user.id, "Verified")
                            }
                          >
                            Verify
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusAction(user.id, "Suspended")
                            }
                          >
                            Suspend
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusAction(user.id, "Deleted")}
                            className="text-destructive"
                          >
                            Delete
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

export default Users;
