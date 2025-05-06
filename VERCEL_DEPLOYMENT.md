# Deploying GFGC Spark Campus Hub to Vercel

This guide explains how to deploy both the frontend and backend of the GFGC Spark Campus Hub project to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. GitHub account with your project repository

## Deploying the Frontend

1. Log in to your Vercel account
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Add environment variables if needed
6. Click "Deploy"

## Deploying the Backend

1. Create a new Vercel project
2. Import the same GitHub repository
3. Configure the project:
   - Root Directory: `server`
   - Framework Preset: Other
   - Build Command: `npm install`
   - Output Directory: `.`
   - Install Command: `npm install`
4. Add environment variables if needed
5. Click "Deploy"

## Connecting Frontend and Backend

The frontend code has been configured to automatically use the correct API URL based on the environment:

- In development: `http://localhost:5000/api`
- In production: `https://gfgc-spark-campus-hub-api.vercel.app/api`

Make sure to update the production API URL in `src/services/api.ts` with your actual Vercel backend URL.

## Troubleshooting

- If you encounter CORS issues, check the CORS configuration in `server/server.js`
- For file upload issues, make sure the Vercel backend is properly configured to handle file uploads
- Check Vercel logs for any deployment errors

## Developed by

Built with ❤️ by Imran for GFGC Chikkaballpur (personal project).
