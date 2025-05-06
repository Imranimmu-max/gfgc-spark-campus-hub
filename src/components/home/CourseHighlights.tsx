
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const courses = [
  {
    title: 'Bachelor of Commerce (B.Com)',
    description: 'A comprehensive program focusing on business, accounting, finance, and economics.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
    color: 'bg-blue-500',
  },
  {
    title: 'Bachelor of Science (B.Sc)',
    description: 'Diverse science programs in Physics, Chemistry, Mathematics, Computer Science, and more.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop',
    color: 'bg-green-500',
  },
  {
    title: 'Bachelor of Arts (B.A)',
    description: 'Programs in humanities, social sciences, languages, history, political science, and more.',
    image: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=2000&auto=format&fit=crop',
    color: 'bg-purple-500',
  },
];

const CourseHighlights = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Courses</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore our diverse range of undergraduate programs designed to prepare you for success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-md card-hover bg-white dark:bg-gray-800"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  onError={(e) => {
                    console.error('Image load error for:', course.title);
                    e.currentTarget.src = "https://via.placeholder.com/600x400?text=Course+Image";
                  }}
                />
                <div className={`absolute top-4 right-4 ${course.color} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
                  Featured
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {course.description}
                </p>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => navigate('/courses')}
                >
                  <span>View Course</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate('/courses')}
            className="bg-college-600 hover:bg-college-700 text-white"
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CourseHighlights;
