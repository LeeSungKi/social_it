<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-blue-600 flex items-center justify-center p-4">
    <div class="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4 border border-white/50">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
          Shins Party
        </h1>
        <p class="text-gray-600 text-lg">참가신청하세요!</p>
      </div>
      <div class="space-y-4">
        <!-- Google Forms iframe (YOUR_FORM_ID 교체 필요) -->
        <iframe
            src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
            width="100%"
            height="500"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            class="rounded-xl"
        >
          참가신청 폼을 로드하는 중...
        </iframe>
        <div class="text-xs text-gray-500 text-center">
          © 2025 Shins Party
        </div>
      </div>
    </div>
  </div>
</template>
