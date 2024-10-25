import { ref, onMounted, onUnmounted } from 'vue'

export function useScroll(threshold = 20) {
  const isScrolled = ref(false)
  const rafId = ref<number | null>(null)

  // 检查当前环境是否为客户端
  const checkScroll = () => {
    if (import.meta.client) {
      rafId.value = requestAnimationFrame(() => {
        isScrolled.value = window.scrollY > threshold
      })
    }
  }

  const handleScroll = () => {
    if (rafId.value) {
      cancelAnimationFrame(rafId.value)
    }
    checkScroll()
  }

  onMounted(() => {
    checkScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (rafId.value) {
      cancelAnimationFrame(rafId.value)
    }
  })

  return {
    isScrolled
  }
}
