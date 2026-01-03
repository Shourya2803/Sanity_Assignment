# Project Structure Overview

```
nextjs-sanity-blog/
│
├── 📁 components/               # React components
│   ├── BlogCard.tsx            # Blog post card component for listings
│   ├── BlogContent.tsx         # Portable Text renderer for blog content
│   ├── Footer.tsx              # Global footer component
│   ├── Layout.tsx              # Main layout wrapper
│   └── Navbar.tsx              # Navigation bar component
│
├── 📁 lib/                      # Utility functions and configurations
│   ├── groqQueries.ts          # GROQ queries for Sanity data fetching
│   ├── sanity.client.ts        # Sanity client configuration
│   └── types.ts                # TypeScript type definitions
│
├── 📁 pages/                    # Next.js pages (Pages Router)
│   ├── 📁 api/                  # API routes
│   │   └── 📁 blogs/
│   │       ├── delete.ts       # API route for deleting blog posts
│   │       └── update.ts       # API route for updating blog posts
│   ├── 📁 blog/
│   │   └── [slug].tsx          # Dynamic blog detail page
│   ├── 📁 studio/
│   │   └── [[...index]].tsx    # Sanity Studio catch-all route
│   ├── _app.tsx                # Custom App component
│   ├── _document.tsx           # Custom Document for HTML structure
│   └── index.tsx               # Homepage (blog listing)
│
├── 📁 public/                   # Static assets
│   └── placeholder-image.svg   # Placeholder for missing blog images
│
├── 📁 sanity/                   # Sanity CMS configuration
│   └── 📁 schemas/
│       ├── blog.ts             # Blog post schema definition
│       └── index.ts            # Schema exports
│
├── 📁 styles/                   # Styling files
│   └── globals.css             # Global CSS with Tailwind directives
│
├── 📄 .env.example              # Environment variables template
├── 📄 .gitignore               # Git ignore rules
├── 📄 next.config.js           # Next.js configuration
├── 📄 package.json             # Dependencies and scripts
├── 📄 postcss.config.js        # PostCSS configuration for Tailwind
├── 📄 README.md                # Main documentation
├── 📄 sanity.config.ts         # Sanity Studio configuration
├── 📄 SETUP_GUIDE.md           # Detailed setup instructions
├── 📄 tailwind.config.ts       # Tailwind CSS configuration
├── 📄 tsconfig.json            # TypeScript configuration
└── 📄 vercel.json              # Vercel deployment configuration
```

## File Descriptions

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies and npm scripts |
| `tsconfig.json` | TypeScript compiler configuration |
| `next.config.js` | Next.js framework configuration |
| `tailwind.config.ts` | Tailwind CSS theme customization |
| `postcss.config.js` | PostCSS plugins configuration |
| `sanity.config.ts` | Sanity Studio configuration |
| `vercel.json` | Vercel deployment settings |
| `.env.example` | Environment variables template |

### Core Application Files

#### Pages (Routes)
- `pages/index.tsx` - Homepage with blog listing
- `pages/blog/[slug].tsx` - Individual blog post page
- `pages/_app.tsx` - Global app wrapper
- `pages/_document.tsx` - HTML document structure
- `pages/studio/[[...index]].tsx` - Sanity Studio integration

#### API Routes
- `pages/api/blogs/update.ts` - Update blog post endpoint
- `pages/api/blogs/delete.ts` - Delete blog post endpoint

#### Components
- `components/Layout.tsx` - Page layout with header/footer
- `components/Navbar.tsx` - Top navigation
- `components/Footer.tsx` - Site footer
- `components/BlogCard.tsx` - Blog post preview card
- `components/BlogContent.tsx` - Rich text content renderer

#### Library/Utilities
- `lib/types.ts` - TypeScript interfaces
- `lib/sanity.client.ts` - Sanity client setup
- `lib/groqQueries.ts` - Database queries

#### Sanity CMS
- `sanity/schemas/blog.ts` - Blog content schema
- `sanity/schemas/index.ts` - Schema registry

### Key Directories Explained

#### `/components`
Reusable React components using TypeScript. All components are properly typed and follow best practices.

#### `/lib`
Utility functions, type definitions, and configuration for external services (Sanity CMS).

#### `/pages`
Next.js Pages Router implementation. Each file becomes a route automatically.

#### `/pages/api`
Serverless API endpoints for server-side operations (edit/delete blog posts).

#### `/sanity`
Sanity CMS schema definitions and Studio configuration.

#### `/styles`
Global CSS including Tailwind directives and custom styles.

#### `/public`
Static assets served directly (images, icons, etc.).

## Import Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
// Instead of: import Layout from '../../components/Layout'
import Layout from '@/components/Layout'

// Available aliases:
@/components/*  → components/*
@/lib/*         → lib/*
@/styles/*      → styles/*
@/sanity/*      → sanity/*
```

## Data Flow

```
┌─────────────┐
│  Sanity CMS │ (Content Management)
└──────┬──────┘
       │ GROQ Queries
       ↓
┌─────────────┐
│ lib/sanity  │ (Client & Queries)
│ .client.ts  │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Pages     │ (Data Fetching)
│ getStatic   │
│ Props       │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│ Components  │ (Rendering)
│ BlogCard,   │
│ BlogContent │
└─────────────┘
```

## Build Output

After running `npm run build`:

```
.next/
├── server/        # Server-side code
├── static/        # Static assets
└── cache/         # Build cache
```

## Environment Variables Flow

```
.env.local
    ↓
next.config.js (exposes NEXT_PUBLIC_*)
    ↓
process.env.* (available in code)
```

---

**Use this structure as a reference when navigating the codebase.**
