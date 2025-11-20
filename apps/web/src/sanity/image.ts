import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export function getImageUrl(image: any, width?: number, height?: number) {
  if (!image?.asset?._id) return null
  
  let url = urlFor(image.asset)
  
  if (width) url = url.width(width)
  if (height) url = url.height(height)
  
  // Add optimization parameters
  return url.format('webp').quality(85).url()
}