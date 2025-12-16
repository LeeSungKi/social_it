<template>
  <section class="relative bg-[#111] font-['Noto_Sans_KR']">
    <!-- Top Background Image -->
    <div class="bg-image-wrapper">
      <img class="bg-image" alt="People toasting drinks" :src="withBase('/images/logo.png')" />
      <div class="overlay-fade"></div>
      <!-- Floating Bubbles -->
      <div class="bubble bubble-md bubble-1"><p class="text-center leading-tight">다양한<br/>생각</p></div>
      <div class="bubble bubble-sm bubble-2"><p>취미</p></div>
      <div class="bubble bubble-lg bubble-3"><p class="text-3xl font-black">MBTI</p></div>
      <div class="bubble bubble-md bubble-4"><p>분야</p></div>
    </div>

    <!-- Typography Over Image -->
    <div class="brand-text-container" v-reveal.up>
      <div class="mb-4 transform -rotate-2">
        <h2 class="text-white text-base font-bold tracking-widest bg-black/60 inline-block px-4 py-1.5 rounded-full border border-gray-600">
          소셜잇 올나잇 쏘토닉파티
        </h2>
      </div>
      <div class="relative flex justify-center items-center">
        <div class="transform -rotate-6">
          <h1 class="brand-title block">SOCIAL</h1>
          <h1 class="brand-subtitle block ml-8 text-[#00E0C6] opacity-95">IT</h1>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="stats-container">
      <div class="text-center mb-6 px-6" v-reveal.up>
        <p class="text-gray-300 text-sm mb-3 font-medium">다양한 생각, 취미와 MBTI를 가진 사람들이 모이는 곳</p>
        <div class="w-12 h-1 bg-[#00E0C6] mx-auto rounded-full"></div>
      </div>

      <div class="grid grid-cols-2 gap-3 px-5 mb-6">
        <div class="bg-[#1f1f1f] border border-gray-800 rounded-2xl p-4 text-center neon-glow flex flex-col justify-center" v-reveal.up>
          <div class="mb-2"><i class="fas fa-calendar-check text-gray-500 text-lg"></i></div>
          <p class="text-gray-400 text-xs font-bold mb-1">운영 횟수</p>
          <p class="text-3xl font-black text-white" style="font-family: 'Black Han Sans', sans-serif;">120<span class="text-[#00E0C6] text-xl">+</span></p>
        </div>
        <div class="bg-[#1f1f1f] border border-gray-800 rounded-2xl p-4 text-center neon-glow flex flex-col justify-center" v-reveal.up="{ delay: 120 }">
          <div class="mb-2"><i class="fas fa-user-friends text-gray-500 text-lg"></i></div>
          <p class="text-gray-400 text-xs font-bold mb-1">누적 참가자</p>
          <p class="text-3xl font-black text-white" style="font-family: 'Black Han Sans', sans-serif;">4,000</p>
        </div>
      </div>

      <!-- Bottom Brand Box -->
      <div class="mx-5 bg-gray-900 rounded-xl p-3 flex items-center justify-center border border-gray-700 shadow-lg" v-reveal.up>
        <div class="mr-4">
          <div class="logo-mark">
            <span class="text-white font-bold text-lg" style="font-family: 'Black Han Sans'; line-height: 1;">S</span>
            <span class="text-white font-bold text-lg" style="font-family: 'Black Han Sans'; line-height: 1;">I</span>
          </div>
        </div>
        <div class="text-left">
          <p class="text-[#00E0C6] font-bold text-[10px] mb-0.5 tracking-wider">SINCE 2022</p>
          <p class="text-white text-sm font-medium">새해의 인연, <span class="text-[#00E0C6] font-bold">SOCIAL IT</span>에서 시작하세요!</p>
        </div>
      </div>
      <p class="text-center text-gray-600 text-[9px] mt-3 tracking-wide" v-reveal.up="{ delay: 120 }">* 누적 데이터 기준: 2022년~현재 자사 집계 기준</p>
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
.bg-image-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 55%; overflow: hidden; z-index: 0; }
.bg-image { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; filter: brightness(0.7); }
.overlay-fade { position: absolute; bottom: 0; left: 0; width: 100%; height: 150px; background-color: transparent; box-shadow: inset 0 -100px 100px #111111; }
.brand-text-container { position: relative; z-index: 10; text-align: center; margin-top: 50px; height: 45%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.brand-title { font-family: 'Black Han Sans', sans-serif; font-size: 85px; line-height: 0.85; color: #00E0C6; text-shadow: 4px 4px 0px rgba(0,0,0,0.5); transform: rotate(-5deg); }
.brand-subtitle { font-family: 'Black Han Sans', sans-serif; font-size: 85px; line-height: 0.85; color: white; text-shadow: 4px 4px 0px rgba(0,0,0,0.5); transform: rotate(-5deg); margin-left: 40px; }
.bubble { position: absolute; border: 2px solid #00E0C6; background-color: rgba(0,0,0,0.7); color: white; border-radius: 9999px; display: flex; align-items: center; justify-content: center; font-weight: 700; box-shadow: 0 4px 6px rgba(0,0,0,0.3); z-index: 10; animation: float 4s ease-in-out infinite; }
.bubble-lg { width: 130px; height: 130px; font-size: 22px; }
.bubble-md { width: 90px; height: 90px; font-size: 16px; }
.bubble-sm { width: 70px; height: 70px; font-size: 13px; }
.bubble-1 { top: 15%; left: 8%; animation-delay: 0s; }
.bubble-2 { top: 10%; right: 5%; animation-delay: 1s; border-color: white; color: #00E0C6; }
.bubble-3 { top: 35%; left: 5%; animation-delay: 2s; }
.bubble-4 { top: 30%; right: 10%; animation-delay: 3s; border-color: #EF7C1C; }
@keyframes float { 0%{ transform: translateY(0);} 50%{ transform: translateY(-10px);} 100%{ transform: translateY(0);} }
.stats-container { flex: 1; background-color: #111111; position: relative; z-index: 20; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 30px; }
.logo-mark { width: 45px; height: 55px; border: 2px solid white; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 0 0 20px 20px; }
.neon-glow { box-shadow: 0 0 10px rgba(0, 224, 198, 0.3); }
</style>
