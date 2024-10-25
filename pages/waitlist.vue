<template>
  <div class="min-h-screen bg-gradient-to-b">
    <ClientOnly>
      <SectionHeader :is-scrolled="isScrolled" />
    </ClientOnly>
    <div>
      <SectionHero title="澎湃动力" subtitle="马上体验" bgImage="car3.jpg">
        <UiBaseButton type="primary" @click="OpenWaitlist">
          预约试驾
        </UiBaseButton>
        <UiBaseButton type="secondary" @click="OpenWaitlist">
          预约试驾</UiBaseButton
        >
      </SectionHero>

      <div class="text-center mb-28">
        <h2 class="mb-28 text-3xl font-bold text-gray-800">立即预约试驾</h2>

        <UiBaseButton type="reserveing" @click="OpenWaitlist">
          预约试驾
        </UiBaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const OpenWaitlist = () => {
    window.open('https://forms.office.com/r/k4QEdzz23K', '_blank')
  }

  const isScrolled = ref(false)

  // 立即检查当前滚动位置
  if (import.meta.client) {
    isScrolled.value = window.scrollY > 20
  }

  onMounted(() => {
    const handleScroll = () => {
      // 使用 requestAnimationFrame 优化性能
      window.requestAnimationFrame(() => {
        isScrolled.value = window.scrollY > 20
      })
    }

    // 立即检查一次滚动位置
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  })
</script>

<style scoped>
  /* 如果需要额外的样式,可以在这里添加 */
</style>
