<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'

// Shared header/footer layout extracted from index.vue so other pages can reuse it.
// - Fixed translucent header that becomes solid after scroll
// - Global Share modal (QR + link copy)
// - Notification subscribe sheet
// - Floating KakaoTalk button

const route = useRoute()

// Scroll state for header appearance
const scrolled = ref(false)
function onScroll() {
  scrolled.value = (window?.scrollY ?? 0) > 16
}

// Mobile menu placeholder (kept for parity / future use)
const mobileOpen = ref(false)

function lockScroll() {
  if (typeof document === 'undefined') return
  document.documentElement.style.overflow = 'hidden'
}
function unlockScroll() {
  if (typeof document === 'undefined') return
  document.documentElement.style.overflow = ''
}

// Close any overlays on route change
watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
    unlockScroll()
  }
)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  unlockScroll()
})

// Brand & assets (only those used by the layout)
const brand = {
  name: 'SOCIAL IT',
}

function withBase(path: string) {
  const cfg = (useRuntimeConfig?.() as any) || {}
  const base = cfg?.app?.baseURL ? String(cfg.app.baseURL) : '/'
  return `${base.replace(/\/$/, '')}${path}`
}

const images = {
  logo: withBase('/images/logo2.png'),
}

const headerClass = computed(() =>
  scrolled.value
    ? 'bg-black/65 backdrop-blur border-b border-white/10 shadow-lg shadow-black/20'
    : 'bg-transparent'
)

// ---- Share modal state & helpers ----
const showShare = ref(false)
// Reactive current page URL for sharing (updates when route changes)
const shareLink = computed(() => {
  // make it reactive to navigation
  void route.fullPath
  if (typeof window !== 'undefined' && window.location) {
    return window.location.href
  }
  return ''
})
const qrUrl = computed(() => {
  const encoded = encodeURIComponent(shareLink.value)
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encoded}`
})
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
    await navigator.clipboard.writeText(shareLink.value)
    alert('링크가 복사되었습니다.')
  } catch {
    try { window.prompt('아래 링크를 복사하세요', shareLink.value) } catch {}
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

// Subscribe endpoint from runtime config
const runtimeCfg = useRuntimeConfig?.() as any
const publicCfg = (runtimeCfg && runtimeCfg.public) ? runtimeCfg.public : {}
const subscribeEndpoint: string = (publicCfg && publicCfg.subscribeEndpoint) || '/.netlify/functions/subscribe'

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
  <div class="w-full bg-black text-white font-sans min-h-screen">
    <!-- HEADER (fixed) -->
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
          <NuxtLink to="/" class="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 shrink-0 flex items-center" aria-label="Home">
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

    <!-- Content area; padding controlled by page meta (headerOverlay) -->
    <main :class="(route?.meta as any)?.headerOverlay ? 'pt-0' : 'pt-20 md:pt-24'">
      <slot />
    </main>

    <!-- FOOTER (responsive) -->
    <footer class="bg-black border-t border-white/10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-2 gap-8 items-center">
        <div class="text-[11px] sm:text-xs md:text-sm leading-relaxed text-white/70 text-center md:text-left">
          <p class="text-white/90 font-semibold text-sm md:text-base">SOCIAL IT</p>
          <p class="mt-2">Re:teev · 사업자 번호: 669-71-00361 · TEL: 010-8797-8256</p>
          <p class="mt-1">E-mail: leesungge11@naver.com · 서울 광진구 자양로 2길 5, 2F</p>
          <p class="mt-3 text-white/50 text-[10px] sm:text-[11px] md:text-xs">Copyright (c) 2024 Re:teev. All rights reserved.</p>
        </div>
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
        <div class="absolute inset-0 bg-black/60" @click="closeNotif"></div>
        <div
          class="absolute inset-x-0 bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 rounded-t-2xl bg-[#111] p-5 ring-1 ring-white/10
                 md:top-1/2 md:bottom-auto md:max-w-lg md:-translate-y-1/2 md:rounded-2xl md:p-6 lg:max-w-xl"
        >
          <div class="mx-auto h-1 w-12 rounded-full bg-white/20 md:hidden"></div>
          <div class="mt-4 flex items-center justify-between md:mt-0">
            <div>
              <h3 class="text-lg font-semibold">소식 받아보기</h3>
              <p class="mt-1 text-sm text-white/70">이메일을 남겨주시면 새로운 소식을 빠르게 알려드릴게요.</p>
            </div>
          </div>
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
.header-smooth { transition: background-color 200ms ease, backdrop-filter 200ms ease, box-shadow 200ms ease; }
.zoomfade-enter-active, .zoomfade-leave-active { transition: opacity 180ms ease, transform 180ms ease; }
.zoomfade-enter-from, .zoomfade-leave-to { opacity: 0; transform: scale(0.96); }
@keyframes idlePulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
.kakao-idle { animation: idlePulse 5s ease-in-out infinite; }
</style>
