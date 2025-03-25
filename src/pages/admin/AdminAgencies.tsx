import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowUpDown, Check, CheckCircle, Edit, Eye, Plus, Search, Trash, Users
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
import AdminLayout from "@/components/admin/AdminLayout";

// Mock data for agencies
const mockAgencies = [
  {
    id: 1,
    name: "Elite Real Estate Group",
    logo: "https://via.placeholder.com/40",
    location: "New York, NY",
    agents: 24,
    properties: 48,
    subscription: "premium",
    status: "active",
  },
  {
    id: 2,
    name: "City Properties Inc.",
    logo: "https://via.placeholder.com/40",
    location: "Chicago, IL",
    agents: 18,
    properties: 32,
    subscription: "standard",
    status: "active",
  },
  {
    id: 3,
    name: "Sunshine Realty",
    logo: "https://via.placeholder.com/40",
    location: "Miami, FL",
    agents: 15,
    properties: 29,
    subscription: "standard",
    status: "active",
  },
  {
    id: 4,
    name: "Golden Gate Properties",
    logo: "https://via.placeholder.com/40",
    location: "San Francisco, CA",
    agents: 21,
    properties: 43,
    subscription: "golden",
    status: "active",
  },
  {
    id: 5,
    name: "Mountain View Estates",
    logo: "https://via.placeholder.com/40",
    location: "Denver, CO",
    agents: 12,
    properties: 27,
    subscription: "standard",
    status: "inactive",
  },
];

// Type for subscription change dialog
type SubscriptionChangeDialogProps = {
  agency: {
    id: number;
    name: string;
    subscription: string;
  };
  onChangeSubscription: (id: number, subscription: string) => void;
};

// Subscription change dialog component
const SubscriptionChangeDialog = ({ 
  agency, 
  onChangeSubscription 
}: SubscriptionChangeDialogProps) => {
  const [subscription, setSubscription] = useState(agency.subscription);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Subscription</DialogTitle>
          <DialogDescription>
            Update the subscription plan for {agency.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div 
              className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer ${
                subscription === 'standard' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSubscription('standard')}
            >
              {subscription === 'standard' && (
                <CheckCircle className="h-5 w-5 text-blue-500" />
              )}
              <div className="flex-1">
                <h3 className="font-medium">Standard Plan</h3>
                <p className="text-sm text-gray-500">Basic features for small agencies</p>
              </div>
            </div>
            
            <div 
              className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer ${
                subscription === 'premium' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
              }`}
              onClick={() => setSubscription('premium')}
            >
              {subscription === 'premium' && (
                <CheckCircle className="h-5 w-5 text-purple-500" />
              )}
              <div className="flex-1">
                <h3 className="font-medium">Premium Plan</h3>
                <p className="text-sm text-gray-500">Advanced features for growing agencies</p>
              </div>
            </div>
            
            <div 
              className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer ${
                subscription === 'golden' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'
              }`}
              onClick={() => setSubscription('golden')}
            >
              {subscription === 'golden' && (
                <CheckCircle className="h-5 w-5 text-yellow-500" />
              )}
              <div className="flex-1">
                <h3 className="font-medium">Golden Plan</h3>
                <p className="text-sm text-gray-500">Premium features for enterprise agencies</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={() => onChangeSubscription(agency.id, subscription)}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AdminAgencies = () => {
  const { toast } = useToast();
  const [agencies, setAgencies] = useState(mockAgencies);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter agencies based on search term
  const filteredAgencies = agencies.filter(agency => 
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle subscription change
  const handleChangeSubscription = (id: number, subscription: string) => {
    setAgencies(prevAgencies => 
      prevAgencies.map(agency => 
        agency.id === id ? { ...agency, subscription } : agency
      )
    );
    
    toast({
      title: "Subscription updated",
      description: "The agency's subscription plan has been updated successfully.",
    });
  };
  
  // Handle agency status toggle
  const handleToggleStatus = (id: number) => {
    setAgencies(prevAgencies => 
      prevAgencies.map(agency => 
        agency.id === id 
          ? { ...agency, status: agency.status === 'active' ? 'inactive' : 'active' } 
          : agency
      )
    );
    
    const agency = agencies.find(a => a.id === id);
    const newStatus = agency?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: `Agency ${newStatus}`,
      description: `${agency?.name} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`,
    });
  };
  
  return (
    <AdminLayout>
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agencies</h1>
            <p className="text-gray-500 mt-1">Manage all agencies on the platform</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search agencies..."
                className="pl-9 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button className="whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" />
              Add Agency
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Agency</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-center">Agents</TableHead>
                <TableHead className="text-center">Properties</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgencies.length > 0 ? (
                filteredAgencies.map((agency) => (
                  <TableRow key={agency.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={agency.logo} 
                          alt={agency.name} 
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{agency.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{agency.location}</TableCell>
                    <TableCell className="text-center">{agency.agents}</TableCell>
                    <TableCell className="text-center">{agency.properties}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          agency.subscription === 'golden' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : agency.subscription === 'premium' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {agency.subscription.charAt(0).toUpperCase() + agency.subscription.slice(1)}
                        </span>
                        <SubscriptionChangeDialog 
                          agency={agency} 
                          onChangeSubscription={handleChangeSubscription}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={agency.status === 'active' ? "default" : "outline"}
                        size="sm"
                        className={agency.status === 'active' ? "bg-green-500 hover:bg-green-600" : "text-gray-500"}
                        onClick={() => handleToggleStatus(agency.id)}
                      >
                        {agency.status === 'active' ? (
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
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/agencies/${agency.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ArrowUpDown className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/agencies/${agency.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/agencies/${agency.id}/agents`}>
                                <Users className="mr-2 h-4 w-4" />
                                View Agents
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Agency
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    No agencies found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAgencies;
