
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { 
  Avatar, AvatarFallback, AvatarImage 
} from "@/components/ui/avatar";
import {
  Check, ChevronLeft, ChevronRight, ClipboardCheck, Image, Paperclip, PlusCircle, RefreshCw, Search, Send, Trash
} from "lucide-react";
import { format, formatDistanceToNow, parseISO } from "date-fns";

// Mock conversation data
const mockConversations = [
  {
    id: 1,
    recipient: {
      id: 101,
      name: "Sarah Johnson",
      avatar: "https://via.placeholder.com/40",
      type: "agent",
      agency: "Elite Real Estate Group"
    },
    lastMessage: {
      content: "Thank you for your interest in the luxury penthouse. I'm available for a viewing this Friday at 2 PM if that works for you?",
      timestamp: "2023-07-03T14:32:00",
      isRead: true,
      sentByMe: false
    },
    messages: [
      {
        id: 101,
        content: "Hi Sarah, I'm interested in the luxury penthouse listing you have on Central Park West. Is it still available?",
        timestamp: "2023-07-03T10:15:00",
        isRead: true,
        sentByMe: true
      },
      {
        id: 102,
        content: "Hello! Yes, the penthouse is still available. It's a beautiful property with amazing views of Central Park. Would you like to schedule a viewing?",
        timestamp: "2023-07-03T11:20:00",
        isRead: true,
        sentByMe: false
      },
      {
        id: 103,
        content: "That would be great! When are you available for a showing? I'm flexible this week.",
        timestamp: "2023-07-03T12:05:00",
        isRead: true,
        sentByMe: true
      },
      {
        id: 104,
        content: "Thank you for your interest in the luxury penthouse. I'm available for a viewing this Friday at 2 PM if that works for you?",
        timestamp: "2023-07-03T14:32:00",
        isRead: true,
        sentByMe: false
      }
    ]
  },
  {
    id: 2,
    recipient: {
      id: 102,
      name: "Michael Chen",
      avatar: "https://via.placeholder.com/40",
      type: "agent",
      agency: "Elite Real Estate Group"
    },
    lastMessage: {
      content: "I can arrange that for tomorrow morning. Would 10 AM work for you?",
      timestamp: "2023-07-02T16:45:00",
      isRead: false,
      sentByMe: false
    },
    messages: [
      {
        id: 201,
        content: "Hello Michael, I saw your listing for the modern condo in Brooklyn Heights. I'd like to know more about the amenities in the building.",
        timestamp: "2023-07-02T15:10:00",
        isRead: true,
        sentByMe: true
      },
      {
        id: 202,
        content: "Hi there! The building has a 24/7 doorman, fitness center, rooftop terrace, and package room. There's also a residents' lounge with a kitchen for entertaining. Would you like to schedule a tour?",
        timestamp: "2023-07-02T15:30:00",
        isRead: true,
        sentByMe: false
      },
      {
        id: 203,
        content: "That sounds great! I would love to see it in person. Is there availability this week?",
        timestamp: "2023-07-02T16:15:00",
        isRead: true,
        sentByMe: true
      },
      {
        id: 204,
        content: "I can arrange that for tomorrow morning. Would 10 AM work for you?",
        timestamp: "2023-07-02T16:45:00",
        isRead: false,
        sentByMe: false
      }
    ]
  },
  {
    id: 3,
    recipient: {
      id: 1,
      name: "Elite Real Estate Group",
      avatar: "https://via.placeholder.com/40",
      type: "agency"
    },
    lastMessage: {
      content: "We have several properties that might meet your criteria. Can you tell us more about your budget range?",
      timestamp: "2023-06-28T11:20:00",
      isRead: true,
      sentByMe: false
    },
    messages: [
      {
        id: 301,
        content: "Hello, I'm looking for a 2-bedroom apartment in Manhattan with a view. Do you have any listings that match?",
        timestamp: "2023-06-28T10:05:00",
        isRead: true,
        sentByMe: true
      },
      {
        id: 302,
        content: "We have several properties that might meet your criteria. Can you tell us more about your budget range?",
        timestamp: "2023-06-28T11:20:00",
        isRead: true,
        sentByMe: false
      }
    ]
  }
];

interface Conversation {
  id: number;
  recipient: {
    id: number;
    name: string;
    avatar: string;
    type: string;
    agency?: string;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    isRead: boolean;
    sentByMe: boolean;
  };
  messages: {
    id: number;
    content: string;
    timestamp: string;
    isRead: boolean;
    sentByMe: boolean;
  }[];
}

