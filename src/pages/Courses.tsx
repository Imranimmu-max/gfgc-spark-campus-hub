
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Clock, 
  GraduationCap, 
  Users, 
  ChevronRight,
  Search,
} from 'lucide-react';

const courseCategories = [
  { id: 'all', name: 'All Courses' },
  { id: 'commerce', name: 'Commerce' },
  { id: 'science', name: 'Science' },
  { id: 'arts', name: 'Arts' },
  { id: 'computer', name: 'Computer Applications' },
];

const coursesData = [
  {
    id: 1,
    title: 'Bachelor of Commerce (B.Com)',
    category: 'commerce',
    description: 'A comprehensive program focusing on business, accounting, finance, and economics to prepare students for careers in the corporate world.',
    duration: '3 Years',
    seats: 120,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Bachelor of Science in Physics (B.Sc)',
    category: 'science',
    description: 'Study the fundamental laws governing the natural world with a focus on theoretical concepts and practical applications.',
    duration: '3 Years',
    seats: 60,
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Bachelor of Science in Chemistry (B.Sc)',
    category: 'science',
    description: 'Explore the composition, structure, properties, and change of matter through theoretical and laboratory work.',
    duration: '3 Years',
    seats: 60,
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Bachelor of Arts in English (B.A)',
    category: 'arts',
    description: 'Develop critical thinking, analytical skills, and creative expression through the study of literature and language.',
    duration: '3 Years',
    seats: 80,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Bachelor of Arts in Economics (B.A)',
    category: 'arts',
    description: 'Study economic theories, policies, and their applications to better understand societal resource allocation.',
    duration: '3 Years',
    seats: 80,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Bachelor of Computer Applications (BCA)',
    category: 'computer',
    description: 'Gain comprehensive knowledge of computer applications and software development to excel in the IT industry.',
    duration: '3 Years',
    seats: 60,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = coursesData.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-college-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
          <p className="text-xl max-w-3xl">
            Explore our wide range of undergraduate programs designed to prepare you for a successful career
          </p>
        </div>
      </div>
      
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Tabs 
              defaultValue="all" 
              className="w-full md:w-auto"
              onValueChange={setActiveCategory}
            >
              <TabsList className="w-full md:w-auto grid grid-cols-2 md:flex md:flex-row sm:grid-cols-3 lg:grid-cols-5">
                {courseCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="flex-1">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full rounded-md border border-gray-300 bg-white px-9 py-2 text-sm placeholder:text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id} 
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md card-hover"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/800x400?text=Course+Image";
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.seats} Seats</span>
                      </div>
                    </div>
                    <Button variant="default" className="w-full justify-between bg-college-600 hover:bg-college-700">
                      <span>View Details</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <GraduationCap className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Please try a different search query or category.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
