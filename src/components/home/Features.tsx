
import React from 'react';
import { Award, BookOpen, Users, Calendar } from 'lucide-react';

const features = [
  {
    title: 'Excellence in Education',
    description: 'Our college is committed to academic excellence with experienced faculty and modern teaching methodologies.',
    icon: BookOpen,
  },
  {
    title: 'Diverse Community',
    description: 'Join a vibrant community of students from diverse backgrounds, cultures, and perspectives.',
    icon: Users,
  },
  {
    title: 'Campus Activities',
    description: 'Participate in a wide range of extracurricular activities, clubs, and cultural events.',
    icon: Calendar,
  },
  {
    title: 'Recognition & Achievements',
    description: 'Our institution has received numerous accolades for academic and extra-curricular excellence.',
    icon: Award,
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose GFGC Chikkaballpur</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our institution offers numerous advantages that make us the preferred choice for higher education
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm card-hover"
            >
              <div className="inline-flex items-center justify-center p-3 bg-college-100 dark:bg-college-900 rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-college-600 dark:text-college-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
