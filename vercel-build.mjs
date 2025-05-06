// ESM wrapper for vercel-build.js
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create _headers file
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
  fs.writeFileSync(join('dist', '_headers'), headersContent.trim());
  console.log('Created _headers file in dist directory');

  // Create a _redirects file
  fs.writeFileSync(join('dist', '_redirects'), '/* /index.html 200');
  console.log('Created _redirects file in dist directory');

  console.log('Vercel build post-processing completed successfully');
} catch (error) {
  console.error('Error during Vercel build post-processing:', error);
  process.exit(1);
}
