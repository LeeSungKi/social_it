export type SocialingSectionKey =
  // New detail set (preferred)
  | 'hero'
  | 'summary'
  | 'description'
  | 'info'
  | 'cta'
  // Legacy keys (kept for backward compatibility while we migrate data)
  | 'howItWorks'
  | 'timeline'
  | 'target'
  | 'scheduleLocation'
  | 'recommend'
  | 'eventPoint'
  | 'brand'
  | 'review'

export interface SocialingSection {
  key: SocialingSectionKey
  // optional props for section component (kept generic for MVP stage)
  props?: Record<string, any>
}

export interface SocialingCard {
  title: string
  desc: string
  href: string
  slides?: string[]
  img?: string
  badge?: string
  disabled?: boolean
}

export interface SocialingConfig {
  slug: string
  title: string
  sections: SocialingSection[]
  // Summary card data for index page
  card?: SocialingCard
}
