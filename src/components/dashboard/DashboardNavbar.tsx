
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Menu, 
  Search, 
  User, 
  LogOut, 
  Settings, 
  X, 
  Sun, 
  Moon 
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/components/ui/use-toast';

const DashboardNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Assignment Deadline',
      message: 'Your Economics assignment is due tomorrow',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Event Reminder',
      message: 'College Cultural Festival starts next week',
      time: '1 day ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Course Material Updated',
      message: 'New materials added to your Computer Science course',
      time: '3 days ago',
      unread: false,
    },
  ]);

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account.",
    });
    navigate('/login');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({
      ...notif,
      unread: false
    })));
    
    toast({
      title: "Notifications cleared",
      description: "All notifications marked as read.",
    });
  };

  const unreadCount = notifications.filter(notif => notif.unread).length;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <div className="flex items-center mb-8">
                  <img
                    className="h-8 w-auto mr-2"
                    src="/college-logo.png"
                    alt="GFGC Logo"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/32x32?text=GFGC";
                    }}
                  />
                  <span className="text-lg font-semibold">GFGC Chikkaballpur</span>
                </div>
                
                <div className="space-y-4">
                  <Link 
                    to="/dashboard" 
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/dashboard/my-posts" 
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    My Posts
                  </Link>
                  <Link 
                    to="/dashboard/campus-wall" 
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Campus Wall
                  </Link>
                  <Link 
                    to="/dashboard/my-courses" 
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    My Courses
                  </Link>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src="/college-logo.png"
                  alt="GFGC Logo"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/32x32?text=GFGC";
                  }}
                />
                <span className="ml-2 text-xl font-bold text-college-800 dark:text-white hidden sm:block">
                  GFGC <span className="text-college-600">Student Portal</span>
                </span>
              </Link>
            </div>
          </div>
          
          {/* Search bar - desktop */}
          <div className="hidden md:block flex-1 max-w-xl mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-college-500 focus:border-college-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Search for courses, events, or posts..."
                type="search"
              />
            </div>
          </div>
          
          {/* Right actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="hidden sm:flex"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 h-5 min-w-[20px] bg-college-600">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex justify-between items-center px-4 py-2 border-b">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4 cursor-default">
                        <div className="flex justify-between w-full">
                          <span className="font-medium">{notification.title}</span>
                          {notification.unread && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-400 mt-2">
                          {notification.time}
                        </span>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No notifications to show
                    </div>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">
                  <Link to="/dashboard/notifications" className="w-full text-center text-sm text-college-600 dark:text-college-400">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?u=a123" alt="User" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>John Smith</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Search Bar - Mobile */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-college-500 focus:border-college-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Search..."
            type="search"
          />
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
