
import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminLayout from "@/components/admin/AdminLayout";

// Mock property data
const mockProperties = [
  {
    id: 1,
    title: "Luxury Penthouse with Skyline Views",
    type: "Apartment",
    location: "Manhattan, NY",
    price: "$2,450,000",
    agency: "Elite Real Estate Group",
    status: "active",
    date: "2023-06-15",
  },
  {
    id: 2,
    title: "Modern Condo in Downtown",
    type: "Condo",
    location: "Brooklyn, NY",
    price: "$985,000",
    agency: "Cityscape Realty",
    status: "sold",
    date: "2023-05-22",
  },
  {
    id: 3,
    title: "Waterfront Estate with Private Dock",
    type: "House",
    location: "Hamptons, NY",
    price: "$4,750,000",
    agency: "Golden Gate Properties",
    status: "active",
    date: "2023-07-01",
  },
  {
    id: 4,
    title: "Renovated Brownstone Townhouse",
    type: "Townhouse",
    location: "Upper East Side, NY",
    price: "$3,200,000",
    agency: "Metropolitan Homes",
    status: "pending",
    date: "2023-06-28",
  },
  {
    id: 5,
    title: "Studio Apartment near Central Park",
    type: "Apartment",
    location: "Manhattan, NY",
    price: "$650,000",
    agency: "Urban Housing Solutions",
    status: "active",
    date: "2023-06-10",
  },
];

const AdminProperties = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.agency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "sold":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-estate-900">Properties</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Property
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-estate-100 shadow-sm overflow-hidden">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-estate-100">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-estate-400" />
              <Input
                type="search"
                placeholder="Search properties..."
                className="pl-10 w-full sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>

        {/* Properties Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Agency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>{property.type}</TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell>{property.price}</TableCell>
                    <TableCell>{property.agency}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          property.status
                        )}`}
                      >
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(property.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-estate-500">
                    No properties found. Try adjusting your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-estate-100">
          <div className="text-sm text-estate-600">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{filteredProperties.length}</span> of{" "}
            <span className="font-medium">{properties.length}</span> properties
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;
