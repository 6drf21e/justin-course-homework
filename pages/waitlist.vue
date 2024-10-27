<template>
  <div class="min-h-screen bg-gradient-to-b">
    <ClientOnly>
      <SectionHeader :is-scrolled="isScrolled" />
    </ClientOnly>
    <div>
      <SectionHero title="澎湃动力" subtitle="马上体验" bgImage="car3.jpg">
        <UiBaseButton type="primary" @click="openWaitlist">
          预约试驾
        </UiBaseButton>
        <UiBaseButton type="secondary" @click="openWaitlist">
          预约试驾</UiBaseButton
        >
      </SectionHero>

      <div class="text-center mb-28">
        <h2 class="mb-28 text-3xl font-bold text-gray-800">立即预约试驾</h2>

        <UiBaseButton type="reserveing" @click="openWaitlist">
          预约试驾
        </UiBaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { isScrolled } = useScroll()
  definePageMeta({
    layout: 'waitlist'
  })
</script>

<style scoped>
  /* 如果需要额外的样式,可以在这里添加 */
</style>
