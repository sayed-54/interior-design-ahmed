'use server'

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '@/sanity/env'

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { success: false, error: 'Missing required fields' }
  }

  try {
    await writeClient.create({
      _type: 'contactMessage',
      title: name,
      email,
      phone,
      message,
      isRead: false,
      submittedAt: new Date().toISOString(),
    })

    return { success: true }
  } catch (error) {
    console.error('Submission error:', error)
    return { success: false, error: 'Failed to submit' }
  }
}

export async function submitReservation(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string

  if (!name || !email || !phone || !description) {
    return { success: false, error: 'Missing required fields' }
  }

  try {
    await writeClient.create({
      _type: 'reservation',
      title: name,
      email,
      phone,
      category,
      description,
      isRead: false,
      submittedAt: new Date().toISOString(),
    })

    return { success: true }
  } catch (error) {
    console.error('Reservation error:', error)
    return { success: false, error: 'Failed to book' }
  }
}
