# Deploying Lucy Backend on Render

This guide will help you deploy your Flask backend on Render while keeping your frontend on Netlify.

## Prerequisites

1. A Render account (free tier available)
2. Your Gemini API key
3. Your backend code pushed to a Git repository

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your backend code is in a Git repository and pushed to GitHub/GitLab.

### 2. Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub/GitLab account
3. Verify your email

### 3. Deploy Your Backend

1. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your Git repository

2. **Configure Your Service**
   - **Name**: `lucy-backend` (or your preferred name)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: Free (or choose paid if needed)

3. **Set Environment Variables**
   - Click on "Environment" tab
   - Add the following variable:
     - `GEMINI_API_KEY`: Your actual Gemini API key
   - (Optional) Add these for better security:
     - `FLASK_ENV`: `production`
     - `SECRET_KEY`: A random secret string

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app

### 4. Update Frontend Configuration

Once deployed, you'll get a URL like `https://your-app-name.onrender.com`. Update your frontend to use this URL instead of localhost.

### 5. Test Your Deployment

1. Visit your Render service URL
2. Test the health endpoint: `https://your-app-name.onrender.com/api/health`
3. Test your AI endpoint with a simple request

## Environment Variables

**Required:**
- `GEMINI_API_KEY`: Your Gemini API key

**Optional (for better security):**
- `FLASK_ENV`: `production`
- `SECRET_KEY`: A secure random string

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check the build logs in Render dashboard
2. **Import Errors**: Ensure all packages are in `requirements.txt`
3. **CORS Issues**: Verify your frontend domain is in the CORS configuration
4. **Database Issues**: SQLite files are ephemeral on Render - consider using a persistent database

### Logs:

- View logs in the Render dashboard under your service
- Check both build logs and runtime logs

## Next Steps

1. **Database**: Consider migrating from SQLite to PostgreSQL (Render provides this)
2. **Monitoring**: Set up health checks and monitoring
3. **Scaling**: Upgrade to paid plans if you need more resources

## Support

- Render Documentation: [docs.render.com](https://docs.render.com)
- Render Community: [community.render.com](https://community.render.com)
