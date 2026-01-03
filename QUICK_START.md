# Quick Start Commands

## Installation
```bash
npm install
```

## Development
```bash
# Start Next.js dev server
npm run dev

# Start Sanity Studio (in another terminal)
npm run studio
```

## Building
```bash
# Build for production
npm run build

# Start production server
npm start
```

## Sanity Studio
```bash
# Deploy Studio to Sanity's hosting
npm run studio:deploy
```

## Linting
```bash
npm run lint
```

## URLs
- **Frontend:** http://localhost:3000
- **Studio:** http://localhost:3000/studio
- **API:** http://localhost:3000/api/*

## First Time Setup Checklist
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env.local`
- [ ] Add Sanity credentials to `.env.local`
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000/studio
- [ ] Create first blog post
- [ ] View at http://localhost:3000

## Deployment to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Common Tasks

### Create a new blog post
1. Go to `/studio`
2. Click "Blog Post" → "Create"
3. Fill in fields and click "Publish"

### Edit a blog post
1. Open blog post page
2. Click "Edit" button
3. Make changes in Studio
4. Click "Publish"

### Delete a blog post
1. Open blog post page
2. Click "Delete" button
3. Confirm and enter DELETE_TOKEN

## Troubleshooting

### Clear cache and restart
```bash
# Delete .next folder and restart
rm -rf .next
npm run dev
```

### Reset Sanity Studio
```bash
# Clear browser cache for localhost:3000/studio
# Or use incognito mode
```

### Check environment variables
```bash
# Verify all required vars are set
cat .env.local
```

## File Structure Quick Reference
```
components/     → React components
lib/            → Utilities & types
pages/          → Next.js routes
  api/          → API endpoints
  blog/         → Blog pages
  studio/       → Sanity Studio
sanity/         → CMS schemas
styles/         → CSS files
public/         → Static assets
```

## Key Files to Edit

### Customize Design
- `tailwind.config.ts` - Colors, fonts, theme
- `styles/globals.css` - Custom CSS
- `components/*.tsx` - Component styles

### Modify Content Schema
- `sanity/schemas/blog.ts` - Blog fields
- `lib/types.ts` - TypeScript types
- `lib/groqQueries.ts` - Data queries

### Add Features
- `pages/index.tsx` - Homepage
- `pages/blog/[slug].tsx` - Blog detail
- `pages/api/blogs/*.ts` - API routes

## npm Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run studio` | Start Sanity Studio |
| `npm run studio:deploy` | Deploy Studio |

## Environment Variables

Required in `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
SANITY_WRITE_TOKEN=
EDIT_TOKEN=
DELETE_TOKEN=
```

Optional:
```env
SANITY_READ_TOKEN=  # Only if dataset is private
```

---

**For detailed setup instructions, see SETUP_GUIDE.md**
