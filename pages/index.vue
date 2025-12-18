<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { getSocialingConfig, getSocialingCard } from '~/data/socialings'
import type { SocialingCard } from '~/data/socialings/types'

definePageMeta({ layout: 'site', headerOverlay: true })

/**
 * Home (Adaptive Landing)
 * - Header overlays Hero
 * - Header becomes solid after scroll
 * - Mobile menu is full-screen overlay (slide + blur)
 * - Meeting cards are image-first selection blocks
 */

// --- state
// entrance flag for hero (run once)
const heroEntered = ref(false)
// Timer for intro slideshow (declare early to avoid TDZ)
let introTimer: any = null




onMounted(() => {
  // Start intro slideshow (brand intro)
  startIntroTimer()
  // Trigger hero entrance once after mount
  setTimeout(() => { heroEntered.value = true }, 60)
  // Responsive threshold for meeting cards
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
  // Initialize card slideshows
  initCardSlides()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile)
  if (introTimer) clearInterval(introTimer)
  // Clear all card timers
  try {
    for (const t of cardTimers.values()) {
      if (t) clearInterval(t)
    }
    cardTimers.clear()
  } catch {}
})

// --- content (keep image paths flexible)
const brand = {
  name: 'SOCIAL IT',
  tagline: 'No.1 소셜링 파티',
}

// Responsive state for meeting cards threshold
const isMobile = ref(false)
function updateIsMobile() {
  if (typeof window === 'undefined') return
  isMobile.value = (window.innerWidth || 0) < 768 // Tailwind md breakpoint
}

const showAllMeetings = ref(false)
const meetingThreshold = computed(() => (isMobile.value ? 2 : 4))
const shouldShowMoreButton = computed(() => meetingCards.length > meetingThreshold.value)
function toggleShowAllMeetings() {
  showAllMeetings.value = !showAllMeetings.value
}

// 이미지 경로는 기존 자산에 맞춰 교체하세요.
const images = {
  hero: withBase('/images/bg.png'),
  fristParty: withBase('/images/newYearParty03.png'),
  defaultImage: withBase('/images/main.jpeg'),
  review1: withBase('/images/main.jpeg'),
  logo: withBase('/images/logo2.png'),
}

// BRAND INTRO 슬라이드 (001.png, 002.png, 003.png)
const introSlides = [withBase('/images/001.png'), withBase('/images/002.png'), withBase('/images/003.png')]
const introIndex = ref(0)

function nextIntro() {
  introIndex.value = (introIndex.value + 1) % introSlides.length
  restartIntroTimer()
}
function prevIntro() {
  introIndex.value = (introIndex.value - 1 + introSlides.length) % introSlides.length
  restartIntroTimer()
}
function goToIntro(i: number) {
  introIndex.value = (i + introSlides.length) % introSlides.length
  restartIntroTimer()
}
function startIntroTimer() {
  if (introTimer) clearInterval(introTimer)
  introTimer = setInterval(() => {
    introIndex.value = (introIndex.value + 1) % introSlides.length
  }, 3500)
}
function stopIntroTimer() {
  if (introTimer) {
    clearInterval(introTimer)
    introTimer = null
  }
}
function restartIntroTimer() {
  stopIntroTimer()
  startIntroTimer()
}

// Touch swipe support (brand intro)
const touchStartX = ref(0)
const touchEndX = ref(0)
const SWIPE_THRESHOLD = 40
function handleTouchStart(e: TouchEvent) {
  touchStartX.value = e.changedTouches[0]?.clientX ?? 0
}
function handleTouchEnd(e: TouchEvent) {
  touchEndX.value = e.changedTouches[0]?.clientX ?? 0
  const dx = touchEndX.value - touchStartX.value
  if (Math.abs(dx) > SWIPE_THRESHOLD) {
    if (dx < 0) nextIntro()
    else prevIntro()
  }
}

// --- Meeting card slideshows (per-card state) ---
const cardIndex = ref<Record<number, number>>({})
const cardTimers = new Map<number, any>()

