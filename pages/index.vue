<template>
  <div class="min-h-screen bg-gradient-to-b">
    <ClientOnly>
      <SectionHeader :is-scrolled="isScrolled" />
    </ClientOnly>
    <div>
      <SectionHero
        title="Rolls Rice"
        subtitle="人车合一 我心澎湃"
        bgImage="car2.jpg"
      >
        <UiBaseButton type="primary" @click="OpenWaitlist">
          立即预定
        </UiBaseButton>
        <UiBaseButton type="secondary" @click="OpenWaitlist">
          预约试驾</UiBaseButton
        >
      </SectionHero>

      <SectionHero
        title="rice BIG8"
        subtitle="人车合一 我心澎湃"
        bgImage="car4.jpg"
      >
        <UiBaseButton type="secondary" @click="OpenWaitlist">
          立即预定
        </UiBaseButton>
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

  // 使用 ref 来存储 requestAnimationFrame 的 ID
  const rafId = ref(null)

  onMounted(() => {
    const handleScroll = () => {
      // 取消之前的 requestAnimationFrame
      if (rafId.value) {
        cancelAnimationFrame(rafId.value)
      }

      // 使用 requestAnimationFrame 优化性能
      rafId.value = requestAnimationFrame(() => {
        isScrolled.value = window.scrollY > 20
      })
    }

    // 立即检查一次滚动位置，但使用 requestAnimationFrame
    rafId.value = requestAnimationFrame(() => {
      isScrolled.value = window.scrollY > 20
    })

    window.addEventListener('scroll', handleScroll, { passive: true })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      // 确保在组件卸载时取消任何未完成的 requestAnimationFrame
      if (rafId.value) {
        cancelAnimationFrame(rafId.value)
      }
    })
  })
</script>

<style scoped>
  /* 如果需要额外的样式,可以在这里添加 */
</style>
