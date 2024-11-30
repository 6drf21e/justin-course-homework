<template>
  <div>
    <SectionHero
      title="选择您的座驾"
      subtitle="三种配置 为您所想"
      bgImage="car3.jpg"
    >
      <div class="max-w-3xl mx-auto text-center">
        <p class="mt-6 text-2xl font-medium text-white">
          匠心打造的三种配置，从基础版到旗舰版
        </p>
        <p class="mt-4 text-xl text-white/90">满足您对豪华与性能的不同追求</p>
        <div class="mt-12 flex flex-wrap justify-center gap-8">
          <div class="flex items-center text-white text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>百公里加速低至3.9秒</span>
          </div>
          <div class="flex items-center text-white text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>纯电续航里程可达600km</span>
          </div>
          <div class="flex items-center text-white text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>30分钟快充80%</span>
          </div>
        </div>
        <div class="mt-16">
          <UiBaseButton type="primary" @click="scrollToPrice">
            查看详细配置
          </UiBaseButton>
        </div>
        <div class="mt-16 animate-bounce flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </SectionHero>

    <div
      id="price-section"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative -mt-32 z-10"
    >
      <div class="sm:text-center mb-16">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          大米汽车系列
        </h2>
        <p class="mt-4 text-lg text-gray-300">三种配置方案，满足您的不同需求</p>
      </div>

      <!-- PC端价格卡片 -->
      <div class="hidden md:flex mt-16 space-x-8 justify-center items-center">
        <!-- 基础版 -->
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden w-96 transform hover:scale-105 transition-transform duration-300 backdrop-blur-lg bg-opacity-95"
        >
          <div class="px-6 py-8">
            <h3 class="text-2xl font-semibold text-gray-900">基础版</h3>
            <p class="mt-4 text-gray-500">适合入门用户的理想之选</p>
            <p class="mt-8">
              <span class="text-4xl font-extrabold text-gray-900">29.99</span>
              <span class="text-xl font-medium text-gray-500">万起</span>
            </p>
            <div class="mt-8 space-y-4">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">续航里程450km</span>
              </div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">百公里加速5.9秒</span>
              </div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">12.3寸悬浮中控屏</span>
              </div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">L2级智能驾驶</span>
              </div>
            </div>
            <button
              class="mt-8 w-full bg-gray-800 text-white rounded-md py-3 hover:bg-gray-700 transition-colors"
            >
              了解详情
            </button>
          </div>
        </div>

        <!-- 豪华版（突出显示） -->
        <div
          class="bg-white rounded-lg shadow-xl overflow-hidden w-96 transform scale-110 backdrop-blur-lg bg-opacity-95"
        >
          <div class="bg-orange-500 px-6 py-3">
            <span class="text-white text-sm font-semibold">推荐配置</span>
          </div>
          <div class="px-6 py-8">
            <h3 class="text-2xl font-semibold text-gray-900">豪华版</h3>
            <p class="mt-4 text-gray-500">最受欢迎的完美平衡之选</p>
            <p class="mt-8">
              <span class="text-4xl font-extrabold text-gray-900">39.99</span>
              <span class="text-xl font-medium text-gray-500">万起</span>
            </p>
            <div class="mt-8 space-y-4">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">续航里程520km</span>
              </div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">百公里加速4.9秒</span>
              </div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">15.6寸悬浮中控屏</span>
              </div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">L2+级智能驾驶</span>
              </div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">全景天窗</span>
              </div>
            </div>
            <button
              class="mt-8 w-full bg-orange-500 text-white rounded-md py-3 hover:bg-orange-400 transition-colors"
            >
              了解详情
            </button>
          </div>
        </div>

        <!-- 旗舰版 -->
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden w-96 transform hover:scale-105 transition-transform duration-300 backdrop-blur-lg bg-opacity-95"
        >
          <div class="px-6 py-8">
            <h3 class="text-2xl font-semibold text-gray-900">旗舰版</h3>
            <p class="mt-4 text-gray-500">追求极致性能的理想之选</p>
            <p class="mt-8">
              <span class="text-4xl font-extrabold text-gray-900">59.99</span>
              <span class="text-xl font-medium text-gray-500">万起</span>
            </p>
            <div class="mt-8 space-y-4">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">续航里程600km</span>
              </div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">百公里加速3.9秒</span>
              </div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">17寸悬浮中控屏</span>
              </div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">L3级智能驾驶</span>
              </div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">NOMI智能助手</span>
              </div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-gray-600">23扬声器音响系统</span>
              </div>
            </div>
            <button
              class="mt-8 w-full bg-gray-800 text-white rounded-md py-3 hover:bg-gray-700 transition-colors"
            >
              了解详情
            </button>
          </div>
        </div>
      </div>

      <!-- 移动端价格卡片 -->
      <div class="md:hidden mt-16 space-y-8">
        <!-- 推荐版（移动端第一位） -->
        <div
          class="bg-white rounded-lg shadow-xl overflow-hidden backdrop-blur-lg bg-opacity-95"
        >
          <div class="bg-orange-500 px-6 py-3">
            <span class="text-white text-sm font-semibold">推荐配置</span>
          </div>
          <div class="px-6 py-8">
            <h3 class="text-2xl font-semibold text-gray-900">豪华版</h3>
            <p class="mt-4 text-gray-500">最受欢迎的完美平衡之选</p>
            <p class="mt-8">
              <span class="text-4xl font-extrabold text-gray-900">39.99</span>
              <span class="text-xl font-medium text-gray-500">万起</span>
            </p>
            <button
              class="mt-8 w-full bg-orange-500 text-white rounded-md py-3 hover:bg-orange-400 transition-colors"
            >
              了解详情
            </button>
          </div>
        </div>

        <!-- 基础版 -->
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden backdrop-blur-lg bg-opacity-95"
        >
          <div class="px-6 py-8">
            <h3 class="text-2xl font-semibold text-gray-900">基础版</h3>
            <p class="mt-4 text-gray-500">适合入门用户的理想之选</p>
            <p class="mt-8">
              <span class="text-4xl font-extrabold text-gray-900">29.99</span>
              <span class="text-xl font-medium text-gray-500">万起</span>
            </p>
            <button
              class="mt-8 w-full bg-gray-800 text-white rounded-md py-3 hover:bg-gray-700 transition-colors"
            >
              了解详情
            </button>
          </div>
        </div>

        <!-- 顶配版 -->
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden backdrop-blur-lg bg-opacity-95"
        >
          <div class="px-6 py-8">
            <h3 class="text-2xl font-semibold text-gray-900">旗舰版</h3>
            <p class="mt-4 text-gray-500">追求极致性能的理想之选</p>
            <p class="mt-8">
              <span class="text-4xl font-extrabold text-gray-900">59.99</span>
              <span class="text-xl font-medium text-gray-500">万起</span>
            </p>
            <button
              class="mt-8 w-full bg-gray-800 text-white rounded-md py-3 hover:bg-gray-700 transition-colors"
            >
              了解详情
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: 'waitlist'
  })

  const scrollToPrice = () => {
    // 方法1：通过ID选择器
    const priceSection = document.getElementById('price-section')
    if (priceSection) {
      priceSection.scrollIntoView({ behavior: 'smooth' })
    }

    // 或者方法2：通过 ref
    // const priceSection = ref(null)
    // priceSection.value?.scrollIntoView({ behavior: 'smooth' })
  }
</script>

<style scoped>
  /* 添加渐变阴影效果 */
  .shadow-lg {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .shadow-xl {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
</style>
