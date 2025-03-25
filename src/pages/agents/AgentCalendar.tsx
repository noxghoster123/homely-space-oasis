
import { useState } from "react";
import { format, addDays, startOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parseISO } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Plus, User } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Popover, PopoverContent, PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/components/ui/use-toast";

// Mock agent tours data
const mockTours = [
  {
    id: 1,
    title: "Luxury Penthouse Tour",
    date: "2023-07-05T14:00:00",
    clientName: "John Smith",
    clientPhone: "+1 (212) 555-7890",
    clientEmail: "john.smith@example.com",
    propertyId: 201,
    propertyTitle: "Luxury Penthouse with Skyline Views",
    propertyAddress: "123 Central Park West, New York, NY",
    notes: "Client is interested in penthouse properties with views. Budget around $2.5M."
  },
  {
    id: 2,
    title: "Waterfront Estate Viewing",
    date: "2023-07-05T10:30:00",
    clientName: "Emily Johnson",
    clientPhone: "+1 (212) 555-1234",
    clientEmail: "emily.johnson@example.com",
    propertyId: 203,
    propertyTitle: "Waterfront Estate with Private Dock",
    propertyAddress: "456 Shoreline Drive, Hamptons, NY",
    notes: "Client has a boat and is specifically looking for waterfront with dock access."
  },
  {
    id: 3,
    title: "Downtown Condo Tour",
    date: "2023-07-08T13:00:00",
    clientName: "Michael Wong",
    clientPhone: "+1 (212) 555-5678",
    clientEmail: "michael.wong@example.com",
    propertyId: 202,
    propertyTitle: "Modern Condo in Downtown",
    propertyAddress: "789 Brooklyn Heights Blvd, Brooklyn, NY",
    notes: "First-time buyer looking for a modern condo in Brooklyn with good transport links."
  }
];

interface Tour {
  id: number;
  title: string;
  date: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  propertyId: number;
  propertyTitle: string;
  propertyAddress: string;
  notes: string;
}

const formatTime = (dateString: string) => {
  return format(parseISO(dateString), "h:mm a");
};