function initCardSlides() {
  meetingCards.forEach((c: any, idx: number) => {
    if (c?.slides?.length > 1) {
      cardIndex.value[idx] = 0
      startCardTimer(idx, c.slides.length)
    }
  })
}
function startCardTimer(idx: number, len: number) {
  stopCardTimer(idx)
  const t = setInterval(() => {
    const cur = cardIndex.value[idx] ?? 0
    cardIndex.value[idx] = (cur + 1) % len
  }, 3500)
  cardTimers.set(idx, t)
}
function stopCardTimer(idx: number) {
  const t = cardTimers.get(idx)
  if (t) {
    clearInterval(t)
    cardTimers.delete(idx)
  }
}
function restartCardTimer(idx: number, len: number) {
  startCardTimer(idx, len)
}
function nextCard(idx: number) {
  const slides = (meetingCards[idx] as any)?.slides || []
  if (!slides.length) return
  const len = slides.length
  const cur = cardIndex.value[idx] ?? 0
  cardIndex.value[idx] = (cur + 1) % len
  restartCardTimer(idx, len)
}
function prevCard(idx: number) {
  const slides = (meetingCards[idx] as any)?.slides || []
  if (!slides.length) return
  const len = slides.length
  const cur = cardIndex.value[idx] ?? 0
  cardIndex.value[idx] = (cur - 1 + len) % len
  restartCardTimer(idx, len)
}
function goToCard(idx: number, i: number) {
  const slides = (meetingCards[idx] as any)?.slides || []
  if (!slides.length) return
  const len = slides.length
  cardIndex.value[idx] = (i + len) % len
  restartCardTimer(idx, len)
}
// Touch swipe for cards
const touchStartXCard = ref(0)
function handleCardTouchStart(idx: number, e: TouchEvent) {
  touchStartXCard.value = e.changedTouches[0]?.clientX ?? 0
}
function handleCardTouchEnd(idx: number, e: TouchEvent) {
  const x = e.changedTouches[0]?.clientX ?? 0
  const dx = x - touchStartXCard.value
  if (Math.abs(dx) > SWIPE_THRESHOLD) {
    if (dx < 0) nextCard(idx)
    else prevCard(idx)
  }
}

// Build first meeting card from shared data (new-year-party)
const nyCardRaw = getSocialingCard('new-year-party')
const firstCardFromData: SocialingCard = {
  title: nyCardRaw.title,
  desc: nyCardRaw.desc,
  href: withBase(nyCardRaw.href || '/socialings/new-year-party'),
  img: nyCardRaw.slides && nyCardRaw.slides[0] ? withBase(nyCardRaw.slides[0]) : (nyCardRaw.img ? withBase(nyCardRaw.img) : images.fristParty),
  slides: (nyCardRaw.slides || []).map((p: string) => withBase(p)),
  badge: nyCardRaw.badge || undefined,
  disabled: nyCardRaw.disabled || false,
}

const meetingCards: SocialingCard[] = [
  firstCardFromData,
  {
    title: 'Hof in love',
    desc: '신나고 자유로운 분위기의 자연스러운 만남',
    href: '#',
    img: images.defaultImage,
    disabled: true,
    badge: '준비중',
  },
  {
    title: 'Wine in love',
    desc: '은은한 조명과 음악이 있는 클래식한 소셜링',
    href: '#',
    img: images.defaultImage,
    disabled: true,
    badge: '준비중',
  },
  {
    title: 'Travel in love',
    desc: '특별한 하루 여행 컨셉 소셜링',
    href: '#',
    disabled: true,
    badge: '준비중',
    img: images.defaultImage,
  },
]

const reviews = [
  { title: '소셜링 후기', href: '#', img: images.review1 }
]

// Visible meeting cards with responsive threshold
const visibleMeetingCards = computed(() => {
  if (showAllMeetings.value) return meetingCards
  return meetingCards.slice(0, meetingThreshold.value)
})

// ---- Helper to prefix baseURL for GitHub Pages (/social_it/) ----
function withBase(path: string) {
  const cfg = (useRuntimeConfig?.() as any) || {}
  const base = cfg?.app?.baseURL ? String(cfg.app.baseURL) : '/'
  return `${base.replace(/\/$/, '')}${path}`
}
</script>

