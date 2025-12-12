<template>
  <!-- 1) 전체 배경은 단순 블랙 (고정 X) -->
  <div class="relative min-h-screen bg-black text-white">
    <!-- 2) 컨텐츠 래퍼 (가운데 카드) -->
    <div class="relative z-10 flex justify-center">
      <div
          class="m-auto flex min-h-screen w-full max-w-md flex-col overflow-hidden
          tablet:mt-[14px] tablet:rounded-t-[60px]
          tablet:ring-[14px] tablet:ring-white/20
          tablet:shadow-[0_10px_24px_0_rgba(0,0,0,0.35)] bg-black/65"
      >
        <!-- ★ 카드 안 뒤쪽에 고정 배경 이미지 (카드 폭 기준) -->
        <div
            class="fixed inset-0 z-[-2] mx-auto w-full max-w-md bg-cover bg-top"
            :style="cardBgStyle">
        </div>

        <!-- ★ 실제 컨텐츠: 브라우저 스크롤 사용 (overflow 제거) -->
        <div class="relative flex h-full flex-1 flex-col pt-4 pb-12 px-4">
          <!-- 상단 아이콘 바: 카드 안에서 처음 보이고 스크롤되며 위로 사라짐 (고정 아님) -->
          <div class="w-full">
            <div class="flex w-full items-center justify-between rounded-full bg-gradient-to-b from-black/75 to-black/0 backdrop-blur-sm pb-2 pt-2">
              <!-- Left: Share -->
              <button
                  type="button"
                  class="group relative isolate flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full bg-white text-black active:scale-[0.98]"
                  aria-label="공유"
                  @click="openShare"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 16V3" />
                  <path d="M7 8l5-5 5 5" />
                  <path d="M20 21H4a2 2 0 0 1-2-2v-7" />
                  <path d="M22 12v7a 2 2 0 0 1-2 2" />
                </svg>
                <div class="absolute inset-0 group-hover:bg-black/10" />
              </button>
              <!-- Right: Bell -->
              <button
                  type="button"
                  class="group relative isolate flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full bg-white text-black active:scale-[0.98]"
                  aria-label="알림"
                  @click="openNotif"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <div class="absolute inset-0 group-hover:bg-black/10" />
              </button>
            </div>
          </div>

          <!-- 최상단 로고 배너 -->
          <div class="relative flex w-full justify-center">
            <div class="mb-[10px] h-[375px] w-full overflow-hidden rounded-3xl border border-white/10 tablet:h-[520px]">
              <img
                  class="h-full w-full object-cover object-top"
                  :src="withBase('/images/logo.png')"
                  alt="Social It 로고"
                  :style="logoMaskStyle"
              />
            </div>
          </div>

          <!-- 상단 프로필/브랜드 영역 -->
          <header class="flex flex-col items-center font-sans">
            <div class="flex w-full flex-col items-center space-y-2 px-1">
              <div class="break-all text-center">
                <div class="inline-flex items-center justify-center gap-2">
                  <h1 class="text-[26px] font-bold leading-none">Social It</h1>
                  <span class="inline-flex">
                    <!-- verified badge -->
                    <svg width="26" height="26" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-[26px] w-[26px]">
                      <path d="M17.915 9.99688L19.7112 8.23887C20.2467 7.73196 19.997 6.8311 19.2947 6.66314L16.8474 6.03853L17.5373 3.61607C17.7323 2.91927 17.0752 2.26205 16.3787 2.45705L13.957 3.14716L13.3326 0.699079C13.1674 0.00771269 12.2565 -0.245139 11.7574 0.282361L10 2.09259L8.24263 0.2824C7.74927 -0.239123 6.83454 -0.000178003 6.66743 0.699118L6.04306 3.1472L3.62137 2.45708C2.92461 2.26201 2.26782 2.91947 2.46274 3.61611L3.15262 6.03857L0.705352 6.66317C0.00269399 6.83118 -0.246486 7.7322 0.288749 8.23887L2.08504 9.99688L0.288749 11.7548C-0.246721 12.2618 0.00296751 13.1626 0.705313 13.3306L3.15258 13.9552L2.4627 16.3777C2.26774 17.0745 2.92477 17.7317 3.62133 17.5367L6.04298 16.8466L6.66736 19.2946C6.84076 20.0202 7.74923 20.2328 8.24255 19.7114L10 17.9144L11.7574 19.7114C12.2457 20.2382 13.1632 20.0038 13.3326 19.2946L13.957 16.8466L16.3786 17.5367C17.0753 17.7318 17.7322 17.0743 17.5373 16.3777L16.8474 13.9552L19.2946 13.3306C19.9973 13.1625 20.2464 12.2616 19.7112 11.7548L17.915 9.99688Z" fill="#4881F7"/>
                      <path d="M8.58888 13.4774L5.72887 10.6881C5.55705 10.5206 5.55705 10.2489 5.72887 10.0813L6.35111 9.4744C6.52294 9.30681 6.80155 9.30681 6.97337 9.4744L8.90001 11.3534L13.0267 7.32881C13.1985 7.16123 13.4771 7.16123 13.6489 7.32881L14.2712 7.93568C14.443 8.10325 14.443 8.37495 14.2712 8.54254L9.21114 13.4774C9.0393 13.645 8.76071 13.645 8.58888 13.4774Z" fill="white"/>
                    </svg>
                  </span>
                </div>
              </div>

              <h2 class="text-center text-[20px] font-semibold">No.1 파티 브랜드</h2>

              <!-- 메인 이미지 -->
              <div class="mt-3 w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_10px_24px_0_rgba(0,0,0,0.35)]">
                <img
                    :src="withBase('/images/main.jpeg')"
                    alt="메인 이미지"
                    class="aspect-video w-full object-cover object-center cursor-zoom-in"
                    role="button"
                    tabindex="0"
                    @click="openMain"
                    @keydown.enter.prevent="openMain"
                    @keydown.space.prevent="openMain"
                />
              </div>
            </div>
          </header>

          <!-- 블록: 일정 타이틀 -->
          <div class="mt-6">
            <div class="mb-3 text-center text-[18px] font-semibold">Social It 일정</div>
          </div>

          <!-- 블록: 달력 + 일정 리스트 -->
          <section class="rounded-3xl bg-[#23232B] p-5 shadow-[0_10px_24px_0_rgba(0,0,0,0.35)] ring-1 ring-white/10">
            <!-- 월/연도 -->
            <div class="mb-4 flex items-center justify-center">
              <button type="button" aria-label="이전 달" class="p-2 text-white/80 hover:text-white" @click="prevMonth">
                <svg aria-hidden="true" viewBox="0 0 20 20" class="h-4 w-4" fill="currentColor"><path fill-rule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/></svg>
              </button>
              <div class="mx-4 text-[16px] font-medium text-white/90">{{ monthLabel }}</div>
              <button type="button" aria-label="다음 달" class="p-2 text-white/80 hover:text-white" @click="nextMonth">
                <svg aria-hidden="true" viewBox="0 0 20 20" class="h-4 w-4" fill="currentColor"><path fill-rule="evenodd" d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
              </button>
            </div>

            <!-- 요일 -->
            <div class="mb-1 grid grid-cols-7 text-center text-[12px] font-medium text-white/80">
              <span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>
            </div>

            <!-- 날짜 -->
            <div class="grid grid-cols-7 text-center">
              <div
                  v-for="(day, idx) in calendarDays"
                  :key="idx"
                  class="mb-[1px] inline-block"
              >
                <div
                    class="relative py-[5px] text-[14px] font-medium"
                    :class="day.inCurrent ? 'text-white/90' : 'text-white/40'"
                >
                  <span>{{ day.date.getDate() }}</span>
                  <span
                      v-if="day.isToday && day.inCurrent"
                      class="absolute top-[2.5px] left-1/2 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-red-500"
                      aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <!-- 일정 리스트 -->
            <div class="mt-4 rounded-3xl bg-black/25 p-3.5 ring-1 ring-white/10">
              <div class="flex flex-col space-y-2.5">
                <div v-for="item in visibleSchedules" :key="item.id" class="flex w-full items-center">
                  <div
                      class="mr-[15px] flex h-10 w-10 items-center justify-center rounded-full border text-[11px] font-medium leading-[0px]"
                      :class="item.status === '예약가능'
                      ? 'border-white/15 bg-white text-black'
                      : 'border-white/20 bg-transparent text-white/70'"
                  >
                    {{ item.status === '예약가능' ? '가능' : '종료' }}
                  </div>

                  <div class="flex w-0 flex-1 flex-col pr-[15px]">
                    <div class="text-[12px] leading-[1.2] text-white/60">{{ item.periodDotLabel }}</div>
                    <div class="break-all text-[14px] font-semibold">
                      <span>{{ item.startKLabel }}</span>
                      <span class="ml-2 text-white/80">{{ item.remain }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                  v-if="schedules.length > 4"
                  type="button"
                  class="mt-2.5 flex w-full items-center justify-center gap-1 text-white/75 hover:text-white"
                  @click="toggleSchedules"
                  :aria-expanded="isExpanded"
                  aria-controls="schedule-list"
              >
                <span class="text-xs">{{ isExpanded ? '접기' : '더 보기' }}</span>
                <span class="text-sm" :class="isExpanded ? 'rotate-180' : ''">▽</span>
              </button>
            </div>
          </section>

          <!-- 디바이더 -->
          <div class="my-8 h-px w-full bg-white/25" />

          <!-- 신청서 2열 카드 -->
          <section class="rounded-3xl bg-[#23232B] p-3.5 ring-1 ring-white/10 shadow-[0_10px_24px_0_rgba(0,0,0,0.35)]">
            <div class="grid grid-cols-2 gap-2.5">
              <a
                  href="https://forms.gle/uoWuLYuqofozUGiC9"
                  class="group block cursor-pointer"
                  target="_blank"
                  rel="noopener"
              >
                <div class="overflow-hidden rounded-2xl">
                  <img :src="withBase('/images/men.png')" alt="남성 신청" class="aspect-square w-full object-cover transition group-hover:scale-[1.02]" />
                </div>
                <div class="pt-2 font-sans">
                  <div class="line-clamp-2 break-all text-center text-[15px] font-medium">📩 남성 신청서 📩</div>
                </div>
              </a>

              <a
                  href="https://forms.gle/GjNHwwzKwiseshdB8"
                  class="group block cursor-pointer"
                  target="_blank"
                  rel="noopener"
              >
                <div class="overflow-hidden rounded-2xl">
                  <img :src="withBase('/images/women.png')" alt="여성 신청" class="aspect-square w-full object-cover transition group-hover:scale-[1.02]" />
                </div>
                <div class="pt-2 font-sans">
                  <div class="line-clamp-2 break-all text-center text-[15px] font-medium">📩 여성 신청서 📩</div>
                </div>
              </a>
            </div>
          </section>

          <!-- 소개1 -->
          <section class="mt-8">
            <div class="space-y-[5px] font-sans text-white">
              <div class="text-left">
                <h2 class="inline whitespace-pre-wrap break-all text-[18px] font-semibold">Social It</h2>
              </div>
              <div class="text-left">
                <h3 class="inline whitespace-pre-wrap break-all text-[14px] font-medium text-white/90">
                  1. 💖 심사 후 참가자 모집!
                  <br>
                  2. 매 파티에 다양한 직업군 참가! (모델, 외국인, 전문직 등)
                  <br>
                  3. 예쁘고 잘생긴 직원들의 분위기 메이킹! 😎
                  <br>
                  4. 음식점보다 퀄리티 있는 안주!! 💯
                  <br>
                  5. 공중파 방송 경험 많이 있는 MC의 진행 🎤
                </h3>
              </div>
            </div>
          </section>

          <div class="my-8 h-px w-full bg-white/25" />

          <!-- 소개2 -->
          <section class="rounded-3xl bg-[#23232B] p-5 ring-1 ring-white/10 shadow-[0_10px_24px_0_rgba(0,0,0,0.35)]">
            <div class="flex flex-col space-y-4 font-sans text-white">
              <div class="text-center">
                <p class="text-[16px] tablet:text-[18px] font-semibold whitespace-pre-wrap break-words">
                  하나의 공간, 하나의 주제, 그리고 최소 60명의 새로운 만남.
                </p>
                <p class="mt-2 text-[14px] tablet:text-[16px] font-medium text-white/90 whitespace-pre-wrap break-words">
                  우리는 단순한 파티를 넘어서, 사람과 사람이 연결되는

                  감각적이고 세련된 소셜 매칭 파티를 기획합니다.

                  대표가 직접 심사 후 파티 인원 확정합니다.
                </p>
              </div>

              <div class="text-left rounded-2xl bg-black/25 p-4 ring-1 ring-white/10">
                <ul class="space-y-2 text-[14px] tablet:text-[15px] text-white/90">
                  <li class="flex gap-2"><span class="shrink-0">🍽️</span><span><b class="font-semibold">안주</b>는 매 파티마다 다르게 맛있고 푸짐하게!</span></li>
                  <li class="flex gap-2"><span class="shrink-0">🥰</span><span><b class="font-semibold">식사</b> 하지말고 오세요</span></li>
                  <li class="flex gap-2"><span class="shrink-0">🍾</span><span>소주, 맥주, 하이볼, 음료 <b class="font-semibold">무한리필</b></span></li>
                  <li class="flex gap-2"><span class="shrink-0">🎉</span><span>남녀 비율 <b class="font-semibold">1:1</b> 정밀 조율</span></li>
                  <li class="flex gap-2"><span class="shrink-0">💬</span><span>자연스러운 대화와 연결을 돕는 <b class="font-semibold">맞춤형 프로그램</b></span></li>
                  <li class="flex gap-2"><span class="shrink-0">📸</span><span>감각적인 공간, 전문 MC, 차별된 컨텐츠까지 <b class="font-semibold">완벽한 분위기</b> 구성</span></li>
                  <li class="flex gap-2"><span class="shrink-0">💌</span><span>공중파 방송 MC 경험이 많은 <b class="font-semibold">전문 MC</b> 진행</span></li>
                  <li class="flex gap-2"><span class="shrink-0">❗</span><span>부담스럽지 않은 기획으로 걱정 마시고 오세요</span></li>
                </ul>
              </div>

              <div class="text-center">
                <p class="text-[16px] font-semibold">모두가 어색하지 않도록,</p>
                <p class="text-[16px] font-semibold">모두가 특별한 인연을 만들 수 있도록</p>
                <p class="mt-2 text-[14px] text-white/85">우리는 한 번의 만남도 허투루 만들지 않습니다.</p>
              </div>

              <div class="text-center">
                <p class="text-[18px] font-bold">[Social It] – 당신의 설렘이 시작되는 곳.</p>
                <p class="mt-1 text-[15px]">지금, 다음 파티에 초대합니다. 💌🍾</p>
              </div>
            </div>
          </section>

          <div class="my-8 h-px w-full bg-white/25" />

          <!-- 장소 + 지도 -->
          <section class="rounded-3xl bg-[#23232B] ring-1 ring-white/10 shadow-[0_10px_24px_0_rgba(0,0,0,0.35)] overflow-hidden">
            <div class="px-5 pt-5 pb-4 text-center">
              <h3 class="text-[18px] font-semibold">🎉 장소 🎉</h3>
              <p class="mt-2 text-[14px] text-white/90">구의역 4번 출구에서 도보로 10분 내</p>
              <p class="mt-1 text-[14px] text-white/90">{{ addressText }}</p>
            </div>

            <div class="relative">
              <iframe
                  class="h-[238px] w-full bg-black"
                  title="google-maps-embed"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  :src="mapEmbedUrl"
              />
            </div>

            <div class="flex items-center gap-2 px-4 py-3">
              <p class="flex-1 truncate text-[14px] font-medium text-white/90">{{ addressText }}</p>
              <button
                  type="button"
                  class="rounded-full bg-white/10 px-3 py-2 text-[12px] text-white hover:bg-white/15"
                  @click="copyAddress"
                  aria-label="주소 복사"
              >
                복사
              </button>
              <a
                  class="inline-flex items-center justify-center rounded-full bg-white px-3.5 py-2 text-[14px] font-medium text-black active:scale-[0.98]"
                  target="_blank"
                  rel="noopener"
                  :href="directionsUrl"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" class="mr-1 h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 21s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                길찾기
              </a>
            </div>
          </section>

          <!-- Notice -->
          <section class="mt-8 rounded-3xl bg-[#23232B] p-5 ring-1 ring-white/10 shadow-[0_10px_24px_0_rgba(0,0,0,0.35)] text-center">
            <h3 class="text-[18px] font-semibold">Notice</h3>
            <div class="mt-3 space-y-2 text-[14px] leading-relaxed text-white/85">
              <p>처음 오시는 분들이 대부분입니다.</p>
              <p>찰나의 용기가 여러분들의 인생을 변화 시킵니다.</p>
              <p>용기 내서 참여해 보세요. 후회 없는 시간 만들어드리겠습니다.</p>
              <p>언제든지 문의사항 있으시면 편하게 연락주세요 :))</p>
            </div>
          </section>

          <!-- 하단 SNS/연락 아이콘 -->
          <section class="mt-8 flex items-center justify-center gap-8 pb-6">
            <a
                class="text-white/90 hover:text-white"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/15">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="3.5" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </div>
            </a>
            <a
                class="text-white/90 hover:text-white"
                href="tel:01087978256"
                aria-label="전화"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/15">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.59 2.5a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.67-.67a2 2 0 0 1 2.11-.45c.8.27 1.64.47 2.5.59A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
            </a>

            <a
                class="text-white/90 hover:text-white"
                href="https://open.kakao.com/o/sqUACRFh"
                target="_blank"
                rel="noopener"
                aria-label="카카오톡"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/15">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 3C6.477 3 2 6.58 2 11c0 2.318 1.197 4.404 3.139 5.878L4 21l4.47-1.857C9.477 19.38 10.715 19.6 12 19.6c5.523 0 10-3.58 10-8S17.523 3 12 3z" />
                </svg>
              </div>
            </a>
          </section>

          <!-- 하단 로고 -->
          <div class="flex items-end justify-center pt-8">
            <img
                class="h-[46px] w-[137px] object-cover opacity-80"
                :src="withBase('/images/logo.png')"
                alt="footer logo"
                draggable="false"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 상단 고정 바 (스크롤 후 나타남) -->
    <div
        class="fixed top-[15px] left-1/2 z-30 w-full max-w-[355px] -translate-x-1/2 cursor-pointer rounded-[14px] bg-white/60 p-[10px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] tablet:max-w-[385px] transition-opacity duration-200"
        :class="showFixedBar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    >
      <div class="flex w-full items-center justify-between">
        <!-- 공유 -->
        <button
            type="button"
            class="group relative isolate flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full bg-black text-white hover:bg-black/80 active:scale-[0.98]"
            aria-label="공유"
            @click="openShare"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 16V3" />
            <path d="M7 8l5-5 5 5" />
            <path d="M20 21H4a2 2 0 0 1-2-2v-7" />
            <path d="M22 12v7a 2 2 0 0 1-2 2" />
          </svg>
        </button>

        <!-- 가운데 로고 이미지 -->
        <img
            class="h-[36px] w-[36px] rounded-full object-cover cursor-pointer"
            :src="withBase('/images/logo2.png')"
            alt="Social It"
            role="button"
            tabindex="0"
            @click="goTop"
            @keydown.enter.prevent="goTop"
            @keydown.space.prevent="goTop"
        />

        <!-- 알림 -->
        <button
            type="button"
            class="group relative isolate flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full bg-black text-white hover:bg-black/80 active:scale-[0.98]"
            aria-label="알림"
            @click="openNotif"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 공유 모달 -->
    <div
        v-if="showShare"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        @click="closeShare"
        aria-modal="true"
        role="dialog"
        aria-label="공유 모달"
    >
      <div
          class="relative w-full max-w-sm overflow-visible rounded-3xl text-white ring-1 ring-white/10 shadow-2xl"
          @click.stop
      >
        <!-- 닫기 버튼 -->
        <button
            class="absolute -top-12 left-1/2 -translate-x-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-md ring-1 ring-black/10 hover:bg-white/90 active:scale-[0.98]"
            aria-label="닫기"
            @click="closeShare"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18"/>
            <path d="M6 6l12 12"/>
          </svg>
        </button>

        <!-- 상단 섹션: 로고 + 링크 + 복사 -->
        <div class="relative px-4 pt-6 pb-5 text-white" :style="shareTopStyle">
          <div class="relative flex flex-col items-center">
            <div class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-black/60 ring-1 ring-white/10 shadow-inner">
              <img :src="withBase('/images/logo2.png')" alt="Social It" class="h-full w-full object-cover" />
            </div>

            <div class="mt-4 text-center">
              <div class="mx-auto max-w-[260px] truncate text-sm text-white/90">{{ shareLink }}</div>
              <button type="button" class="mt-2 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-black active:scale-[0.98]" @click="copyShareLink">
                <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                복사
              </button>
            </div>
          </div>
        </div>

        <!-- 하단 섹션: QR + 저장 -->
        <div class="bg-white text-black px-4 pt-5 pb-4">
          <div class="flex justify-center">
            <div class="rounded-2xl bg-white p-3 shadow">
              <img :src="qrUrl" alt="QR code" class="h-28 w-28 object-contain" />
            </div>
          </div>

          <div class="mt-4 grid grid-cols-1 gap-3">
            <button type="button" class="inline-flex items-center justify-center gap-2 rounded-xl bg-black text-white py-2 text-center text-sm hover:bg-black/85 active:scale-[0.98]" @click="saveQrPng">
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
              PNG 저장
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 알림 바텀 시트 -->
    <div
        v-if="showNotif"
        class="fixed inset-0 z-50 flex items-end bg-black/60"
        @click="closeNotif"
        aria-modal="true"
        role="dialog"
        aria-label="알림 구독 바텀 시트"
    >
      <!-- Sheet panel -->
      <div
          class="w-full rounded-t-3xl bg-white text-black shadow-2xl ring-1 ring-black/10"
          @click.stop
      >
        <!-- drag handle / close -->
        <div class="relative flex items-center justify-center pt-3">
          <div class="h-1.5 w-12 rounded-full bg-black/15" />
          <button
              class="absolute right-4 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-black hover:bg-black/10 active:scale-[0.98]"
              aria-label="닫기"
              @click="closeNotif"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18"/>
              <path d="M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="px-5 pb-6 pt-4">
          <!-- logo -->
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-black text-white ring-1 ring-black/10">
            <img :src="withBase('/images/logo2.png')" alt="Social It" class="h-full w-full object-cover" />
          </div>
          <h3 class="text-center text-[18px] font-semibold">Social It 구독하기</h3>
          <p class="mt-1 text-center text-[14px] text-black/60">중요한 소식을 빠르게 만나보세요!</p>

          <!-- email input -->
          <div class="mt-4">
            <input
                id="notif-email"
                v-model="notifEmail"
                type="email"
                placeholder="이메일을 적어주세요"
                class="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px] outline-none placeholder:text-black/40 focus:border-black/30"
            />
            <p v-if="notifEmailError" class="mt-1 text-[12px] text-red-500">유효하지 않은 이메일입니다.</p>
          </div>

          <!-- submit -->
          <button
              type="button"
              class="mt-4 w-full rounded-2xl py-3 text-[15px] font-semibold transition active:scale-[0.98]"
              :class="canSubmitNotif ? 'bg-black text-white' : 'bg-black/20 text-black/40'"
              :disabled="!canSubmitNotif"
              @click="submitNotif"
          >
            구독
          </button>
          <!-- 동의 문구: 중앙 정렬 + 굵게 -->
          <label
              class="mt-4 flex flex-col items-center justify-center gap-1 text-center text-[10px] font-medium text-black/80 select-none"
          >
        <span class="inline-flex items-center justify-center gap-2">
          <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              class="h-4 w-4 text-black/80"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>[필수] 개인정보 수집 및 이용과 광고성 정보 수신 동의</span>
        </span>
          </label>
        </div>
      </div>
    </div>

    <!-- 메인 이미지 확대 모달 -->
    <div
        v-if="showMain"
        class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        @click="closeMain"
        aria-modal="true"
        role="dialog"
        aria-label="메인 이미지 확대 보기"
    >
      <img
          :src="withBase('/images/main.jpeg')"
          alt="party room enlarged"
          class="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
          @click.stop
          draggable="false"
      />
      <button
          class="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-md hover:bg-white/90 active:scale-[0.98]"
          aria-label="닫기"
          @click.stop="closeMain"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18"/>
          <path d="M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import rawSchedules from '../data/schedules.json'

