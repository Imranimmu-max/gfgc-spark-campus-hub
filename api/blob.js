// API route for Vercel Blob Storage
import { put, list, del } from '@vercel/blob';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Handle different HTTP methods
  if (request.method === 'POST') {
    try {
      // Handle file upload
      const formData = await request.formData();
      const file = formData.get('file');
      
      if (!file) {
        return new Response(JSON.stringify({ error: 'No file provided' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // Generate a unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      const filename = `${timestamp}-${randomString}.${file.name.split('.').pop()}`;
      
      // Upload to Vercel Blob Storage
      const blob = await put(filename, file, {
        access: 'public',
        addRandomSuffix: false,
      });
      
      return new Response(JSON.stringify(blob), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      return new Response(JSON.stringify({ error: 'Failed to upload file' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else if (request.method === 'GET') {
    try {
      // List all blobs
      const blobs = await list();
      
      return new Response(JSON.stringify(blobs), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error listing blobs:', error);
      return new Response(JSON.stringify({ error: 'Failed to list blobs' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else if (request.method === 'DELETE') {
    try {
      // Extract the pathname from the URL
      const pathToDelete = url.searchParams.get('path');
      
      if (!pathToDelete) {
        return new Response(JSON.stringify({ error: 'No path provided' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // Delete from Vercel Blob Storage
      await del(pathToDelete);
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error deleting blob:', error);
      return new Response(JSON.stringify({ error: 'Failed to delete blob' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
