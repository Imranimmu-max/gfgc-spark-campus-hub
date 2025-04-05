
import React, { useState, useEffect } from 'react';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import PostForm from '@/components/dashboard/PostForm';
import PostCard from '@/components/dashboard/PostCard';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  BookOpen, 
  Award, 
  Bell,
  RefreshCcw,
  UserCircle,
  Users,
  FileText
} from 'lucide-react';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching posts
    const timeout = setTimeout(() => {
      setPosts([
        {
          id: 1,
          user: {
            name: 'John Smith',
            avatar: 'https://i.pravatar.cc/150?u=a123',
          },
          content: 'Just submitted my economics assignment! 📚',
          media: [],
          likes: 5,
          comments: [
            {
              id: 101,
              user: {
                name: 'Sarah Lee',
                avatar: 'https://i.pravatar.cc/150?u=a456',
              },
              content: 'Great job! How did it go?',
              createdAt: '2023-05-10T08:30:00.000Z',
            },
          ],
          createdAt: '2023-05-10T06:30:00.000Z',
        },
        {
          id: 2,
          user: {
            name: 'Prof. Rajeev Kumar',
            avatar: 'https://i.pravatar.cc/150?u=b789',
          },
          content: 'Reminder: The Computer Science seminar is scheduled for tomorrow at 10 AM in the main auditorium. Don\'t forget to bring your project presentations!',
          media: [],
          likes: 12,
          comments: [],
          createdAt: '2023-05-09T14:20:00.000Z',
        },
      ]);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

  const handlePostSubmit = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId, liked) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: liked ? post.likes + 1 : post.likes - 1,
        };
      }
      return post;
    }));
  };

  const handleComment = (postId, newComment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    }));
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast({
      title: "Post deleted",
      description: "Your post has been successfully deleted.",
    });
  };

  const quickInfoCards = [
    { 
      title: 'My Courses', 
      value: '5 Enrolled', 
      icon: BookOpen, 
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      link: '/dashboard/my-courses' 
    },
    { 
      title: 'Upcoming Events', 
      value: '3 Events', 
      icon: Calendar, 
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      link: '/dashboard/events' 
    },
    { 
      title: 'Assignments', 
      value: '2 Pending', 
      icon: FileText, 
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
      link: '/dashboard/assignments' 
    },
    { 
      title: 'Achievements', 
      value: '8 Badges', 
      icon: Award, 
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      link: '/dashboard/achievements' 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campus Wall</h1>
              <button className="flex items-center text-sm text-college-600 dark:text-college-400">
                <RefreshCcw className="h-4 w-4 mr-1" />
                <span>Refresh</span>
              </button>
            </div>
            
            <PostForm onPostSubmit={handlePostSubmit} />
            
            <div className="space-y-6">
              {isLoading ? (
                <Card>
                  <CardContent className="p-6 flex justify-center">
                    <div className="text-center">
                      <svg className="animate-spin h-8 w-8 text-college-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">Loading posts...</p>
                    </div>
                  </CardContent>
                </Card>
              ) : posts.length > 0 ? (
                posts.map(post => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onLike={handleLike}
                    onComment={handleComment}
                    onDelete={handleDeletePost}
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">No posts yet. Be the first to post!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden">
                    <img 
                      src="https://i.pravatar.cc/150?u=a123" 
                      alt="John Smith" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">John Smith</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">B.Sc Computer Science</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Year 2, Semester 4</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
                  <div className="text-center px-2">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">15</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Posts</div>
                  </div>
                  <div className="text-center px-2">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">48</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Friends</div>
                  </div>
                  <div className="text-center px-2">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">5</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Courses</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              {quickInfoCards.map((card, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className={`p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2 ${card.color}`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{card.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{card.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Upcoming Events */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-college-600 dark:text-college-400" />
                  Upcoming Events
                </h3>
                <div className="space-y-3">
                  {[
                    { title: 'Cultural Festival', date: 'May 15-17, 2023' },
                    { title: 'Industry Expert Talk', date: 'May 20, 2023' },
                    { title: 'Tech Symposium', date: 'May 25, 2023' },
                  ].map((event, index) => (
                    <div key={index} className="flex justify-between text-sm pb-2 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                      <span className="text-gray-800 dark:text-gray-200">{event.title}</span>
                      <span className="text-gray-500 dark:text-gray-400">{event.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Navigation Tabs */}
            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue="notifications">
                  <TabsList className="w-full">
                    <TabsTrigger value="notifications" className="flex-1">
                      <Bell className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Notifications</span>
                    </TabsTrigger>
                    <TabsTrigger value="friends" className="flex-1">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Friends</span>
                    </TabsTrigger>
                    <TabsTrigger value="profile" className="flex-1">
                      <UserCircle className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Profile</span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="notifications" className="pt-4">
                    <div className="space-y-2">
                      {[
                        'Assignment deadline tomorrow',
                        'Cultural event registration open',
                        'New course materials available',
                      ].map((notification, index) => (
                        <div key={index} className="text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          {notification}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="friends" className="pt-4">
                    <div className="space-y-2">
                      {[
                        'Sarah Lee',
                        'Michael Johnson',
                        'Emily Wong',
                      ].map((friend, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <div className="h-8 w-8 rounded-full overflow-hidden">
                            <img 
                              src={`https://i.pravatar.cc/150?u=${index}abc`} 
                              alt={friend} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-sm">{friend}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="profile" className="pt-4 text-center">
                    <p className="text-sm">View and update your profile information</p>
                    <button className="mt-2 text-sm text-college-600 dark:text-college-400">
                      Go to Profile Settings
                    </button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
