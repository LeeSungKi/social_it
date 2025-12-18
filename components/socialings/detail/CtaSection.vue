<script setup lang="ts">
const props = defineProps<{ maleForm?: string; femaleForm?: string; heading?: string; note?: string }>()

const maleUrl = props.maleForm || 'https://forms.gle/uMXrT8X6uRsqUMn39'
const femaleUrl = props.femaleForm || 'https://forms.gle/EFi7iTYKMkjyWaWBA'
</script>

<template>
  <section class="py-10">
    <div class="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6">
      <div class="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 text-center">
        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold">{{ props.heading || '참가 신청' }}</h2>
        <p class="mt-2 text-sm sm:text-base text-white/70">본인 성별에 맞는 신청서를 선택해 주세요.</p>
        <div class="mt-5 flex flex-row flex-wrap items-center justify-center gap-4">
          <a
            :href="maleUrl"
            target="_blank"
            rel="noopener"
            aria-label="남성 신청"
            class="inline-flex items-center justify-center rounded-2xl bg-blue-500 text-white px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl font-extrabold tracking-tight shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:bg-blue-400 transition flex-1 min-w-[140px] sm:min-w-[180px]"
          >
            <span class="mr-2">남성 신청</span>
            <i class="fas fa-mars text-xl md:text-2xl"></i>
          </a>
          <a
            :href="femaleUrl"
            target="_blank"
            rel="noopener"
            aria-label="여성 신청"
            class="inline-flex items-center justify-center rounded-2xl bg-pink-500 text-white px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl font-extrabold tracking-tight shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:bg-pink-400 transition flex-1 min-w-[140px] sm:min-w-[180px]"
          >
            <span class="mr-2">여성 신청</span>
            <i class="fas fa-venus text-xl md:text-2xl"></i>
          </a>
        </div>
        <p class="mt-3 text-xs sm:text-sm text-white/50">{{ props.note || '* 선착순 마감 시 신청이 제한될 수 있습니다.' }}</p>
      </div>
    </div>
  </section>
</template>
