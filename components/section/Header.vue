<template>
  <nav
    id="navbar"
    :class="[
      'fixed left-0 right-0 top-0 transition-colors duration-300 z-50',
      isScrolled
        ? 'bg-gray-800 bg-opacity-90'
        : 'bg-transparent hover:bg-gray-800 hover:bg-opacity-90'
    ]"
  >
    <div class="container mx-auto flex items-center justify-between px-4 py-3">
      <div class="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-orange-500"
        >
          <path
            d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"
          />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
        <span class="text-xl font-light text-gray-50">大米汽车</span>
      </div>

      <!-- 汉堡菜单按钮 -->
      <button @click="toggleMenu" class="md:hidden text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <!-- 导航链接 -->
      <div class="hidden md:flex md:space-x-16">
        <UiNavLink href="/">首页</UiNavLink>
        <UiNavLink href="/waitlist">waitlist</UiNavLink>
        <UiNavLink href="/news">新闻</UiNavLink>
        <UiNavLink href="/rnd">趣闻</UiNavLink>
      </div>

      <!-- 按钮 -->
      <div class="hidden md:flex space-x-4">
        <UiBaseButton type="nav_primary" @click="openWaitlist"
          >预约试驾</UiBaseButton
        >
        <UiBaseButton type="nav_secondary" @click="openWaitlist"
          >去APP购车</UiBaseButton
        >
      </div>
    </div>

    <!-- 移动端菜单 -->
    <div v-if="isMenuOpen" class="md:hidden bg-gray-800 bg-opacity-90">
      <div class="px-2 pt-2 pb-3 space-y-2 h-screen text-center">
        <UiNavLink href="/" class="block">首页</UiNavLink>
        <div class="w-full h-px bg-gray-600"></div>
        <UiNavLink href="/waitlist" class="block">waitlist</UiNavLink>
        <div class="w-full h-px bg-gray-600"></div>
        <UiNavLink href="/news" class="block">新闻</UiNavLink>
        <div class="w-full h-px bg-gray-600"></div>
        <UiNavLink href="/rnd" class="block">趣闻</UiNavLink>
      </div>
      <!-- <div class="px-2 pt-2 pb-3 space-y-1">
        <UiBaseButton type="nav_primary" @click="openWaitlist" class="w-full"
          >预约试驾</UiBaseButton
        >
        <UiBaseButton type="nav_secondary" @click="openWaitlist" class="w-full"
          >去APP购车</UiBaseButton
        >
      </div> -->
    </div>
  </nav>
</template>

<script setup>
  import { ref } from 'vue'

  // 接收父组件传入的滚动状态
  defineProps({
    isScrolled: {
      type: Boolean,
      default: true
    }
  })

  // 控制菜单开关状态
  const isMenuOpen = ref(false)

  // 切换菜单状态
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
    // 当菜单打开时添加 no-scroll 类，关闭时移除
    document.body.classList.toggle('no-scroll', isMenuOpen.value)
  }

  onUnmounted(() => {
    // 确保组件卸载时移除 no-scroll 类
    document.body.classList.remove('no-scroll')
  })
</script>

<style scoped>
  /* 可以在这里添加任何特定的样式 */
</style>
