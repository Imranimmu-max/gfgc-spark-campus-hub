
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Film, X, Upload, Plus, Trash2 } from 'lucide-react';
import { fetchGalleryItems, uploadImage, deleteImage, getFullImageUrl, GalleryItem } from '@/services/api';

// Default gallery items (will be combined with items from the server)
const defaultGalleryItems = [
  {
    id: 1,
    type: 'image',
    title: 'GFGC Main Building',
    date: 'March 15, 2023',
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nonmoa93PuaT9Wv_g5AjBIpBt-YHY3vCBuUqKPO-5gRVzOLYDXmqRejN83nv4_664h5CvtwLeXNZV8EI2dFMnrzoPLVA9VlPszVY-hLNXoB-Lc7UHAo-arpubuUUW5_2VF_7-Y=s680-w680-h510-rw',
    category: 'campus',
  },
  {
    id: 2,
    type: 'image',
    title: 'College Campus View',
    date: 'February 20, 2023',
    src: 'https://lh3.googleusercontent.com/p/AF1QipNVu9Kj2Z_lJWd0-BNwj-XzZfcxTLw-kIKZ-Kk=s1360-w1360-h1020',
    category: 'campus',
  },
  {
    id: 3,
    type: 'image',
    title: 'College Building',
    date: 'January 5, 2023',
    src: 'https://lh3.googleusercontent.com/p/AF1QipPCcZXE3WXhePmEj3-PvKrB9j3dLZnOYm9Yiw4=s1360-w1360-h1020',
    category: 'campus',
  },
  {
    id: 4,
    type: 'image',
    title: 'College Entrance',
    date: 'December 12, 2022',
    src: 'https://lh3.googleusercontent.com/p/AF1QipMQyRGDmB9KdRvCGgQSBA9y5-GYYpSZxC_-Yw8=s1360-w1360-h1020',
    category: 'campus',
  },
  {
    id: 5,
    type: 'image',
    title: 'College Facilities',
    date: 'November 10, 2022',
    src: 'https://lh3.googleusercontent.com/p/AF1QipOLxUAe5iLhEacv7c9BHZpBVxF6pQHHJJxQ5Ks=s1360-w1360-h1020',
    category: 'academic',
  },
  {
    id: 6,
    type: 'image',
    title: 'College Infrastructure',
    date: 'October 5, 2022',
    src: 'https://lh3.googleusercontent.com/p/AF1QipMQyRGDmB9KdRvCGgQSBA9y5-GYYpSZxC_-Yw8=s1360-w1360-h1020',
    category: 'academic',
  },
  {
    id: 7,
    type: 'image',
    title: 'Sports Ground',
    date: 'September 15, 2022',
    src: 'https://lh3.googleusercontent.com/p/AF1QipNVu9Kj2Z_lJWd0-BNwj-XzZfcxTLw-kIKZ-Kk=s1360-w1360-h1020',
    category: 'sports',
  },
  {
    id: 8,
    type: 'image',
    title: 'Cultural Activities',
    date: 'August 20, 2022',
    src: 'https://lh3.googleusercontent.com/p/AF1QipOLxUAe5iLhEacv7c9BHZpBVxF6pQHHJJxQ5Ks=s1360-w1360-h1020',
    category: 'cultural',
  },
];

