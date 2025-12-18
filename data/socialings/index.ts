import type { SocialingConfig, SocialingCard } from './types'
import newYearParty from './new-year-party'

const registry: Record<string, SocialingConfig> = {
  [newYearParty.slug]: newYearParty,
}

export function getSocialingConfig(slug: string): SocialingConfig | null {
  return registry[slug] || null
}

// Helper: return a card for a given slug with sensible defaults if missing
export function getSocialingCard(slug: string): SocialingCard {
  const cfg = getSocialingConfig(slug)
  if (cfg && cfg.card) return cfg.card
  // Fallback placeholder (centralized default)
  return {
    title: '미정',
    desc: '미정',
    href: '/',
    img: '/images/main.jpeg',
    badge: '준비중',
    disabled: true,
  }
}

export function listSocialings(): SocialingConfig[] {
  return Object.values(registry)
}
