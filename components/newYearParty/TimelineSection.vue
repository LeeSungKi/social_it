
<template>
  <section class="px-6 pt-8 pb-6 bg-[#111]">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between shrink-0" v-reveal.down>
      <div class="bg-white px-4 py-2 rounded-full inline-flex items-center shadow-[3px_3px_0px_#00E0C6] border-2 border-black">
        <h1 class="text-lg text-black header-title tracking-tighter">
          어떻게 진행되나요?
        </h1>
        <i class="fas fa-search ml-2 text-gray-400 text-xs"></i>
      </div>
      <div class="text-right">
        <p class="text-[10px] text-gray-400 font-medium">TOTAL TIME</p>
        <p class="text-base font-black text-white" style="font-family: 'Black Han Sans', sans-serif;">
          <span class="text-[#00E0C6]">1차 3H</span> + 2차 2H
        </p>
      </div>
    </div>

    <!-- Timeline Content -->
    <div class="flex-1 relative pr-1 flex flex-col justify-between">
      <!-- Vertical Line -->
      <div class="timeline-line"></div>

      <!-- Item 1: Check-in -->
      <div class="timeline-item" v-reveal.up>
        <div class="timeline-dot"></div>
        <div class="bg-[#1f1f1f] p-3 rounded-xl border border-gray-800">
          <p class="time-badge">19:40 – 20:00</p>
          <h3 class="text-white font-bold text-base mb-1 flex items-center">
            <i class="fas fa-clipboard-check mr-2 text-gray-400 text-sm"></i>체크인 &amp; 웰컴
          </h3>
          <p class="text-gray-400 text-xs leading-snug">
            신분증 확인 및 자리 안내<br />
            웰컴 쏘토닉 한 잔과 함께 시작!
          </p>
        </div>
      </div>

      <!-- Item 2: Opening -->
      <div class="timeline-item" v-reveal.up="{ delay: 80 }">
        <div class="timeline-dot"></div>
        <div class="bg-[#1f1f1f] p-3 rounded-xl border border-gray-800">
          <p class="time-badge">20:00 – 20:10</p>
          <h3 class="text-white font-bold text-base mb-1 flex items-center">
            <i class="fas fa-microphone-alt mr-2 text-gray-400 text-sm"></i>오프닝
          </h3>
          <p class="text-gray-400 text-xs leading-snug">
            호스트 소개 및 간단한 아이스브레이킹
          </p>
        </div>
      </div>

      <!-- Item 3: Main Networking -->
      <div class="timeline-item" v-reveal.up="{ delay: 160 }">
        <div class="timeline-dot active"></div>
        <div class="bg-[#1f1f1f] p-3 rounded-xl border-l-4 border-[#00E0C6]">
          <p class="time-badge">20:10 – 22:30</p>
          <h3 class="text-white font-bold text-base mb-1 flex items-center">
            <i class="fas fa-comments mr-2 text-[#00E0C6] text-sm"></i>라운드 테이블 네트워킹
          </h3>
          <p class="text-gray-300 text-xs mb-2 leading-snug">
            모든 참가자들과 대화를 나눌 수 있도록<br />
            자리를 이동하는 시간이 있습니다. (2~3회)
          </p>
          <div class="flex gap-2">
            <span class="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded">대화카드</span>
            <span class="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded">쏘토닉 무제한</span>
          </div>
        </div>
      </div>

      <!-- Item 4: Mini Game -->
      <div class="timeline-item" v-reveal.up="{ delay: 240 }">
        <div class="timeline-dot"></div>
        <div class="bg-[#1f1f1f] p-3 rounded-xl border border-gray-800">
          <p class="time-badge">22:30 – 23:00</p>
          <h3 class="text-white font-bold text-base mb-1 flex items-center">
            <i class="fas fa-gamepad mr-2 text-gray-400 text-sm"></i>미니 게임 &amp; 1차 마무리
          </h3>
          <p class="text-gray-400 text-xs leading-snug">
            분위기를 띄우는 가벼운 매칭 게임<br />
            (베스트 커플/멤버에게는 소정의 선물)
          </p>
        </div>
      </div>

      <!-- Item 5: 2nd Round & Countdown (Climax) -->
      <div class="timeline-item mb-0" v-reveal.up="{ delay: 320 }">
        <div class="timeline-dot active" style="width: 22px; height: 22px; left: 14px; border-width: 3px;"></div>
        <div class="climax-box">
          <div class="flex justify-between items-start mb-1">
            <p class="text-[#00E0C6] font-black text-xs px-2 py-0.5 border border-[#00E0C6] rounded"><span class="text-white">23:00 – 01:00</span></p>
            <i class="fas fa-glass-cheers text-xl text-[#00E0C6] animate-pulse"></i>
          </div>
          <h3 class="neon-text font-black text-lg mb-1" style="font-family: 'Black Han Sans', sans-serif;">
            2차 파티 &amp; COUNTDOWN
          </h3>
          <p class="text-white text-xs font-medium leading-snug">
            2시간 더! 현장 결제로 참여하는 2차 파티<br />
            <span class="text-[#00E0C6]">00:00 카운트다운</span>과 함께 새해 맞이!
          </p>
        </div>
      </div>
    </div>

    <!-- Footer Note -->
    <div class="mt-4 pt-3 border-t border-gray-800 shrink-0">
      <p class="text-gray-500 text-[10px] text-center flex items-center justify-center">
        <i class="fas fa-exclamation-circle mr-1"></i>
        현장 상황에 따라 시간 및 순서는 유동적으로 변경될 수 있습니다.
      </p>
    </div>
  </section>
</template>

<script setup>
// static layout – no script needed
</script>

<style scoped>
.header-title {
  font-family: 'Black Han Sans', sans-serif;
  text-shadow: 2px 2px 0px rgba(0, 224, 198, 0.4);
}
.timeline-line {
  position: absolute;
  left: 24px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background-color: #333;
  z-index: 0;
}
.timeline-item {
  position: relative;
  margin-bottom: 1rem;
  padding-left: 54px;
  z-index: 1;
}
.timeline-dot {
  position: absolute;
  left: 16px;
  top: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #111;
  border: 2px solid #00E0C6;
  z-index: 2;
}
.timeline-dot.active {
  background-color: #00E0C6;
  box-shadow: 0 0 10px rgba(0, 224, 198, 0.5);
}
.time-badge {
  display: inline-block;
  background-color: rgba(0, 224, 198, 0.1);
  color: #00E0C6;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}
.climax-box {
  background-color: rgba(0, 224, 198, 0.1);
  border: 1px solid rgba(0, 224, 198, 0.3);
  border-radius: 12px;
  padding: 0.8rem;
}
.neon-text {
  color: #fff;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(0, 224, 198, 0.5);
}
/* hide scrollbars if overflow occurs */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
