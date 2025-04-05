
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const events = [
  {
    title: 'Annual Sports Day',
    date: 'May 15, 2023',
    location: 'College Grounds',
    type: 'Sports',
    isUpcoming: true,
  },
  {
    title: 'Cultural Festival "Kaleidoscope"',
    date: 'June 10-12, 2023',
    location: 'College Auditorium',
    type: 'Cultural',
    isUpcoming: true,
  },
  {
    title: 'Tech Symposium 2023',
    date: 'July 5, 2023',
    location: 'Seminar Hall',
    type: 'Academic',
    isUpcoming: true,
  },
];

const Events = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Events</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Stay updated with the latest events and activities happening at our campus
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md card-hover"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={event.type === 'Sports' ? 'default' : event.type === 'Cultural' ? 'secondary' : 'outline'}>
                    {event.type}
                  </Badge>
                  {event.isUpcoming && (
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                      Upcoming
                    </Badge>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {event.location}
                </p>
                <Button variant="outline" className="w-full">View Details</Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">View All Events</Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
