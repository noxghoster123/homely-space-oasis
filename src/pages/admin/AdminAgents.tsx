import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowUpDown, Check, Edit, Eye, Plus, Search, Trash, 
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
import AdminLayout from "@/components/admin/AdminLayout";

// Mock data for agents
const mockAgents = [
  {
    id: 101,
    name: "Sarah Johnson",
    image: "https://via.placeholder.com/40",
    email: "sarah.johnson@eliterealestate.com",
    phone: "+1 (212) 555-7890",
    agency: {
      id: 1,
      name: "Elite Real Estate Group"
    },
    properties: 12,
    status: "active",
  },
  {
    id: 102,
    name: "Michael Chen",
    image: "https://via.placeholder.com/40",
    email: "michael.chen@eliterealestate.com",
    phone: "+1 (212) 555-7891",
    agency: {
      id: 1,
      name: "Elite Real Estate Group"
    },
    properties: 9,
    status: "active",
  },
  {
    id: 103,
    name: "Emily Rodriguez",
    image: "https://via.placeholder.com/40",
    email: "emily.rodriguez@cityproperties.com",
    phone: "+1 (312) 555-1234",
    agency: {
      id: 2,
      name: "City Properties Inc."
    },
    properties: 7,
    status: "active",
  },
  {
    id: 104,
    name: "David Kim",
    image: "https://via.placeholder.com/40",
    email: "david.kim@eliterealestate.com",
    phone: "+1 (212) 555-7892",
    agency: {
      id: 1,
      name: "Elite Real Estate Group"
    },
    properties: 11,
    status: "active",
  },
  {
    id: 105,
    name: "Jennifer Taylor",
    image: "https://via.placeholder.com/40",
    email: "jennifer.taylor@sunshinerealty.com",
    phone: "+1 (305) 555-9876",
    agency: {
      id: 3,
      name: "Sunshine Realty"
    },
    properties: 8,
    status: "inactive",
  },
];

const AdminAgents = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState(mockAgents);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter agents based on search term
  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.agency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle agent status toggle
  const handleToggleStatus = (id: number) => {
    setAgents(prevAgents => 
      prevAgents.map(agent => 
        agent.id === id 
          ? { ...agent, status: agent.status === 'active' ? 'inactive' : 'active' } 
          : agent
      )
    );
    
    const agent = agents.find(a => a.id === id);
    const newStatus = agent?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: `Agent ${newStatus}`,
      description: `${agent?.name} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`,
    });
  };
  
  return (
    <AdminLayout>
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agents</h1>
            <p className="text-gray-500 mt-1">Manage all real estate agents on the platform</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search agents..."
                className="pl-9 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button className="whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" />
              Add Agent
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Agent</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Agency</TableHead>
                <TableHead className="text-center">Properties</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.length > 0 ? (
                filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={agent.image} 
                          alt={agent.name} 
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{agent.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.phone}</TableCell>
                    <TableCell>
                      <Link 
                        to={`/agencies/${agent.agency.id}`} 
                        className="hover:underline text-blue-600"
                      >
                        {agent.agency.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">{agent.properties}</TableCell>
                    <TableCell>
                      <Button
                        variant={agent.status === 'active' ? "default" : "outline"}
                        size="sm"
                        className={agent.status === 'active' ? "bg-green-500 hover:bg-green-600" : "text-gray-500"}
                        onClick={() => handleToggleStatus(agent.id)}
                      >
                        {agent.status === 'active' ? (
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
                          <Link to={`/agent/profile/${agent.id}`}>
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
                              <Link to={`/admin/agents/${agent.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Agent
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
                    No agents found matching your search.
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

export default AdminAgents;
