
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowUpDown, Check, CheckCircle, Edit, Eye, Plus, Search, Trash, CreditCard
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/admin/AdminLayout";

// Mock data for subscriptions
const mockSubscriptions = [
  {
    id: 1,
    agency: {
      id: 1,
      name: "Elite Real Estate Group",
      logo: "https://via.placeholder.com/40"
    },
    plan: "premium",
    price: "$99.99",
    status: "active",
    startDate: "2023-01-15",
    endDate: "2024-01-15",
    paymentMethod: "Credit Card",
    lastPayment: "2023-07-15",
  },
  {
    id: 2,
    agency: {
      id: 2,
      name: "City Properties Inc.",
      logo: "https://via.placeholder.com/40"
    },
    plan: "standard",
    price: "$49.99",
    status: "active",
    startDate: "2023-02-10",
    endDate: "2024-02-10",
    paymentMethod: "PayPal",
    lastPayment: "2023-07-10",
  },
  {
    id: 3,
    agency: {
      id: 3,
      name: "Sunshine Realty",
      logo: "https://via.placeholder.com/40"
    },
    plan: "standard",
    price: "$49.99",
    status: "active",
    startDate: "2023-03-22",
    endDate: "2024-03-22",
    paymentMethod: "Credit Card",
    lastPayment: "2023-07-22",
  },
  {
    id: 4,
    agency: {
      id: 4,
      name: "Golden Gate Properties",
      logo: "https://via.placeholder.com/40"
    },
    plan: "golden",
    price: "$199.99",
    status: "active",
    startDate: "2023-05-05",
    endDate: "2024-05-05",
    paymentMethod: "Bank Transfer",
    lastPayment: "2023-07-05",
  },
  {
    id: 5,
    agency: {
      id: 5,
      name: "Mountain View Estates",
      logo: "https://via.placeholder.com/40"
    },
    plan: "standard",
    price: "$49.99",
    status: "inactive",
    startDate: "2023-01-20",
    endDate: "2024-01-20",
    paymentMethod: "Credit Card",
    lastPayment: "2023-06-20",
  },
];

const subscriptionPlans = [
  {
    id: "standard",
    name: "Standard Plan",
    description: "Basic features for small real estate agencies",
    price: "$49.99",
    features: [
      "List up to 20 properties",
      "5 agent accounts",
      "Basic analytics",
      "Email support",
      "Property image gallery",
    ],
    color: "blue",
  },
  {
    id: "premium",
    name: "Premium Plan",
    description: "Advanced features for growing agencies",
    price: "$99.99",
    features: [
      "List up to 50 properties",
      "15 agent accounts",
      "Advanced analytics",
      "Priority email & phone support",
      "Virtual property tours",
      "Featured property listings",
    ],
    color: "purple",
    recommended: true,
  },
  {
    id: "golden",
    name: "Golden Plan",
    description: "Enterprise features for large agencies",
    price: "$199.99",
    features: [
      "Unlimited property listings",
      "Unlimited agent accounts",
      "Premium analytics with market insights",
      "24/7 dedicated support",
      "Virtual property tours",
      "Featured property listings",
      "Custom branding",
      "API access",
    ],
    color: "yellow",
  },
];

// Type for subscription change dialog
type SubscriptionChangeDialogProps = {
  subscription: {
    id: number;
    agency: {
      id: number;
      name: string;
    };
    plan: string;
  };
  onChangePlan: (id: number, plan: string) => void;
};

