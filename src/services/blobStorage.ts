// Blob Storage service for handling image uploads
import { put, list, del } from '@vercel/blob';

// Types
export interface BlobImage {
  url: string;
  pathname: string;
  contentType: string;
  size: number;
}

// Generate a unique filename
export const generateUniqueFilename = (originalName: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
};

// Upload an image to Vercel Blob Storage
export const uploadToBlob = async (file: File): Promise<BlobImage | null> => {
  try {
    console.log('Uploading to Vercel Blob Storage:', file.name);
    
    // Generate a unique filename
    const filename = generateUniqueFilename(file.name);
    
    // Upload to Vercel Blob Storage
    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: false, // We already added randomness to the filename
    });
    
    console.log('Successfully uploaded to Vercel Blob Storage:', blob);
    
    return {
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
      size: blob.size
    };
  } catch (error) {
    console.error('Error uploading to Vercel Blob Storage:', error);
    return null;
  }
};

// Delete an image from Vercel Blob Storage
export const deleteFromBlob = async (url: string): Promise<boolean> => {
  try {
    console.log('Deleting from Vercel Blob Storage:', url);
    
    // Extract the pathname from the URL
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.startsWith('/') ? urlObj.pathname.substring(1) : urlObj.pathname;
    
    // Delete from Vercel Blob Storage
    await del(pathname);
    
    console.log('Successfully deleted from Vercel Blob Storage');
    
    return true;
  } catch (error) {
    console.error('Error deleting from Vercel Blob Storage:', error);
    return false;
  }
};

// List all images in Vercel Blob Storage
export const listBlobImages = async (): Promise<BlobImage[]> => {
  try {
    console.log('Listing images from Vercel Blob Storage');
    
    // List all blobs
    const blobs = await list();
    
    console.log('Successfully listed images from Vercel Blob Storage:', blobs);
    
    // Convert to BlobImage type
    return blobs.blobs.map(blob => ({
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType || 'image/jpeg', // Default to JPEG if not specified
      size: blob.size
    }));
  } catch (error) {
    console.error('Error listing images from Vercel Blob Storage:', error);
    return [];
  }
};
