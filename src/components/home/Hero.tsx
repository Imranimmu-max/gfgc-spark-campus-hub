
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900">
      <div className="absolute inset-y-0 w-full h-full">
        <div className="absolute inset-0 bg-college-800 opacity-10 dark:opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-college-800/20 via-transparent to-transparent dark:from-college-800/40"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Welcome to <span className="text-college-600 dark:text-college-400">GFGC</span> Chikkaballpur
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Empowering minds, shaping futures. Join us on a journey of academic excellence, innovation, and holistic development.
            </p>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative w-full h-[450px] animate-float">
              <div className="w-full h-full overflow-hidden rounded-lg shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="College students"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/800x600?text=GFGC+Chikkaballpur";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
