<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'

/**
 * Home (Adaptive Landing)
 * - Header overlays Hero
 * - Header becomes solid after scroll
 * - Mobile menu is full-screen overlay (slide + blur)
 * - Meeting cards are image-first selection blocks
 */

// --- state
const mobileOpen = ref(false)
const scrolled = ref(false)
// entrance flag for hero (run once)
const heroEntered = ref(false)
// Timer for intro slideshow (declare early to avoid TDZ)
let introTimer: any = null

const route = useRoute()

// Close mobile menu on route change
watch(
    () => route.fullPath,
    () => {
      mobileOpen.value = false
      unlockScroll()
    }
)

function lockScroll() {
  if (typeof document === 'undefined') return
  document.documentElement.style.overflow = 'hidden'
}
function unlockScroll() {
  if (typeof document === 'undefined') return
  document.documentElement.style.overflow = ''
}

function openMobile() {
  mobileOpen.value = true
  lockScroll()
}
function closeMobile() {
  mobileOpen.value = false
  unlockScroll()
}

function onScroll() {
  // 기준: Hero 상단에서 16px 이상 내려가면 solid header
  scrolled.value = (window?.scrollY ?? 0) > 16
}

// Logo button: scroll to top smoothly
function onLogoClick(_e?: MouseEvent) {
  if (typeof window !== 'undefined') {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      window.scrollTo(0, 0)
    }
  }
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  // Start intro slideshow
  startIntroTimer()
  // Trigger hero entrance once after mount
  setTimeout(() => { heroEntered.value = true }, 60)
  // Responsive threshold for meeting cards
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', updateIsMobile)
  unlockScroll()
  if (introTimer) clearInterval(introTimer)
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
  fristParty: withBase('/images/main.jpeg'),
  cafe: withBase('/images/main.jpeg'),
  hof: withBase('/images/main.jpeg'),
  travel: withBase('/images/main.jpeg'),
  review1: withBase('/images/main.jpeg'),
  review2: withBase('/images/main.jpeg'),
  review3: withBase('/images/main.jpeg'),
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

// Touch swipe support
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

const meetingCards = [
  {
    title: '굿바이 2025 , 웰컴 2026 [인연 파티]',
    desc: '신년 카운트 다운과 함께하는 따뜻한 소셜링',
    href: withBase('/newYearParty'),
    img: images.cafe,
    badge: '진행중',
  },
  {
    title: 'Hof in love',
    desc: '신나고 자유로운 분위기의 자연스러운 만남',
    href: '#',
    img: images.hof,
    disabled: true,
    badge: '준비중',
  },
  {
    title: 'Wine in love',
    desc: '은은한 조명과 음악이 있는 클래식한 소셜링',
    href: '#',
    img: images.fristParty,
    disabled: true,
    badge: '준비중',
  },
  {
    title: 'Travel in love',
    desc: '특별한 하루 여행 컨셉 소셜링',
    href: '#',
    disabled: true,
    badge: '준비중',
    img: images.travel,
  },
]

const reviews = [
  { title: '[12월 31일] 건대 신년파티 후기', href: '#', img: images.review1 }
]

// Visible meeting cards with responsive threshold
const visibleMeetingCards = computed(() => {
  if (showAllMeetings.value) return meetingCards
  return meetingCards.slice(0, meetingThreshold.value)
})

const headerClass = computed(() => {
  // Hero 위에서는 투명 / 스크롤 후에는 반투명 다크 + 블러 + subtle shadow
  return scrolled.value
      ? 'bg-black/65 backdrop-blur border-b border-white/10 shadow-lg shadow-black/20'
      : 'bg-transparent'
})
// ---- Runtime config for subscribe endpoint ----
const runtimeCfg = useRuntimeConfig?.() as any
const publicCfg = (runtimeCfg && runtimeCfg.public) ? runtimeCfg.public : {}
const subscribeEndpoint: string = (publicCfg && publicCfg.subscribeEndpoint) || '/.netlify/functions/subscribe'

// ---- Helper to prefix baseURL for GitHub Pages (/social_it/) ----
function withBase(path: string) {
  const cfg = (useRuntimeConfig?.() as any) || {}
  const base = cfg?.app?.baseURL ? String(cfg.app.baseURL) : '/'
  return `${base.replace(/\/$/, '')}${path}`
}

