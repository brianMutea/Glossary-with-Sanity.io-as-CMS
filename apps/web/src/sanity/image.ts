import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export function getImageUrl(image: any, width?: number, height?: number) {
  if (!image?.asset?._id && !image?.asset?._ref) return null
  
  // Handle both _id and _ref formats
  const asset = image.asset._id ? image.asset : { _ref: image.asset._ref }
  let url = urlFor(asset)
  
  if (width) url = url.width(width)
  if (height) url = url.height(height)
  
  // Add optimization parameters
  return url.format('webp').quality(85).fit('max').url()
}