<template>
  <div class="w-full bg-black text-white font-sans">
    <!-- HERO + HEADER (overlay) -->
    <section class="relative w-full h-[82vh] min-h-[560px] overflow-hidden">
      <!-- Background Image -->
      <img
          :src="images.hero"
          alt="SOCIAL IT Hero"
          class="absolute inset-0 w-full h-full object-cover object-top hero-kenburns"
      />

      <!-- Overlay (dark + subtle gradient) -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70"></div>

      <!-- Decorative light streaks (like reference) -->
      <div class="pointer-events-none absolute -bottom-16 -left-1/2 h-[160px] w-[140%] -rotate-6 bg-white/10 blur-[80px]"></div>
      <div class="pointer-events-none absolute -bottom-24 -left-1/2 h-[160px] w-[140%] -rotate-6 bg-white/5 blur-[100px]"></div>


      <!-- HERO COPY -->
      <div class="relative z-10 h-full flex items-center">
        <div class="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-16 md:pt-20">
          <div class="text-center">
            <p
              class="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm sm:text-base text-white/90 border border-white/10 hero-item"
              :class="heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              :style="{ transitionDelay: '0ms' }"
            >
              <span class="h-2 w-2 rounded-full bg-white/80"></span>
              {{ brand.tagline }}
            </p>

            <h1
              class="mt-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter font-serif hero-item"
              :class="heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              :style="{ transitionDelay: '100ms' }"
            >
              {{ brand.name }}
            </h1>
            <p
              class="mt-6 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/95 font-medium hero-item"
              :class="heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              :style="{ transitionDelay: '200ms' }"
            >
              감각적인 공간에서 시작되는 새로운 만남.<br />
              부담 없이, 자연스럽게, 그리고 설레게.
            </p>

            <div class="mt-12 flex items-center justify-center gap-3 hero-item"
                 :class="heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
                 :style="{ transitionDelay: '300ms' }"
            >
              <a
                  href="#meetings"
                  class="inline-flex items-center justify-center rounded-full bg-white text-black px-7 py-3.5 text-base font-semibold hover:bg-white/50 transition"
              >
                파티 둘러보기
              </a>
              <a
                  href="#reviews"
                  class="inline-flex items-center justify-center rounded-full bg-black border border-white/15 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/50 transition"
              >
                후기 보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BRAND INTRO (2-column, image-first feel) -->
    <section class="py-16 sm:py-20 bg-black">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <div v-reveal.up>
          <h2 class="text-3xl sm:text-4xl font-bold leading-snug font-serif">
            하나의 공간, <br /> 하나의 주제,<br />
            새로운 만남.
          </h2>

          <p class="mt-6 text-white/80 leading-relaxed text-sm sm:text-base">
            <span class="font-semibold text-white">{{ brand.name }}</span>은 단순한 파티가 아닌,
            사람과 사람이 연결되는 <span class="text-white">세련된 소셜링(소개팅)</span>을 기획합니다.
            참가자는 심사 후 확정되며, 남녀 비율은 1:1로 정밀 조율합니다.
          </p>

          <div class="mt-8 grid grid-cols-2 gap-3 text-sm">
            <div class="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p class="text-white font-semibold">1:1 비율</p>
              <p class="mt-1 text-white/70">정밀 조율</p>
            </div>
            <div class="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p class="text-white font-semibold">맞춤 프로그램</p>
              <p class="mt-1 text-white/70">자연스러운 대화</p>
            </div>
            <div class="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p class="text-white font-semibold">무제한 리필</p>
              <p class="mt-1 text-white/70">주류/음료</p>
            </div>
            <div class="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p class="text-white font-semibold">전문 MC</p>
              <p class="mt-1 text-white/70">분위기 메이킹</p>
            </div>
          </div>
        </div>

        <div
            class="relative overflow-hidden rounded-3xl border border-white/10 h-[360px] sm:h-[420px] select-none"
            @touchstart.passive="handleTouchStart"
            @touchend.passive="handleTouchEnd"
            @mouseenter="stopIntroTimer"
            @mouseleave="startIntroTimer"
        >
          <!-- Cross-fade slideshow -->
          <div
              v-for="(src, i) in introSlides"
              :key="src"
              class="absolute inset-0 transition-opacity duration-700"
              :class="i === introIndex ? 'opacity-100' : 'opacity-0'"
          >
            <img :src="src" alt="Intro slide" class="w-full h-full object-cover"
                 :style="i === introIndex ? 'transform: scale(1.03); transition: transform 3500ms linear;' : 'transform: scale(1); transition: transform 450ms ease-out;'" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

          <!-- Controls -->
          <button
              type="button"
              class="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border border-white/20"
              @click="prevIntro"
              aria-label="이전 이미지"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border border-white/20"
              @click="nextIntro"
              aria-label="다음 이미지"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
          </button>

          <!-- Dots -->
          <div class="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
            <button
                v-for="(src, i) in introSlides"
                :key="src + '-dot'"
                type="button"
                class="h-1.5 rounded-full transition-all"
                :class="i === introIndex ? 'w-6 bg-white' : 'w-3 bg-white/50 hover:bg-white/70'"
                @click="goToIntro(i)"
                :aria-label="'슬라이드 ' + (i+1) + ' 보기'"
            />
          </div>

          <!-- Caption -->
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <p class="text-white font-semibold text-lg">분위기부터 다르게</p>
            <p class="mt-1 text-white/80 text-sm">공간 · 음악 · 콘텐츠까지 완벽한 구성</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MEETING SELECTOR (image blocks, adaptive) -->
    <section id="meetings" class="py-16 sm:py-20 bg-black">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-end justify-between gap-6">
          <div>
            <h3 class="text-2xl sm:text-3xl font-bold font-serif">소셜링 정보</h3>
            <p class="mt-2 text-white/70 text-sm sm:text-base">
              원하는 분위기의 파티를 선택해 보세요.
            </p>
          </div>
        </div>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
              v-for="(c, idx) in visibleMeetingCards"
              :key="idx"
              class="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30 select-none"
              :class="c.disabled ? 'pointer-events-none opacity-60 cursor-not-allowed' : ''"
              :aria-disabled="c.disabled ? 'true' : 'false'"
              aria-label="meeting card"
              v-reveal.up="{ delay: idx * 80 }"
              @mouseenter="c.slides?.length > 1 ? stopCardTimer(idx) : null"
              @mouseleave="c.slides?.length > 1 ? startCardTimer(idx, c.slides.length) : null"
              @touchstart.passive="c.slides?.length ? handleCardTouchStart(idx, $event) : null"
              @touchend.passive="c.slides?.length ? handleCardTouchEnd(idx, $event) : null"
          >
            <!-- slideshow or single image -->
            <template v-if="c.slides?.length">
              <div class="absolute inset-0">
                <div
                  v-for="(src, i) in c.slides"
                  :key="String(src) + i"
                  class="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                  :class="(cardIndex[idx] ?? 0) === i ? 'opacity-100' : 'opacity-0'"
                >
                  <img :src="src" :alt="c.title + ' 이미지'" class="w-full h-full object-cover"
                       :style="(cardIndex[idx] ?? 0) === i ? 'transform: scale(1.03); transition: transform 3500ms linear;' : 'transform: scale(1); transition: transform 450ms ease-out;'" />
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20 pointer-events-none"></div>

                <!-- Controls -->
                <button
                    type="button"
                    class="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border border-white/20 z-20 pointer-events-auto"
                    @click.stop.prevent="prevCard(idx)"
                    aria-label="이전 이미지"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                </button>
                <button
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border border-white/20 z-20 pointer-events-auto"
                    @click.stop.prevent="nextCard(idx)"
                    aria-label="다음 이미지"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
                </button>

                <!-- Dots -->
                <div class="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 z-20 pointer-events-auto">
                  <button
                      v-for="(src, i) in c.slides"
                      :key="String(src) + '-dot-' + i"
                      type="button"
                      class="h-1.5 rounded-full transition-all"
                      :class="(cardIndex[idx] ?? 0) === i ? 'w-6 bg-white' : 'w-3 bg-white/50 hover:bg-white/70'"
                      @click.stop.prevent="goToCard(idx, i)"
                      :aria-label="'슬라이드 ' + (i+1) + ' 보기'"
                  />
                </div>
              </div>
            </template>
            <template v-else>
              <img
                  :src="c.img"
                  :alt="c.title"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20"></div>
            </template>

            <!-- subtle hover darken overlay (do not block clicks) -->
            <div class="absolute inset-0 bg-black/0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
            <!-- clickable overlay link (behind controls/content) -->
            <NuxtLink
              v-if="!c.disabled && c.href"
              :to="c.href"
              class="absolute inset-0 z-[15]"
              tabindex="-1"
              aria-label="카드 열기"
            />
            <!-- disabled overlay to prevent mistaken selection -->
            <div v-if="c.disabled" class="absolute inset-0 bg-black/60"></div>

            <!-- badge -->
            <div v-if="c.badge" class="absolute top-5 left-5 z-10">
              <span class="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs text-white">
                {{ c.badge }}
              </span>
            </div>

            <!-- content -->
            <div class="relative z-10 flex h-[280px] sm:h-[320px] flex-col justify-end p-6">
              <h4 class="text-2xl font-semibold tracking-tight transition-all duration-300 group-hover:tracking-wide">{{ c.title }}</h4>
              <p class="mt-2 text-white/80 text-sm">{{ c.desc }}</p>
            </div>
          </div>
        </div>

        <!-- More/Less button for meeting cards -->
        <div v-if="shouldShowMoreButton" class="mt-6 text-center">
          <button
              type="button"
              @click="toggleShowAllMeetings"
              class="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-5 py-2.5 text-sm font-semibold hover:bg-white/15 transition"
          >
            {{ showAllMeetings ? '접기' : '더보기' }}
          </button>
        </div>
      </div>
    </section>

    <!--TODO REVIEWS 소스생기면 진행-->
