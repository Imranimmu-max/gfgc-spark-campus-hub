// API service for gallery operations

const API_URL = 'http://localhost:5000/api';

// Types
export interface GalleryItem {
  id: number;
  type: string;
  title: string;
  date: string;
  src: string;
  category: string;
  filename?: string;
}

// Get all gallery items
export const fetchGalleryItems = async (): Promise<GalleryItem[]> => {
  try {
    const response = await fetch(`${API_URL}/gallery`);
    if (!response.ok) {
      throw new Error('Failed to fetch gallery items');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return [];
  }
};

// Upload a new image
export const uploadImage = async (
  file: File,
  title: string
): Promise<GalleryItem | null> => {
  try {
    console.log('API: Creating FormData for upload');
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    console.log('API: Sending POST request to', `${API_URL}/gallery/upload`);
    const response = await fetch(`${API_URL}/gallery/upload`, {
      method: 'POST',
      body: formData,
    });

    console.log('API: Response status:', response.status);

    if (!response.ok) {
      console.error('API: Response not OK:', response.status, response.statusText);
      try {
        const errorData = await response.json();
        console.error('API: Error data:', errorData);
        throw new Error(errorData.error || 'Failed to upload image');
      } catch (jsonError) {
        console.error('API: Could not parse error response as JSON');
        throw new Error(`Failed to upload image: ${response.status} ${response.statusText}`);
      }
    }

    const data = await response.json();
    console.log('API: Successful response data:', data);
    return data;
  } catch (error) {
    console.error('API: Error uploading image:', error);
    return null;
  }
};

// Delete an image
export const deleteImage = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/gallery/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete image');
    }

    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

// Get full URL for an image
export const getFullImageUrl = (relativePath: string): string => {
  // If the path already starts with http or https, it's already a full URL
  if (relativePath.startsWith('http')) {
    return relativePath;
  }

  // For local development, use the hardcoded server URL
  return `http://localhost:5000${relativePath}`;
};
