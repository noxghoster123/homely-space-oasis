import { useState } from "react";
import { format, addMonths, subMonths, addDays, isToday, isSameMonth, isSameDay, parseISO } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, User, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Layout } from "@/components/layout/Layout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock appointments data
const mockAppointments = [
  {
    id: 1,
    title: "Property Viewing",
    propertyName: "Luxury Apartment in Downtown",
    client: "Jennifer Adams",
    date: "2023-08-12T14:00:00",
    endTime: "2023-08-12T15:00:00",
    location: "123 Main St, New York, NY",
    status: "confirmed",
  },
  {
    id: 2,
    title: "Client Meeting",
    propertyName: null,
    client: "David Wilson",
    date: "2023-08-12T10:30:00",
    endTime: "2023-08-12T11:30:00",
    location: "Office",
    status: "confirmed",
  },
  {
    id: 3,
    title: "Property Viewing",
    propertyName: "Family Home with Garden",
    client: "Michael Johnson",
    date: "2023-08-14T15:30:00",
    endTime: "2023-08-14T16:30:00",
    location: "456 Oak St, Brooklyn, NY",
    status: "confirmed",
  },
  {
    id: 4,
    title: "Property Valuation",
    propertyName: "Downtown Loft",
    client: "Emma Thompson",
    date: "2023-08-15T13:00:00",
    endTime: "2023-08-15T14:30:00",
    location: "789 Broadway, New York, NY",
    status: "confirmed",
  },
  {
    id: 5,
    title: "Client Meeting",
    propertyName: null,
    client: "Robert Brown",
    date: "2023-08-17T11:00:00",
    endTime: "2023-08-17T12:00:00",
    location: "Virtual (Zoom)",
    status: "pending",
  },
];

