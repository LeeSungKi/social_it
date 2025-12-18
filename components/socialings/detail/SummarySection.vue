<script setup lang="ts">
// Props can be extended later; for MVP we show static info blocks
</script>

<template>
  <section class="py-8">
    <div class="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold mb-4 md:mb-6">요약 정보</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-sm md:text-base">
        <div class="rounded-2xl bg-white/5 border border-white/10 p-4 md:p-5">
          <p class="text-white/70">일시</p>
          <p class="mt-1 font-semibold">12.31(수) 20:00 - 01:00</p>
        </div>
        <div class="rounded-2xl bg-white/5 border border-white/10 p-4 md:p-5">
          <p class="text-white/70">장소</p>
          <p class="mt-1 font-semibold">아차산로29길 28 지하1층</p>
        </div>
        <div class="rounded-2xl bg-white/5 border border-white/10 p-4 md:p-5">
          <p class="text-white/70">드레스 코드</p>
          <p class="mt-1 font-semibold">캐주얼</p>
        </div>
        <div class="rounded-2xl bg-white/5 border border-white/10 p-4 md:p-5">
          <p class="text-white/70">분위기</p>
          <p class="mt-1 font-semibold">자연스러운 대화 · 레크레이션</p>
        </div>
      </div>
    </div>
  </section>
</template>
