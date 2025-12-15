<template>
  <section class="px-6 pt-10 pb-8 bg-[#111] font-['Noto_Sans_KR']">
    <!-- Header -->
    <div class="mb-8 text-center" v-reveal.down>
      <h1 class="text-3xl  text-white leading-tight mb-2" style="font-family: 'Black Han Sans', sans-serif;">
        <span class="highlight-bg"><span class="highlight-text">올나잇 대규모 연말 파티</span></span><br />
        놀러오세요!
      </h1>
      <p class="text-gray-400 text-sm font-medium">이런 분들에게 강력 추천합니다</p>
    </div>

    <!-- Chat Section -->
    <div class="flex-1 flex flex-col justify-center px-1 overflow-hidden">
      <!-- Item 1 -->
      <div class="chat-row stagger-1" v-reveal.up>
        <div class="avatar left">
          <i class="fas fa-glass-cheers text-gray-800"></i>
        </div>
        <div class="chat-bubble left">
          <p>한 해의 마지막을<br />많은 사람들과 <span class="text-teal-600 font-bold">함께하고 싶은 사람!</span></p>
        </div>
      </div>
      <!-- Item 2 -->
      <div class="chat-row justify-end stagger-2" v-reveal.up="{ delay: 120 }">
        <div class="chat-bubble right">
          <p>매일 똑같은 일상에서 벗어나<br /><span class="font-bold">특별한 밤</span>을 보내고 싶은 사람!</p>
        </div>
        <div class="avatar right">
          <i class="fas fa-star text-gray-800"></i>
        </div>
      </div>
      <!-- Item 3 -->
      <div class="chat-row stagger-3" v-reveal.up="{ delay: 200 }">
        <div class="avatar left" style="background-color: #EF476F;">
          <i class="fas fa-bolt text-white"></i>
        </div>
        <div class="chat-bubble left">
          <p>12월 31일 마지막 밤,<br /><span class="text-teal-600 font-bold">핫한 파티</span>를 즐기고 싶은 사람!</p>
        </div>
      </div>
      <!-- Item 4 -->
      <div class="chat-row justify-end stagger-4" v-reveal.up="{ delay: 280 }">
        <div class="chat-bubble right">
          <p>다양한 분야의 사람들과<br /><span class="font-bold">새로운 인연</span>을 만들고 싶은 사람!</p>
        </div>
        <div class="avatar right" style="background-color: #118AB2;">
          <i class="fas fa-comments text-white"></i>
        </div>
      </div>
    </div>

    <!-- Bottom Guarantee Section -->
    <div class="mt-6">
      <div class="guarantee-box" v-reveal.up>
        <i class="fas fa-cocktail absolute -right-4 -bottom-4 text-8xl text-gray-800 opacity-50 transform rotate-12"></i>
        <h3 class="text-white font-bold text-xl mb-4">
          SOCIAL IT은<br />
          <span class="text-[#00E0C6]">(재미 보장)</span>
          <span class="text-[#00E0C6] ml-1">(멤버 보장)</span>
        </h3>
        <div class="space-y-3 relative z-10">
          <div class="flex items-start">
            <i class="fas fa-check-circle text-[#00E0C6] mt-1 mr-2 text-sm"></i>
            <p class="text-gray-300 text-sm">
              <span class="text-white font-bold">성비를 맞춰</span><br />
              최소 30명 - 최대 40명으로 진행
            </p>
          </div>
          <div class="flex items-start">
            <i class="fas fa-check-circle text-[#00E0C6] mt-1 mr-2 text-sm"></i>
            <p class="text-gray-300 text-sm">
              현재 기준 <span class="text-white font-bold">120회+ 운영</span><br />
              약 4,000명이 참가한 검증된 파티
            </p>
          </div>
        </div>
      </div>
      <div class="text-center mt-4" v-reveal.up="{ delay: 120 }">
        <p class="text-gray-500 text-xs" style="font-family: 'Nanum Pen Script', cursive; font-size: 18px;">
          "검증된 파티에서 좋은 인연을 만나보세요"
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.highlight-bg { background-color: #00E0C6; display: inline-block; padding: 0 8px; transform: skew(-5deg); }
.highlight-text { color: #000; }
.chat-bubble { background-color: #ffffff; color: #1f2937; border-radius: 20px; padding: 16px; position: relative; max-width: 85%; box-shadow: 0 4px 6px rgba(0,0,0,0.3); font-size: 15px; line-height: 1.5; font-weight: 500; }
.chat-bubble.left { border-top-left-radius: 4px; margin-right: auto; }
.chat-bubble.right { border-top-right-radius: 4px; margin-left: auto; background-color: #e6fffa; border: 2px solid #00E0C6; }
.avatar { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; border: 2px solid #333; }
.avatar.left { margin-right: 12px; background-color: #FFD166; }
.avatar.right { margin-left: 12px; background-color: #00E0C6; }
.chat-row { display: flex; align-items: flex-start; margin-bottom: 24px; opacity: 0; animation: slideIn 0.5s forwards; }
.guarantee-box { background-color: #1f1f1f; border: 1px solid #333; border-radius: 16px; padding: 24px; margin-top: auto; position: relative; overflow: hidden; }
.guarantee-badge { display: inline-block; background-color: #00E0C6; color: #000; font-weight: 900; padding: 4px 12px; border-radius: 9999px; font-size: 12px; margin-bottom: 8px; }
@keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.3s; }
.stagger-3 { animation-delay: 0.5s; }
.stagger-4 { animation-delay: 0.7s; }
</style>
