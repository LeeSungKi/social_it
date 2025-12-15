<template>
  <section class="px-6 pt-8 pb-6 bg-[#111] font-['Noto_Sans_KR']">
    <!-- Header Section -->
    <div class="mb-4">
      <div class="search-pill inline-flex items-center px-6 py-3 w-full justify-between mb-2" v-reveal.down>
        <h1 class="text-xl font-medium text-gray-900 tracking-tighter" style="font-family: 'Black Han Sans', sans-serif;">
          언제, 어디서 하나요?
        </h1>
        <i class="fas fa-search text-gray-400"></i>
      </div>
    </div>

    <!-- Content Section -->
    <div class="flex-1 flex flex-col justify-between">
      <!-- Date & Time Card -->
      <div class="info-card" v-reveal.up>
        <div class="flex items-center mb-3">
          <div class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3 border border-gray-700">
            <i class="far fa-calendar-check highlight-text text-base"></i>
          </div>
          <h2 class="text-white font-bold text-lg">파티 일정</h2>
        </div>
        <div class="bg-black bg-opacity-30 rounded-lg p-3 mb-3 border-l-4 border-[#00E0C6]">
          <p class="text-gray-400 text-[10px] mb-0.5">DATE</p>
          <p class="text-white font-black text-xl tracking-tight">2025.12.31 <span class="text-base font-medium text-gray-400">(수)</span></p>
        </div>
        <div class="space-y-2 pl-2">
          <div class="flex items-center">
            <span class="text-gray-500 text-xs w-12 font-bold">20:00</span>
            <p class="text-gray-300 text-sm">입장 시작</p>
          </div>
          <div class="flex items-center">
            <span class="text-gray-500 text-xs w-12 font-bold">21:00</span>
            <p class="text-white text-sm font-bold">파티 메인 행사 시작</p>
          </div>
          <div class="flex items-center">
            <span class="highlight-text text-xs w-12 font-bold">00:00</span>
            <p class="highlight-text text-sm font-bold animate-pulse">2026 새해 카운트다운!</p>
          </div>
        </div>
        <p class="mt-3 text-center text-gray-500 text-xs font-medium" style="font-family: 'Nanum Pen Script', cursive; font-size: 16px;">
          "더 일찍 오셔서 혼술하며 기다리셔도 환영합니다 :)"
        </p>
      </div>

      <!-- Location Card -->
      <div class="info-card" v-reveal.up>
        <div class="flex items-center mb-3">
          <div class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3 border border-gray-700">
            <i class="fas fa-map-marked-alt highlight-text text-base"></i>
          </div>
          <h2 class="text-white font-bold text-lg">오시는 길</h2>
        </div>
        <!-- Google Maps Embed -->
        <div class="relative mb-3 rounded-lg overflow-hidden border border-gray-700" v-reveal.up>
          <iframe
            class="w-full h-[160px] bg-black"
            title="google-maps-embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :src="mapEmbedUrl"
          ></iframe>
        </div>
        <!-- Address row: copy & directions -->
        <div class="flex items-center gap-2 px-1 py-2" v-reveal.up>
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
        <div class="mb-3">
          <p class="text-white font-bold text-base">
            건대입구역 <span class="text-[#3CB44A]">1번</span> / <span class="text-[#67823A]">2번출구</span>
          </p>
          <p class="text-gray-400 text-xs">도보 5분 이내 거리 (2호선/7호선)</p>
        </div>
        <div class="dashed-line"></div>
        <div>
          <p class="text-gray-400 text-[10px] mb-0.5">PLACE</p>
          <p class="text-white font-bold text-base">공간나인 파티룸</p>
          <p class="text-gray-400 text-xs mt-0.5">서울 광진구 화양동 9-43 지하1층</p>
        </div>
      </div>

      <!-- Notice Box -->
      <div class="bg-gray-800 rounded-xl p-3 border border-gray-700 text-center mb-2" v-reveal.up>
        <div class="flex items-center justify-center mb-1">
          <i class="fas fa-parking text-gray-400 text-sm mr-2"></i>
          <p class="text-gray-300 font-bold text-xs">주차 안내</p>
        </div>
        <p class="text-gray-500 text-[10px] leading-relaxed">
          전용 주차장 없음 / <span class="text-gray-400">대중교통 이용 권장</span><br/>
          (인근 유료 주차장 이용 가능)
        </p>
      </div>
      <div class="text-center" v-reveal.up="{ delay: 120 }">
        <p class="text-red-400 text-[11px] font-bold">
          <i class="fas fa-exclamation-triangle mr-1"></i> 파티 정원 모집 조기 마감 주의!<br/>
          일정을 미리 확정하시는 것을 추천드립니다.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// index.vue와 동일한 방식으로 주소와 임베드 URL 생성 + 동작 버튼들
const addressText = '대한민국 서울특별시 광진구 아차산로29길 28'
const mapEmbedUrl = computed(() =>
  `https://maps.google.com/maps?t=&z=14&ie=UTF8&iwloc=&output=embed&q=${encodeURIComponent(addressText)}`,
)
const directionsUrl = computed(() =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressText)}`,
)

async function copyAddress() {
  try {
    await navigator.clipboard.writeText(addressText)
  } catch (e) {
    // clipboard 권한이 없거나 실패해도 조용히 무시
  }
}
</script>

<style scoped>
.search-pill {
  background-color: #fff;
  border-radius: 9999px;
  border: 2px solid #00E0C6;
  box-shadow: 4px 4px 0px rgba(0, 224, 198, 0.4);
}
.info-card {
  background-color: #1f1f1f;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 20px 18px;
  margin-bottom: 16px;
  position: relative;
}
.highlight-text { color: #00E0C6; }
.map-container {
  background-color: #2a2a2a;
  border-radius: 12px;
  height: 160px;
  position: relative;
  overflow: hidden;
  border: 1px solid #444;
}
.map-street { position: absolute; background-color: #333; }
.map-street-h { width: 100%; height: 12px; top: 50%; transform: translateY(-50%); }
.map-street-v { height: 100%; width: 12px; left: 40%; transform: translateX(-50%); }
.map-pin {
  position: absolute; top: 40%; left: 40%; transform: translate(-50%, -100%);
  color: #00E0C6; font-size: 32px; filter: drop-shadow(0 4px 4px rgba(0,0,0,0.5));
  animation: bounce 2s infinite;
}
.station-marker { position: absolute; width: 16px; height: 16px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.3);} 
.line-2 { background-color: #3CB44A; }
.line-7 { background-color: #67823A; }
@keyframes bounce { 0%,100%{transform: translate(-50%, -100%);} 50%{transform: translate(-50%, -120%);} }
.dashed-line { border-bottom: 1px dashed #444; margin: 12px 0; }
</style>