const UserMessages = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0] || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const newMsg = {
      id: Date.now(),
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isRead: false,
      sentByMe: true
    };
    
    // Update the conversations
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === selectedConversation.id 
          ? {
              ...conv,
              messages: [...conv.messages, newMsg],
              lastMessage: newMsg
            }
          : conv
      )
    );
    
    // Update the selected conversation
    setSelectedConversation(prev => 
      prev 
        ? {
            ...prev,
            messages: [...prev.messages, newMsg],
            lastMessage: newMsg
          }
        : null
    );
    
    // Clear the input
    setNewMessage("");
    
    // Simulate a reply (for demo purposes)
    setTimeout(() => {
      const replyContent = `This is an automated reply to "${newMessage.trim()}". In a real application, this would be a response from the agent or agency.`;
      
      const replyMsg = {
        id: Date.now() + 1,
        content: replyContent,
        timestamp: new Date().toISOString(),
        isRead: false,
        sentByMe: false
      };
      
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === selectedConversation.id 
            ? {
                ...conv,
                messages: [...conv.messages, newMsg, replyMsg],
                lastMessage: replyMsg
              }
            : conv
        )
      );
      
      setSelectedConversation(prev => 
        prev 
          ? {
              ...prev,
              messages: [...prev.messages, replyMsg],
              lastMessage: replyMsg
            }
          : null
      );
      
      toast({
        title: "New message",
        description: `${selectedConversation.recipient.name} has responded to your message.`,
      });
    }, 2000);
  };
  
  // Filter conversations based on search term
  const filteredConversations = conversations.filter(
    conv => 
      conv.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Mark a conversation as read when selected
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    
    // Mark all messages as read
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === conversation.id
          ? {
              ...conv,
              messages: conv.messages.map(msg => ({
                ...msg,
                isRead: true
              })),
              lastMessage: {
                ...conv.lastMessage,
                isRead: true
              }
            }
          : conv
      )
    );
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-0 md:px-6 py-0 md:py-8">
        <div className="bg-white border border-gray-200 rounded-none md:rounded-lg shadow-sm overflow-hidden min-h-[calc(100vh-4rem)]">
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Conversation List */}
            <div className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-900">Messages</h1>
                <div className="relative mt-3">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search conversations..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto flex-1">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        selectedConversation?.id === conv.id ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => handleSelectConversation(conv)}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarImage src={conv.recipient.avatar} alt={conv.recipient.name} />
                          <AvatarFallback>{conv.recipient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {conv.recipient.name}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatDistanceToNow(parseISO(conv.lastMessage.timestamp), { addSuffix: true })}
                            </span>
                          </div>
                          {conv.recipient.type === 'agent' && conv.recipient.agency && (
                            <p className="text-xs text-gray-500">{conv.recipient.agency}</p>
                          )}
                          <p className={`text-sm mt-1 truncate ${!conv.lastMessage.isRead && !conv.lastMessage.sentByMe ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                            {conv.lastMessage.sentByMe ? 'You: ' : ''}{conv.lastMessage.content}
                          </p>
                        </div>
                        {!conv.lastMessage.isRead && !conv.lastMessage.sentByMe && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No conversations found
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Message
                </Button>
              </div>
            </div>
            
            {/* Conversation Detail */}
            <div className={`flex-1 flex flex-col ${!selectedConversation ? 'hidden md:flex' : 'flex'}`}>
              {selectedConversation ? (
                <>
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="md:hidden"
                        onClick={() => setSelectedConversation(null)}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Avatar>
                        <AvatarImage src={selectedConversation.recipient.avatar} alt={selectedConversation.recipient.name} />
                        <AvatarFallback>{selectedConversation.recipient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-sm font-medium text-gray-900">{selectedConversation.recipient.name}</h2>
                        {selectedConversation.recipient.type === 'agent' && selectedConversation.recipient.agency && (
                          <p className="text-xs text-gray-500">{selectedConversation.recipient.agency}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    <div className="space-y-4">
                      {selectedConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sentByMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 shadow-sm ${
                              message.sentByMe
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div
                              className={`text-xs mt-1 flex items-center ${
                                message.sentByMe ? 'text-blue-200 justify-end' : 'text-gray-500'
                              }`}
                            >
                              {format(parseISO(message.timestamp), 'p')}
                              {message.sentByMe && (
                                <span className="ml-1">
                                  {message.isRead ? (
                                    <Check className="h-3 w-3 text-blue-200" />
                                  ) : (
                                    <ClipboardCheck className="h-3 w-3 text-blue-200" />
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <div className="relative">
                          <Input
                            placeholder="Type your message..."
                            className="pr-10"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-0 top-0 h-full"
                          >
                            <Paperclip className="h-4 w-4 text-gray-500" />
                          </Button>
                        </div>
                      </div>
                      <Button 
                        size="icon" 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex mt-2 space-x-2">
                      <Button variant="outline" size="sm">
                        <Image className="mr-2 h-3 w-3" />
                        Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        Schedule Tour
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-gray-400 mx-auto">
                      <MessageSquare className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No conversation selected</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Select a conversation from the list to view messages
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Using MessageSquare from lucide-react as it's not imported at the top
import { MessageSquare } from "lucide-react";

export default UserMessages;
