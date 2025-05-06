// This script runs after the build to ensure proper configuration for Vercel
const fs = require('fs');
const path = require('path');

// Create a _headers file in the dist directory
const headersContent = `
# All JavaScript files should have the correct MIME type
/assets/*.js
  Content-Type: application/javascript; charset=utf-8

# All CSS files should have the correct MIME type
/assets/*.css
  Content-Type: text/css; charset=utf-8

# All routes should be handled by index.html for SPA
/*
  Cache-Control: no-cache
`;

try {
  // Ensure the dist directory exists
  if (!fs.existsSync('dist')) {
    console.log('Creating dist directory...');
    fs.mkdirSync('dist', { recursive: true });
  }

  // Write the _headers file
  fs.writeFileSync(path.join('dist', '_headers'), headersContent.trim());
  console.log('Created _headers file in dist directory');

  // Copy _redirects file to dist if it exists
  if (fs.existsSync('public/_redirects')) {
    fs.copyFileSync('public/_redirects', path.join('dist', '_redirects'));
    console.log('Copied _redirects file to dist directory');
  } else {
    // Create a _redirects file if it doesn't exist
    fs.writeFileSync(path.join('dist', '_redirects'), '/* /index.html 200');
    console.log('Created _redirects file in dist directory');
  }

  console.log('Vercel build post-processing completed successfully');
} catch (error) {
  console.error('Error during Vercel build post-processing:', error);
  process.exit(1);
}
