<template>
  <section class="bg-[#111] font-['Noto_Sans_KR'] px-6 py-10">
    <!-- Top Section -->
    <div class="text-center mb-8 mt-6" v-reveal.down>
      <p class="text-[#00E0C6] font-bold tracking-widest text-sm mb-2">SOCIAL IT PARTY</p>
      <h1 class="text-4xl font-medium text-white leading-tight mb-4" style="font-family: 'Black Han Sans', sans-serif;">
        망설이는 순간,<br />
        <span class="text-[#00E0C6]">마감</span>됩니다!
      </h1>
      <p class="text-gray-400 text-sm">올해의 마지막 밤, 좋은 사람들과 함께하세요.</p>
    </div>

    <!-- Summary Info -->
    <div class="info-summary" v-reveal.up>
      <div class="summary-item">
        <i class="far fa-calendar-alt text-[#00E0C6] text-xl mb-2"></i>
        <p class="text-white font-bold text-sm">12.31(수)</p>
        <p class="text-gray-500 text-xs">20:00</p>
      </div>
      <div class="w-px bg-gray-700"></div>
      <div class="summary-item">
        <i class="fas fa-map-marker-alt text-[#00E0C6] text-xl mb-2"></i>
        <p class="text-white font-bold text-sm">공간나인</p>
        <p class="text-gray-500 text-xs">건대입구</p>
      </div>
      <div class="w-px bg-gray-700"></div>
      <div class="summary-item">
        <i class="fas fa-users text-[#00E0C6] text-xl mb-2"></i>
        <p class="text-white font-bold text-sm">30~40명</p>
        <p class="text-gray-500 text-xs">대규모</p>
      </div>
    </div>

    <!-- Main CTA: Split Buttons -->
    <div class="mb-10 animate-bounce-small" v-reveal.up="{ delay: 100 }">
      <div class="flex gap-4">
        <a
          class="cta-button male-btn"
          href="https://forms.gle/uMXrT8X6uRsqUMn39"
          target="_blank"
          rel="noopener"
          aria-label="남성 신청 구글 폼"
        >
          <span class="mr-2">남성 신청</span><i class="fas fa-mars text-xl"></i>
        </a>
        <a
          class="cta-button female-btn"
          href="https://forms.gle/EFi7iTYKMkjyWaWBA"
          target="_blank"
          rel="noopener"
          aria-label="여성 신청 구글 폼"
        >
          <span class="mr-2">여성 신청</span><i class="fas fa-venus text-xl"></i>
        </a>
      </div>
      <p class="text-center text-gray-500 text-xs mt-3">* 선착순 마감 시 신청이 불가능할 수 있습니다.</p>
    </div>

    <!-- Q&A Section -->
    <div>
      <h3 class="text-white font-bold text-xl mb-4 flex items-center" v-reveal.down>
        <i class="far fa-question-circle text-[#00E0C6] mr-2"></i>
        자주 묻는 질문 &amp; 문의
      </h3>
      <div class="qna-box" v-reveal.up>
        <div class="qna-item">
          <div class="question"><span class="q-icon">Q</span><p>혼자 참여해도 괜찮나요?</p></div>
          <div class="answer">
            <p>물론입니다! 참가자의 약 80%가 혼자 오십니다.<br/>어색하지 않게 호스트가 케어해드립니다.</p>
          </div>
        </div>
        <div class="qna-item">
          <div class="question"><span class="q-icon">Q</span><p>문의사항이 있어요!</p></div>
          <div class="answer">
            <p>궁금한 점은 언제든 편하게 물어보세요.<br/>친절하게 답변해 드리겠습니다.</p>
            <a class="kakao-btn" href="http://pf.kakao.com/_xlxiTQn/chat" role="button" target="_blank" rel="noopener">
              <i class="fas fa-comment mr-2 text-[#3C1E1E]"></i> 카카오톡 채널 문의하기
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-8 pt-6 text-center border-t border-gray-800" v-reveal.up>
      <p class="text-gray-600 text-xs">© 2025 SOCIAL IT. All rights reserved.</p>
    </div>
  </section>
</template>

<style scoped>
.highlight-text { color: #00E0C6; }
/* Base CTA button */
.cta-button { background-color: #00E0C6; color: #000; font-family: 'Black Han Sans', sans-serif; font-size: 24px; padding: 20px 0; border-radius: 16px; text-align: center; box-shadow: 0 0 20px rgba(0, 224, 198, 0.4); border: 2px solid #fff; transition: all 0.3s ease; position: relative; overflow: hidden; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; flex: 1; }
.cta-button:hover { transform: translateY(-2px); box-shadow: 0 0 30px rgba(0, 224, 198, 0.6); }
/* Variant: Male (blue) */
.cta-button.male-btn { background-color: #3B82F6; color: #fff; box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
.cta-button.male-btn:hover { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
/* Variant: Female (pink) */
.cta-button.female-btn { background-color: #EC4899; color: #fff; box-shadow: 0 0 20px rgba(236, 72, 153, 0.4); }
.cta-button.female-btn:hover { box-shadow: 0 0 30px rgba(236, 72, 153, 0.6); }
@keyframes bounce-small { 0%,100%{transform: translateY(0);} 50%{transform: translateY(-5px);} }
.animate-bounce-small { animation: bounce-small 2s infinite; }
.qna-box { background-color: #1f1f1f; border-radius: 16px; border: 1px solid #333; padding: 24px; margin-top: 10px; }
.qna-item { margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 20px; }
.qna-item:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
.question { display: flex; align-items: center; color: white; font-weight: 700; margin-bottom: 8px; font-size: 16px; }
.answer { color: #9ca3af; font-size: 14px; line-height: 1.6; padding-left: 28px; }
.q-icon { color: #00E0C6; font-weight: 900; margin-right: 12px; font-size: 18px; }
.info-summary { background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 20px; margin-bottom: 30px; display: flex; justify-content: space-around; border: 1px solid #333; }
.summary-item { text-align: center; }
.kakao-btn { background-color: #FEE500; color: #191919; padding: 14px; border-radius: 12px; text-align: center; margin-top: 16px; font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; transition: all 0.2s; border: none; box-shadow: 0 4px 6px rgba(0,0,0,0.2); cursor: pointer; text-decoration: none; width: 100%; }
.kakao-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 12px rgba(0,0,0,0.3); background-color: #FFEB00; }
</style>
