
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Image, Film, X } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    type: 'image',
    title: 'Annual Day Celebration',
    date: 'March 15, 2023',
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'events',
  },
  {
    id: 2,
    type: 'image',
    title: 'Science Exhibition',
    date: 'February 20, 2023',
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'academic',
  },
  {
    id: 3,
    type: 'image',
    title: 'Sports Meet 2023',
    date: 'January 5, 2023',
    src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'sports',
  },
  {
    id: 4,
    type: 'video',
    title: 'Cultural Performance',
    date: 'December 12, 2022',
    src: 'https://example.com/video1.mp4', // This would be a real video URL
    thumbnail: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'cultural',
  },
  {
    id: 5,
    type: 'image',
    title: 'Campus Life',
    date: 'November 30, 2022',
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'campus',
  },
  {
    id: 6,
    type: 'image',
    title: 'Guest Lecture Series',
    date: 'October 18, 2022',
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'academic',
  },
  {
    id: 7,
    type: 'video',
    title: 'Alumni Meet 2022',
    date: 'September 25, 2022',
    src: 'https://example.com/video2.mp4', // This would be a real video URL
    thumbnail: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'events',
  },
  {
    id: 8,
    type: 'image',
    title: 'College Infrastructure',
    date: 'August 10, 2022',
    src: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'campus',
  },
];

const galleryCategories = [
  { id: 'all', name: 'All' },
  { id: 'events', name: 'Events' },
  { id: 'academic', name: 'Academic' },
  { id: 'sports', name: 'Sports' },
  { id: 'cultural', name: 'Cultural' },
  { id: 'campus', name: 'Campus' },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filteredItems = galleryItems.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  const openLightbox = (item) => {
    setSelectedItem(item);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (direction) => {
    if (!selectedItem) return;
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredItems.length;
    } else {
      newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    }
    
    setSelectedItem(filteredItems[newIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-college-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Gallery</h1>
          <p className="text-xl max-w-3xl">
            Explore moments and memories from our college events, activities, and campus life
          </p>
        </div>
      </div>
      
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs 
            defaultValue="all" 
            className="mb-8"
            onValueChange={setActiveCategory}
          >
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
              {galleryCategories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer card-hover"
                onClick={() => openLightbox(item)}
              >
                <div className="aspect-square overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <img 
                    src={item.type === 'image' ? item.src : item.thumbnail} 
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/400x400?text=Gallery+Image";
                    }}
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-college-600">
                        <Film className="h-6 w-6" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm opacity-80">{item.date}</p>
                  </div>
                  <div className="absolute top-3 right-3">
                    {item.type === 'image' ? (
                      <Image className="h-5 w-5 text-white" />
                    ) : (
                      <Film className="h-5 w-5 text-white" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Image className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No items found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No gallery items available for this category.
              </p>
            </div>
          )}
        </div>
      </main>
      
      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-0 overflow-hidden">
          {selectedItem && (
            <div className="relative">
              <div className="absolute top-2 right-2 z-10">
                <button 
                  onClick={closeLightbox}
                  className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="bg-black flex items-center justify-center">
                {selectedItem.type === 'image' ? (
                  <img 
                    src={selectedItem.src} 
                    alt={selectedItem.title}
                    className="max-h-[80vh] w-auto"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/800x600?text=Gallery+Image";
                    }}
                  />
                ) : (
                  <div className="relative aspect-video w-full max-h-[80vh]">
                    <img 
                      src={selectedItem.thumbnail} 
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/800x600?text=Video+Thumbnail";
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="text-white text-center">
                        <Film className="h-16 w-16 mx-auto mb-2" />
                        <p>Video playback not available in preview</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <button 
                  onClick={() => navigateLightbox('prev')}
                  className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              </div>
              
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <button 
                  onClick={() => navigateLightbox('next')}
                  className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedItem.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedItem.date}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Gallery;
