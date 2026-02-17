import { client } from './lib/client'
import { groq } from 'next-sanity'

export async function getSettings() {
  return client.fetch(
    groq`*[_type == "settings"][0]{
      siteTitle,
      logo,
      primaryColor,
      secondaryColor,
      accentColor,
      backgroundColor,
      warmBrown,
      overlayGradient,
      navigation,
      "heroBg": heroBackgroundImage.asset->url,
      "footerBg": footerBackgroundImage.asset->url,
      seoDescription,
      seoKeywords,
      "ogImage": ogImage.asset->url
    }`
  )
}

export async function getHero() {
  return client.fetch(
    groq`*[_type == "hero"][0]{
      headline,
      subheadline,
      buttonText,
      buttonLink,
      "bgImage": backgroundImage.asset->url
    }`
  )
}

export async function getProjects() {
  return client.fetch(
    groq`*[_type == "project"] | order(_createdAt desc){
      _id,
      title,
      "slug": slug.current,
      category,
      "coverImage": coverImage.asset->url,
      "gallery": galleryImages[].asset->url,
      description
    }`
  )
}

export async function getServices() {
  return client.fetch(
    groq`*[_type == "service"]{
      _id,
      title,
      description,
      icon
    }`
  )
}

export async function getAbout() {
  return client.fetch(
    groq`*[_type == "about"][0]{
      title,
      year,
      description,
      "image": image.asset->url
    }`
  )
}

export async function getFooter() {
  return client.fetch(
    groq`*[_type == "footer"][0]{
      quickLinks,
      servicesLinks,
      socialLinks,
      email,
      phone,
      location,
      copyrightText
    }`
  )
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      category,
      "slug": slug.current,
      "coverImage": coverImage.asset->url,
      "gallery": galleryImages[].asset->url,
      "videoUrl": videoFile.asset->url,
      description
    }`,
    { slug }
  )
}

export async function getProjectCategories() {
  const query = groq`*[_type == "project"].category`
  return client.fetch(query)
}

export async function getLegalData() {
  return client.fetch(groq`*[_type == "legal"][0]`)
}
