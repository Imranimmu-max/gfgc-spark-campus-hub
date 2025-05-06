// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYrcJmNxJCuYXYrKHWELHGVjWXyEKfDpk",
  authDomain: "gfgc-spark-campus-hub.firebaseapp.com",
  projectId: "gfgc-spark-campus-hub",
  storageBucket: "gfgc-spark-campus-hub.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:1234567890abcdef123456",
  measurementId: "G-ABCDEFGHIJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Types
export interface FirebaseImage {
  url: string;
  path: string;
  name: string;
  contentType: string;
}

// Generate a unique filename
export const generateUniqueFilename = (originalName: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
};

// Upload an image to Firebase Storage
export const uploadToFirebase = async (file: File, folder: string = 'gallery'): Promise<FirebaseImage | null> => {
  try {
    console.log('Uploading to Firebase Storage:', file.name);
    
    // Generate a unique filename
    const filename = generateUniqueFilename(file.name);
    const path = `${folder}/${filename}`;
    
    // Create a reference to the file location
    const storageRef = ref(storage, path);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Uploaded file:', snapshot);
    
    // Get the download URL
    const url = await getDownloadURL(snapshot.ref);
    console.log('File available at:', url);
    
    return {
      url,
      path,
      name: filename,
      contentType: file.type
    };
  } catch (error) {
    console.error('Error uploading to Firebase Storage:', error);
    return null;
  }
};

// List all images in a folder
export const listFirebaseImages = async (folder: string = 'gallery'): Promise<FirebaseImage[]> => {
  try {
    console.log('Listing images from Firebase Storage');
    
    // Create a reference to the folder
    const folderRef = ref(storage, folder);
    
    // List all items in the folder
    const result = await listAll(folderRef);
    
    // Get download URLs for all items
    const images = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          url,
          path: itemRef.fullPath,
          name: itemRef.name,
          contentType: 'image/jpeg' // Default, as Firebase doesn't provide this directly
        };
      })
    );
    
    console.log('Successfully listed images from Firebase Storage:', images);
    
    return images;
  } catch (error) {
    console.error('Error listing images from Firebase Storage:', error);
    return [];
  }
};

// Delete an image from Firebase Storage
export const deleteFromFirebase = async (path: string): Promise<boolean> => {
  try {
    console.log('Deleting from Firebase Storage:', path);
    
    // Create a reference to the file
    const fileRef = ref(storage, path);
    
    // Delete the file
    await deleteObject(fileRef);
    
    console.log('Successfully deleted from Firebase Storage');
    
    return true;
  } catch (error) {
    console.error('Error deleting from Firebase Storage:', error);
    return false;
  }
};