// Subscription change dialog component
const SubscriptionChangeDialog = ({ 
  subscription, 
  onChangePlan 
}: SubscriptionChangeDialogProps) => {
  const [plan, setPlan] = useState(subscription.plan);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Subscription Plan</DialogTitle>
          <DialogDescription>
            Update the subscription plan for {subscription.agency.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div 
              className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer ${
                plan === 'standard' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setPlan('standard')}
            >
              {plan === 'standard' && (
                <CheckCircle className="h-5 w-5 text-blue-500" />
              )}
              <div className="flex-1">
                <h3 className="font-medium">Standard Plan</h3>
                <p className="text-sm text-gray-500">Basic features for small agencies</p>
                <p className="text-sm font-medium text-gray-700 mt-1">$49.99/month</p>
              </div>
            </div>
            
            <div 
              className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer ${
                plan === 'premium' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
              }`}
              onClick={() => setPlan('premium')}
            >
              {plan === 'premium' && (
                <CheckCircle className="h-5 w-5 text-purple-500" />
              )}
              <div className="flex-1">
                <h3 className="font-medium">Premium Plan</h3>
                <p className="text-sm text-gray-500">Advanced features for growing agencies</p>
                <p className="text-sm font-medium text-gray-700 mt-1">$99.99/month</p>
              </div>
            </div>
            
            <div 
              className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer ${
                plan === 'golden' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'
              }`}
              onClick={() => setPlan('golden')}
            >
              {plan === 'golden' && (
                <CheckCircle className="h-5 w-5 text-yellow-500" />
              )}
              <div className="flex-1">
                <h3 className="font-medium">Golden Plan</h3>
                <p className="text-sm text-gray-500">Premium features for enterprise agencies</p>
                <p className="text-sm font-medium text-gray-700 mt-1">$199.99/month</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={() => onChangePlan(subscription.id, plan)}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AdminSubscriptions = () => {
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter subscriptions based on search term
  const filteredSubscriptions = subscriptions.filter(subscription => 
    subscription.agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscription.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle subscription plan change
  const handleChangePlan = (id: number, plan: string) => {
    setSubscriptions(prevSubscriptions => 
      prevSubscriptions.map(subscription => 
        subscription.id === id ? { ...subscription, plan } : subscription
      )
    );
    
    toast({
      title: "Subscription plan updated",
      description: "The agency's subscription plan has been updated successfully.",
    });
  };
  
  // Handle subscription status toggle
  const handleToggleStatus = (id: number) => {
    setSubscriptions(prevSubscriptions => 
      prevSubscriptions.map(subscription => 
        subscription.id === id 
          ? { ...subscription, status: subscription.status === 'active' ? 'inactive' : 'active' } 
          : subscription
      )
    );
    
    const subscription = subscriptions.find(s => s.id === id);
    const newStatus = subscription?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: `Subscription ${newStatus}`,
      description: `The subscription for ${subscription?.agency.name} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`,
    });
  };
  
  return (
    <AdminLayout>
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
            <p className="text-gray-500 mt-1">Manage agency subscription plans</p>
          </div>
          
          <div className="mt-4 lg:mt-0 flex space-x-2">
            <Button className="whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" />
              Add New Plan
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="active">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="active">Active Subscriptions</TabsTrigger>
              <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            </TabsList>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search subscriptions..."
                className="pl-9 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="active">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Agency</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.length > 0 ? (
                    filteredSubscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={subscription.agency.logo} 
                              alt={subscription.agency.name} 
                              className="w-8 h-8 rounded-full"
                            />
                            <span>{subscription.agency.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            subscription.plan === 'golden' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : subscription.plan === 'premium' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>{subscription.price}</TableCell>
                        <TableCell>{new Date(subscription.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(subscription.endDate).toLocaleDateString()}</TableCell>
                        <TableCell>{subscription.paymentMethod}</TableCell>
                        <TableCell>
                          <Button
                            variant={subscription.status === 'active' ? "default" : "outline"}
                            size="sm"
                            className={subscription.status === 'active' ? "bg-green-500 hover:bg-green-600" : "text-gray-500"}
                            onClick={() => handleToggleStatus(subscription.id)}
                          >
                            {subscription.status === 'active' ? (
                              <>
                                <Check className="mr-1 h-4 w-4" />
                                Active
                              </>
                            ) : (
                              "Inactive"
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <SubscriptionChangeDialog 
                              subscription={subscription} 
                              onChangePlan={handleChangePlan}
                            />
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <ArrowUpDown className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link to={`/admin/subscriptions/${subscription.id}/details`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link to={`/admin/subscriptions/${subscription.id}/billing`}>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Billing History
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" />
                                  Cancel Subscription
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                        No subscriptions found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="plans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`bg-white rounded-lg shadow-sm border ${
                    plan.recommended 
                      ? 'border-purple-500 ring-2 ring-purple-200' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="p-6">
                    {plan.recommended && (
                      <span className="inline-block px-3 py-1 text-xs font-medium text-purple-800 bg-purple-100 rounded-full mb-4">
                        Recommended
                      </span>
                    )}
                    
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-500 mt-1">{plan.description}</p>
                    
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 ml-1">/month</span>
                    </div>
                    
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full mt-8">
                      Edit Plan
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSubscriptions;
