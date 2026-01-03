// File: pages/api/blogs/update.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { writeClient } from '@/lib/sanity.client'
import { blogIdBySlugQuery } from '@/lib/groqQueries'

type UpdateRequestBody = {
  slug: string
  title?: string
  content?: any
  excerpt?: string
  adminToken: string
}

type SuccessResponse = {
  message: string
  post: any
}

type ErrorResponse = {
  error: string
}

/**
 * API Route: Update Blog Post
 * 
 * Security: This route validates an admin token from environment variables
 * WARNING: This is a simplified auth mechanism for demonstration purposes only.
 * In a production environment, use proper authentication such as:
 * - NextAuth.js with session management
 * - Auth0, Clerk, or similar auth providers
 * - JWT tokens with proper validation
 * - API keys with rate limiting
 * 
 * Usage:
 * POST /api/blogs/update
 * Body: { slug, title?, content?, excerpt?, adminToken }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { slug, title, content, excerpt, adminToken } = req.body as UpdateRequestBody

    // Validate required fields
    if (!slug) {
      return res.status(400).json({ error: 'Slug is required' })
    }

    if (!adminToken) {
      return res.status(401).json({ error: 'Admin token is required' })
    }

    // Validate admin token against environment variable
    // IMPORTANT: EDIT_TOKEN must be set in environment variables
    const validToken = process.env.EDIT_TOKEN

    if (!validToken) {
      console.error('EDIT_TOKEN not configured in environment variables')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    if (adminToken !== validToken) {
      return res.status(403).json({ error: 'Invalid admin token' })
    }

    // At least one field to update must be provided
    if (!title && !content && !excerpt) {
      return res.status(400).json({ 
        error: 'At least one field to update (title, content, or excerpt) is required' 
      })
    }

    // First, get the document ID from the slug
    const blogData = await writeClient.fetch(blogIdBySlugQuery, { slug })

    if (!blogData || !blogData._id) {
      return res.status(404).json({ error: 'Blog post not found' })
    }

    // Prepare the update object (only include fields that are provided)
    const updateData: any = {}
    if (title) updateData.title = title
    if (content) updateData.content = content
    if (excerpt) updateData.excerpt = excerpt

    // Update the blog post using Sanity's patch API
    const updatedPost = await writeClient
      .patch(blogData._id)
      .set(updateData)
      .commit()

    return res.status(200).json({
      message: 'Blog post updated successfully',
      post: updatedPost,
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return res.status(500).json({ 
      error: 'Failed to update blog post',
    })
  }
}
