
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout/Layout";
import { Clock, MapPin, User, AlertCircle, Check, X } from "lucide-react";

// Mock appointments data
const mockAppointments = [
  {
    id: 1,
    title: "Property Viewing - Luxury Penthouse",
    date: "2023-07-15",
    time: "10:00 AM",
    duration: "1 hour",
    client: "John Smith",
    clientPhone: "+1 (555) 123-4567",
    location: "123 Skyline Ave, Manhattan, NY",
    status: "confirmed",
    notes: "Client is interested in 3-bedroom penthouses with city views."
  },
  {
    id: 2,
    title: "Property Viewing - Modern Condo",
    date: "2023-07-15",
    time: "2:00 PM",
    duration: "1 hour",
    client: "Emma Johnson",
    clientPhone: "+1 (555) 987-6543",
    location: "456 Downtown St, Brooklyn, NY",
    status: "pending",
    notes: "Client is relocating from Chicago and needs to finalize within a month."
  },
  {
    id: 3,
    title: "Client Consultation",
    date: "2023-07-16",
    time: "11:30 AM",
    duration: "45 minutes",
    client: "Michael Chen",
    clientPhone: "+1 (555) 456-7890",
    location: "Virtual Meeting - Zoom",
    status: "confirmed",
    notes: "Initial consultation to discuss investment properties."
  },
  {
    id: 4,
    title: "Property Showing - Waterfront Estate",
    date: "2023-07-18",
    time: "1:00 PM",
    duration: "2 hours",
    client: "Sarah Williams",
    clientPhone: "+1 (555) 789-0123",
    location: "789 Coastal Dr, Hamptons, NY",
    status: "confirmed",
    notes: "High-value client referred by David Thompson."
  },
  {
    id: 5,
    title: "Contract Signing",
    date: "2023-07-20",
    time: "3:30 PM",
    duration: "1 hour",
    client: "Robert Davis",
    clientPhone: "+1 (555) 234-5678",
    location: "Elite Real Estate Group Office",
    status: "confirmed",
    notes: "Final contract signing for the Brownstone property."
  }
];

const AgentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState(mockAppointments);
  
  const filteredAppointments = date 
    ? appointments.filter(appointment => appointment.date === formatDate(date))
    : [];
  
  function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-50 border-green-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "canceled":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Check className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      case "canceled":
        return <X className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const confirmAppointment = (id: number) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? {...appointment, status: "confirmed"} : appointment
    ));
  };
  
  const cancelAppointment = (id: number) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? {...appointment, status: "canceled"} : appointment
    ));
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-estate-900 mb-6">Agent Calendar</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border w-full"
                />
              </CardContent>
            </Card>
            
            {/* Appointments */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="daily">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>
                  
                  <Button>
                    Schedule New Tour
                  </Button>
                </div>
                
                <TabsContent value="daily" className="space-y-4">
                  <h2 className="text-xl font-semibold text-estate-800">
                    {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Select a date'}
                  </h2>
                  
                  {filteredAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {filteredAppointments.map((appointment) => (
                        <Card key={appointment.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <h3 className="font-medium text-estate-900">{appointment.title}</h3>
                                
                                <div className="mt-2 space-y-1">
                                  <div className="flex items-center text-estate-600 text-sm">
                                    <Clock className="h-4 w-4 mr-2 text-estate-500" />
                                    <span>{appointment.time} ({appointment.duration})</span>
                                  </div>
                                  
                                  <div className="flex items-center text-estate-600 text-sm">
                                    <MapPin className="h-4 w-4 mr-2 text-estate-500" />
                                    <span>{appointment.location}</span>
                                  </div>
                                  
                                  <div className="flex items-center text-estate-600 text-sm">
                                    <User className="h-4 w-4 mr-2 text-estate-500" />
                                    <span>{appointment.client} • {appointment.clientPhone}</span>
                                  </div>
                                </div>
                                
                                {appointment.notes && (
                                  <div className="mt-3 p-2 bg-estate-50 rounded-md text-sm text-estate-700">
                                    {appointment.notes}
                                  </div>
                                )}
                              </div>
                              
                              <div className="mt-4 md:mt-0 md:ml-6 flex flex-col md:items-end">
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                                  {getStatusIcon(appointment.status)}
                                  <span className="ml-1">{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</span>
                                </div>
                                
                                <div className="mt-3 flex space-x-2">
                                  {appointment.status === "pending" && (
                                    <Button size="sm" variant="outline" onClick={() => confirmAppointment(appointment.id)}>
                                      Confirm
                                    </Button>
                                  )}
                                  
                                  {appointment.status !== "canceled" && (
                                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => cancelAppointment(appointment.id)}>
                                      Cancel
                                    </Button>
                                  )}
                                  
                                  <Button size="sm">
                                    Details
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <p className="text-estate-600">No appointments scheduled for this date.</p>
                        <Button className="mt-4">Schedule New Tour</Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="upcoming">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-estate-800 mb-4">Upcoming Appointments</h2>
                      
                      <div className="text-estate-600">
                        {/* Upcoming appointments would be listed here */}
                        <p>Coming soon: View and manage all upcoming appointments here.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="past">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-estate-800 mb-4">Past Appointments</h2>
                      
                      <div className="text-estate-600">
                        {/* Past appointments would be listed here */}
                        <p>Coming soon: View history of past appointments here.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgentCalendar;
