<template>
  <div class="w-full min-h-screen bg-gray-900">
    <main class="w-full bg-[#111] text-white font-['Noto_Sans_KR']">
      <template v-if="config">
        <SocialingRenderer :sections="config.sections" />
      </template>
      <div v-else class="px-6 py-24 text-center">
        <p class="text-sm text-white/60">존재하지 않는 소셜링입니다.</p>
        <NuxtLink to="/" class="mt-4 inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-sm font-semibold hover:bg-white/90">
          홈으로 돌아가기
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#imports'
import { getSocialingConfig } from '~/data/socialings'
import SocialingRenderer from '~/components/socialings/SocialingRenderer.vue'

// Use the shared site layout (header, footer, share modal, etc.)
definePageMeta({ layout: 'site' })

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
const config = computed(() => getSocialingConfig(slug.value))
</script>
