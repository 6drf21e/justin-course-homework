<template>
  <div class="list-container" ref="listContainer" @scroll="handleScroll">
    <div
      v-for="(item, index) in listData"
      :key="item.index"
      class="list-item"
      :ref="(el) => (itemRefs[index] = el)"
    >
      <h3 class="item-title">{{ item.title }}</h3>
      <p class="item-text">{{ item.text }}</p>
    </div>
  </div>
</template>

<script setup>
  import { ref, onBeforeUpdate } from 'vue'

  const props = defineProps({
    listData: {
      type: Array,
      required: true,
      default: () => []
    },
    listId: {
      type: String,
      required: true
    }
  })

  const emit = defineEmits(['scroll', 'heights-updated'])
  const listContainer = ref(null)
  const itemRefs = ref([])

  // 在更新前重置 refs 数组
  onBeforeUpdate(() => {
    itemRefs.value = []
  })

  const handleScroll = (event) => {
    emit('scroll', {
      event,
      listId: props.listId,
      container: listContainer.value
    })
  }

  // 计算并发出高度信息
  const calculateHeights = () => {
    let cumulativeHeight = 0
    const heights = itemRefs.value
      .map((el) => {
        if (el) {
          const height = el.offsetHeight
          cumulativeHeight += height
          return cumulativeHeight
        }
        return 0
      })
      .filter((height) => height > 0)

    emit('heights-updated', {
      listId: props.listId,
      heights
    })
  }

  defineExpose({
    listContainer,
    calculateHeights
  })
</script>

<style scoped>
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

  /* 其余样式保持不变... */
</style>
