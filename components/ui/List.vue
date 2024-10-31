<template>
  <div class="list-container" ref="listContainer" @scroll="handleScroll">
    <div
      v-for="(item, index) in listData"
      :key="item.index"
      class="list-item"
      :ref="(el) => (itemRefs[index] = el)"
    >
      <div class="item-content">
        <!-- 标题部分 -->
        <div @click="startEditing('title', index)" class="editable-area">
          <Markdown
            v-if="!isEditing(index, 'title')"
            :source="item.title"
            class="item-title"
          />
          <textarea
            v-else
            v-model="editingContent"
            @blur="saveEdit(index, 'title')"
            @keydown.enter.prevent="saveEdit(index, 'title')"
            class="edit-textarea"
            :ref="(el) => setTextareaRef(el, index, 'title')"
          ></textarea>
        </div>
        <!-- 正文部分 -->
        <div @click="startEditing('text', index)" class="editable-area">
          <Markdown
            v-if="!isEditing(index, 'text')"
            :source="item.text"
            class="item-text"
          />
          <textarea
            v-else
            v-model="editingContent"
            @blur="saveEdit(index, 'text')"
            @keydown.enter.ctrl="saveEdit(index, 'text')"
            class="edit-textarea"
            :ref="(el) => setTextareaRef(el, index, 'text')"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    ref,
    onBeforeUpdate,
    onMounted,
    watch,
    nextTick,
    onBeforeUnmount
  } from 'vue'
  import Markdown from 'vue3-markdown-it'

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

  const emit = defineEmits(['scroll', 'heights-updated', 'content-updated'])
  const listContainer = ref(null)
  const itemRefs = ref([])
  let resizeObserver = null

  // 添加编辑相关的状态
  const editingIndex = ref(-1)
  const editingField = ref(null) // 'title' 或 'text'
  const editingContent = ref('')

  const textareaRefs = ref({})

  // 设置文本框引用的函数
  const setTextareaRef = (el, index, field) => {
    if (!textareaRefs.value[index]) {
      textareaRefs.value[index] = {}
    }
    textareaRefs.value[index][field] = el
  }

  // 开始编辑
  const startEditing = (field, index) => {
    editingIndex.value = index
    editingField.value = field
    editingContent.value = props.listData[index][field]

    nextTick(() => {
      const textarea = textareaRefs.value[index]?.[field]
      if (textarea) {
        textarea.focus()
      }
    })
  }

  // 判断是否正在编辑
  const isEditing = (index, field) => {
    return editingIndex.value === index && editingField.value === field
  }

  // 保存编辑
  const saveEdit = (index, field) => {
    if (editingIndex.value === index && editingField.value === field) {
      emit('content-updated', {
        index,
        field,
        value: editingContent.value,
        listId: props.listId
      })
      editingIndex.value = -1
      editingField.value = null
      editingContent.value = ''
    }
  }

  // 在更新前重置 refs 数组
  onBeforeUpdate(() => {
    itemRefs.value = []
  })

  // 创建 ResizeObserver 实例
  const setupResizeObserver = () => {
    resizeObserver = new ResizeObserver(
      debounce(() => {
        calculateHeights()
      }, 100)
    )

    // 为每个列表项添加观察
    itemRefs.value.forEach((el) => {
      if (el) {
        resizeObserver.observe(el)
      }
    })
  }

  // 防抖函数
  function debounce(fn, delay) {
    let timeoutId
    return function (...args) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn.apply(this, args), delay)
    }
  }

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

  // 监听列表数据变化
  watch(
    () => props.listData,
    () => {
      nextTick(() => {
        // 断开之前的观察
        if (resizeObserver) {
          resizeObserver.disconnect()
        }
        // 重新计算高度并设置新的观察
        calculateHeights()
        setupResizeObserver()
      })
    },
    { deep: true }
  )

  onMounted(() => {
    nextTick(() => {
      calculateHeights()
      setupResizeObserver()
    })
  })

  onBeforeUnmount(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  })

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

  .item-title :deep(h1),
  .item-title :deep(h2),
  .item-title :deep(h3),
  .item-title :deep(h4),
  .item-title :deep(h5),
  .item-title :deep(h6) {
    margin: 0;
    font-weight: bold;
    color: #2c3e50;
  }

  .item-text :deep(p) {
    margin: 0 0 1em;
    color: #4a5568;
    line-height: 1.6;
  }

  .item-text :deep(ul),
  .item-text :deep(ol) {
    margin: 0 0 1em 1.5em;
  }

  .item-text :deep(li) {
    margin-bottom: 0.5em;
  }

  .editable-area {
    cursor: pointer;
  }

  .edit-textarea {
    width: 100%;
    min-height: 100px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: inherit;
    line-height: 1.6;
    resize: vertical;
  }

  .edit-textarea:focus {
    outline: none;
    border-color: #4a9eff;
    box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.2);
  }
</style>
