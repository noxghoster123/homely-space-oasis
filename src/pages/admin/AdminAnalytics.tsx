import { BarChart, LineChart, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import { TooltipProvider } from "@/components/ui/tooltip";

const AdminAnalytics = () => {
  return (
    <AdminLayout>
      <TooltipProvider>
        <div className="container px-6 py-8 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-500 mt-1">View platform performance and insights</p>
            </div>
            
            <Tabs defaultValue="overview" className="mt-4 md:mt-0">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$124,903.29</div>
                <p className="text-xs text-muted-foreground">+10.2% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">54</div>
                <p className="text-xs text-muted-foreground">+2 new subscriptions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,452</div>
                <p className="text-xs text-muted-foreground">+14.5% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Revenue by subscription type</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-slate-50 rounded-lg">
                <div className="text-center">
                  <PieChart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">Revenue Breakdown Chart</p>
                  <p className="text-slate-400 text-sm">Data visualization will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New users over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-slate-50 rounded-lg">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">User Growth Chart</p>
                  <p className="text-slate-400 text-sm">Data visualization will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Property Statistics</CardTitle>
                <CardDescription>Property listings by type and location</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center bg-slate-50 rounded-lg">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">Property Statistics Chart</p>
                  <p className="text-slate-400 text-sm">Data visualization will be displayed here</p>
                  <Button className="mt-4" variant="outline">Export Data</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TooltipProvider>
    </AdminLayout>
  );
};

export default AdminAnalytics;
