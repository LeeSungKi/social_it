<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

function withBase(path: string) {
  const cfg = (useRuntimeConfig?.() as any) || {}
  const base = cfg?.app?.baseURL ? String(cfg.app.baseURL) : '/'
  return `${base.replace(/\/$/, '')}${path}`
}

const props = defineProps<{
  slides?: string[]
  title?: string
  subtitle?: string
}>()

// Cross-fade slideshow (prefer props)
const slidesRaw = computed(() => props.slides && props.slides.length ? props.slides : [
  '/images/main.jpeg'
])
const slides = computed(() => slidesRaw.value.map((p) => withBase(p)))

const index = ref(0)
let timer: any = null

function next() {
  index.value = (index.value + 1) % slides.value.length
  restart()
}
function prev() {
  index.value = (index.value - 1 + slides.value.length) % slides.value.length
  restart()
}
function goTo(i: number) {
  index.value = (i + slides.value.length) % slides.value.length
  restart()
}
function start() {
  stop()
  timer = setInterval(() => { index.value = (index.value + 1) % slides.value.length }, 3500)
}
function stop() {
  if (timer) { clearInterval(timer); timer = null }
}
function restart() { start() }

// Touch swipe
const SWIPE_THRESHOLD = 40
const touchStartX = ref(0)
function handleTouchStart(e: TouchEvent) {
  touchStartX.value = e.changedTouches[0]?.clientX ?? 0
}
function handleTouchEnd(e: TouchEvent) {
  const x = e.changedTouches[0]?.clientX ?? 0
  const dx = x - touchStartX.value
  if (Math.abs(dx) > SWIPE_THRESHOLD) {
    if (dx < 0) next()
    else prev()
  }
}

onMounted(() => { start() })
onBeforeUnmount(() => { stop() })
</script>

<template>
  <section
    class="relative w-full h-[260px] sm:h-[420px] md:h-[520px] lg:h-[600px] overflow-hidden select-none"
    @mouseenter="stop"
    @mouseleave="start"
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
  >
    <!-- Cross-fade layers -->
    <div
      v-for="(src, i) in slides"
      :key="String(src) + i"
      class="absolute inset-0 transition-opacity duration-700 pointer-events-none"
      :class="i === index ? 'opacity-100' : 'opacity-0'"
    >
      <img :src="src" alt="대표 이미지" class="absolute inset-0 w-full h-full object-cover object-center"
           :style="i === index ? 'transform: scale(1.03); transition: transform 3500ms linear;' : 'transform: scale(1); transition: transform 450ms ease-out;'" />
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20 pointer-events-none" />

    <!-- Controls -->
    <button
      type="button"
      class="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border border-white/20 z-20 pointer-events-auto"
      @click.stop.prevent="prev"
      aria-label="이전 이미지"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    </button>
    <button
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border border-white/20 z-20 pointer-events-auto"
      @click.stop.prevent="next"
      aria-label="다음 이미지"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
    </button>

    <!-- Dots -->
    <div class="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 z-20 pointer-events-auto">
      <button
        v-for="(src, i) in slides"
        :key="String(src) + '-dot-' + i"
        type="button"
        class="h-1.5 rounded-full transition-all"
        :class="i === index ? 'w-6 bg-white' : 'w-3 bg-white/50 hover:bg-white/70'"
        @click.stop.prevent="goTo(i)"
        :aria-label="'슬라이드 ' + (i+1) + ' 보기'"
      />
    </div>

    <!-- Title overlay -->
    <div class="relative z-10 h-full flex items-end">
      <div class="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif leading-tight">
          {{ props.title || '굿바이 2025 , 웰컴 2026 [인연 파티]' }}
        </h1>
        <p class="mt-2 text-sm sm:text-base md:text-lg text-white/85">{{ props.subtitle || '감각적인 공간에서 시작되는 새로운 만남' }}</p>
      </div>
    </div>
  </section>
</template>
