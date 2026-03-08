import Image from 'next/image'
import { urlFor } from '@/sanity/lib/queries'

interface SanityImageProps {
  image: any
  alt?: string
  priority?: boolean
  className?: string
  width?: number
  height?: number
}

export function SanityImage({ image, alt = '', priority = false, className = '', width, height }: SanityImageProps) {
  if (!image) return null

  return (
    <Image
      src={urlFor(image).url()}
      alt={alt}
      priority={priority}
      className={className}
      width={width || 1200}
      height={height || 800}
      placeholder="blur"
      blurDataURL={urlFor(image).width(20).quality(20).url()}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
