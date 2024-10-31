<template>
  <div class="test-container">
    <ClientOnly>
      <ScrollingList
        :list1="testData1"
        :list2="testData2"
        @content-updated="handleContentUpdate"
      />
    </ClientOnly>

    <!-- 添加按钮和数据显示区域 -->
    <div class="data-display-section">
      <button class="show-data-btn" @click="toggleShowData">
        {{ showData ? '隐藏数据' : '显示修改后的数据' }}
      </button>

      <div v-if="showData" class="data-content">
        <div class="data-column">
          <h3>列表1数据：</h3>
          <pre>{{ JSON.stringify(testData1, null, 2) }}</pre>
        </div>
        <div class="data-column">
          <h3>列表2数据：</h3>
          <pre>{{ JSON.stringify(testData2, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import ScrollingList from '~/components/ui/ScrollingList.vue'

  definePageMeta({
    layout: 'default'
  })

  // 添加控制数据显示的响应式变量
  const showData = ref(false)

  // 切换数据显示状态
  const toggleShowData = () => {
    showData.value = !showData.value
  }

  // 生成测试数据
  const testData1 = Array.from({ length: 20 }, (_, i) => {
    // 每4篇文章中的一篇会特别长
    const isLongArticle = (i + 1) % 4 === 0
    return {
      index: i + 1,
      title: `# 原始文章 ${i + 1}`,
      text: isLongArticle
        ? `## 长文章示例
        
这是一段特别长的原始文本，用于测试滚动同步效果。

![](/images/car2.jpg)

### 主要内容

- 第一点
- 第二点
- 第三点

这里包含了第 ${
            i + 1
          } 篇文章的**详细内容**。为了测试不均匀的滚动效果，我们特意加入了更多的内容。`
        : `### 简短文章

这是一段较短的原始文本，用于测试滚动同步效果。这里包含了第 ${
            i + 1
          } 篇文章的*简要内容*。`
    }
  })

  const testData2 = Array.from({ length: 20 }, (_, i) => ({
    index: i + 1,
    title: `# Translated Article ${i + 1}`,
    text: `## English Version

This is a longer translated text for testing scroll synchronization. 

### Key Points

1. First point
2. Second point
3. Third point

This contains the detailed content of article ${i + 1}.`
  }))

  const handleContentUpdate = ({ index, field, value, listId }) => {
    if (listId === 'list1') {
      testData1[index][field] = value
    } else {
      testData2[index][field] = value
    }
  }
</script>

<style scoped>
  .test-container {
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .data-display-section {
    margin-top: 20px;
    padding: 20px;
  }

  .show-data-btn {
    padding: 10px 20px;
    background-color: #4a9eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
  }

  .show-data-btn:hover {
    background-color: #357abd;
  }

  .data-content {
    margin-top: 20px;
    display: flex;
    gap: 20px;
  }

  .data-column {
    flex: 1;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    overflow: auto;
  }

  .data-column h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #2c3e50;
  }

  .data-column pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: monospace;
    font-size: 14px;
    line-height: 1.5;
    color: #4a5568;
  }

  @media (max-width: 768px) {
    .data-content {
      flex-direction: column;
    }
  }
</style>
