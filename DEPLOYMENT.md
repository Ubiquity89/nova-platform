# NOVA - Deployment Guide

This guide will help you deploy the NOVA Team Productivity Platform to production.

## Prerequisites

- GitHub account
- MongoDB Atlas account (already set up)
- Vercel account (for frontend)
- Render account (for backend)

## Step 1: Push to GitHub

### 1.1 Initialize Git Repository

```bash
cd C:\Users\ubiqu\OneDrive\Desktop\SankarAssignment
git init
git add .
git commit -m "Initial commit - NOVA Team Productivity Platform"
```

### 1.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named "nova-platform"
3. Don't initialize with README (we already have files)
4. Copy the repository URL

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/nova-platform.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 2.2 Create Web Service

1. Click "New +" → "Web Service"
2. Select your "nova-platform" repository
3. Configure the service:

**Build & Deploy Settings:**
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

**Environment Variables:**
Add these environment variables in Render dashboard:

```
PORT=5000
MONGODB_URI=mongodb+srv://ubiquity7001_db_user:Yx9JpvwG6VYIHfjv@cluster0.cymopvj.mongodb.net/nova?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=CB3B051D66218869C02F4DC71F46FC2F-NOVA-PRODUCTION-SECRET
NODE_ENV=production
```

**Important:** For MongoDB URI, use the SRV connection string from MongoDB Atlas dashboard for better reliability in production.

### 2.3 Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete (2-3 minutes)
3. Copy your backend URL (e.g., `https://nova-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### 3.2 Import Project

1. Click "Add New..." → "Project"
2. Select your "nova-platform" repository
3. Configure the project:

**Build & Development Settings:**
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `dist`

**Environment Variables:**
Add this environment variable:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Replace `your-backend-url.onrender.com` with your actual Render backend URL.

### 3.3 Deploy

1. Click "Deploy"
2. Wait for deployment to complete (1-2 minutes)
3. Copy your frontend URL (e.g., `https://nova-platform.vercel.app`)

## Step 4: Configure MongoDB Atlas for Production

### 4.1 Verify Network Access

1. Go to MongoDB Atlas → Network Access
2. Make sure you have "Allow Access from Anywhere" (0.0.0.0/0)
3. This ensures your deployed backend can connect

### 4.2 Verify Database User

1. Go to MongoDB Atlas → Database Access
2. Make sure your database user has appropriate permissions
3. Note the username and password for your environment variables

## Step 5: Test the Deployed Application

1. Open your frontend URL in a browser
2. Test registration and login
3. Create a project and task
4. Verify all features work

## Step 6: Update Frontend Environment Variable

After deploying the backend, update the frontend's environment variable:

1. Go to Vercel dashboard → your project → Settings → Environment Variables
2. Update `VITE_API_URL` to your actual backend URL
3. Redeploy the frontend

## Troubleshooting

### Backend Deployment Issues

**Issue:** Build fails
- **Solution:** Check the Render logs for specific errors
- Make sure all dependencies are in package.json

**Issue:** MongoDB connection fails
- **Solution:** Verify MONGODB_URI is correct
- Check Network Access settings in MongoDB Atlas
- Ensure your cluster is not paused

### Frontend Deployment Issues

**Issue:** Build fails
- **Solution:** Check Vercel logs
- Ensure build command is correct

**Issue:** API calls fail
- **Solution:** Verify VITE_API_URL points to correct backend URL
- Check backend is running and accessible

### Connection Issues

**Issue:** CORS errors
- **Solution:** The backend already has CORS configured
- Make sure frontend URL is properly set

**Issue:** Authentication fails
- **Solution:** Verify JWT_SECRET is set correctly
- Check that JWT_SECRET matches between environments

## Maintenance

### Updating the Application

1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Render and Vercel will auto-deploy

### Monitoring

- **Render**: Check dashboard for logs and metrics
- **Vercel**: Check dashboard for deployment logs
- **MongoDB Atlas**: Monitor database performance

### Backup

- MongoDB Atlas provides automatic backups
- Consider exporting data regularly for additional safety

## Cost

- **Render**: Free tier available (spins down after inactivity)
- **Vercel**: Free tier available (Hobby plan)
- **MongoDB Atlas**: Free tier available (512MB storage)

## Security Best Practices

1. Never commit `.env` files to Git
2. Use strong JWT secrets
3. Enable MongoDB Atlas IP whitelisting
4. Use HTTPS in production (both platforms provide this)
5. Monitor for suspicious activity
6. Keep dependencies updated

## Support

For issues specific to:
- **Render**: https://render.com/docs
- **Vercel**: https://vercel.com/docs
- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas

## Next Steps

After successful deployment:
1. Set up custom domains (optional)
2. Configure analytics (optional)
3. Set up monitoring and alerts
4. Add additional team members
5. Scale resources as needed
