# Deploying to Vercel

This Express.js backend has been configured to work with Vercel's serverless platform.

## Prerequisites

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

## Environment Variables

Set up your environment variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variables:

### Required Variables:

- **`MONGODB_URI`**
- **`SECRET_KEY`**
- **`JWT_LIFETIME`**: `24h` (or `7d`, `30d` - how long tokens should be valid)

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. Navigate to the backend directory:
   ```bash
   cd react-ticket-backend
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Follow the prompts to configure your project

### Option 2: Deploy via Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Vercel will automatically deploy on each push

## Local Development

To test locally with Vercel's serverless environment:

```bash
vercel dev
```

This will start a local server that mimics Vercel's serverless environment.

## Important Notes

- **Database Connections**: The app uses connection pooling optimized for serverless environments
- **Cold Starts**: First requests may be slower due to serverless cold starts
- **Function Timeout**: Set to 30 seconds maximum (configurable in vercel.json)
- **Environment Variables**: Must be set in Vercel dashboard, not in .env files

## API Endpoints

Your API will be available at:
- `https://your-project.vercel.app/api/` - Base endpoint
- `https://your-project.vercel.app/api/tasks` - Tasks endpoints
- `https://your-project.vercel.app/api/users` - Users endpoints

## Troubleshooting

1. **Database Connection Issues**: Ensure your MongoDB URI is correct and accessible from Vercel's servers
2. **CORS Issues**: Update your frontend to use the new Vercel URL
3. **Environment Variables**: Double-check all environment variables are set in Vercel dashboard 