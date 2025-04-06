
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Image, Film, X, Camera, Smile, Upload } from 'lucide-react';

interface PostFormProps {
  onPostSubmit: (post: any) => void;
}

interface MediaFile {
  id: string;
  file: File;
  type: 'image' | 'video';
  preview: string;
}

const PostForm = ({ onPostSubmit }: PostFormProps) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;
    
    // Limit number of files
    if (mediaFiles.length + files.length > 5) {
      toast({
        variant: "destructive",
        title: "Too many files",
        description: "You can upload a maximum of 5 files per post.",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const newFiles: MediaFile[] = files.map(file => {
        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`File ${file.name} exceeds the 10MB size limit`);
        }
        
        // Validate file type
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        
        if (!isImage && !isVideo) {
          throw new Error(`File ${file.name} is not a supported format. Please upload images or videos only.`);
        }
        
        // Explicitly determine the type as 'image' or 'video'
        const fileType: 'image' | 'video' = isImage ? 'image' : 'video';
        
        return {
          id: Date.now() + Math.random().toString(36).substring(2, 9),
          file,
          type: fileType,
          preview: URL.createObjectURL(file)
        };
      });
      
      setMediaFiles([...mediaFiles, ...newFiles]);
      
      toast({
        title: "Files ready",
        description: `${newFiles.length} ${newFiles.length === 1 ? 'file' : 'files'} added to your post.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || "There was an error uploading your files.",
      });
    } finally {
      setIsUploading(false);
      // Reset the file input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeFile = (id: string) => {
    const fileToRemove = mediaFiles.find(file => file.id === id);
    
    if (fileToRemove) {
      // Revoke object URL to avoid memory leaks
      URL.revokeObjectURL(fileToRemove.preview);
      
      setMediaFiles(mediaFiles.filter(file => file.id !== id));
      
      toast({
        title: "File removed",
        description: "The file has been removed from your post.",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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
      
      // Clean up object URLs
      mediaFiles.forEach(file => {
        URL.revokeObjectURL(file.preview);
      });
      
      setMediaFiles([]);
      setIsSubmitting(false);
      
      toast({
        title: "Post published!",
        description: "Your post has been published successfully.",
      });
    }, 1000);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      const input = fileInputRef.current;
      
      if (input) {
        // Create a DataTransfer object
        const dataTransfer = new DataTransfer();
        
        // Add the dropped files
        filesArray.forEach(file => {
          dataTransfer.items.add(file);
        });
        
        // Set the files property of the input
        input.files = dataTransfer.files;
        
        // Trigger the change event
        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
      }
    }
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
            <div 
              className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Textarea
                placeholder="What's on your mind, John?"
                value={content}
                onChange={handleTextChange}
                className="resize-none w-full border-0 focus:ring-0 focus:border-0 p-3 h-24 bg-transparent"
              />
              
              {mediaFiles.length > 0 && (
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-3 border-t border-gray-200 dark:border-gray-700">
                  {mediaFiles.map((file) => (
                    <div key={file.id} className="relative rounded-md overflow-hidden h-24 group">
                      {file.type === 'image' ? (
                        <img 
                          src={file.preview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <Film className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-600 dark:text-gray-300 ml-1 truncate">
                            {file.file.name}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          className="bg-red-500 rounded-full p-1 text-white"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-3 border-t pt-3 flex items-center justify-between">
              <div className="flex space-x-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <Upload className="h-5 w-5 mr-1 text-green-500" />
                  <span>{isUploading ? 'Uploading...' : 'Upload Media'}</span>
                </Button>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isUploading}
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting || isUploading}
                className="bg-college-600 hover:bg-college-700"
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </Button>
            </div>
            
            {/* Helper text */}
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Drag and drop files or click the upload button. Max 5 files, 10MB per file.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
