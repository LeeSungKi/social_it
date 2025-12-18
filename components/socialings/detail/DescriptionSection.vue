<script setup lang="ts">
function withBase(path: string) {
  const cfg = (useRuntimeConfig?.() as any) || {}
  const base = cfg?.app?.baseURL ? String(cfg.app.baseURL) : '/'
  return `${base.replace(/\/$/, '')}${path}`
}

const props = defineProps<{
  html?: string
  images?: string[]
}>()

const defaultImages = [
  withBase('/images/main.jpeg')
]
</script>

<template>
  <section class="py-8">
    <div class="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-4 md:mb-6">파티 소개</h2>

      <div class="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed space-y-5 font-bold text-center">
        <!-- Prefer config-provided HTML -->
        <div v-if="props.html" class="space-y-5" v-html="props.html"></div>
        <template v-else>
          <p>내용이 없습니다.</p>
        </template>

        <div class="space-y-4">
          <img
            v-for="(img, i) in (props.images && props.images.length ? props.images.map(withBase) : defaultImages)"
            :key="String(img) + i"
            :src="img"
            :alt="'파티 이미지 ' + (i+1)"
            class="w-full rounded-2xl border border-white/10"
          />
        </div>

      </div>
    </div>
  </section>
</template>
