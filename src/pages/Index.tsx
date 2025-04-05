
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import CourseHighlights from '@/components/home/CourseHighlights';
import Events from '@/components/home/Events';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <CourseHighlights />
        <Events />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
