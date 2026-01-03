// File: pages/api/blogs/delete.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { writeClient } from '@/lib/sanity.client'
import { blogIdBySlugQuery } from '@/lib/groqQueries'

type DeleteRequestBody = {
  slug: string
  adminToken: string
}

type SuccessResponse = {
  message: string
  deletedId: string
}

type ErrorResponse = {
  error: string
}

/**
 * API Route: Delete Blog Post
 * 
 * Security: This route validates an admin token from environment variables
 * WARNING: This is a simplified auth mechanism for demonstration purposes only.
 * In a production environment, use proper authentication such as:
 * - NextAuth.js with session management
 * - Auth0, Clerk, or similar auth providers
 * - JWT tokens with proper validation
 * - Role-based access control (RBAC)
 * 
 * Usage:
 * DELETE /api/blogs/delete
 * Body: { slug, adminToken }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  // Only allow DELETE requests
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { slug, adminToken } = req.body as DeleteRequestBody

    // Validate required fields
    if (!slug) {
      return res.status(400).json({ error: 'Slug is required' })
    }

    if (!adminToken) {
      return res.status(401).json({ error: 'Admin token is required' })
    }

    // Validate admin token against environment variable
    // IMPORTANT: DELETE_TOKEN must be set in environment variables
    const validToken = process.env.DELETE_TOKEN

    if (!validToken) {
      console.error('DELETE_TOKEN not configured in environment variables')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    if (adminToken !== validToken) {
      return res.status(403).json({ error: 'Invalid admin token' })
    }

    // First, get the document ID from the slug
    const blogData = await writeClient.fetch(blogIdBySlugQuery, { slug })

    if (!blogData || !blogData._id) {
      return res.status(404).json({ error: 'Blog post not found' })
    }

    // Delete the blog post
    await writeClient.delete(blogData._id)

    return res.status(200).json({
      message: 'Blog post deleted successfully',
      deletedId: blogData._id,
    })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return res.status(500).json({ 
      error: 'Failed to delete blog post',
    })
  }
}
