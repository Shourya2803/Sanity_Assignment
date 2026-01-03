# Next.js + Sanity CMS Blog Application

A production-ready blog application built with Next.js (Pages Router), TypeScript, and Sanity CMS v3. Features a modern UI with Tailwind CSS, GROQ queries for data fetching, and full CRUD operations.

## 🚀 Features

- ✅ **Next.js Pages Router** - Server-side rendering with getStaticProps/getStaticPaths
- ✅ **TypeScript** - Full type safety across the entire codebase
- ✅ **Sanity CMS v3** - Headless CMS with real-time Studio
- ✅ **GROQ Queries** - Powerful data fetching from Sanity
- ✅ **Tailwind CSS** - Modern, responsive UI design
- ✅ **Portable Text** - Rich text content rendering
- ✅ **Image Optimization** - Next.js Image component with Sanity CDN
- ✅ **Edit/Delete Operations** - API routes for blog management
- ✅ **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards
- ✅ **ISR (Incremental Static Regeneration)** - Automatic page updates

## 📁 Project Structure

```
nextjs-sanity-blog/
├── components/
│   ├── Layout.tsx          # Main layout wrapper
│   ├── Navbar.tsx          # Navigation bar
│   ├── Footer.tsx          # Footer component
│   ├── BlogCard.tsx        # Blog post card
│   └── BlogContent.tsx     # Portable Text renderer
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   ├── sanity.client.ts    # Sanity client configuration
│   └── groqQueries.ts      # GROQ queries
├── pages/
│   ├── _app.tsx            # Custom App component
│   ├── _document.tsx       # Custom Document
│   ├── index.tsx           # Homepage (blog listing)
│   ├── blog/
│   │   └── [slug].tsx      # Dynamic blog detail page
│   └── api/
│       └── blogs/
│           ├── update.ts   # Update blog API route
│           └── delete.ts   # Delete blog API route
├── sanity/
│   ├── schemas/
│   │   ├── index.ts        # Schema exports
│   │   └── blog.ts         # Blog post schema
│   └── sanity.config.ts    # Sanity configuration
├── styles/
│   └── globals.css         # Global styles with Tailwind
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set Up Sanity Project

1. Create a new Sanity project at [sanity.io](https://www.sanity.io/)
2. Note your **Project ID** and **Dataset** name
3. Generate API tokens:
   - Go to https://www.sanity.io/manage
   - Select your project
   - Navigate to **API** → **Tokens**
   - Create a **Read token** (optional, if dataset is private)
   - Create a **Write token** (required for edit/delete operations)

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Sanity credentials:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Sanity Tokens (keep secret, server-side only)
SANITY_READ_TOKEN=your_read_token_here
SANITY_WRITE_TOKEN=your_write_token_here

# API Security Tokens (create your own secure tokens)
EDIT_TOKEN=your_secure_edit_token_here
DELETE_TOKEN=your_secure_delete_token_here
```

**Important Security Notes:**
- Never commit `.env.local` to version control
- `EDIT_TOKEN` and `DELETE_TOKEN` are for demo purposes only
- In production, use proper authentication (NextAuth.js, Auth0, etc.)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Start Sanity Studio

In a separate terminal:

```bash
npm run studio
```