const AgentCalendar = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [tours, setTours] = useState<Tour[]>(mockTours);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isNewTourDialogOpen, setIsNewTourDialogOpen] = useState(false);
  const [newTour, setNewTour] = useState({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "10:00",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    propertyTitle: "",
    propertyAddress: "",
    notes: ""
  });
  
  // Filter tours for the selected date
  const filteredTours = tours.filter(tour => 
    isSameDay(parseISO(tour.date), date)
  );
  
  // Handler for tour creation
  const handleCreateTour = () => {
    const dateTime = `${newTour.date}T${newTour.time}:00`;
    
    const createdTour = {
      id: tours.length + 1,
      title: newTour.title,
      date: dateTime,
      clientName: newTour.clientName,
      clientPhone: newTour.clientPhone,
      clientEmail: newTour.clientEmail,
      propertyId: Math.floor(Math.random() * 1000),
      propertyTitle: newTour.propertyTitle,
      propertyAddress: newTour.propertyAddress,
      notes: newTour.notes
    };
    
    setTours([...tours, createdTour]);
    setIsNewTourDialogOpen(false);
    
    // Reset the form
    setNewTour({
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "10:00",
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      propertyTitle: "",
      propertyAddress: "",
      notes: ""
    });
    
    toast({
      title: "Tour scheduled",
      description: "The property tour has been added to your calendar.",
    });
  };
  
  const handleNewTourInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTour({
      ...newTour,
      [name]: value
    });
  };
  
  return (
    <Layout>
      <div className="container px-6 py-8 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
              <p className="text-gray-500 mt-1">Schedule and manage your property tours</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Dialog open={isNewTourDialogOpen} onOpenChange={setIsNewTourDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Tour
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Schedule New Property Tour</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new property tour.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Tour Title</Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="E.g. Penthouse Viewing"
                          value={newTour.title}
                          onChange={handleNewTourInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            value={newTour.date}
                            onChange={handleNewTourInputChange}
                          />
                          <Input
                            id="time"
                            name="time"
                            type="time"
                            value={newTour.time}
                            onChange={handleNewTourInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Client Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="clientName">Name</Label>
                          <Input
                            id="clientName"
                            name="clientName"
                            placeholder="Client name"
                            value={newTour.clientName}
                            onChange={handleNewTourInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="clientPhone">Phone</Label>
                          <Input
                            id="clientPhone"
                            name="clientPhone"
                            placeholder="Phone number"
                            value={newTour.clientPhone}
                            onChange={handleNewTourInputChange}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="clientEmail">Email</Label>
                          <Input
                            id="clientEmail"
                            name="clientEmail"
                            type="email"
                            placeholder="Email address"
                            value={newTour.clientEmail}
                            onChange={handleNewTourInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Property Information</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="propertyTitle">Property Title</Label>
                          <Input
                            id="propertyTitle"
                            name="propertyTitle"
                            placeholder="Property title"
                            value={newTour.propertyTitle}
                            onChange={handleNewTourInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="propertyAddress">Address</Label>
                          <Input
                            id="propertyAddress"
                            name="propertyAddress"
                            placeholder="Property address"
                            value={newTour.propertyAddress}
                            onChange={handleNewTourInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <textarea
                        id="notes"
                        name="notes"
                        placeholder="Additional notes about the client or tour"
                        rows={3}
                        className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={newTour.notes}
                        onChange={handleNewTourInputChange}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewTourDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateTour}>
                      Schedule Tour
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar Column */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {format(date, "MMMM yyyy")}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setDate(new Date())}
                      >
                        <span className="sr-only">Go to today</span>
                        <span className="text-xs">Today</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const firstDayOfPreviousMonth = startOfMonth(
                            new Date(date.getFullYear(), date.getMonth() - 1, 1)
                          );
                          setDate(firstDayOfPreviousMonth);
                        }}
                      >
                        <span className="sr-only">Previous month</span>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const firstDayOfNextMonth = startOfMonth(
                            new Date(date.getFullYear(), date.getMonth() + 1, 1)
                          );
                          setDate(firstDayOfNextMonth);
                        }}
                      >
                        <span className="sr-only">Next month</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      className="rounded-md border"
                      components={{
                        Day: ({ day, ...props }) => {
                          // Check if there are tours on this day
                          const hasTours = tours.some(tour => 
                            isSameDay(parseISO(tour.date), day)
                          );
                          
                          return (
                            <div
                              {...props}
                              className={`relative ${props.className} ${hasTours ? 'font-bold' : ''}`}
                            >
                              {format(day, "d")}
                              {hasTours && (
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                              )}
                            </div>
                          );
                        },
                      }}
                    />
                    
                    <div className="space-y-3">
                      <h3 className="font-medium text-sm">Scheduled Tours for {format(date, "MMMM d, yyyy")}</h3>
                      
                      {filteredTours.length > 0 ? (
                        <div className="space-y-2">
                          {filteredTours.map((tour) => (
                            <div
                              key={tour.id}
                              className="bg-white border border-gray-200 rounded-md p-3 cursor-pointer hover:bg-gray-50"
                              onClick={() => setSelectedTour(tour)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{tour.title}</h4>
                                  <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <Clock className="h-3.5 w-3.5 mr-1" />
                                    {formatTime(tour.date)}
                                  </div>
                                </div>
                                <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {tour.clientName}
                                </div>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mt-2">
                                <MapPin className="h-3.5 w-3.5 mr-1" />
                                {tour.propertyTitle}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-md p-6 text-center">
                          <p className="text-gray-500">No tours scheduled for this date.</p>
                          <Button 
                            variant="outline" 
                            className="mt-2"
                            onClick={() => setIsNewTourDialogOpen(true)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Tour
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Tour Details Column */}
            <div>
              <Card className="sticky top-20">
                {selectedTour ? (
                  <>
                    <CardHeader>
                      <CardTitle>{selectedTour.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {format(parseISO(selectedTour.date), "EEEE, MMMM d, yyyy")} at {formatTime(selectedTour.date)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Client Information</h3>
                        <div className="bg-gray-50 rounded-md p-3 space-y-2">
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-500 mr-2" />
                            <div>
                              <div className="font-medium">{selectedTour.clientName}</div>
                              <div className="text-sm text-gray-500">{selectedTour.clientPhone}</div>
                              <div className="text-sm text-gray-500">{selectedTour.clientEmail}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Property</h3>
                        <div className="bg-gray-50 rounded-md p-3">
                          <div className="font-medium">{selectedTour.propertyTitle}</div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            {selectedTour.propertyAddress}
                          </div>
                        </div>
                      </div>
                      
                      {selectedTour.notes && (
                        <div>
                          <h3 className="text-sm font-medium mb-2">Notes</h3>
                          <div className="bg-gray-50 rounded-md p-3">
                            <p className="text-sm text-gray-600">{selectedTour.notes}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setSelectedTour(null)}>
                        Close
                      </Button>
                      <div className="space-x-2">
                        <Button>
                          Edit Tour
                        </Button>
                      </div>
                    </CardFooter>
                  </>
                ) : (
                  <CardContent className="p-6 text-center">
                    <div className="py-12">
                      <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900">No tour selected</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Select a tour from the calendar to view details or schedule a new tour.
                      </p>
                      <Button 
                        className="mt-4"
                        onClick={() => setIsNewTourDialogOpen(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule Tour
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgentCalendar;
