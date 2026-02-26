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

export async function submitPackageReservation(formData: FormData) {
  const customerName = formData.get('customerName') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const city = formData.get('city') as string
  const selectedPackage = formData.get('selectedPackage') as string
  const message = formData.get('message') as string

  if (!customerName || !email || !phone || !city || !selectedPackage) {
    return { success: false, error: 'Missing required fields' }
  }

  try {
    await writeClient.create({
      _type: 'packageReservation',
      customerName,
      email,
      phone,
      city,
      selectedPackage,
      message,
      isViewed: false,
      submittedAt: new Date().toISOString(),
    })

    return { success: true }
  } catch (error) {
    console.error('Package reservation error:', error)
    return { success: false, error: 'Failed to book package' }
  }
}
