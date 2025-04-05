
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Cultural Festival',
      date: 'May 15-17, 2023',
      time: '10:00 AM - 6:00 PM',
      location: 'College Main Auditorium',
      description: 'Annual cultural festival featuring music, dance, and various competitions.',
      image: 'https://i.pravatar.cc/300?img=1',
      attendees: 150
    },
    {
      id: 2,
      title: 'Industry Expert Talk',
      date: 'May 20, 2023',
      time: '11:00 AM - 1:00 PM',
      location: 'Seminar Hall',
      description: 'Guest lecture by industry experts on recent technological advancements.',
      image: 'https://i.pravatar.cc/300?img=2',
      attendees: 75
    },
    {
      id: 3,
      title: 'Tech Symposium',
      date: 'May 25, 2023',
      time: '9:00 AM - 5:00 PM',
      location: 'Computer Science Block',
      description: 'Technical symposium featuring workshops, hackathons, and coding competitions.',
      image: 'https://i.pravatar.cc/300?img=3',
      attendees: 120
    },
    {
      id: 4,
      title: 'Alumni Meet',
      date: 'June 5, 2023',
      time: '3:00 PM - 7:00 PM',
      location: 'College Main Ground',
      description: 'Annual alumni gathering to connect current students with graduates.',
      image: 'https://i.pravatar.cc/300?img=4',
      attendees: 100
    },
    {
      id: 5,
      title: 'Sports Day',
      date: 'June 12-13, 2023',
      time: 'All Day',
      location: 'College Sports Complex',
      description: 'Annual sports competition featuring various indoor and outdoor games.',
      image: 'https://i.pravatar.cc/300?img=5',
      attendees: 200
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              College Events
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stay updated with the latest events, workshops, and activities happening at GFGC Chikkaballpur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2 text-college-600 dark:text-college-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-2 text-college-600 dark:text-college-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2 text-college-600 dark:text-college-400" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-2 text-college-600 dark:text-college-400" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 bg-college-600 text-white rounded-md hover:bg-college-700 transition-colors">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
