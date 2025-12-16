
<template>
  <section class="text-gray-900">
    <!-- Header Section with Search Bar Title -->
    <div class="pt-12 px-6 pb-4 bg-white">
      <div
        class="search-bar bg-white px-5 py-3 flex justify-between items-center mb-6 border-2 border-black rounded-full"
        v-reveal.down
      >
        <h1 class="text-xl font-medium tracking-tighter" style="font-family: 'Black Han Sans', sans-serif;">
          굿바이 2025, 웰컴 2026
        </h1>
        <i class="fas fa-search text-2xl text-gray-400"></i>
      </div>

      <!-- Hooking Ment -->
      <div class="relative z-10 space-y-2 mb-2">
        <div class="inline-block" v-reveal.up>
          <div class="highlight-bg px-2 py-1 inline-block -rotate-1">
            <p class="leading-none font-bold text-gray-900" style="font-family: 'Nanum Pen Script', cursive; font-size: 32px;">
              종소리가 울리는 순간,
            </p>
          </div>
        </div>
        <br />
        <div class="inline-block" v-reveal.up="{ delay: 100 }">
          <p class="text-3xl font-black leading-tight tracking-tight">
            낯선 이는<br />
            <span class="text-teal-500">인연</span>이 됩니다.
          </p>
        </div>
      </div>
      <p class="text-gray-500 text-sm mt-2 font-medium" v-reveal.up="{ delay: 150 }">
        #3040명대규모파티 #새해카운트다운 #쏘토닉무제한
      </p>
    </div>

    <!-- Main Visual Image -->
    <div class="relative w-full overflow-hidden" style="height: 520px;" v-reveal.scale>
      <img
        alt="New Year Toast"
        class="absolute inset-0 w-full h-full object-cover"
        :src="withBase('/images/logo.png')"
        style="object-position: center bottom;"
      />
      <!-- Gradient Overlay Simulation (using solid color with opacity) -->
      <div class="absolute inset-0" style="background-color: rgba(0,0,0,0.1);"></div>
      <!-- Floating Elements / Stickers -->
      <div class="absolute top-4 right-4 bg-white px-3 py-2 rounded-lg transform rotate-6 shadow-lg border-2 border-gray-900" v-reveal.left="{ delay: 100 }">
        <p class="font-black text-teal-500 text-xl leading-none">D-DAY</p>
        <p class="text-xs font-bold text-gray-900 text-center">12.31</p>
      </div>
    </div>

    <!-- Bottom Info Section (info-card) -->
    <div class="info-card px-8 py-10 relative z-20" v-reveal.up>
      <!-- Decorative top badge -->
      <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-teal-400 text-gray-900 px-6 py-2 rounded-full border-2 border-white shadow-lg">
        <p class="font-black text-sm tracking-widest"><span class="text-white">SOLD OUT 임박!</span></p>
      </div>

      <div class="space-y-6">
        <!-- Title in footer -->
        <div v-reveal.up>
          <p class="text-teal-400 font-bold text-sm mb-1 tracking-wider">SOCIAL IT</p>
          <h2 class="text-3xl font-black text-white leading-tight">
            올나잇<br />인연 파티
          </h2>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-1 gap-4 border-t border-gray-800 pt-6">
          <div class="flex items-start" v-reveal.up="{ delay: 50 }">
            <div class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
              <i class="far fa-calendar-alt text-teal-400 text-sm"></i>
            </div>
            <div>
              <p class="text-gray-400 text-xs font-bold mb-0.5">WHEN</p>
              <p class="text-white font-bold text-lg">12.31(수) 20:00</p>
              <p class="text-gray-500 text-xs">~ 01:00 (5시간)</p>
            </div>
          </div>

          <div class="flex items-start" v-reveal.up="{ delay: 120 }">
            <div class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
              <i class="fas fa-map-marker-alt text-teal-400 text-sm"></i>
            </div>
            <div>
              <p class="text-gray-400 text-xs font-bold mb-0.5">WHERE</p>
              <p class="text-white font-bold text-lg leading-tight">공간나인 파티룸</p>
              <p class="text-gray-500 text-xs mt-0.5">서울 광진구 화양동 9-43 지하1층</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const runtimeCfg = useRuntimeConfig()
const appCfg = runtimeCfg.app
function withBase(path: string) {
  const base = (appCfg && appCfg.baseURL) ? (appCfg.baseURL as string) : '/'
  return `${base.replace(/\/$/, '')}${path}`
}
</script>

<style scoped>
.search-bar { box-shadow: 4px 4px 0px rgba(0,0,0,0.1); }
.highlight-bg { background-color: #00E0C6; }
.info-card {
  background-color: #111;
  color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>
