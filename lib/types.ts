// File: lib/types.ts

/**
 * Portable Text Block type definition
 * Represents rich text content from Sanity
 */
export type PortableTextBlock = any

/**
 * Main Blog Post interface representing the structure of a blog document from Sanity
 */
export interface BlogPost {
  _id: string
  _type: 'blog'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  author: string
  excerpt: string
  mainImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  content: PortableTextBlock[]
  publishedAt: string
  createdAt: string
}

/**
 * Simplified Blog Post for listing pages (homepage)
 */
export interface BlogPostSummary {
  _id: string
  title: string
  slug: {
    current: string
  }
  author: string
  excerpt: string
  mainImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  publishedAt: string
}

/**
 * Image URL builder helper type
 */
export interface SanityImageSource {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}
