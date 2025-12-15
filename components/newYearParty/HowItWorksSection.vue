
<template>
  <section class="px-6 pt-10 pb-6 bg-[#111]">
    <!-- Header Section -->
    <div class="mb-8 flex-shrink-0">
      <div class="header-pill inline-flex items-center px-6 py-2 mb-4" v-reveal.down>
        <h1 class="text-xl font-medium text-gray-900" style="font-family: 'Black Han Sans', sans-serif;">
          어떻게 진행되나요?
        </h1>
        <i class="fas fa-search ml-3 text-gray-400"></i>
      </div>

      <div class="text-white space-y-2">
        <p class="text-3xl font-bold">
          <span class="underline-highlight">약 3시간</span>으로
        </p>
        <p class="text-3xl font-bold">알차게 진행돼요!</p>
      </div>

      <p class="text-gray-400 mt-3 font-medium" style="font-family: 'Nanum Pen Script', cursive; font-size: 24px;">
        "지루할 틈 없이 꽉 채운 올나잇 파티"
      </p>
    </div>

    <!-- Main Grid Content -->
    <div class="flex-1 flex flex-col justify-center min-h-0">
      <div class="grid grid-cols-2 gap-4 pb-5">
        <div v-for="(i, idx) in items" :key="i.title" class="info-card" v-reveal.up="{ delay: idx * 80 }">
          <div class="icon-circle">
            <i :class="[i.icon, 'text-2xl']" style="color:#00E0C6;"></i>
          </div>
          <h3 class="text-white font-bold text-lg mb-2">{{ i.title }}</h3>
          <p class="text-gray-400 text-sm leading-relaxed" v-html="i.desc" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  { title: '컨셉', icon: 'fas fa-bell', desc: '종소리와 함께<br/>새해 인연을 만나요' },
  { title: '규모', icon: 'fas fa-user-friends', desc: '성비 맞춤 30~40명<br/>대규모 연말 파티' },
  { title: '프로그램', icon: 'fas fa-hourglass-half', desc: '본행사 3시간 +<br/>카운트다운 + α' },
  { title: '제공', icon: 'fas fa-cocktail', desc: '쏘토닉 &amp;<br/>맛있는 핑거푸드' },
  { title: '분위기', icon: 'fas fa-random', desc: '좌석 이동 &amp;<br/>다양한 대화카드' },
  { title: '포토', icon: 'fas fa-camera', desc: '뉴이어 포토존 &amp;<br/>네온 사인' },
]
</script>

<style scoped>
.header-pill {
  background-color: #ffffff;
  border-radius: 9999px;
  border: 2px solid #00E0C6;
  box-shadow: 0 4px 0 #00E0C6;
}

.info-card {
  background-color: #1f1f1f;
  border-radius: 16px;
  padding: 24px 16px;
  border: 1px solid #333;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.info-card:hover { transform: translateY(-2px); }

.icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  background-color: rgba(0, 224, 198, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}

.underline-highlight {
  position: relative;
  display: inline-block;
  z-index: 1;
}
.underline-highlight::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: #00E0C6;
  z-index: -1;
  opacity: 0.6;
}
</style>
