<template>
  <section class="px-6 pt-12 pb-10 bg-[#111] font-['Noto_Sans_KR']">
    <!-- Header Section -->
    <div class="mb-8 flex-shrink-0">
      <div class="search-pill inline-flex items-center px-6 py-4 w-full justify-between mb-8" v-reveal.down>
        <h1 class="text-2xl font-medium text-gray-900 tracking-tighter" style="font-family: 'Black Han Sans', sans-serif;">
          참가 대상은요?
        </h1>
        <i class="fas fa-search text-gray-400 text-lg"></i>
      </div>
      <!-- Main Age Target -->
      <div class="text-center relative py-2" v-reveal.up>
        <div class="absolute -top-2 right-4 transform rotate-12">
          <i class="fas fa-star text-yellow-400 text-3xl animate-pulse"></i>
        </div>
        <div class="age-badge">
          <p class="text-sm font-bold">MAIN TARGET</p>
        </div>
        <h2 class="text-5xl font-black text-white leading-tight mb-3 tracking-tight">
          남,녀 <span class="highlight-text">2030</span>
        </h2>
        <p class="text-gray-300 font-medium text-lg">
          (20대~30대) 대상입니다!
        </p>
      </div>
    </div>

    <!-- Check List Content -->
    <div class="flex-1 flex flex-col justify-center space-y-6">
      <!-- Item 1: Socializing -->
      <div class="target-card" v-reveal.up>
        <div class="flex items-start">
          <div class="check-icon flex-shrink-0 mt-1">
            <i class="fas fa-comments text-lg"></i>
          </div>
          <div>
            <h3 class="text-white font-bold text-xl mb-2">대화를 즐기는 분</h3>
            <p class="text-gray-400 text-base leading-relaxed">
              새로운 사람들과의 대화를 좋아하고,<br/>
              열린 마음으로 소통할 준비가 되신 분
            </p>
          </div>
        </div>
      </div>
      <!-- Item 2: Manner -->
      <div class="target-card" v-reveal.up="{ delay: 80 }">
        <div class="flex items-start">
          <div class="check-icon flex-shrink-0 mt-1">
            <i class="fas fa-glass-cheers text-lg"></i>
          </div>
          <div>
            <h3 class="text-white font-bold text-xl mb-2">매너있는 소셜링</h3>
            <p class="text-gray-400 text-base leading-relaxed">
              과음, 무례한 행동은 NO!<br/>
              서로를 존중하고 배려하는 매너를 갖추신 분
            </p>
          </div>
        </div>
      </div>
      <!-- Item 3: Solo & Friends -->
      <div class="target-card" v-reveal.up="{ delay: 160 }">
        <div class="flex items-start">
          <div class="check-icon flex-shrink-0 mt-1">
            <i class="fas fa-user-plus text-lg"></i>
          </div>
          <div>
            <h3 class="text-white font-bold text-xl mb-2">혼자서도, 친구와도</h3>
            <p class="text-gray-400 text-base leading-relaxed">
              혼자 오셔도 어색하지 않아요! (솔로 환영)<br/>
              동성 친구 최대 2인까지 동반 가능합니다.
              <span class="block text-sm text-[#00E0C6] mt-2 font-medium">*동반 참여시 사전 문의 필수</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Call to Action Text -->
    <div class="mt-8 pt-4 border-t border-gray-800 text-center flex-shrink-0" v-reveal.up>
      <p class="text-2xl font-bold text-white transform -rotate-1" style="font-family: 'Nanum Pen Script', cursive; font-size: 32px;">
        "당신도 이 파티의 <br>주인공이 될 수 있어요!"
      </p>
    </div>
  </section>
</template>

<style scoped>
.search-pill {
  background-color: #fff;
  border-radius: 9999px;
  border: 2px solid #00E0C6;
  box-shadow: 4px 4px 0px rgba(0, 224, 198, 0.4);
}
.highlight-text { color: #00E0C6; }
.check-icon {
  color: #00E0C6;
  background-color: rgba(0, 224, 198, 0.1);
  width: 36px; height: 36px; border-radius: 9999px;
  display: flex; align-items: center; justify-content: center; margin-right: 16px;
}
.target-card {
  background-color: #1f1f1f;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 24px 20px;
  transition: transform 0.2s;
}
.target-card:hover { border-color: #00E0C6; transform: translateY(-2px); }
.age-badge {
  display: inline-block;
  background-color: #00E0C6;
  color: #000;
  font-weight: 900;
  padding: 6px 16px;
  border-radius: 4px;
  transform: rotate(-2deg);
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
</style>
