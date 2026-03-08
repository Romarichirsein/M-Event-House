import { client } from './client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// Posts
export async function getAllPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id, title, titleEn, slug, mainImage, categories, publishedAt, excerpt, excerptEn
    }
  `, {}, { next: { revalidate: 60 } })
}

// Portfolio
export async function getAllPortfolio() {
  return client.fetch(`
    *[_type == "portfolio"] | order(date desc) {
      _id, title, titleEn, slug, featuredImage, images, eventType, date, location, description, descriptionEn, challenge, result, featured, tags
    }
  `, {}, { next: { revalidate: 60 } })
}

// Testimonials
export async function getFeaturedTestimonials() {
  return client.fetch(`
    *[_type == "testimonial" && featured == true] | order(date desc)[0..5] {
      _id, name, role, content, contentEn, rating, eventType, image
    }
  `, {}, { next: { revalidate: 60 } })
}

// Events
export async function getUpcomingEvents() {
  const now = new Date().toISOString()
  return client.fetch(`
    *[_type == "event" && date > $now] | order(date asc) {
      _id, title, titleEn, slug, date, endDate, location, price, capacity, mainImage
    }
  `, { now }, { next: { revalidate: 60 } })
}
