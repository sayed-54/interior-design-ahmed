export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-14'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '18tkar20',
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export const token = process.env.SANITY_API_WRITE_TOKEN

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
