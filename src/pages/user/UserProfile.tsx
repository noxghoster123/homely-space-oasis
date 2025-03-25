
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Avatar, AvatarFallback, AvatarImage 
} from "@/components/ui/avatar";
import {
  Bell, Camera, CreditCard, Heart, Home, Key, Lock, LogOut, Mail, MessageSquare, Settings, User
} from "lucide-react";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock user data
const mockUser = {
  id: 1,
  name: "Jennifer Anderson",
  email: "jennifer.anderson@example.com",
  phone: "+1 (212) 555-3456",
  avatar: "https://via.placeholder.com/150",
  address: "42 West 48th Street, Apt 3B",
  city: "New York",
  state: "NY",
  zipCode: "10036",
  bio: "Looking for my dream home in Manhattan. I work in finance and enjoy exploring the city's diverse neighborhoods and culture.",
  savedProperties: 12,
  inquiries: 5,
  createdAt: "2022-05-15"
};

const UserProfile = () => {
  const { toast } = useToast();
  const [user, setUser] = useState(mockUser);
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    bio: user.bio
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    newProperties: true,
    priceDrops: true,
    savedSearches: true,
    marketUpdates: false,
    agentMessages: true
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
  };
  
  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value
    });
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would update the user's profile in your backend
    console.log("Updated profile:", profileForm);
    
    // Update local state
    setUser({
      ...user,
      ...profileForm
    });
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your new password and confirmation match.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would update the user's password in your backend
    console.log("Password change requested");
    
    // Reset the form
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
  };
  
  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would update the user's notification settings in your backend
    console.log("Updated notification settings:", notificationSettings);
    
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="sticky top-20 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="absolute bottom-0 right-0 h-6 w-6 rounded-full"
                        >
                          <Camera className="h-3 w-3" />
                        </Button>
                      </div>
                      <h3 className="mt-4 text-lg font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <div className="mt-4 text-sm text-gray-500">
                        Member since {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <nav className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <a href="#profile">
                          <User className="mr-2 h-4 w-4" />
                          My Profile
                        </a>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <a href="#favorites">
                          <Heart className="mr-2 h-4 w-4" />
                          Saved Properties
                          <div className="ml-auto bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                            {user.savedProperties}
                          </div>
                        </a>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <a href="#inquiries">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          My Inquiries
                          <div className="ml-auto bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                            {user.inquiries}
                          </div>
                        </a>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <a href="#searches">
                          <Home className="mr-2 h-4 w-4" />
                          Saved Searches
                        </a>
                      </Button>
                    </nav>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <nav className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Account Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Payment Methods
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <Tabs defaultValue="profile">
                <TabsList>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                
                {/* Profile Tab */}
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal information and contact details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleProfileSubmit}>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Full name"
                              value={profileForm.name}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Email address"
                              value={profileForm.email}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              name="phone"
                              placeholder="Phone number"
                              value={profileForm.phone}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">Street Address</Label>
                            <Input
                              id="address"
                              name="address"
                              placeholder="Street address"
                              value={profileForm.address}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              placeholder="City"
                              value={profileForm.city}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label htmlFor="state">State</Label>
                              <Select value={profileForm.state} onValueChange={(value) => setProfileForm({ ...profileForm, state: value })}>
                                <SelectTrigger id="state">
                                  <SelectValue placeholder="State" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="NY">New York</SelectItem>
                                  <SelectItem value="CA">California</SelectItem>
                                  <SelectItem value="TX">Texas</SelectItem>
                                  <SelectItem value="FL">Florida</SelectItem>
                                  <SelectItem value="IL">Illinois</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="zipCode">ZIP Code</Label>
                              <Input
                                id="zipCode"
                                name="zipCode"
                                placeholder="ZIP code"
                                value={profileForm.zipCode}
                                onChange={handleProfileChange}
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2 space-y-2">
                            <Label htmlFor="bio">About Me</Label>
                            <Textarea
                              id="bio"
                              name="bio"
                              placeholder="Tell us a bit about yourself"
                              rows={4}
                              value={profileForm.bio}
                              onChange={handleProfileChange}
                            />
                          </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                          <Button type="submit">
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Security Tab */}
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password & Security</CardTitle>
                      <CardDescription>
                        Manage your password and security settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePasswordSubmit}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">
                              Current Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                placeholder="••••••••"
                                value={passwordForm.currentPassword}
                                onChange={handlePasswordChange}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">
                              New Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                placeholder="••••••••"
                                value={passwordForm.newPassword}
                                onChange={handlePasswordChange}
                              />
                            </div>
                            <p className="text-xs text-gray-500">
                              Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                              Confirm New Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={passwordForm.confirmPassword}
                                onChange={handlePasswordChange}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <Button type="submit">
                            <Lock className="mr-2 h-4 w-4" />
                            Update Password
                          </Button>
                        </div>
                      </form>
                      
                      <div className="mt-8 border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                          <div>
                            <p className="font-medium">Enhance your account security</p>
                            <p className="text-sm text-gray-500 mt-1">
                              Two-factor authentication adds an extra layer of security to your account.
                            </p>
                          </div>
                          <Button variant="outline">
                            <Key className="mr-2 h-4 w-4" />
                            Setup 2FA
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Notifications Tab */}
                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Manage how you receive notifications and updates
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleNotificationSubmit}>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="emailAlerts" className="font-medium">
                                Email Notifications
                              </Label>
                              <Switch
                                id="emailAlerts"
                                checked={notificationSettings.emailAlerts}
                                onCheckedChange={(checked) => handleNotificationChange('emailAlerts', checked)}
                              />
                            </div>
                            <p className="text-sm text-gray-500">
                              Receive all notifications via email.
                            </p>
                          </div>
                          
                          <div className="border-t pt-6 space-y-4">
                            <h3 className="text-sm font-medium mb-2">Property Alerts</h3>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="newProperties" className="font-medium">
                                  New Property Listings
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Get notified when new properties match your saved searches.
                                </p>
                              </div>
                              <Switch
                                id="newProperties"
                                checked={notificationSettings.newProperties}
                                onCheckedChange={(checked) => handleNotificationChange('newProperties', checked)}
                                disabled={!notificationSettings.emailAlerts}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="priceDrops" className="font-medium">
                                  Price Drops
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Receive alerts when prices drop on your saved properties.
                                </p>
                              </div>
                              <Switch
                                id="priceDrops"
                                checked={notificationSettings.priceDrops}
                                onCheckedChange={(checked) => handleNotificationChange('priceDrops', checked)}
                                disabled={!notificationSettings.emailAlerts}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="savedSearches" className="font-medium">
                                  Saved Search Updates
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Weekly updates on your saved searches.
                                </p>
                              </div>
                              <Switch
                                id="savedSearches"
                                checked={notificationSettings.savedSearches}
                                onCheckedChange={(checked) => handleNotificationChange('savedSearches', checked)}
                                disabled={!notificationSettings.emailAlerts}
                              />
                            </div>
                          </div>
                          
                          <div className="border-t pt-6 space-y-4">
                            <h3 className="text-sm font-medium mb-2">Other Notifications</h3>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="marketUpdates" className="font-medium">
                                  Market Updates
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Receive monthly real estate market updates and trends.
                                </p>
                              </div>
                              <Switch
                                id="marketUpdates"
                                checked={notificationSettings.marketUpdates}
                                onCheckedChange={(checked) => handleNotificationChange('marketUpdates', checked)}
                                disabled={!notificationSettings.emailAlerts}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="agentMessages" className="font-medium">
                                  Agent Messages
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Get notified when an agent responds to your inquiry.
                                </p>
                              </div>
                              <Switch
                                id="agentMessages"
                                checked={notificationSettings.agentMessages}
                                onCheckedChange={(checked) => handleNotificationChange('agentMessages', checked)}
                                disabled={!notificationSettings.emailAlerts}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <Button type="submit">
                            <Bell className="mr-2 h-4 w-4" />
                            Save Preferences
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
