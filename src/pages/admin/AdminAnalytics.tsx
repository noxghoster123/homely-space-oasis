
import { useState } from "react";
import { 
  BarChart, Calendar, Home, LineChart, PieChart, TrendingUp, User, Users 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLayout } from "@/components/admin/AdminLayout";

// Mock data for analytics
const overviewData = {
  totalProperties: 842,
  totalUsers: 3247,
  totalAgents: 189,
  totalAgencies: 42,
  totalVisits: 28563,
  totalInquiries: 1254,
  conversionRate: "4.4%",
  avgPropertyPrice: "$525,000"
};

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState("month");
  
  return (
    <AdminLayout>
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-500 mt-1">Platform performance metrics and insights</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Last 24 Hours</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="quarter">Last 3 Months</SelectItem>
                <SelectItem value="year">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Custom Range
            </Button>
            
            <Button>Export</Button>
          </div>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Properties</p>
                  <h3 className="text-2xl font-bold">{overviewData.totalProperties}</h3>
                  <p className="text-sm text-green-600 mt-1">+5.2% from last month</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <Home className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <h3 className="text-2xl font-bold">{overviewData.totalUsers}</h3>
                  <p className="text-sm text-green-600 mt-1">+12.7% from last month</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Visits</p>
                  <h3 className="text-2xl font-bold">{overviewData.totalVisits}</h3>
                  <p className="text-sm text-green-600 mt-1">+8.4% from last month</p>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Inquiries</p>
                  <h3 className="text-2xl font-bold">{overviewData.totalInquiries}</h3>
                  <p className="text-sm text-green-600 mt-1">+3.9% from last month</p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="agents">Agents & Agencies</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Website Traffic</span>
                    <LineChart className="h-5 w-5 text-gray-500" />
                  </CardTitle>
                  <CardDescription>Daily visitors over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                    <p className="text-gray-500">Traffic chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Conversion Rate</span>
                    <PieChart className="h-5 w-5 text-gray-500" />
                  </CardTitle>
                  <CardDescription>Visits to inquiries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                    <p className="text-gray-500">Conversion chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Popular Cities</span>
                    <BarChart className="h-5 w-5 text-gray-500" />
                  </CardTitle>
                  <CardDescription>Most searched locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                    <p className="text-gray-500">Cities chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Device Breakdown</span>
                    <PieChart className="h-5 w-5 text-gray-500" />
                  </CardTitle>
                  <CardDescription>Visitor device types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                    <p className="text-gray-500">Device chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Traffic Sources</span>
                    <PieChart className="h-5 w-5 text-gray-500" />
                  </CardTitle>
                  <CardDescription>Where visitors come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                    <p className="text-gray-500">Traffic sources chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Listings Tab */}
          <TabsContent value="listings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Properties by Type</CardTitle>
                  <CardDescription>Distribution of property types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                    <p className="text-gray-500">Property type chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Price Distribution</CardTitle>
                  <CardDescription>Property prices across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                    <p className="text-gray-500">Price distribution chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Most Viewed Properties</CardTitle>
                <CardDescription>Properties with the highest engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">Properties engagement data will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New registrations over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                    <p className="text-gray-500">User growth chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Daily active users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                    <p className="text-gray-500">User activity chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Age, location, and other demographics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">Demographics data will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Agents & Agencies Tab */}
          <TabsContent value="agents">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Performance</CardTitle>
                  <CardDescription>Top performing agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                    <p className="text-gray-500">Agent performance chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Agency Activity</CardTitle>
                  <CardDescription>Listings and inquiries by agency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                    <p className="text-gray-500">Agency activity chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Subscription Distribution</CardTitle>
                <CardDescription>Agency subscription plan breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">Subscription data will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
