<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  dates?: string[]
  addressText?: string
  placeName?: string
  placeSub?: string
}>()

// Defaults
const address = computed(() => props.addressText || '대한민국 서울특별시 광진구 아차산로29길 28')
const mapEmbedUrl = computed(() =>
  `https://maps.google.com/maps?t=&z=14&ie=UTF8&iwloc=&output=embed&q=${encodeURIComponent(address.value)}`,
)
const directionsUrl = computed(() =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.value)}`,
)

async function copyAddress() {
  try {
    await navigator.clipboard.writeText(address.value)
  } catch (e) {}
}
</script>

<template>
  <section class="py-8">
    <div class="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold">참가 안내</h2>
      <ul class="mt-3 space-y-2 text-sm sm:text-[15px] md:text-base text-white/85">
        <li class="flex gap-2"><span class="text-white/50">•</span> 사전 신청 후 입금 화인 되면 확정 문자 발송됩니다.</li>
        <li class="flex gap-2"><span class="text-white/50">•</span> 남녀 비율 1:1로 조율합니다.</li>
        <li class="flex gap-2"><span class="text-white/50">•</span> 주류/음료는 자유롭게 이용 가능합니다.</li>
        <li class="flex gap-2"><span class="text-white/50">•</span> 혼자 오셔도 부담 없는 프로그램으로 진행됩니다.</li>
      </ul>

      <h3 class="mt-6 text-lg sm:text-xl md:text-2xl font-semibold">유의사항</h3>
      <ul class="mt-3 space-y-2 text-sm sm:text-[15px] md:text-base text-white/70">
        <li class="flex gap-2"><span class="text-white/40">•</span> 과한 음주, 불편한 언행은 제지될 수 있습니다.</li>
        <li class="flex gap-2"><span class="text-white/40">•</span> 확정 후 무단 불참 시 향후 참여가 제한될 수 있습니다.</li>
        <li class="flex gap-2"><span class="text-white/40">•</span> 현장에서 신분 확인을 요청할 수 있습니다.</li>
      </ul>

      <h3 class="mt-6 text-lg sm:text-xl md:text-2xl font-semibold">모임날짜</h3>
      <ul class="mt-3 space-y-2 text-sm sm:text-[15px] md:text-base text-white/70">
        <li v-for="(d, i) in (props.dates && props.dates.length ? props.dates : ['25.12.31(수) 오후 8:00'])" :key="'date-'+i" class="flex gap-2"><span class="text-white/40">•</span> {{ d }}</li>
      </ul>

      <!-- 장소: Google Maps embed from legacy section, placed right under date -->
      <div class="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div class="flex items-center mb-3">
          <div class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3 border border-gray-700">
            <i class="fas fa-map-marked-alt text-[#00E0C6] text-base"></i>
          </div>
          <h3 class="text-base sm:text-lg md:text-xl font-semibold">장소</h3>
        </div>
        <div class="relative mb-3 rounded-lg overflow-hidden border border-gray-700">
          <iframe
            class="w-full h-[180px] sm:h-[220px] md:h-[260px] bg-black"
            title="google-maps-embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :src="mapEmbedUrl"
          ></iframe>
        </div>
        <div class="flex items-center gap-2 px-1 py-2">
          <button
            type="button"
            class="rounded-full bg-white/10 px-3 py-2 text-[12px] text-white hover:bg-white/15"
            @click="copyAddress"
            aria-label="주소 복사"
          >
            복사
          </button>
          <a
            class="inline-flex items-center justify-center rounded-full bg-white px-3.5 py-2 text-[14px] font-medium text-black active:scale-[0.98] ml-auto"
            target="_blank"
            rel="noopener"
            :href="directionsUrl"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" class="mr-1 h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 21s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            길찾기
          </a>
        </div>
        <div class="mt-2">
          <p class="text-white font-semibold text-sm sm:text-base">{{ props.placeName || '공간나인 파티룸' }}</p>
          <p class="text-white/70 text-xs sm:text-sm mt-0.5">{{ props.placeSub || '서울 광진구 화양동 9-43 지하1층 · 건대입구역 도보 5분' }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
