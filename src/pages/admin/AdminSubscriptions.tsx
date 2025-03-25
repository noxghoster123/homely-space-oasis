
import { useState } from "react";
import { 
  ArrowUpDown, Check, CreditCard, DollarSign, Edit, Sparkles, 
  Star, Users, Wallet, 
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminLayout } from "@/components/admin/AdminLayout";

// Mock data for subscription plans
const subscriptionPlans = [
  {
    id: "standard",
    name: "Standard",
    price: "$99/month",
    color: "blue",
    features: [
      "List up to 20 properties",
      "Up to 5 agent profiles",
      "Basic analytics",
      "Email support",
      "Standard listing placement"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "$199/month",
    color: "purple",
    features: [
      "List up to 50 properties",
      "Up to 15 agent profiles",
      "Advanced analytics",
      "Priority email & phone support",
      "Featured listing placement",
      "Social media promotion"
    ]
  },
  {
    id: "golden",
    name: "Golden",
    price: "$349/month",
    color: "yellow",
    features: [
      "Unlimited properties",
      "Unlimited agent profiles",
      "Premium analytics & reporting",
      "24/7 dedicated support",
      "Top listing placement",
      "Social media promotion",
      "Virtual tours",
      "Custom branded pages"
    ]
  }
];

// Mock data for subscription transactions
const mockTransactions = [
  {
    id: "tx-001",
    date: "2023-06-15",
    agency: {
      id: 1,
      name: "Elite Real Estate Group"
    },
    plan: "premium",
    amount: "$199.00",
    status: "completed",
    paymentMethod: "Credit Card"
  },
  {
    id: "tx-002",
    date: "2023-06-14",
    agency: {
      id: 4,
      name: "Golden Gate Properties"
    },
    plan: "golden",
    amount: "$349.00",
    status: "completed",
    paymentMethod: "PayPal"
  },
  {
    id: "tx-003",
    date: "2023-06-10",
    agency: {
      id: 2,
      name: "City Properties Inc."
    },
    plan: "standard",
    amount: "$99.00",
    status: "completed",
    paymentMethod: "Credit Card"
  },
  {
    id: "tx-004",
    date: "2023-06-05",
    agency: {
      id: 3,
      name: "Sunshine Realty"
    },
    plan: "standard",
    amount: "$99.00",
    status: "completed",
    paymentMethod: "Bank Transfer"
  },
  {
    id: "tx-005",
    date: "2023-06-01",
    agency: {
      id: 1,
      name: "Elite Real Estate Group"
    },
    plan: "premium",
    amount: "$199.00",
    status: "failed",
    paymentMethod: "Credit Card"
  }
];

// Subscription metrics
const subscriptionMetrics = {
  totalRevenue: "$12,450",
  activeSubscriptions: 38,
  churnRate: "4.2%",
  mostPopularPlan: "Premium"
};

// Edit Plan Dialog Component
const EditPlanDialog = ({ plan }: { plan: typeof subscriptionPlans[0] }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: plan.name,
    price: plan.price.replace(/\$|\//g, ""),
    features: plan.features.join("\n")
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Here you would update the subscription plan in your backend
    console.log("Updated plan:", formData);
    
    toast({
      title: "Plan updated",
      description: `The ${plan.name} plan has been updated successfully.`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Subscription Plan</DialogTitle>
          <DialogDescription>
            Make changes to the {plan.name} subscription plan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price ($)
            </Label>
            <Input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="features" className="text-right">
              Features
            </Label>
            <div className="col-span-3">
              <textarea
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                rows={6}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="One feature per line"
              />
              <p className="text-sm text-gray-500 mt-2">Enter each feature on a new line</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AdminSubscriptions = () => {
  const { toast } = useToast();
  
  return (
    <AdminLayout>
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
            <p className="text-gray-500 mt-1">Manage subscription plans and transactions</p>
          </div>
        </div>
        
        <Tabs defaultValue="plans">
          <TabsList className="mb-6">
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>
          
          {/* Plans Tab */}
          <TabsContent value="plans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <Card key={plan.id} className={`border-${plan.color}-200 hover:shadow-md transition-shadow`}>
                  <CardHeader className={`bg-${plan.color}-50 border-b border-${plan.color}-100`}>
                    <div className="flex justify-between items-center">
                      <CardTitle className={`text-${plan.color}-700`}>{plan.name}</CardTitle>
                      {plan.id === "golden" && (
                        <Sparkles className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <CardDescription className="text-2xl font-bold">{plan.price}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 pt-4 border-t flex justify-between items-center">
                      <EditPlanDialog plan={plan} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ArrowUpDown className="h-4 w-4 mr-2" />
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            View Subscribers
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="mr-2 h-4 w-4" />
                            Make Default
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Discontinue Plan
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Plan
              </Button>
            </div>
          </TabsContent>
          
          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Agency</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                      <TableCell className="font-medium">{transaction.agency.name}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.plan === 'golden' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : transaction.plan === 'premium' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.plan.charAt(0).toUpperCase() + transaction.plan.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {transaction.paymentMethod === 'Credit Card' ? (
                            <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                          ) : transaction.paymentMethod === 'PayPal' ? (
                            <Wallet className="h-4 w-4 mr-2 text-gray-500" />
                          ) : (
                            <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                          )}
                          {transaction.paymentMethod}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Metrics Tab */}
          <TabsContent value="metrics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                      <h3 className="text-2xl font-bold">{subscriptionMetrics.totalRevenue}</h3>
                    </div>
                    <div className="p-2 bg-green-100 rounded-full">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Active Subscriptions</p>
                      <h3 className="text-2xl font-bold">{subscriptionMetrics.activeSubscriptions}</h3>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Churn Rate</p>
                      <h3 className="text-2xl font-bold">{subscriptionMetrics.churnRate}</h3>
                    </div>
                    <div className="p-2 bg-red-100 rounded-full">
                      <ArrowUpDown className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Popular Plan</p>
                      <h3 className="text-2xl font-bold">{subscriptionMetrics.mostPopularPlan}</h3>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts and additional metrics would go here */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Subscription Growth</h3>
              <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                <p className="text-gray-500">Subscription growth chart will be displayed here</p>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Plan Distribution</h3>
                <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">Plan distribution chart will be displayed here</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Monthly Revenue</h3>
                <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">Monthly revenue chart will be displayed here</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSubscriptions;
