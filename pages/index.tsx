// File: pages/index.tsx

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { client } from '@/lib/sanity.client'
import { allBlogsQuery } from '@/lib/groqQueries'
import { BlogPostSummary } from '@/lib/types'
import BlogCard from '@/components/BlogCard'

type HomePageProps = {
  posts: BlogPostSummary[]
}

/**
 * Homepage - Blog Listing
 * Fetches all blog posts using getStaticProps and GROQ query
 */
export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>DevBlog - Latest Articles & Tutorials</title>
        <meta 
          name="description" 
          content="Explore our latest blog posts, tutorials, and articles on web development, programming, and technology." 
        />
        <meta property="og:title" content="DevBlog - Latest Articles & Tutorials" />
        <meta 
          property="og:description" 
          content="Explore our latest blog posts, tutorials, and articles on web development." 
        />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Welcome to DevBlog
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Discover insightful articles, tutorials, and stories from the world of 
              software development and technology
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Posts</h2>
            <p className="text-gray-600 text-lg">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-600 mb-6">
                Check back soon for new content, or create your first post in the Studio!
              </p>
              <a
                href="/studio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Open Sanity Studio
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

/**
 * getStaticProps - Fetches blog posts at build time
 * Uses GROQ query to fetch all published blog posts from Sanity
 * Typed with GetStaticProps for type safety
 */
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    // Fetch all blog posts using GROQ query
    const posts = await client.fetch<BlogPostSummary[]>(allBlogsQuery)

    return {
      props: {
        posts: posts || [],
      },
      // Revalidate every 60 seconds (ISR - Incremental Static Regeneration)
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return {
      props: {
        posts: [],
      },
      revalidate: 60,
    }
  }
}
