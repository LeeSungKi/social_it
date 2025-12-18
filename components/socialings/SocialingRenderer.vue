<script setup lang="ts">
import { computed } from 'vue'
import type { SocialingSection } from '~/data/socialings/types'

// New unified detail sections (MUNTO-style structure)
import HeroSection from './detail/HeroSection.vue'
import DescriptionSection from './detail/DescriptionSection.vue'
import InfoSection from './detail/InfoSection.vue'
import CtaSection from './detail/CtaSection.vue'

const props = defineProps<{ sections: SocialingSection[] }>()

// Map from section key to component
const sectionMap = {
  hero: HeroSection,
  description: DescriptionSection,
  info: InfoSection,
  cta: CtaSection,
} as const

type SectionKey = keyof typeof sectionMap

const normalized = computed(() =>
  props.sections.map((s, idx) => ({
    key: s.key as SectionKey,
    // Reveal animation behavior based on position and type
    // First section usually hero: use reveal.down, others: reveal.up with stagger
    reveal: idx === 0 ? 'down' : 'up',
    delay: idx === 0 ? 0 : Math.min(100 + (idx - 1) * 50, 250),
    props: s.props || {},
  }))
)
</script>

<template>
  <div>
    <component
      v-for="(s, i) in normalized"
      :is="sectionMap[s.key]"
      :key="i + '-' + s.key"
      v-bind="s.props"
      v-reveal="s.reveal === 'down' ? { direction: 'down', once: true } : undefined"
      v-reveal.up="s.reveal === 'up' ? { delay: s.delay, once: true } : undefined"
    />
  </div>
</template>
