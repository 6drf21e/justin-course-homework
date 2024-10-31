<template>
  <div class="test-container">
    <ClientOnly>
      <ScrollingList :list1="testData1" :list2="testData2" />
    </ClientOnly>
  </div>
</template>

<script setup>
  import ScrollingList from '~/components/ui/ScrollingList.vue'

  definePageMeta({
    layout: 'default'
  })

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
</script>

<style scoped>
  .test-container {
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
  }
</style>
