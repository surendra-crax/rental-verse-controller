
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  FileCheck,
  FileX,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const KYC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  // Mock KYC data
  const kycRequests = [
    {
      id: "kyc_1",
      user: "Alice Johnson",
      email: "alice.johnson@example.com",
      documentType: "ID Card",
      status: "pending",
      submitted: "Jan 15, 2023",
      documentUrl: "https://example.com/docs/id_1.jpg",
    },
    {
      id: "kyc_2",
      user: "Robert Smith",
      email: "robert.smith@example.com",
      documentType: "Passport",
      status: "approved",
      submitted: "Feb 3, 2023",
      documentUrl: "https://example.com/docs/passport_2.jpg",
    },
    {
      id: "kyc_3",
      user: "Emily Davis",
      email: "emily.davis@example.com",
      documentType: "Driver's License",
      status: "rejected",
      submitted: "Mar 8, 2023",
      documentUrl: "https://example.com/docs/license_3.jpg",
      notes: "The document is expired."
    },
    {
      id: "kyc_4",
      user: "Michael Brown",
      email: "michael.brown@example.com",
      documentType: "ID Card",
      status: "pending",
      submitted: "Apr 12, 2023",
      documentUrl: "https://example.com/docs/id_4.jpg",
    },
    {
      id: "kyc_5",
      user: "Jessica Wilson",
      email: "jessica.wilson@example.com",
      documentType: "Passport",
      status: "approved",
      submitted: "May 19, 2023",
      documentUrl: "https://example.com/docs/passport_5.jpg",
    },
    {
      id: "kyc_6",
      user: "David Moore",
      email: "david.moore@example.com",
      documentType: "Driver's License",
      status: "pending",
      submitted: "Jun 7, 2023",
      documentUrl: "https://example.com/docs/license_6.jpg",
    },
  ];

  const filteredRequests = kycRequests.filter(
    (request) =>
      (activeTab === "all" ||
        (activeTab === "pending" && request.status === "pending") ||
        (activeTab === "approved" && request.status === "approved") ||
        (activeTab === "rejected" && request.status === "rejected")) &&
      (request.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.documentType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleKYCAction = (requestId: string, action: string) => {
    toast({
      title: `KYC Request ${action}`,
      description: `KYC Request ID: ${requestId} has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">KYC Verification</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage user verification documents
          </p>
        </div>
      </div>

      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Verification Requests</CardTitle>
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
              placeholder="Search KYC requests..."
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
                  <TableHead>Document Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id} className="transition-apple">
                    <TableCell className="font-medium">
                      <div>
                        <div>{request.user}</div>
                        <div className="text-xs text-muted-foreground">
                          {request.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{request.documentType}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {request.status === "approved" ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                            <Chip variant="success" size="sm">
                              Approved
                            </Chip>
                          </>
                        ) : request.status === "rejected" ? (
                          <>
                            <XCircle className="h-4 w-4 mr-1 text-destructive" />
                            <Chip variant="destructive" size="sm">
                              Rejected
                            </Chip>
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 mr-1 text-amber-500" />
                            <Chip variant="default" size="sm">
                              Pending
                            </Chip>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{request.submitted}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8"
                              onClick={() => setSelectedRequest(request)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>KYC Document Review</DialogTitle>
                              <DialogDescription>
                                Review verification documents for {selectedRequest?.user}.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="font-medium mb-2">User Information</h3>
                                  <p className="text-sm mb-1">
                                    <span className="text-muted-foreground">Name:</span> {selectedRequest?.user}
                                  </p>
                                  <p className="text-sm mb-1">
                                    <span className="text-muted-foreground">Email:</span> {selectedRequest?.email}
                                  </p>
                                  <p className="text-sm mb-1">
                                    <span className="text-muted-foreground">Document Type:</span> {selectedRequest?.documentType}
                                  </p>
                                  <p className="text-sm mb-1">
                                    <span className="text-muted-foreground">Submitted:</span> {selectedRequest?.submitted}
                                  </p>
                                  <p className="text-sm mb-1">
                                    <span className="text-muted-foreground">Status:</span>{" "}
                                    <Chip
                                      variant={
                                        selectedRequest?.status === "approved"
                                          ? "success"
                                          : selectedRequest?.status === "rejected"
                                          ? "destructive"
                                          : "default"
                                      }
                                      size="sm"
                                    >
                                      {selectedRequest?.status}
                                    </Chip>
                                  </p>
                                </div>
                                <div>
                                  <h3 className="font-medium mb-2">Document Preview</h3>
                                  <div className="rounded-md border bg-muted/50 h-40 flex items-center justify-center">
                                    <p className="text-muted-foreground text-sm">
                                      Document preview would be displayed here
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {selectedRequest?.notes && (
                                <div>
                                  <h3 className="font-medium mb-2">Notes</h3>
                                  <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
                                    {selectedRequest.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                            <DialogFooter className="gap-2 sm:justify-start">
                              <Button
                                variant="default"
                                onClick={() =>
                                  handleKYCAction(selectedRequest?.id, "Approved")
                                }
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() =>
                                  handleKYCAction(selectedRequest?.id, "Rejected")
                                }
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
                                handleKYCAction(request.id, "Approved")
                              }
                            >
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleKYCAction(request.id, "Rejected")
                              }
                            >
                              Reject
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleKYCAction(request.id, "Requested More Info")
                              }
                            >
                              Request More Info
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
  );
};

export default KYC;
