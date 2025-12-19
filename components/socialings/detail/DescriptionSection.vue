<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch, computed } from 'vue'

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

// Expand/collapse state (initially collapsed)
const expanded = ref(false)
const contentId = 'desc-content'

// Dynamic height measurement to avoid clipping when expanded
const contentEl = ref<HTMLElement | null>(null)
const collapsedHeight = '760px'
const measuredHeight = ref(0)
const maxHeightPx = computed(() => (expanded.value ? `${measuredHeight.value}px` : collapsedHeight))
let ro: ResizeObserver | null = null

function measure() {
  const el = contentEl.value
  if (!el) return
  try {
    // scrollHeight provides full content height regardless of current max-height
    measuredHeight.value = el.scrollHeight
  } catch {}
}

function onImgLoad() {
  // Recalculate after images load
  nextTick(() => measure())
}

onMounted(() => {
  nextTick(() => {
    measure()
    if (contentEl.value && 'ResizeObserver' in window) {
      ro = new ResizeObserver(() => {
        // Only matters when expanded, but measuring is cheap
        measure()
      })
      ro.observe(contentEl.value)
    }
    try { contentEl.value?.addEventListener('load', onImgLoad, true) } catch {}
  })
})

onBeforeUnmount(() => {
  if (contentEl.value) {
    try { contentEl.value.removeEventListener('load', onImgLoad, true) } catch {}
  }
  if (ro && contentEl.value) {
    try { ro.unobserve(contentEl.value) } catch {}
    try { ro.disconnect() } catch {}
  }
  ro = null
})

// Also re-measure when data changes or when expanding
watch(() => [props.html, props.images, expanded.value], () => nextTick(() => measure()))
</script>

<template>
  <section class="py-8">
    <div class="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-4 md:mb-6">파티 소개</h2>

      <div class="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-bold text-center">
        <!-- Collapsible wrapper: html + images inside -->
        <div
          :id="contentId"
          ref="contentEl"
          class="space-y-5 overflow-hidden transition-[max-height] duration-500 ease-in-out"
          :style="{ maxHeight: maxHeightPx }"
        >
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
              @load="onImgLoad"
            />
          </div>
        </div>

        <!-- Toggle button -->
        <button
          type="button"
          class="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-900 px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg font-extrabold shadow-lg hover:shadow-xl hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
          @click="expanded = !expanded"
          :aria-expanded="expanded ? 'true' : 'false'"
          :aria-controls="contentId"
        >
          <span>{{ expanded ? '접기' : '더보기' }}</span>
          <svg v-if="!expanded" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 14a1 1 0 0 1-.707-.293l-5-5a1 1 0 1 1 1.414-1.414L10 11.586l4.293-4.293a1 1 0 1 1 1.414 1.414l-5 5A1 1 0 0 1 10 14z" clip-rule="evenodd"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 6a1 1 0 0 1 .707.293l5 5a1 1 0 1 1-1.414 1.414L10 8.414 5.707 12.707a1 1 0 0 1-1.414-1.414l5-5A1 1 0 0 1 10 6z" clip-rule="evenodd"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>
