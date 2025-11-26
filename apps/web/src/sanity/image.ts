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
  
  // If no dimensions specified, use auto sizing with max width
  if (!width && !height) {
    url = url.width(1200).fit('max')
  } else {
    if (width) url = url.width(width)
    if (height) url = url.height(height)
    url = url.fit('max')
  }
  
  // Add optimization parameters
  return url.format('webp').quality(85).url()
}