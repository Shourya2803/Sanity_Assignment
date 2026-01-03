// Global type declarations

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '@portabletext/react' {
  import { ReactNode } from 'react'
  
  export type PortableTextBlock = any
  
  export interface PortableTextComponents {
    block?: Record<string, any>
    marks?: Record<string, any>
    types?: Record<string, any>
    list?: Record<string, any>
    listItem?: Record<string, any>
  }
  
  export interface PortableTextProps {
    value: any
    components?: PortableTextComponents
  }
  
  export function PortableText(props: PortableTextProps): JSX.Element
}

declare module '@sanity/image-url' {
  export interface ImageUrlBuilder {
    width(width: number): ImageUrlBuilder
    height(height: number): ImageUrlBuilder
    url(): string
    image(source: any): ImageUrlBuilder
  }
  
  export default function imageUrlBuilder(client: any): ImageUrlBuilder
}

// Type declarations for indirect dependencies
declare module 'hast' {
  export type Node = any
  export type Element = any
  export type Parent = any
  export type Root = any
}

declare module 'unist' {
  export type Node = any
  export type Parent = any
  export type Literal = any
}

declare module 'follow-redirects' {
  export const http: any
  export const https: any
}

declare module 'tar-stream' {
  export function pack(): any
  export function extract(): any
}

declare module 'use-sync-external-store' {
  export function useSyncExternalStore<T>(
    subscribe: (callback: () => void) => () => void,
    getSnapshot: () => T,
    getServerSnapshot?: () => T
  ): T
}

declare module 'which' {
  export function sync(cmd: string, options?: any): string
  export default function which(cmd: string, options?: any): Promise<string>
}