The Studio will be available at [http://localhost:3000/studio](http://localhost:3000/studio)

**First-time Studio setup:**
1. Navigate to `/studio`
2. Sign in with your Sanity account
3. Create your first blog post

## 📝 Creating Blog Posts

1. Open Sanity Studio at `/studio`
2. Click **Blog Post** → **Create**
3. Fill in the required fields:
   - **Title** - Your blog post title
   - **Slug** - Auto-generated from title (click "Generate")
   - **Author** - Your name
   - **Excerpt** - Short description (max 200 characters)
   - **Main Image** - Upload a featured image (optional)
   - **Content** - Rich text editor with formatting options
   - **Published At** - Publication date
4. Click **Publish**
5. Your post will appear on the homepage within 60 seconds (ISR)

## 🎨 Features Guide

### Blog Listing (Homepage)

- Displays all published blog posts in a responsive grid
- Shows title, excerpt, author, date, and thumbnail
- Hover effects on cards
- Auto-updates every 60 seconds (ISR)

### Blog Detail Page

- Full blog post with rich content rendering
- Featured image
- Author and publication date
- Portable Text content with:
  - Headings (H1-H4)
  - Paragraphs
  - Bold, italic, code formatting
  - Links
  - Blockquotes
  - Images with captions
  - Code blocks
- SEO meta tags (Open Graph, Twitter Cards)

### Edit Functionality

1. Click **Edit** button on any blog post
2. Opens Sanity Studio in a new tab
3. Make changes and publish

**Alternative API-based editing:**
- Implemented in `/api/blogs/update.ts`
- Requires `EDIT_TOKEN` for authorization
- Can update title, content, and excerpt

### Delete Functionality

1. Click **Delete** button on any blog post
2. Confirm deletion
3. Enter admin token when prompted
4. Post is permanently deleted
5. Redirects to homepage

**Security:**
- Validates `DELETE_TOKEN` from environment variables
- Server-side only operation
- No write token exposed to client

## 🚢 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Configure environment variables:
   - Add all variables from `.env.local`
   - Ensure `NEXT_PUBLIC_*` variables are marked as public
4. Deploy

### Environment Variables in Vercel

Go to **Project Settings** → **Environment Variables** and add:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your project ID | All |
| `NEXT_PUBLIC_SANITY_DATASET` | production | All |
| `NEXT_PUBLIC_SANITY_API_VERSION` | 2024-01-01 | All |
| `SANITY_READ_TOKEN` | Your read token | Production, Preview |
| `SANITY_WRITE_TOKEN` | Your write token | Production, Preview |
| `EDIT_TOKEN` | Your edit token | Production, Preview |
| `DELETE_TOKEN` | Your delete token | Production, Preview |

### Deploy Sanity Studio

```bash
npm run studio:deploy
```

This deploys the Studio to `your-project.sanity.studio`

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🔧 Technology Stack

- **Framework:** Next.js 14 (Pages Router)
- **Language:** TypeScript 5.3
- **CMS:** Sanity v3
- **Styling:** Tailwind CSS 3.4
- **Content Rendering:** Portable Text React
- **Image Optimization:** Next.js Image + Sanity Image URL Builder
- **Deployment:** Vercel

## 📚 Key Implementation Details

### GROQ Queries

All data fetching uses GROQ (Graph-Relational Object Queries):

```typescript
// Fetch all blog posts
*[_type == "blog"] | order(publishedAt desc) { ... }

// Fetch single post by slug
*[_type == "blog" && slug.current == $slug][0] { ... }
```

### Static Generation

- **Homepage:** `getStaticProps` with 60s revalidation
- **Blog Posts:** `getStaticPaths` + `getStaticProps` with `fallback: 'blocking'`
- Enables ISR (Incremental Static Regeneration)

### Type Safety

- All components use TypeScript interfaces
- `GetStaticProps` and `GetStaticPaths` properly typed
- `InferGetStaticPropsType` for automatic prop typing
- No `any` types (except in Portable Text components where necessary)

### API Routes Security

⚠️ **Important:** The current authentication mechanism using `EDIT_TOKEN` and `DELETE_TOKEN` is for demonstration purposes only.

**For production, implement:**
- NextAuth.js for authentication
- Session management
- Role-based access control (RBAC)
- API rate limiting
- CSRF protection

## 🐛 Troubleshooting

### "Sanity client not configured" error
- Ensure all `NEXT_PUBLIC_SANITY_*` variables are set
- Restart the dev server after changing `.env.local`

### Images not loading
- Check that `cdn.sanity.io` is in `next.config.js` `images.domains`
- Verify images are uploaded in Sanity Studio

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors with `npx tsc --noEmit`
- Ensure Node.js version is 18+ (`node --version`)

### Studio not loading
- Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Clear browser cache and reload
- Check browser console for errors



## 🙋‍♂️ Support

For issues or questions:
1. Check the troubleshooting section
2. Review Sanity documentation: https://www.sanity.io/docs
3. Review Next.js documentation: https://nextjs.org/docs

---

**Built with ❤️ using Next.js and Sanity CMS**
