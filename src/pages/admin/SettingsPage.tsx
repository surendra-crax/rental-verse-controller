
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your application settings
          </p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" defaultValue="RentalVerse" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site-description">Description</Label>
                    <Input
                      id="site-description"
                      defaultValue="A premium house rental platform"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site-email">Contact Email</Label>
                    <Input
                      id="site-email"
                      type="email"
                      defaultValue="admin@rentalverse.com"
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Features</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reviews">Enable Reviews</Label>
                      <div className="text-sm text-muted-foreground">
                        Allow users to leave reviews on properties
                      </div>
                    </div>
                    <Switch id="reviews" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="messaging">Enable Messaging</Label>
                      <div className="text-sm text-muted-foreground">
                        Allow users to message property owners
                      </div>
                    </div>
                    <Switch id="messaging" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="favorites">Enable Favorites</Label>
                      <div className="text-sm text-muted-foreground">
                        Allow users to save favorite properties
                      </div>
                    </div>
                    <Switch id="favorites" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>KYC Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="kyc-requirement">
                        Require KYC Verification
                      </Label>
                      <div className="text-sm text-muted-foreground">
                        Require users to verify their identity before listing
                        properties
                      </div>
                    </div>
                    <Switch id="kyc-requirement" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="kyc-auto-approve">
                        Auto-approve KYC Submissions
                      </Label>
                      <div className="text-sm text-muted-foreground">
                        Automatically approve KYC submissions without manual review
                      </div>
                    </div>
                    <Switch id="kyc-auto-approve" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-user">New User Registration</Label>
                      <div className="text-sm text-muted-foreground">
                        Receive an email when a new user registers
                      </div>
                    </div>
                    <Switch id="new-user" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-listing">New Property Listing</Label>
                      <div className="text-sm text-muted-foreground">
                        Receive an email when a new property is listed
                      </div>
                    </div>
                    <Switch id="new-listing" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-kyc">New KYC Submission</Label>
                      <div className="text-sm text-muted-foreground">
                        Receive an email when a new KYC verification is submitted
                      </div>
                    </div>
                    <Switch id="new-kyc" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="support-request">
                        New Support Request
                      </Label>
                      <div className="text-sm text-muted-foreground">
                        Receive an email when a user submits a support request
                      </div>
                    </div>
                    <Switch id="support-request" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="login-attempts">
                    Maximum Login Attempts
                  </Label>
                  <Input id="login-attempts" type="number" defaultValue="5" />
                  <p className="text-sm text-muted-foreground">
                    Number of failed login attempts before account is temporarily
                    locked
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">
                        Require Two-Factor Authentication
                      </Label>
                      <div className="text-sm text-muted-foreground">
                        Require admins to use two-factor authentication
                      </div>
                    </div>
                    <Switch id="two-factor" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="session-timeout">
                        Enable Session Timeout
                      </Label>
                      <div className="text-sm text-muted-foreground">
                        Automatically log out inactive users after 30 minutes
                      </div>
                    </div>
                    <Switch id="session-timeout" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