<!--    <section id="reviews" class="py-16 sm:py-20 bg-black">-->
<!--      <div class="max-w-6xl mx-auto px-4 sm:px-6">-->
<!--        <div class="flex items-end justify-between gap-6">-->
<!--          <div>-->
<!--            <h3 class="text-2xl sm:text-3xl font-bold font-serif">소셜링 후기</h3>-->
<!--            <p class="mt-2 text-white/70 text-sm sm:text-base">-->
<!--              생생한 후기로 먼저 분위기를 느껴보세요.-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">-->
<!--          <a-->
<!--              v-for="(r, idx) in reviews"-->
<!--              :key="idx"-->
<!--              :href="r.href"-->
<!--              class="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"-->
<!--          >-->
<!--            <div class="relative">-->
<!--              <img :src="r.img" alt="review" class="h-56 w-full object-cover" />-->
<!--              <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"></div>-->
<!--            </div>-->
<!--            <div class="p-5">-->
<!--              <p class="text-sm text-white/90 group-hover:text-white transition line-clamp-2">{{ r.title }}</p>-->
<!--            </div>-->
<!--          </a>-->
<!--        </div>-->

<!--        <div class="mt-8 text-center sm:hidden">-->
<!--          <a href="#" class="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-5 py-2.5 text-sm font-semibold hover:bg-white/15 transition">-->
<!--            자세히보기-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->



  </div>
</template>

<style scoped>
/***** Premium subtle animations *****/
/* Header smooth transitions */
.header-smooth { transition: background-color 200ms ease, backdrop-filter 200ms ease, box-shadow 200ms ease; }

/* Hero Ken Burns background */
@keyframes kenburns {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}
.hero-kenburns { animation: kenburns 16s linear forwards; }

/* Hero staggered items */
.hero-item { transition: opacity 700ms ease-out, transform 700ms ease-out; will-change: transform, opacity; }

/* Zoom-fade for modals */
.zoomfade-enter-active, .zoomfade-leave-active { transition: opacity 180ms ease, transform 180ms ease; }
.zoomfade-enter-from, .zoomfade-leave-to { opacity: 0; transform: scale(0.96); }

/* Kakao floating button idle pulse */
@keyframes idlePulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
.kakao-idle { animation: idlePulse 5s ease-in-out infinite; }

/* Remove old slide/fade docs (replaced by zoomfade) */
</style>
