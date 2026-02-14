/**
 * Retrieves the value for the current locale with fallback to English.
 * @param field The localized field object { en: string, ar: string }
 * @param locale The current locale ('en' or 'ar')
 * @returns The localized string or fallback
 */
export function getLocalizedValue(field: any, locale: string): string {
  if (!field) return ''
  return field[locale] || field.en || ''
}
