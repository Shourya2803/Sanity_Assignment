// File: pages/blog/[slug].tsx

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { client, urlFor } from '@/lib/sanity.client'
import { blogBySlugQuery, allBlogSlugsQuery } from '@/lib/groqQueries'
import { BlogPost } from '@/lib/types'
import BlogContent from '@/components/BlogContent'
import { useState } from 'react'

type BlogPageProps = {
  post: BlogPost
}

/**
 * Blog Detail Page - Dynamic Route
 * Displays full blog post content with edit/delete functionality
 */
export default function BlogDetailPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteToken, setDeleteToken] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  
  // Format the published date
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const imageUrl = post.mainImage?.asset ? urlFor(post.mainImage).width(1200).height(630).url() : undefined

  const showNotification = (message: string, type: 'success' | 'error') => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
  }

  /**
   * Handle blog deletion with modal UI
   */
  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteToken.trim()) {
      showNotification('Please enter the delete token', 'error')
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch('/api/blogs/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: post.slug.current,
          adminToken: deleteToken,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        showNotification('Blog post deleted successfully!', 'success')
        setTimeout(() => router.push('/'), 2000)
      } else {
        showNotification(data.error || 'Failed to delete blog post', 'error')
        setIsDeleting(false)
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      showNotification('An error occurred while deleting the blog post', 'error')
      setIsDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setDeleteToken('')
  }

  /**
   * Handle blog editing
   * Redirects to Sanity Studio with the document ID
   */
  const handleEdit = () => {
    // Redirect to Sanity Studio for editing
    // Studio is mounted at /studio route
    const studioUrl = `/studio/desk/blog;${post._id}`
    window.open(studioUrl, '_blank')
  }

  return (
    <>
      <Head>
        <title>{post.title} | DevBlog</title>
        <meta name="description" content={post.excerpt} />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        {post.mainImage && <meta property="og:image" content={imageUrl} />}
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.mainImage && <meta name="twitter:image" content={imageUrl} />}
      </Head>

      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Admin Actions */}
          <div className="flex justify-end space-x-4 mb-6">
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span>Edit</span>
            </button>
            <button
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
            </button>
          </div>

          {/* Delete Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Delete Blog Post
                  </h3>
                  <button
                    onClick={handleDeleteCancel}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete <strong>"{post.title}"</strong>? This action cannot be undone.
                </p>

                <div className="mb-6">
                  <label htmlFor="deleteToken" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Admin Token
                  </label>
                  <input
                    type="password"
                    id="deleteToken"
                    value={deleteToken}
                    onChange={(e) => setDeleteToken(e.target.value)}
                    placeholder="Enter your delete token"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    disabled={isDeleting}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Find your token in .env.local (DELETE_TOKEN)
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleDeleteCancel}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
                  >
                    {isDeleting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Toast Notification */}
          {showToast && (
            <div className="fixed top-4 right-4 z-50 animate-fade-in">
              <div className={`rounded-lg shadow-lg p-4 flex items-center space-x-3 ${
                toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white`}>
                {toastType === 'success' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className="font-medium">{toastMessage}</span>
              </div>
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex items-center text-gray-600 space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{post.author}</span>
              </div>
              <span>•</span>
              <time dateTime={post.publishedAt}>{formattedDate}</time>
            </div>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative w-full h-96 md:h-[500px] mb-12 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={imageUrl}
                alt={post.mainImage?.alt || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          )}

          {/* Article Content - Portable Text */}
          <div className="prose prose-lg max-w-none">
            <BlogContent content={post.content} />
          </div>

          {/* Back to Home Link */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <a
              href="/"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to all posts
            </a>
          </div>
        </div>
      </article>
    </>
  )
}

/**
 * getStaticPaths - Generates paths for all blog posts at build time
 * Uses GROQ query to fetch all slugs from Sanity
 */
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Fetch all blog slugs using GROQ query
    const slugs = await client.fetch<{ slug: string }[]>(allBlogSlugsQuery)

    const paths = slugs.map((item) => ({
      params: { slug: item.slug },
    }))

    return {
      paths,
      // fallback: 'blocking' enables ISR for new posts without rebuilding
      // New posts will be generated on-demand and cached
      fallback: 'blocking',
    }
  } catch (error) {
    console.error('Error fetching blog slugs:', error)
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

/**
 * getStaticProps - Fetches a single blog post by slug
 * Receives slug from params and queries Sanity using GROQ
 */
export const getStaticProps: GetStaticProps<BlogPageProps> = async ({ params }) => {
  const slug = params?.slug as string

  if (!slug) {
    return {
      notFound: true,
    }
  }

  try {
    // Fetch blog post by slug using GROQ query
    const post = await client.fetch<BlogPost>(blogBySlugQuery, { slug })

    if (!post) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        post,
      },
      // Revalidate every 60 seconds (ISR)
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return {
      notFound: true,
    }
  }
}
