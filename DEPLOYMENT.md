# ShopWish - Vercel Deployment Guide

## Quick Fix for Vercel Deployment Issues

### Problem
The app shows a blank page or crashes on Vercel because the Clerk environment variable is not configured.

### Solution

1. **Set Environment Variables in Vercel:**
   - Go to your [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your ShopWish project
   - Navigate to **Settings** → **Environment Variables**
   - Add the following variable:
     ```
     Name: VITE_CLERK_PUBLISHABLE_KEY
     Value: pk_test_your_actual_clerk_key_here
     ```

2. **Get Your Clerk Key:**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com/)
   - Select your application
   - Go to **API Keys**
   - Copy the **Publishable Key** (starts with `pk_test_` or `pk_live_`)

3. **Redeploy:**
   - After adding the environment variable, trigger a new deployment
   - You can do this by pushing a new commit or manually redeploying in Vercel

### Verification

After deployment, your app should:
- Show the ShopWish welcome screen if not signed in
- Display a helpful error message if the Clerk key is still missing
- Work normally once the environment variable is properly set

### Additional Notes

- The app now includes fallback UI that shows configuration instructions if the Clerk key is missing
- This prevents the blank page issue and helps with debugging
- All other features (product fetching, wishlist, recommendations) work independently of Clerk authentication

### Local Development

For local development, make sure you have a `.env.local` file with:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
```
