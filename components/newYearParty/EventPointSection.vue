<template>
  <section class="relative bg-[#111] font-['Noto_Sans_KR']">
    <div class="header-bg"></div>
    <div class="content-wrapper">
      <!-- Header -->
      <div class="mb-4 flex-shrink-0" v-reveal.down>
        <p class="text-[#00E0C6] font-bold text-xs tracking-widest mb-1">SOCIAL IT</p>
        <h1 class="text-3xl font-medium text-white leading-none tracking-tight mb-3" style="font-family: 'Black Han Sans', sans-serif;">
          올나잇<br />
          이벤트 포인트
        </h1>
        <div class="neon-line"></div>
        <p class="text-gray-400 text-xs leading-relaxed">
          오직 소셜잇에서만 경험할 수 있는<br />
          특별한 4가지 포인트를 확인하세요!
        </p>
      </div>

      <!-- Points Stack -->
      <div class="flex-1 flex flex-col justify-start">
        <!-- 01 -->
        <div class="point-card" v-reveal.up>
          <div class="number-bg">01</div>
          <div class="flex items-center mb-2">
            <div class="point-icon-box"><i class="fas fa-laugh-squint"></i></div>
            <div>
              <h3 class="text-white font-bold text-base">재미 보장</h3>
              <p class="text-gray-500 text-[10px] font-medium tracking-wide">FUN GUARANTEE</p>
            </div>
          </div>
          <div class="pl-1 space-y-1">
            <div class="feature-item"><div class="check-dot"></div><p class="text-gray-300 text-xs">테이블별 와인 페어링 &amp; 안주</p></div>
            <div class="feature-item"><div class="check-dot"></div><p class="text-gray-300 text-xs">대화가 끊이지 않는 '대화카드'</p></div>
            <div class="feature-item"><div class="check-dot"></div><p class="text-gray-300 text-xs">어색함 제로! 아이스브레이킹 게임</p></div>
          </div>
        </div>

        <!-- 02 -->
        <div class="point-card" v-reveal.up="{ delay: 80 }">
          <div class="number-bg">02</div>
          <div class="flex items-center mb-2">
            <div class="point-icon-box"><i class="fas fa-users-cog"></i></div>
            <div>
              <h3 class="text-white font-bold text-base">멤버 보장</h3>
              <p class="text-gray-500 text-[10px] font-medium tracking-wide">MEMBER QUALITY</p>
            </div>
          </div>
          <div class="pl-1 space-y-1">
            <div class="feature-item"><div class="check-dot"></div><p class="text-gray-300 text-xs">성비 및 연령대 기준 엄격 운영</p></div>
            <div class="feature-item"><div class="check-dot"></div><p class="text-gray-300 text-xs">노쇼(No-Show) 최소화 시스템</p></div>
            <div class="feature-item"><div class="check-dot"></div><p class="text-gray-300 text-xs">비매너 회원 필터링 관리</p></div>
          </div>
        </div>

        <!-- 03 -->
        <div class="point-card" v-reveal.up="{ delay: 160 }">
          <div class="number-bg">03</div>
          <div class="flex items-center mb-2">
            <div class="point-icon-box"><i class="fas fa-clipboard-check"></i></div>
            <div>
              <h3 class="text-white font-bold text-base">운영 디테일</h3>
              <p class="text-gray-500 text-[10px] font-medium tracking-wide">OPERATION DETAIL</p>
            </div>
          </div>
          <div class="pl-1 space-y-1">
            <div class="feature-item"><div class="check-dot"></div><p class="text-gray-300 text-xs">파티 전문 호스트 전담 진행</p></div>
            <div class="feature-item"><div class="check-dot"></div><p class="text-gray-300 text-xs">다양한 사람을 만나는 자리 이동</p></div>
            <div class="feature-item"><div class="check-dot"></div><p class="text-gray-300 text-xs">네임택 &amp; 취향 스티커 제공</p></div>
          </div>
        </div>

        <!-- 04 Special -->
        <div class="point-card special-card mb-0" v-reveal.up="{ delay: 240 }">
          <div class="special-badge">SPECIAL</div>
          <div class="number-bg" style="color: rgba(0, 224, 198, 0.1);">04</div>
          <div class="flex items-center mb-2">
            <div class="point-icon-box" style="background-color: #00E0C6; color: #000;"><i class="fas fa-gift"></i></div>
            <div>
              <h3 class="text-white font-bold text-base">올나잇 스페셜</h3>
              <p class="text-[#00E0C6] text-[10px] font-medium tracking-wide">ONLY FOR TONIGHT</p>
            </div>
          </div>
          <div class="pl-1 space-y-1">
            <div class="feature-item"><i class="fas fa-star text-[#00E0C6] text-[8px] mr-2"></i><p class="text-white font-medium text-xs">베스트 매칭 &amp; 드레서 선물 증정</p></div>
            <div class="feature-item"><i class="fas fa-star text-[#00E0C6] text-[8px] mr-2"></i><p class="text-white font-medium text-xs">새해 첫 순간, 샴페인 토스트</p></div>
            <div class="feature-item"><i class="fas fa-star text-[#00E0C6] text-[8px] mr-2"></i><p class="text-white font-medium text-xs">추억을 남기는 폴라로이드 포토존</p></div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-3 pt-3 border-t border-gray-800 text-center flex-shrink-0">
        <p class="text-gray-500 font-hand text-lg" style="font-family: 'Nanum Pen Script', cursive;">
          "준비는 저희가 할게요, 즐거운 마음만 챙겨오세요!"
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.header-bg { position: absolute; top: 0; left: 0; width: 100%; height: 220px; background-color: #1a1a1a; border-bottom-left-radius: 40px; border-bottom-right-radius: 40px; z-index: 0; }
.content-wrapper { position: relative; z-index: 10; display: flex; flex-direction: column; height: 100%; padding: 30px 24px 20px 24px; }
.point-card { background-color: #1f1f1f; border: 1px solid #333; border-radius: 12px; padding: 14px; margin-bottom: 10px; position: relative; overflow: hidden; }
.point-icon-box { width: 36px; height: 36px; border-radius: 8px; background-color: rgba(0, 224, 198, 0.1); color: #00E0C6; display: flex; align-items: center; justify-content: center; font-size: 16px; margin-right: 12px; border: 1px solid rgba(0, 224, 198, 0.2); }
.special-card { background-color: rgba(0, 224, 198, 0.05); border: 1px solid #00E0C6; }
.special-badge { position: absolute; top: 0; right: 0; background-color: #00E0C6; color: #000; font-size: 9px; font-weight: 900; padding: 2px 8px; border-bottom-left-radius: 8px; }
.feature-item { display: flex; align-items: center; margin-bottom: 2px; }
.check-dot { width: 5px; height: 5px; background-color: #00E0C6; border-radius: 50%; margin-right: 8px; }
.number-bg { font-family: 'Black Han Sans', sans-serif; position: absolute; right: -5px; bottom: -15px; font-size: 60px; color: rgba(255, 255, 255, 0.03); pointer-events: none; line-height: 1; }
.neon-line { width: 40px; height: 3px; background-color: #00E0C6; margin-bottom: 12px; box-shadow: 0 0 8px rgba(0, 224, 198, 0.5); }
/* Hide scrollbar visuals if any */
::-webkit-scrollbar { width: 0; background: transparent; }
</style>