// ---- Share modal state & helpers ----
const showShare = ref(false)
const shareLink = (typeof location !== 'undefined' ? location.href : '')
const qrUrl = computed(() => {
  const encoded = encodeURIComponent(shareLink)
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encoded}`
})
// QR loading state and cache-buster
const shareQrLoading = ref(true)
const shareQrTs = ref(0)
const qrSrc = computed(() => `${qrUrl.value}&t=${shareQrTs.value}`)
function openShare() {
  shareQrLoading.value = true
  shareQrTs.value = Date.now()
  showShare.value = true
  lockScroll()
}
function closeShare() {
  showShare.value = false
  unlockScroll()
}
async function copyShareLink() {
  try {
    await navigator.clipboard.writeText(shareLink)
    alert('링크가 복사되었습니다.')
  } catch {
    try {
      // Fallback: prompt
      window.prompt('아래 링크를 복사하세요', shareLink)
    } catch {}
  }
}
async function saveQrPng() {
  try {
    const url = qrUrl.value
    const res = await fetch(url, { mode: 'cors', cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch QR')
    const blob = await res.blob()
    const objectUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = 'social-it-qr.png'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(objectUrl)
  } catch {
    try { window.open(qrUrl.value, '_blank') } catch {}
  }
}

// ---- Notification sheet state ----
const showNotif = ref(false)
const notifEmail = ref('')
const emailValid = computed(() => {
  const email = notifEmail.value.trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
})
const canSubmitNotif = computed(() => emailValid.value)
function openNotif() {
  showNotif.value = true
  lockScroll()
  setTimeout(() => {
    try { document.getElementById('notif-email')?.focus() } catch {}
  }, 0)
}
function closeNotif() {
  showNotif.value = false
  unlockScroll()
}
async function submitNotif() {
  if (!canSubmitNotif.value) return
  const email = notifEmail.value.trim()
  try {
    const res = await fetch(subscribeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok && (data as any)?.ok) {
      alert('구독이 완료되었습니다!')
      closeNotif()
      setTimeout(() => { notifEmail.value = '' }, 200)
      return
    }
    if (res.status === 409) {
      alert('이미 구독된 이메일입니다.')
      return
    }
    alert((data as any)?.message || '구독에 실패했습니다.')
  } catch {
    alert('네트워크 오류가 발생했습니다.')
  }
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

      <!-- HEADER -->
      <header class="fixed top-0 left-0 w-full z-50 header-smooth" :class="headerClass">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="relative flex h-16 md:h-20 items-center justify-between">
            <!-- Mobile: left Share button -->
            <button
              type="button"
              class="md:hidden group relative isolate flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow hover:bg-white/90 active:scale-[0.98]"
              aria-label="공유"
              @click="openShare"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 16V3" />
                <path d="M7 8l5-5 5 5" />
                <path d="M20 21H4a2 2 0 0 1-2-2v-7" />
                <path d="M22 12v7a 2 2 0 0 1-2 2" />
              </svg>
              <div class="absolute inset-0 group-hover:bg-black/10" />
            </button>

            <!-- Logo: centered on mobile, left on desktop -->
            <NuxtLink to="/" class="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 shrink-0 flex items-center" aria-label="Home" @click="onLogoClick">
              <span class="text-base sm:text-lg font-semibold tracking-wide">{{ brand.name }}</span>
            </NuxtLink>

            <!-- Mobile: right Notification button -->
            <button
              type="button"
              class="md:hidden group relative isolate flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow hover:bg-white/90 active:scale-[0.98]"
              aria-label="알림"
              @click="openNotif"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <div class="absolute inset-0 group-hover:bg-black/10" />
            </button>

            <!-- Desktop: right actions (Share & Notifications) -->
            <div class="hidden md:flex items-center gap-4">
              <!-- Share button -->
              <button
                  type="button"
                  class="group relative isolate flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow hover:bg-white/90 active:scale-[0.98]"
                  aria-label="공유"
                  @click="openShare"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 16V3" />
                  <path d="M7 8l5-5 5 5" />
                  <path d="M20 21H4a2 2 0 0 1-2-2v-7" />
                  <path d="M22 12v7a 2 2 0 0 1-2 2" />
                </svg>
                <div class="absolute inset-0 group-hover:bg-black/10" />
              </button>

              <!-- Notification button -->
              <button
                  type="button"
                  class="group relative isolate flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow hover:bg-white/90 active:scale-[0.98]"
                  aria-label="알림"
                  @click="openNotif"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <div class="absolute inset-0 group-hover:bg-black/10" />
              </button>
            </div>
          </div>
        </div>
      </header>

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
                  class="inline-flex items-center justify-center rounded-full bg-white text-black px-7 py-3.5 text-base font-semibold hover:bg-white/90 transition"
              >
                파티 둘러보기
              </a>
              <a
                  href="#reviews"
                  class="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/15 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/15 transition"
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
          <a
              v-for="(c, idx) in visibleMeetingCards"
              :key="idx"
              :href="c.disabled ? undefined : c.href"
              class="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
              :class="c.disabled ? 'pointer-events-none opacity-60' : ''"
              aria-label="meeting card"
              v-reveal.up="{ delay: idx * 80 }"
          >
            <!-- image -->
            <img
                :src="c.img"
                :alt="c.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
            <!-- overlay base gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20"></div>
            <!-- subtle hover darken overlay -->
            <div class="absolute inset-0 bg-black/0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

            <!-- badge -->
            <div v-if="c.badge" class="absolute top-5 left-5">
              <span class="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs text-white">
                {{ c.badge }}
              </span>
            </div>

            <!-- content -->
            <div class="relative z-10 flex h-[280px] sm:h-[320px] flex-col justify-end p-6">
              <h4 class="text-2xl font-semibold tracking-tight transition-all duration-300 group-hover:tracking-wide">{{ c.title }}</h4>
              <p class="mt-2 text-white/80 text-sm">{{ c.desc }}</p>
            </div>
          </a>
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

    <!-- REVIEWS -->
    <section id="reviews" class="py-16 sm:py-20 bg-black">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-end justify-between gap-6">
          <div>
            <h3 class="text-2xl sm:text-3xl font-bold font-serif">소셜링 후기</h3>
            <p class="mt-2 text-white/70 text-sm sm:text-base">
              생생한 후기로 먼저 분위기를 느껴보세요.
            </p>
          </div>
        </div>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <a
              v-for="(r, idx) in reviews"
              :key="idx"
              :href="r.href"
              class="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
          >
            <div class="relative">
              <img :src="r.img" alt="review" class="h-56 w-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"></div>
            </div>
            <div class="p-5">
              <p class="text-sm text-white/90 group-hover:text-white transition line-clamp-2">{{ r.title }}</p>
            </div>
          </a>
        </div>

        <div class="mt-8 text-center sm:hidden">
          <a href="#" class="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-5 py-2.5 text-sm font-semibold hover:bg-white/15 transition">
            자세히보기
          </a>
        </div>
      </div>
    </section>

    <!-- FOOTER (responsive) -->
    <footer class="bg-black border-t border-white/10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-2 gap-8 items-center">
        <!-- Left: Company info -->
        <div class="text-[11px] sm:text-xs md:text-sm leading-relaxed text-white/70 text-center md:text-left">
          <p class="text-white/90 font-semibold text-sm md:text-base">SOCIAL IT</p>
          <p class="mt-2">
            Re:teev · 사업자 번호: 669-71-00361 · TEL: 010-8797-8256
          </p>
          <p class="mt-1">
            E-mail: leesungge11@naver.com · 서울 광진구 자양로 2길 5, 2F
          </p>
          <p class="mt-3 text-white/50 text-[10px] sm:text-[11px] md:text-xs">Copyright (c) 2024 Re:teev. All rights reserved.</p>
        </div>
        <!-- Right: Logo (desktop only) -->
        <div class="hidden md:flex justify-end">
          <img :src="images.logo" alt="SOCIAL IT" class="h-10 w-auto opacity-80" />
        </div>
      </div>
    </footer>

    <!-- Floating KakaoTalk Button -->
    <a
        href="http://pf.kakao.com/_xlxiTQn/chat"
        target="_blank"
        rel="noopener"
        aria-label="카카오톡 채널 문의하기"
        class="fixed right-4 bottom-4 z-50 group"
    >
      <div class="relative">
        <div class="absolute -inset-1 rounded-full bg-yellow-300/50 blur-lg opacity-60 group-hover:opacity-80 transition"></div>
        <div class="relative flex items-center gap-0 sm:gap-3 rounded-full p-3.5 sm:px-4 sm:py-3 shadow-lg border border-black/10 bg-[#FEE500] text-black kakao-idle">
          <!-- Kakao bubble icon -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M12 3C6.477 3 2 6.58 2 10.99c0 2.61 1.57 4.92 3.988 6.41l-.9 3.35a.6.6 0 00.86.69l3.85-2.02c.727.13 1.484.2 2.255.2 5.523 0 10-3.58 10-7.99S17.523 3 12 3z"/>
          </svg>
          <span class="hidden sm:inline font-semibold text-sm">카카오톡 채널 문의</span>
        </div>
      </div>
    </a>
    <!-- Share Modal -->
    <transition name="zoomfade">
      <div
          v-if="showShare"
          class="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="공유하기"
          @click.self="closeShare"
      >
        <div class="w-full max-w-sm rounded-2xl border border-white/10 bg-[#1e1e1e]/95 p-5 shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">공유하기</h3>
            <button class="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white text-black hover:bg-white/90" @click="closeShare" aria-label="닫기">
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18"/>
                <path d="M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="mt-4 flex flex-col items-center gap-4">
            <div class="relative h-40 w-40 rounded-lg bg-white p-2 flex items-center justify-center">
              <div v-if="shareQrLoading" class="absolute inset-0 rounded-lg bg-black/5 grid place-items-center" aria-live="polite" aria-busy="true">
                <div class="h-6 w-6 rounded-full border-2 border-black/20 border-t-black animate-spin"></div>
              </div>
              <img :src="qrSrc" alt="공유용 QR" class="h-full w-full object-contain" @load="shareQrLoading=false" @error="shareQrLoading=false" />
            </div>
            <div class="w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-black/40 px-3 py-2 text-xs border border-white/10">{{ shareLink }}</div>
            <div class="flex w-full gap-2">
              <button type="button" class="flex-1 rounded-lg bg-white text-black py-2 font-semibold hover:bg-white/90" @click="copyShareLink">링크 복사</button>
              <button type="button" class="flex-1 rounded-lg bg-white/10 border border-white/15 py-2 font-semibold hover:bg-white/15" @click="saveQrPng">QR 저장</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Notification Bottom Sheet (mobile) / Centered Dialog (desktop) -->
    <transition name="zoomfade">
      <div v-if="showNotif" class="fixed inset-0 z-[60]" aria-modal="true" role="dialog" aria-label="알림 구독">
        <!-- backdrop -->
        <div class="absolute inset-0 bg-black/60" @click="closeNotif"></div>
        <!-- sheet / dialog container -->
        <div
            class="absolute inset-x-0 bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 rounded-t-2xl bg-[#111] p-5 ring-1 ring-white/10
                 md:top-1/2 md:bottom-auto md:max-w-lg md:-translate-y-1/2 md:rounded-2xl md:p-6 lg:max-w-xl"
        >
          <!-- drag handle (mobile only) -->
          <div class="mx-auto h-1 w-12 rounded-full bg-white/20 md:hidden"></div>

          <!-- header -->
          <div class="mt-4 flex items-center justify-between md:mt-0">
            <div>
              <h3 class="text-lg font-semibold">소식 받아보기</h3>
              <p class="mt-1 text-sm text-white/70">이메일을 남겨주시면 새로운 소식을 빠르게 알려드릴게요.</p>
            </div>
            <button
                type="button"
                class="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black hover:bg-white/90"
                aria-label="닫기"
                @click="closeNotif"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18"/>
                <path d="M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- form -->
          <form class="mt-4 space-y-3" @submit.prevent="submitNotif">
            <div>
              <label for="notif-email" class="sr-only">이메일</label>
              <input
                  id="notif-email"
                  type="email"
                  inputmode="email"
                  autocomplete="email"
                  placeholder="you@example.com"
                  v-model.trim="notifEmail"
                  class="w-full rounded-lg bg-white px-3 py-2 text-black placeholder:text-gray-500 focus:outline-none"
              />
            </div>
            <div class="flex gap-2">
              <button type="button" class="flex-1 rounded-lg bg-white/10 border border-white/15 py-2 font-semibold hover:bg-white/15" @click="closeNotif">취소</button>
              <button type="submit" :disabled="!canSubmitNotif" class=":disabled:opacity-50 flex-1 rounded-lg bg-white text-black py-2 font-semibold hover:bg-white/90">구독</button>
            </div>
          </form>
        </div>
      </div>
    </transition>
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
