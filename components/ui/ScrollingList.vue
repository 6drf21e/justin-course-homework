<template>
  <div class="dual-list-container">
    <div class="list-wrapper">
      <!-- 左侧列表 -->
      <div
        class="list-container"
        ref="list1Container"
        @scroll="handleScroll($event, 'list1')"
      >
        <div
          v-for="item in list1"
          :key="item.index"
          class="list-item"
          :id="`list1-${item.index}`"
        >
          <h3 class="item-title">{{ item.title }}</h3>
          <p class="item-text">{{ item.text }}</p>
        </div>
      </div>

      <!-- 右侧列表 -->
      <div
        class="list-container"
        ref="list2Container"
        @scroll="handleScroll($event, 'list2')"
      >
        <div
          v-for="item in list2"
          :key="item.index"
          class="list-item"
          :id="`list2-${item.index}`"
        >
          <h3 class="item-title">{{ item.title }}</h3>
          <p class="item-text">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

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

  const list1Container = ref(null)
  const list2Container = ref(null)
  let activeScrollContainer = null // 记录当前主动滚动的容器
  let rafId = null

  // 添加用于存储每个列表项位置信息的 Map
  const list1Positions = new Map()
  const list2Positions = new Map()

  // 添加新的 ref 来存储累计高度
  const list1Heights = ref([])
  const list2Heights = ref([])

  // 计算并存储所有列表项的位置
  const calculateItemPositions = () => {
    list1Positions.clear()
    list2Positions.clear()

    // 计算第一个列表的位置
    props.list1.forEach((item, index) => {
      const element = document.getElementById(`list1-${item.index}`)
      if (element) {
        list1Positions.set(item.index, element.offsetTop)
      }
    })

    // 计算第二个列表的位置
    props.list2.forEach((item, index) => {
      const element = document.getElementById(`list2-${item.index}`)
      if (element) {
        list2Positions.set(item.index, element.offsetTop)
      }
    })
  }

  // 计算并存储每个列表项的累计高度
  const calculateItemHeights = () => {
    list1Heights.value = []
    list2Heights.value = []

    let cumulativeHeight = 0
    props.list1.forEach((item) => {
      const element = document.getElementById(`list1-${item.index}`)
      if (element) {
        const height = element.offsetHeight
        cumulativeHeight += height
        list1Heights.value.push(cumulativeHeight)
      }
    })

    cumulativeHeight = 0
    props.list2.forEach((item) => {
      const element = document.getElementById(`list2-${item.index}`)
      if (element) {
        const height = element.offsetHeight
        cumulativeHeight += height
        list2Heights.value.push(cumulativeHeight)
      }
    })
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

  // 更新后的滚动处理函数
  const handleScroll = (event, sourceList) => {
    const currentContainer = event.target

    if (activeScrollContainer && activeScrollContainer !== currentContainer) {
      return
    }

    if (!activeScrollContainer) {
      activeScrollContainer = currentContainer
    }

    if (rafId) {
      cancelAnimationFrame(rafId)
    }

    rafId = requestAnimationFrame(() => {
      const scrollTop = currentContainer.scrollTop
      const targetContainer =
        sourceList === 'list1' ? list2Container.value : list1Container.value
      const sourceHeights =
        sourceList === 'list1' ? list1Heights.value : list2Heights.value
      const targetHeights =
        sourceList === 'list1' ? list2Heights.value : list1Heights.value

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

      if (targetContainer) {
        targetContainer.scrollTop = targetScrollTop
      }
    })
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
    list1Container.value?.addEventListener('scroll', handleScrollEnd)
    list2Container.value?.addEventListener('scroll', handleScrollEnd)
  }

  onMounted(() => {
    addScrollListeners()
    // 等待 DOM 更新后计算位置
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
    list1Container.value?.removeEventListener('scroll', handleScrollEnd)
    list2Container.value?.removeEventListener('scroll', handleScrollEnd)
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

  .list-container {
    flex: 1;
    height: 500px;
    overflow-y: auto;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    background-color: #fff;
    scroll-behavior: smooth;
    will-change: scroll-position;
    -webkit-overflow-scrolling: touch;
  }

  .list-item {
    padding: 20px;
    margin-bottom: 16px;
    border-radius: 6px;
    background-color: #f8f9fa;
    transition: background-color 0.2s ease;
  }

  .list-item:hover {
    background-color: #f0f2f5;
  }

  .list-item:last-child {
    margin-bottom: 0;
  }

  .item-title {
    margin: 0 0 12px 0;
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
    line-height: 1.4;
  }

  .item-text {
    margin: 0;
    font-size: 15px;
    color: #4a5568;
    line-height: 1.6;
    text-align: justify;
    white-space: pre-line;
  }

  /* 优化滚动条样式 */
  .list-container::-webkit-scrollbar {
    width: 8px;
  }

  .list-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  .list-container::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
    border: 2px solid #f1f1f1;
  }

  .list-container::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }

  @media (max-width: 768px) {
    .list-wrapper {
      flex-direction: column;
    }

    .list-container {
      height: 400px;
    }
  }
</style>