// Appointment status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColors = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColors(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const AgentCalendar = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState(mockAppointments);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Handler for navigating months
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  // Get appointments for selected date
  const getDayAppointments = (date: Date | undefined) => {
    if (!date) return [];
    
    return appointments.filter((appointment) => {
      const appointmentDate = parseISO(appointment.date);
      return isSameDay(appointmentDate, date);
    });
  };
  
  const selectedDateAppointments = getDayAppointments(selectedDate);
  
  // Handler for appointment status update
  const handleUpdateStatus = (id: number, status: string) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment
      )
    );
    
    toast({
      title: "Appointment updated",
      description: `The appointment status has been updated to ${status}.`,
    });
  };
  
  return (
    <Layout>
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar/Calendar */}
          <div className="w-full lg:w-80 mb-8 lg:mb-0 lg:mr-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Calendar</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                    Today
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between px-6 py-3 border-t border-b">
                  <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <h2 className="font-medium">{format(currentDate, "MMMM yyyy")}</h2>
                  <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={currentDate}
                  className="w-full rounded-none"
                  classNames={{
                    day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600",
                    day_today: "bg-blue-100 text-blue-900",
                  }}
                  components={{
                    DayContent: ({ date, ...props }) => {
                      // Count appointments for this day
                      const dayAppointments = appointments.filter((appointment) => {
                        const appointmentDate = parseISO(appointment.date);
                        return isSameDay(appointmentDate, date);
                      });
                      
                      const hasAppointments = dayAppointments.length > 0;
                      const isCurrentMonth = isSameMonth(date, currentDate);
                      
                      return (
                        <div 
                          {...props}
                          className={`relative ${!isCurrentMonth ? "text-gray-400" : ""}`}
                        >
                          {date.getDate()}
                          {hasAppointments && isCurrentMonth && (
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      );
                    }
                  }}
                />
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Upcoming</CardTitle>
                <CardDescription>Your next 3 appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments
                    .filter(app => new Date(app.date) >= new Date())
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(0, 3)
                    .map(appointment => (
                      <div key={appointment.id} className="border-l-4 border-blue-500 pl-4 py-2">
                        <p className="font-medium">{appointment.title}</p>
                        <p className="text-sm text-gray-500">{appointment.client}</p>
                        <div className="flex items-center mt-1">
                          <CalendarIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
                          <span className="text-xs text-gray-500">
                            {format(parseISO(appointment.date), "MMM d, h:mm a")}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <CardTitle>
                      {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "No date selected"}
                    </CardTitle>
                    <CardDescription>
                      {selectedDateAppointments.length} appointments
                    </CardDescription>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-4 md:mt-0">Add Appointment</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Appointment</DialogTitle>
                        <DialogDescription>
                          Create a new appointment on your calendar
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Tabs defaultValue="viewing">
                            <TabsList className="grid grid-cols-2">
                              <TabsTrigger value="viewing">Property Viewing</TabsTrigger>
                              <TabsTrigger value="meeting">Client Meeting</TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>
                        
                        {/* Form fields would go here */}
                        <div className="h-[300px] bg-gray-50 rounded flex items-center justify-center">
                          <p className="text-gray-500 text-center">
                            Appointment form fields would go here<br />
                            (Title, Date, Time, Client, Property, etc.)
                          </p>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button>Save Appointment</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              
              <Separator />
              
              <CardContent className="py-6">
                {selectedDateAppointments.length > 0 ? (
                  <div className="space-y-6">
                    {selectedDateAppointments
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex flex-col md:flex-row bg-white border rounded-lg overflow-hidden"
                        >
                          {/* Time sidebar */}
                          <div className="bg-gray-50 p-4 md:w-40 flex md:flex-col items-center md:items-start justify-between md:justify-start">
                            <div>
                              <div className="text-lg font-semibold">
                                {format(parseISO(appointment.date), "h:mm a")}
                              </div>
                              <div className="text-gray-500 text-sm">
                                {format(parseISO(appointment.endTime), "h:mm a")}
                              </div>
                            </div>
                            <StatusBadge status={appointment.status} />
                          </div>
                          
                          {/* Appointment details */}
                          <div className="p-4 flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">{appointment.title}</h3>
                                {appointment.propertyName && (
                                  <p className="text-gray-600 mt-1">{appointment.propertyName}</p>
                                )}
                              </div>
                              
                              <div className="flex space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">Reschedule</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Reschedule Appointment</DialogTitle>
                                      <DialogDescription>
                                        Change the date and time for this appointment
                                      </DialogDescription>
                                    </DialogHeader>
                                    
                                    <div className="h-[300px] bg-gray-50 rounded flex items-center justify-center mt-4">
                                      <p className="text-gray-500 text-center">
                                        Date and time picker would go here
                                      </p>
                                    </div>
                                    
                                    <DialogFooter className="mt-4">
                                      <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                      </DialogClose>
                                      <Button>Save Changes</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem 
                                      onClick={() => handleUpdateStatus(appointment.id, "confirmed")}
                                    >
                                      Mark as Confirmed
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => handleUpdateStatus(appointment.id, "completed")}
                                    >
                                      Mark as Completed
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => handleUpdateStatus(appointment.id, "cancelled")}
                                      className="text-red-600"
                                    >
                                      Cancel Appointment
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            
                            <div className="mt-4 space-y-2">
                              <div className="flex items-center text-gray-600">
                                <User className="h-4 w-4 mr-2" />
                                <span>{appointment.client}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{appointment.location}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>
                                  {format(parseISO(appointment.date), "h:mm a")} - {format(parseISO(appointment.endTime), "h:mm a")} 
                                  ({Math.round((new Date(appointment.endTime).getTime() - new Date(appointment.date).getTime()) / 1000 / 60)} min)
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No appointments</h3>
                    <p className="text-gray-500 mt-1">
                      You have no appointments scheduled for this day.
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="mt-4">Add Appointment</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Appointment</DialogTitle>
                          <DialogDescription>
                            Create a new appointment on your calendar
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="h-[300px] bg-gray-50 rounded flex items-center justify-center mt-4">
                          <p className="text-gray-500 text-center">
                            Appointment form fields would go here
                          </p>
                        </div>
                        
                        <DialogFooter className="mt-4">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button>Save Appointment</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgentCalendar;
