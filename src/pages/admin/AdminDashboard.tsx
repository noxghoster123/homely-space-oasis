
import { Link } from "react-router-dom";
import { 
  Home, User, Building, Calendar, Settings, CreditCard, 
  BarChart, LineChart, PieChart, LogOut, Plus
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-estate-900">Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Property
        </Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">426</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Agencies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">57</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">218</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,532</div>
            <p className="text-xs text-muted-foreground">+18.7% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
                  <Building className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-estate-800">New agency registered</p>
                  <p className="text-xs text-estate-500">Urban Housing Solutions joined the platform with Premium subscription</p>
                  <p className="text-xs text-estate-400 mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-800 p-2 rounded-full">
                  <Home className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-estate-800">New property listed</p>
                  <p className="text-xs text-estate-500">Luxury Penthouse with Skyline Views added by Elite Real Estate Group</p>
                  <p className="text-xs text-estate-400 mt-1">4 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 text-purple-800 p-2 rounded-full">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-estate-800">Subscription upgraded</p>
                  <p className="text-xs text-estate-500">Metropolitan Homes upgraded from Standard to Golden subscription</p>
                  <p className="text-xs text-estate-400 mt-1">6 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 text-yellow-800 p-2 rounded-full">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-estate-800">New agent joined</p>
                  <p className="text-xs text-estate-500">Emily Rodriguez joined Elite Real Estate Group as Commercial Agent</p>
                  <p className="text-xs text-estate-400 mt-1">8 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-800 p-2 rounded-full">
                  <Home className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-estate-800">Property sold</p>
                  <p className="text-xs text-estate-500">Modern Condo in Downtown marked as sold by Cityscape Realty</p>
                  <p className="text-xs text-estate-400 mt-1">10 hours ago</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="w-full">View All Activity</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Subscription Analytics */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Subscription Analytics</CardTitle>
            <CardDescription>Distribution of agency subscription plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-estate-50 rounded-lg mb-4">
              <div className="text-center">
                <PieChart className="h-16 w-16 text-estate-300 mx-auto mb-4" />
                <p className="text-estate-600">Subscription Analytics Chart</p>
                <p className="text-estate-400 text-sm">Data visualization will be displayed here</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-100 text-blue-800 p-3 rounded-lg text-center">
                <p className="text-sm font-medium">Standard</p>
                <p className="text-xl font-bold mt-1">28</p>
                <p className="text-xs mt-1">49%</p>
              </div>
              
              <div className="bg-purple-100 text-purple-800 p-3 rounded-lg text-center">
                <p className="text-sm font-medium">Premium</p>
                <p className="text-xl font-bold mt-1">21</p>
                <p className="text-xs mt-1">37%</p>
              </div>
              
              <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg text-center">
                <p className="text-sm font-medium">Golden</p>
                <p className="text-xl font-bold mt-1">8</p>
                <p className="text-xs mt-1">14%</p>
              </div>
            </div>
            
            <Button asChild className="w-full">
              <Link to="/admin/subscriptions">Manage Subscriptions</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