// ---- BaseURL-aware asset helper & 배경 ----
const runtimeCfg = useRuntimeConfig()
const appCfg = runtimeCfg.app
const publicCfg = (runtimeCfg as any).public || {}
const subscribeEndpoint: string = publicCfg.subscribeEndpoint || '/.netlify/functions/subscribe'
function withBase(path: string) {
  const base = (appCfg && appCfg.baseURL) ? (appCfg.baseURL as string) : '/'
  // ensure one slash between base and path
  return `${base.replace(/\/$/, '')}${path}`
}

const cardBgStyle = computed(() => ({
  backgroundImage: `url('${withBase('/images/bg.png')}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'top',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
}))

// Top logo banner mask
const logoMaskStyle = computed(() => ({
  maskImage: 'linear-gradient(rgb(0,0,0) 80%, rgba(0,0,0,0))',
  WebkitMaskImage: 'linear-gradient(rgb(0,0,0) 80%, rgba(0,0,0,0))',
}))

// Share modal top background: solid dark (no gradient)
const shareTopStyle = computed(() => ({
  backgroundColor: 'rgba(30,30,30,0.95)',
}))

// ---- Main image modal ----
const showMain = ref(false)
function openMain() {
  showMain.value = true
  lockScroll(true)
}
function closeMain() {
  showMain.value = false
  lockScroll(false)
}
function lockScroll(lock: boolean) {
  if (typeof window === 'undefined') return
  const html = document.documentElement
  html.style.overflow = lock ? 'hidden' : ''
}

// ---- Share modal ----
const showShare = ref(false)
const shareLink = location?.href ?? ''
const qrUrl = computed(() => {
  // use Google Chart API-like QR service via api.qrserver
  const encoded = encodeURIComponent(shareLink)
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encoded}`
})
function openShare() {
  showShare.value = true
  lockScroll(true)
}
function closeShare() {
  showShare.value = false
  lockScroll(false)
}
async function copyShareLink() {
  try {
    await navigator.clipboard.writeText(shareLink)
  } catch (e) {
    // ignore if clipboard unavailable
  }
}

// Download QR code as PNG
async function saveQrPng() {
  try {
    const url = qrUrl.value
    const res = await fetch(url, { mode: 'cors', cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch QR image')
    const blob = await res.blob()
    const objectUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = 'social-it-qr.png'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(objectUrl)
  } catch (e) {
    // Fallback: open QR in new tab if download fails
    try {
      window.open(qrUrl.value, '_blank')
    } catch {}
  }
}

// ---- Fixed top bar visibility on scroll ----
const showFixedBar = ref(false)
let scrollHandler: (() => void) | null = null
onMounted(() => {
  scrollHandler = () => {
    showFixedBar.value = window.scrollY > 220
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
  scrollHandler()
})
onBeforeUnmount(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})

// Scroll to top when clicking fixed-bar center logo
function goTop() {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ---- Calendar state ----
const today = new Date()
const displayedMonth = ref(new Date(today.getFullYear(), today.getMonth(), 1))

const monthLabel = computed(() => {
  const y = displayedMonth.value.getFullYear()
  const m = displayedMonth.value.getMonth() + 1
  const mm = m < 10 ? `0${m}` : `${m}`
  return `${y}.${mm}`
})

interface CalendarDay {
  date: Date
  inCurrent: boolean
  isToday: boolean
}

const calendarDays = computed<CalendarDay[]>(() => {
  const year = displayedMonth.value.getFullYear()
  const month = displayedMonth.value.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const startDayOfWeek = firstOfMonth.getDay()

  const startDate = new Date(firstOfMonth)
  startDate.setDate(firstOfMonth.getDate() - startDayOfWeek)

  const days: CalendarDay[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(startDate)
    d.setDate(startDate.getDate() + i)
    const inCurrent = d.getMonth() === month
    const isToday =
        d.getFullYear() === today.getFullYear() &&
        d.getMonth() === today.getMonth() &&
        d.getDate() === today.getDate()
    days.push({ date: d, inCurrent, isToday })
  }
  return days
})

function prevMonth() {
  const y = displayedMonth.value.getFullYear()
  const m = displayedMonth.value.getMonth()
  displayedMonth.value = new Date(y, m - 1, 1)
}

function nextMonth() {
  const y = displayedMonth.value.getFullYear()
  const m = displayedMonth.value.getMonth()
  displayedMonth.value = new Date(y, m + 1, 1)
}

// ---- Schedules ----
interface RawSchedule {
  id: number
  startDate: string
  endDate: string
  remain: string
}

function formatDotDate(d: Date): string {
  const m = d.getMonth() + 1
  const mm = m < 10 ? `0${m}` : `${m}`
  const dd = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`
  let h = d.getHours()
  const am = h < 12
  const period = am ? '오전' : '오후'
  h = h % 12
  if (h === 0) h = 12
  return `${mm}.${dd} (${period} ${h}시)`
}

function toYMD(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
}

const schedules = computed(() => {
  const now = new Date()
  const todayYmd = toYMD(now)

  return (rawSchedules as RawSchedule[]).map((s) => {
    const start = new Date(s.startDate)
    const end = new Date(s.endDate)
    const startYmd = toYMD(start)

    const status: '예약가능' | '예약종료' = startYmd > todayYmd ? '예약가능' : '예약종료'

    const periodDotLabel = `${formatDotDate(start)} ~ ${formatDotDate(end)}`
    const startKLabel = `${start.getMonth() + 1}월 ${start.getDate()}일`

    return {
      ...s,
      status,
      periodDotLabel,
      startKLabel,
    }
  })
})

const isExpanded = ref(false)
const visibleSchedules = computed(() =>
    isExpanded.value ? schedules.value : schedules.value.slice(0, 4),
)
function toggleSchedules() {
  isExpanded.value = !isExpanded.value
}

// ---- Location actions ----
const addressText = '대한민국 서울특별시 광진구 자양로6길 5'
const directionsUrl = computed(() =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressText)}`,
)
const mapEmbedUrl = computed(() =>
    `https://maps.google.com/maps?t=&z=14&ie=UTF8&iwloc=&output=embed&q=${encodeURIComponent(addressText)}`,
)

async function copyAddress() {
  try {
    await navigator.clipboard.writeText(addressText)
  } catch {
    // clipboard 권한 없을 때는 무시
  }
}
// ---- Notification bottom sheet state ----
const showNotif = ref(false)
const notifEmail = ref('')

const emailValid = computed(() => {
  const email = notifEmail.value.trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
})
const notifEmailError = computed(() => notifEmail.value.trim().length > 0 && !emailValid.value)

const canSubmitNotif = computed(() => emailValid.value)

function openNotif() {
  showNotif.value = true
  lockScroll(true)
  setTimeout(() => {
    try {
      const el = document.getElementById('notif-email')
      el?.focus()
    } catch {}
  }, 0)
}
function closeNotif() {
  showNotif.value = false
  lockScroll(false)
}
async function submitNotif() {
  if (!canSubmitNotif.value) return
  const email = notifEmail.value.trim()

  try {
    const res = await fetch(subscribeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok && (data?.ok !== false)) {
      // success
      closeNotif()
      setTimeout(() => { notifEmail.value = '' }, 200)
    } else {
      alert(data?.message || '구독 실패')
    }
  } catch (e) {
    alert('오류가 발생했습니다')
  }
}
</script>
