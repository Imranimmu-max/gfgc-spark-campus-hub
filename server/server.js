const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:3000',
           'https://gfgc-spark-campus-hub.vercel.app', 'https://gfgc-spark-campus-hub-git-main-imranimmu-max.vercel.app'],
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Determine if we're running on Vercel
const isVercel = process.env.VERCEL === '1';

// For Vercel, we'll use memory storage since the filesystem is read-only
// For local development, we'll use disk storage
let storage;

if (isVercel) {
  console.log('Running on Vercel, using memory storage');
  // Use memory storage for Vercel
  storage = multer.memoryStorage();
} else {
  console.log('Running locally, using disk storage');
  // Create uploads directory if it doesn't exist
  fs.ensureDirSync(path.join(__dirname, 'uploads'));

  // Use disk storage for local development
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
      // Create a unique filename with original extension
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    }
  });
}

// Create the multer instance
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Store uploaded images data
let galleryData = [];

// Load existing gallery data if available
const dataFilePath = path.join(__dirname, 'gallery-data.json');
try {
  if (fs.existsSync(dataFilePath)) {
    galleryData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    console.log('Loaded existing gallery data');
  }
} catch (error) {
  console.error('Error loading gallery data:', error);
}

// Save gallery data to file
const saveGalleryData = () => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(galleryData, null, 2));
    console.log('Gallery data saved');
  } catch (error) {
    console.error('Error saving gallery data:', error);
  }
};

// API Routes
// Get all gallery items
app.get('/api/gallery', (req, res) => {
  res.json(galleryData);
});

// Upload a new image
app.post('/api/gallery/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    let imageUrl;
    let filename;

    if (isVercel) {
      // For Vercel, we'll use a data URL since we're using memory storage
      // This is just for demonstration - in a real app, you'd use a cloud storage service
      const base64Image = req.file.buffer.toString('base64');
      const mimeType = req.file.mimetype;
      imageUrl = `data:${mimeType};base64,${base64Image}`;
      filename = `memory-${Date.now()}`;
    } else {
      // For local development, use the file path
      imageUrl = `/uploads/${req.file.filename}`;
      filename = req.file.filename;
    }

    // Create new gallery item
    const newItem = {
      id: Date.now(),
      type: 'image',
      title,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      src: imageUrl,
      category: 'user-uploads',
      filename: filename
    };

    // Add to gallery data
    galleryData.push(newItem);

    // Save to file
    saveGalleryData();

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Server error during upload' });
  }
});

// Delete an image
app.delete('/api/gallery/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = galleryData.findIndex(item => item.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Image not found' });
  }

  const item = galleryData[itemIndex];

  // Remove the file
  if (item.filename) {
    const filePath = path.join(__dirname, 'uploads', item.filename);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  // Remove from gallery data
  galleryData.splice(itemIndex, 1);

  // Save to file
  saveGalleryData();

  res.json({ message: 'Image deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
