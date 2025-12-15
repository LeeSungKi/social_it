<template>
  <section class="bg-[#111] font-['Noto_Sans_KR']">
    <div class="slide-container">
      <!-- Header -->
      <div class="mb-5" v-reveal.down>
        <h1 class="text-3xl font-medium text-white leading-tight mb-2" style="font-family: 'Black Han Sans', sans-serif;">
          생생한 SOCIAL IT<br/>
          <span class="text-[#00E0C6]">참여 후기!</span>
        </h1>
        <p class="text-gray-400 text-sm">수많은 후기가 증명하는 검증된 파티</p>
      </div>

      <!-- Reviews Section -->
      <div class="mb-6">
        <!-- Review 1 -->
        <div class="review-card" v-reveal.up>
          <div class="quote-icon"><i class="fas fa-quote-left text-[10px] text-white"></i></div>
          <div class="stars">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
          </div>
          <p class="text-gray-800 font-bold text-xs mb-1 leading-snug">"자정에 함께 건배한 순간, 잊지 못할 새해 스타트!"</p>
          <div class="flex justify-between items-center mt-1 border-t border-gray-100 pt-1">
            <p class="text-gray-500 text-[10px]">2024.12.31 참가자</p>
            <p class="text-[#00E0C6] text-[10px] font-bold">New Year Party</p>
          </div>
        </div>
        <!-- Review 2 -->
        <div class="review-card" v-reveal.up="{ delay: 100 }">
          <div class="stars">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
          </div>
          <p class="text-gray-800 font-bold text-xs mb-1 leading-snug">"성비, 분위기, 쏘토닉까지 완벽했어요. 혼자 갔는데 금방 친해졌네요."</p>
          <div class="flex justify-between items-center mt-1 border-t border-gray-100 pt-1">
            <p class="text-gray-500 text-[10px]">직장인 K님 (32세)</p>
            <p class="text-[#00E0C6] text-[10px] font-bold">So-Tonic Party</p>
          </div>
        </div>
        <!-- Review 3 -->
        <div class="review-card mb-0" v-reveal.up="{ delay: 180 }">
          <div class="stars">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
          </div>
          <p class="text-gray-800 font-bold text-xs mb-1 leading-snug">"처음이라 걱정했는데 호스트님이 너무 잘 챙겨주셔서 좋았습니다!"</p>
          <div class="flex justify-between items-center mt-1 border-t border-gray-100 pt-1">
            <p class="text-gray-500 text-[10px]">처음 오신 J님</p>
            <p class="text-[#00E0C6] text-[10px] font-bold">First Visit</p>
          </div>
        </div>
      </div>

      <!-- Photo Grid Section -->
      <div class="flex-1 flex flex-col min-h-0">
        <div class="flex items-center justify-between mb-2" v-reveal.down>
          <h2 class="text-white font-bold text-lg"><i class="fas fa-camera text-[#00E0C6] mr-2"></i>현장 스케치</h2>
          <span class="text-gray-500 text-[10px]">*실제 파티 현장입니다</span>
        </div>
        <div class="photo-grid">
          <div class="photo-item large" v-reveal.up>
            <img alt="Group Toasting" :src="withBase('/images/001.png')" />
            <div class="overlay-label">공간나인 메인 홈</div>
          </div>
          <div class="photo-item normal" v-reveal.up="{ delay: 120 }">
            <img alt="Wine Glasses" :src="withBase('/images/002.png')" />
            <div class="overlay-label">편안한 라운지</div>
          </div>
          <div class="photo-item normal" v-reveal.up="{ delay: 200 }">
            <img alt="Socializing" :src="withBase('/images/003.png')" />
            <div class="overlay-label">파티 테이블 세팅</div>
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
.slide-container { width: 100%; max-width: 456px; margin: 0 auto; position: relative; overflow: hidden; display: flex; flex-direction: column; padding: 30px 24px; }
.highlight-text { color: #00E0C6; }
.review-card { background-color: #ffffff; border-radius: 12px; padding: 14px; margin-bottom: 10px; position: relative; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); transform: rotate(-1deg); }
.review-card:nth-child(even) { transform: rotate(1deg); }
.stars { color: #FFD166; font-size: 12px; margin-bottom: 6px; }
.quote-icon { position: absolute; top: -8px; left: 8px; font-size: 20px; color: #00E0C6; background-color: #111111; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; }
.photo-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 4px; height: 100%; }
.photo-item { position: relative; border-radius: 8px; overflow: hidden; background-color: #333; }
.photo-item img { width: 100%; height: 100%; object-fit: cover; }
.photo-item.large { grid-column: span 2; height: 160px; }
.photo-item.normal { height: 120px; }
.overlay-label { position: absolute; bottom: 0; left: 0; right: 0; background-color: rgba(0, 0, 0, 0.6); padding: 4px 8px; color: white; font-size: 10px; font-weight: 500; }
.brand-logo { position: absolute; top: 24px; right: 24px; width: 48px; height: 56px; border: 2px solid white; border-radius: 0 0 12px 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.5); z-index: 20; }
</style>
