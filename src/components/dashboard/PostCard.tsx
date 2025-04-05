
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Heart,
  MessageSquare,
  Share,
  MoreHorizontal,
  Film,
  Trash2,
  Edit,
  Flag
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post, onLike, onComment, onDelete, currentUser = 'John Smith' }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const isCurrentUserPost = post.user.name === currentUser;
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id, !isLiked);
  };
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      user: {
        name: currentUser,
        avatar: 'https://i.pravatar.cc/150?u=a123',
      },
      content: commentText,
      createdAt: new Date().toISOString(),
    };
    
    onComment(post.id, newComment);
    setCommentText('');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{post.user.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isCurrentUserPost ? (
              <>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit Post</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 dark:text-red-400"
                  onClick={() => onDelete(post.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete Post</span>
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem>
                <Flag className="mr-2 h-4 w-4" />
                <span>Report Post</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Post Content */}
      {post.content && (
        <div className="px-4 pb-3">
          <p className="text-gray-800 dark:text-gray-200">{post.content}</p>
        </div>
      )}
      
      {/* Post Media */}
      {post.media && post.media.length > 0 && (
        <div className={`grid ${post.media.length === 1 ? 'grid-cols-1' : post.media.length === 2 ? 'grid-cols-2' : post.media.length >= 3 ? 'grid-cols-3' : ''} gap-1`}>
          {post.media.map((media, index) => (
            <div key={media.id} className={`overflow-hidden ${post.media.length === 1 ? 'col-span-full' : ''}`}>
              {media.type === 'image' ? (
                <img 
                  src={media.preview || media.url} 
                  alt="Post media" 
                  className="w-full h-60 object-cover"
                />
              ) : (
                <div className="relative bg-gray-200 dark:bg-gray-700 h-60 flex items-center justify-center">
                  <Film className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="ghost" size="sm" className="bg-black/50 text-white hover:bg-black/70">
                      Play Video
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm"
          className={`flex items-center ${isLiked ? 'text-red-500' : ''}`}
          onClick={handleLike}
        >
          <Heart className={`h-5 w-5 mr-1 ${isLiked ? 'fill-current' : ''}`} />
          <span>{post.likes + (isLiked ? 1 : 0)}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare className="h-5 w-5 mr-1" />
          <span>{post.comments.length}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center"
        >
          <Share className="h-5 w-5 mr-1" />
          <span>Share</span>
        </Button>
      </div>
      
      {/* Comments Section */}
      {showComments && (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="flex items-start space-x-2 mb-4">
            <Avatar className="h-8 w-8 mt-1">
              <AvatarImage src="https://i.pravatar.cc/150?u=a123" alt={currentUser} />
              <AvatarFallback>{currentUser.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea 
                placeholder="Write a comment..." 
                className="resize-none w-full h-10 py-2"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <Button 
                  type="submit" 
                  size="sm" 
                  className="bg-college-600 hover:bg-college-700"
                  disabled={!commentText.trim()}
                >
                  Comment
                </Button>
              </div>
            </div>
          </form>
          
          {/* Comments List */}
          <div className="space-y-4">
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">
                        {comment.user.name}
                      </p>
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {comment.content}
                      </p>
                    </div>
                    <div className="flex items-center mt-1 space-x-3">
                      <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                        Like
                      </button>
                      <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                        Reply
                      </button>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
