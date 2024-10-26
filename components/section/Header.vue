<template>
  <nav
    id="navbar"
    :class="[
      'fixed left-0 right-0 top-0 transition-colors duration-300',
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

      <div class="hidden space-x-16 md:flex">
        <UiNavLink href="/">首页</UiNavLink>
        <UiNavLink href="/waitlist">waitlist</UiNavLink>
        <UiNavLink href="/news">新闻</UiNavLink>
        <!-- <UiNavLink href="#">汽车工厂</UiNavLink>
        <UiNavLink href="#">门店查询</UiNavLink>
        <UiNavLink href="#">服务介绍</UiNavLink> -->
      </div>

      <div class="flex space-x-4">
        <UiBaseButton type="nav_primary" @click="openWaitlist"
          >预约试驾</UiBaseButton
        >
        <UiBaseButton type="nav_secondary" @click="openWaitlist"
          >去APP购车</UiBaseButton
        >
      </div>
    </div>
  </nav>
</template>

<script setup>
  // 接收父组件传入的滚动状态
  defineProps({
    isScrolled: {
      type: Boolean,
      default: true
    }
  })
</script>

<style scoped></style>
