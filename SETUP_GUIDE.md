# Complete Setup Guide

This guide will walk you through setting up the Next.js + Sanity Blog from scratch.

## Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- A Sanity account (free tier available at sanity.io)
- Git (optional, for version control)

## Step-by-Step Setup

### Step 1: Install Dependencies

Open terminal in the project directory and run:

```bash
npm install
```

Wait for all packages to install. This may take 2-3 minutes.

### Step 2: Create Sanity Project

1. **Visit Sanity.io**
   - Go to https://www.sanity.io/
   - Sign up or log in

2. **Create New Project**
   - Click "Create Project"
   - Give it a name (e.g., "My Blog CMS")
   - Choose a dataset name: `production`
   - Select region closest to you

3. **Get Project Credentials**
   - After creation, go to https://www.sanity.io/manage
   - Select your project
   - Note the **Project ID** (looks like: abc123de)

4. **Generate API Tokens**
   - In project settings, go to **API** → **Tokens**
   - Click **Add API Token**
   - Create two tokens:
     - **Read Token**: Select "Viewer" permission (optional, only if dataset is private)
     - **Write Token**: Select "Editor" permission (required)
   - Copy and save these tokens securely

### Step 3: Configure Environment Variables

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit .env.local:**
   ```env
   # Replace with your actual values:
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123de
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   
   # Optional (only if dataset is private):
   SANITY_READ_TOKEN=skAbCdEf...
   
   # Required for edit/delete:
   SANITY_WRITE_TOKEN=skXyZ123...
   
   # Create your own secure tokens (minimum 32 characters):
   EDIT_TOKEN=my-super-secret-edit-token-12345
   DELETE_TOKEN=my-super-secret-delete-token-67890
   ```

3. **Important Notes:**
   - Never commit `.env.local` to git
   - Use strong, random tokens for EDIT_TOKEN and DELETE_TOKEN
   - Keep SANITY_WRITE_TOKEN secret

### Step 4: Initialize Sanity Dataset

Run this command to create the schema in Sanity:

```bash
npm run studio
```

This will:
- Start a local Sanity Studio server
- Open your browser to http://localhost:3000/studio
- Prompt you to sign in

**First Time Setup:**
1. Sign in with your Sanity account
2. Grant access to the project
3. You should see an empty Studio interface

### Step 5: Start Development Server

In a new terminal (keep Studio running), start Next.js:

```bash
npm run dev
```

Your blog is now running at:
- **Frontend:** http://localhost:3000
- **Studio:** http://localhost:3000/studio

### Step 6: Create Your First Blog Post

1. Go to http://localhost:3000/studio
2. Click **Blog Post** on the left sidebar
3. Click the **Create** button (+ icon)
4. Fill in the form:
   - **Title:** "My First Blog Post"
   - **Slug:** Click "Generate" button
   - **Author:** Your name
   - **Excerpt:** "This is my first blog post using Sanity CMS"
   - **Main Image:** Upload an image (optional)
   - **Content:** Write some content using the rich text editor
   - **Published At:** Leave as current date
5. Click **Publish** button (top right)

### Step 7: View Your Blog Post

1. Go to http://localhost:3000
2. You should see your blog post card
3. Click on it to view the full post
4. Try the **Edit** and **Delete** buttons

## Testing Edit/Delete Functionality

### Testing Edit:
1. Open a blog post
2. Click **Edit** button
3. Sanity Studio opens in new tab
4. Make changes and publish
5. Refresh blog page to see changes (may take up to 60s)

### Testing Delete:
1. Open a blog post
2. Click **Delete** button
3. Confirm deletion
4. Enter your `DELETE_TOKEN` when prompted
5. Blog post is deleted and you're redirected home

## Common Issues & Solutions

### Issue: "Module not found" errors
**Solution:** Run `npm install` again

### Issue: "Project ID not found"
**Solution:** Check `.env.local` has correct `NEXT_PUBLIC_SANITY_PROJECT_ID`

### Issue: Studio shows "Not authorized"
**Solution:** 
- Clear browser cookies for localhost
- Sign in again at /studio
- Check project permissions at sanity.io/manage

### Issue: Images not loading
**Solution:**
- Verify images uploaded in Sanity Studio
- Check `next.config.js` has `cdn.sanity.io` in domains
- Restart dev server

### Issue: "Invalid token" on delete
**Solution:**
- Check `.env.local` has `DELETE_TOKEN` set
- Use exact token value when prompted
- Restart dev server after changing .env.local

### Issue: Changes not appearing
**Solution:**
- Wait 60 seconds (ISR revalidation period)
- Or manually refresh the page
- Check if post is published in Studio

## Production Deployment

See README.md for detailed deployment instructions to Vercel.

Quick steps:
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

## Next Steps

- Customize the design in `tailwind.config.ts`
- Add more fields to the blog schema in `sanity/schemas/blog.ts`
- Implement proper authentication (NextAuth.js recommended)
- Add more content types (authors, categories, tags)
- Set up automated backups of Sanity data
- Configure custom domain

## Getting Help

- **Sanity Docs:** https://www.sanity.io/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind Docs:** https://tailwindcss.com/docs
- **GROQ Cheat Sheet:** https://www.sanity.io/docs/query-cheat-sheet

## Security Checklist for Production

- [ ] Change all default tokens in environment variables
- [ ] Never commit `.env.local` to git
- [ ] Implement proper authentication (NextAuth.js, Auth0, etc.)
- [ ] Add rate limiting to API routes
- [ ] Enable CORS only for your domain
- [ ] Use HTTPS only
- [ ] Set up Sanity dataset backups
- [ ] Enable Sanity dataset versioning
- [ ] Add CSP (Content Security Policy) headers
- [ ] Implement API request validation

---

**You're all set! Happy blogging! 🎉**
