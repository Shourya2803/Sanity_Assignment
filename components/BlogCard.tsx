// File: components/BlogCard.tsx

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPostSummary } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'

interface BlogCardProps {
  post: BlogPostSummary
}

/**
 * Blog card component for displaying blog post summaries
 * Used on the homepage listing
 */
const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const imageUrl = post.mainImage?.asset ? urlFor(post.mainImage).width(600).height(400).url() : null
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={`/blog/${post.slug.current}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 w-full bg-gray-200">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600">
              <span className="text-white text-4xl font-bold">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          {/* Date and Author */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <time dateTime={post.publishedAt}>{formattedDate}</time>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>

          {/* Read More Link */}
          <div className="mt-4">
            <span className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center">
              Read More
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
