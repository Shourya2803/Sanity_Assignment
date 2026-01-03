// File: lib/sanity.client.ts

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from './types'

/**
 * Sanity client configuration
 * Uses environment variables for security
 */

// Public read-only client for fetching data on both server and client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for faster response
  token: process.env.SANITY_READ_TOKEN, // Optional: only needed if dataset is private
})

/**
 * Server-side only client with write permissions
 * NEVER expose this to the client side
 */
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Disable CDN for write operations
  token: process.env.SANITY_WRITE_TOKEN, // Write token from environment variables
})

/**
 * Image URL builder for generating optimized image URLs from Sanity
 */
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}


