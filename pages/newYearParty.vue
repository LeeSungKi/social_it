
<template>
  <div class="w-full min-h-screen flex justify-center bg-gray-900">
    <main class="w-full max-w-[456px] bg-[#111] text-white overflow-x-hidden font-['Noto_Sans_KR']">
      <HeroSection v-reveal.down />
      <HowItWorksSection v-reveal.up="{ delay: 100 }" />
      <TimelineSection v-reveal.up="{ delay: 150 }" />
      <TargetSection v-reveal.up="{ delay: 150 }" />
      <ScheduleLocationSection v-reveal.up="{ delay: 150 }" />
      <RecommendSection v-reveal.up="{ delay: 150 }" />
      <EventPointSection v-reveal.up="{ delay: 150 }" />
      <BrandSection v-reveal.up="{ delay: 150 }" />
      <ReviewSection v-reveal.up="{ delay: 150 }" />
      <CtaSection v-reveal.up="{ delay: 100 }" />
    </main>
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/newYearParty/HeroSection.vue'
import HowItWorksSection from '~/components/newYearParty/HowItWorksSection.vue'
import TimelineSection from '~/components/newYearParty/TimelineSection.vue'
import TargetSection from '~/components/newYearParty/TargetSection.vue'
import ScheduleLocationSection from '~/components/newYearParty/ScheduleLocationSection.vue'
import RecommendSection from '~/components/newYearParty/RecommendSection.vue'
import EventPointSection from '~/components/newYearParty/EventPointSection.vue'
import BrandSection from '~/components/newYearParty/BrandSection.vue'
import ReviewSection from '~/components/newYearParty/ReviewSection.vue'
import CtaSection from '~/components/newYearParty/CtaSection.vue'
</script>
