<template>
  <div class="dual-list-container">
    <div class="list-wrapper">
      <List
        :listData="list1"
        listId="list1"
        ref="list1Ref"
        @scroll="handleScroll"
        @heights-updated="updateHeights"
      />
      <List
        :listData="list2"
        listId="list2"
        ref="list2Ref"
        @scroll="handleScroll"
        @heights-updated="updateHeights"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
  import List from './List.vue'

  const props = defineProps({
    list1: {
      type: Array,
      required: true,
      default: () => []
    },
    list2: {
      type: Array,
      required: true,
      default: () => []
    }
  })

  const list1Ref = ref(null)
  const list2Ref = ref(null)
  let activeScrollContainer = null
  let rafId = null

  // 高度相关的数据结构
  const list1Heights = ref([])
  const list2Heights = ref([])

  // 更新高度的处理函数
  const updateHeights = ({ listId, heights }) => {
    if (listId === 'list1') {
      list1Heights.value = heights
    } else {
      list2Heights.value = heights
    }
  }

  // 计算高度的函数现在变得更简单
  const calculateItemHeights = () => {
    list1Ref.value?.calculateHeights()
    list2Ref.value?.calculateHeights()
  }

  // 根据滚动位置获取当前索引
  const getCurrentIndex = (scrollTop, heightsArray) => {
    for (let i = 0; i < heightsArray.length; i++) {
      if (scrollTop < heightsArray[i]) {
        return i
      }
    }
    return heightsArray.length - 1
  }

  // 滚动结束时重置状态
  const resetActiveScroll = () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
    activeScrollContainer = null
  }

  // 使用节流函数来处理滚动结束的检测
  let scrollEndTimeout = null
  const handleScrollEnd = () => {
    if (scrollEndTimeout) {
      clearTimeout(scrollEndTimeout)
    }
    scrollEndTimeout = setTimeout(resetActiveScroll, 150)
  }

  // 为每个容器添加滚动结束检测
  const addScrollListeners = () => {
    list1Ref.value?.listContainer?.addEventListener('scroll', handleScrollEnd)
    list2Ref.value?.listContainer?.addEventListener('scroll', handleScrollEnd)
  }

  // 更新 handleScroll 函数的完整实现
  const handleScroll = ({ event, listId, container }) => {
    if (activeScrollContainer && activeScrollContainer !== container) {
      return
    }

    if (!activeScrollContainer) {
      activeScrollContainer = container
    }

    if (rafId) {
      cancelAnimationFrame(rafId)
    }

    rafId = requestAnimationFrame(() => {
      const scrollTop = container.scrollTop
      const targetRef = listId === 'list1' ? list2Ref : list1Ref
      const sourceHeights =
        listId === 'list1' ? list1Heights.value : list2Heights.value
      const targetHeights =
        listId === 'list1' ? list2Heights.value : list1Heights.value

      const currentIndex = getCurrentIndex(scrollTop, sourceHeights)

      // 计算用户在当前项中滚动的比例
      const prevHeight = currentIndex > 0 ? sourceHeights[currentIndex - 1] : 0
      const itemHeight = sourceHeights[currentIndex] - prevHeight
      const scrollIntoItem = scrollTop - prevHeight
      const scrollProportion = scrollIntoItem / itemHeight

      // 计算目标容器中的等效滚动位置
      const targetPrevHeight =
        currentIndex > 0 ? targetHeights[currentIndex - 1] : 0
      const targetItemHeight = targetHeights[currentIndex] - targetPrevHeight
      const targetScrollTop =
        targetPrevHeight + targetItemHeight * scrollProportion

      if (targetRef.value?.listContainer) {
        targetRef.value.listContainer.scrollTop = targetScrollTop
      }
    })
  }

  // 生命周期钩子
  onMounted(() => {
    addScrollListeners()
    nextTick(() => {
      calculateItemHeights()
    })
  })

  // 监听列表数据变化
  watch([() => props.list1, () => props.list2], () => {
    nextTick(() => {
      calculateItemHeights()
    })
  })

  // 清理事件监听器
  onBeforeUnmount(() => {
    if (scrollEndTimeout) {
      clearTimeout(scrollEndTimeout)
    }
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
    list1Ref.value?.listContainer?.removeEventListener(
      'scroll',
      handleScrollEnd
    )
    list2Ref.value?.listContainer?.removeEventListener(
      'scroll',
      handleScrollEnd
    )
  })
</script>

<style scoped>
  .dual-list-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .list-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  @media (max-width: 768px) {
    .list-wrapper {
      flex-direction: column;
    }
  }
</style>
