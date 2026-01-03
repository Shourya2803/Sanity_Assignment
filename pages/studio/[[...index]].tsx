// File: pages/studio/[[...index]].tsx

/**
 * Studio Route - Mounts Sanity Studio at /studio
 * This allows the Sanity Studio to run within the Next.js application
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
