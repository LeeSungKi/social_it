import type { SocialingConfig } from './types'

const newYearParty: SocialingConfig = {
  slug: 'new-year-party',
  title: '굿바이 2025 , 웰컴 2026 [인연 파티]',
  // Summary card info for index page
  card: {
    title: '굿바이 2025 , 웰컴 2026 [인연 파티]',
    desc: '신년 카운트 다운과 함께하는 따뜻한 소셜링',
    href: '/socialings/new-year-party',
    slides: [
      '/images/newYearParty/newYearParty01.png',
      '/images/newYearParty/newYearParty02.png',
      '/images/newYearParty/newYearParty03.png',
    ],
    badge: '진행중',
  },
  sections: [
    {
      key: 'hero',
      props: {
        title: '굿바이 2025 , 웰컴 2026 [인연 파티]',
        subtitle: '감각적인 공간에서 시작되는 새로운 만남',
        slides: [
          '/images/newYearParty/newYearParty01.png',
          '/images/newYearParty/newYearParty02.png',
          '/images/newYearParty/newYearParty03.png',
        ],
      },
    },
    {
      key: 'description',
      props: {
        html: `
        <p>"올해의 마지막 순간, 누구와 보내시나요?"</p>
        <p>혼자 보내기엔 아쉽고, 매번 똑같은 모임은 지루하다면!</p>
        <p>건대입구 핫플레이스에서 좋은 사람들과 함께<br />2026년 첫 카운트다운을 외쳐요! 🗣️💕</p>
        <p>2025년의 아쉬움은 털어내고,<br />2026년의 설렘을 함께 나눌<br />새로운 인연을 기다립니다. 🥂</p>
        <div class="pt-1">
          <p class="font-semibold text-white">🍹 Party Menu 가볍게 취하고, 기분 좋게 즐기는 메뉴들로 준비했습니다.</p>
          <p class="mt-2">주류: 황금비율 쏘토닉 (소주+토닉워터) 🍋</p>
          <p class="mt-1">안주: 쏘토닉과 찰떡궁합! 핑거푸드 라인업 🍪🥓</p>
          <p class="mt-1">음료: 주스, 탄산음료 (술 못 드셔도 OK!)</p>
          <p class="mt-1">💖 좋아하는 술이나 음식이 있다면? 환영! 언제든 가져오셔도 됩니다.</p>
        </div>
        <div class="pt-1">
          <p class="font-semibold text-white">⏰모임시작 20시!!!</p>
          <p class="mt-1">1차 러닝타임(180분)</p>
          <p class="mt-1">2차 러닝타임(120분)</p>
        </div>
        `,
        images: [
          '/images/newYearParty/details/newYearParty04.png',
          '/images/newYearParty/details/newYearParty05.png',
          '/images/newYearParty/details/newYearParty06.png',
        ],
      },
    },
    {
      key: 'info',
      props: {
        dates: ['25.12.31(수) 오후 8:00'],
        addressText: '대한민국 서울특별시 광진구 아차산로29길 28',
        placeName: '공간나인 파티룸',
        placeSub: '서울 광진구 화양동 9-43 지하1층 · 건대입구역 도보 5분',
      },
    },
    {
      key: 'cta',
      props: {
        maleForm: 'https://forms.gle/uMXrT8X6uRsqUMn39',
        femaleForm: 'https://forms.gle/EFi7iTYKMkjyWaWBA',
      },
    },
  ],
}

export default newYearParty
