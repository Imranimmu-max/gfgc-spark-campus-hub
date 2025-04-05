
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Image, Film, X, Camera, Smile } from 'lucide-react';

const PostForm = ({ onPostSubmit }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleTextChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Limit number of files
    if (mediaFiles.length + files.length > 5) {
      toast({
        variant: "destructive",
        title: "Too many files",
        description: "You can upload a maximum of 5 files per post.",
      });
      return;
    }
    
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      file,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      preview: URL.createObjectURL(file)
    }));
    
    setMediaFiles([...mediaFiles, ...newFiles]);
  };

  const removeFile = (id) => {
    setMediaFiles(mediaFiles.filter(file => file.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!content.trim() && mediaFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Empty post",
        description: "Please add some text or media to your post.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        user: {
          name: 'John Smith',
          avatar: 'https://i.pravatar.cc/150?u=a123',
        },
        content,
        media: mediaFiles,
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString(),
      };
      
      onPostSubmit(newPost);
      
      // Reset form
      setContent('');
      setMediaFiles([]);
      setIsSubmitting(false);
      
      toast({
        title: "Post created!",
        description: "Your post has been published successfully.",
      });
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-start space-x-3">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/150?u=a123" alt="John Smith" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder="What's on your mind, John?"
              value={content}
              onChange={handleTextChange}
              className="resize-none w-full border-0 focus:ring-0 focus:border-0 p-3 h-24 bg-transparent"
            />
            
            {mediaFiles.length > 0 && (
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {mediaFiles.map((file) => (
                  <div key={file.id} className="relative rounded-md overflow-hidden h-24">
                    {file.type === 'image' ? (
                      <img 
                        src={file.preview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <Film className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                      </div>
                    )}
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 text-white"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-3 border-t pt-3 flex items-center justify-between">
              <div className="flex space-x-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Image className="h-5 w-5 mr-1 text-green-500" />
                  <span>Photo</span>
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Film className="h-5 w-5 mr-1 text-blue-500" />
                  <span>Video</span>
                </Button>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-college-600 hover:bg-college-700"
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