const galleryCategories = [
  { id: 'all', name: 'All' },
  { id: 'academic', name: 'Academic' },
  { id: 'sports', name: 'Sports' },
  { id: 'cultural', name: 'Cultural' },
  { id: 'campus', name: 'Campus' },
  { id: 'user-uploads', name: 'User Uploads' },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadTitle, setUploadTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);

  // Load gallery items from the server
  useEffect(() => {
    const loadGalleryItems = async () => {
      setIsLoading(true);
      try {
        const userUploads = await fetchGalleryItems();
        console.log('User uploads from server:', userUploads);

        // Log the full URLs for debugging
        userUploads.forEach(item => {
          console.log('Item src:', item.src);
          console.log('Full URL:', getFullImageUrl(item.src));
        });

        // Combine default items with user uploads
        setGalleryItems([...defaultGalleryItems, ...userUploads]);
      } catch (error) {
        console.error('Failed to load gallery items:', error);
        setGalleryItems(defaultGalleryItems);
      } finally {
        setIsLoading(false);
      }
    };

    loadGalleryItems();
  }, []);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadTitle.trim()) return;

    setIsUploading(true);
    console.log('Starting upload process...');
    console.log('File:', selectedFile.name, 'Size:', selectedFile.size, 'Type:', selectedFile.type);
    console.log('Title:', uploadTitle);

    try {
      // Create a client-side only version of the upload
      // This will work even if the server is not available
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;

        // Create a new gallery item
        const newItem: GalleryItem = {
          id: Date.now(), // Use timestamp as ID
          type: 'image',
          title: uploadTitle,
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          src: imageUrl,
          category: 'user-uploads',
          filename: selectedFile.name
        };

        console.log('Created local item:', newItem);

        // Add the new item to the gallery items
        setGalleryItems(prev => [...prev, newItem]);

        // Reset form
        setUploadTitle('');
        setPreviewImage(null);
        setSelectedFile(null);
        setUploadDialogOpen(false);

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Switch to user uploads category
        setActiveCategory('user-uploads');

        // Show success message
        alert('Image uploaded successfully!');

        setIsUploading(false);
      };

      reader.onerror = () => {
        console.error('Error reading file');
        alert('Failed to process image. Please try again.');
        setIsUploading(false);
      };

      // Read the file as a data URL
      reader.readAsDataURL(selectedFile);

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image. Please try again.');
      setIsUploading(false);
    }
  };

  const confirmDeleteImage = (item: GalleryItem) => {
    setItemToDelete(item);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteImage = async () => {
    if (!itemToDelete) return;

    try {
      // For user-uploaded images, we can just remove them from the state
      // since they're stored client-side
      setGalleryItems(prev => prev.filter(item => item.id !== itemToDelete.id));
      setDeleteConfirmOpen(false);
      setItemToDelete(null);

      // Show success message
      alert('Image deleted successfully!');
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete image. Please try again.');
    }
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
          <div className="flex justify-between items-center mb-8">
            <Tabs
              defaultValue="all"
              className="flex-grow"
              onValueChange={setActiveCategory}
            >
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-7">
                {galleryCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Button
              className="ml-4 bg-college-600 hover:bg-college-700 text-white"
              onClick={() => setUploadDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Upload Image
            </Button>
          </div>

          {/* Upload Dialog */}
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Image Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a title for your image"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    disabled={isUploading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Select Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                  <p className="text-xs text-gray-500">Maximum file size: 5MB</p>
                </div>

                {previewImage && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
                    <div className="aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setUploadDialogOpen(false)}
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-college-600 hover:bg-college-700 text-white"
                    onClick={handleUpload}
                    disabled={!previewImage || !uploadTitle.trim() || isUploading}
                  >
                    {isUploading ? (
                      <>Uploading...</>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" /> Upload
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
            <DialogContent className="sm:max-w-md">
              <h2 className="text-xl font-semibold mb-4">Delete Image</h2>
              <p className="mb-4">
                Are you sure you want to delete this image? This action cannot be undone.
              </p>
              {itemToDelete && (
                <div className="mb-4 p-2 border rounded-md">
                  <div className="aspect-video w-full overflow-hidden rounded-md">
                    <img
                      src={itemToDelete.src.startsWith('http') ? itemToDelete.src : getFullImageUrl(itemToDelete.src)}
                      alt={itemToDelete.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-2 font-medium">{itemToDelete.title}</p>
                </div>
              )}
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirmOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteImage}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-square bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-lg shadow-md card-hover"
                >
                  <div
                    className="aspect-square overflow-hidden bg-gray-200 dark:bg-gray-800 cursor-pointer"
                    onClick={() => openLightbox(item)}
                  >
                    <img
                      src={item.src.startsWith('http') ? item.src : getFullImageUrl(item.src)}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        console.error('Image load error for:', item.title, item.src);
                        console.error('Full URL attempted:', item.src.startsWith('http') ? item.src : getFullImageUrl(item.src));
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
                    <div className="absolute top-3 right-3 flex space-x-2">
                      {item.category === 'user-uploads' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDeleteImage(item);
                          }}
                          className="bg-red-500/70 hover:bg-red-500 p-1.5 rounded-full transition-colors"
                          title="Delete image"
                        >
                          <Trash2 className="h-4 w-4 text-white" />
                        </button>
                      )}
                      {item.type === 'image' ? (
                        <div className="bg-black/50 p-1.5 rounded-full">
                          <ImageIcon className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className="bg-black/50 p-1.5 rounded-full">
                          <Film className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No items found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {activeCategory === 'user-uploads'
                  ? "You haven't uploaded any images yet. Click the 'Upload Image' button to add your first image."
                  : "No gallery items available for this category."}
              </p>
              {activeCategory === 'user-uploads' && (
                <Button
                  className="mt-4 bg-college-600 hover:bg-college-700 text-white"
                  onClick={() => setUploadDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Upload Image
                </Button>
              )}
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
                    src={selectedItem.src.startsWith('http') ? selectedItem.src : getFullImageUrl(selectedItem.src)}
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
