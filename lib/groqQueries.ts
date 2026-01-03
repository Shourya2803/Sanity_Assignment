// File: lib/groqQueries.ts

/**
 * GROQ Queries for fetching blog data from Sanity
 * GROQ is Sanity's query language, similar to GraphQL but more flexible
 */

/**
 * Query to fetch all blog posts for the homepage
 * - Filters by _type == 'blog'
 * - Orders by publishedAt in descending order (newest first)
 * - Selects only the fields needed for listing
 */
export const allBlogsQuery = `
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    publishedAt
  }
`

/**
 * Query to fetch a single blog post by slug
 * - Filters by _type == 'blog' and slug.current matching the parameter
 * - Returns all fields needed for the detail page
 * - [0] ensures we get a single document, not an array
 */
export const blogBySlugQuery = `
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    content,
    publishedAt,
    createdAt
  }
`

/**
 * Query to get all slugs for static path generation
 * - Returns only slug.current for each blog post
 * - Used in getStaticPaths()
 */
export const allBlogSlugsQuery = `
  *[_type == "blog"] {
    "slug": slug.current
  }
`

/**
 * Query to get a blog post ID by slug (useful for mutations)
 */
export const blogIdBySlugQuery = `
  *[_type == "blog" && slug.current == $slug][0] {
    _id
  }
`
