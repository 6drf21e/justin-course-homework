<template>
  <div class="test-container">
    <ScrollingList :list1="testData1" :list2="testData2" />
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
      title: `原始文章 ${i + 1}`,
      text: isLongArticle
        ? `这是一段特别长的原始文本，用于测试滚动同步效果。这里包含了第 ${
            i + 1
          } 篇文章的详细内容。为了测试不均匀的滚动效果，我们特意加入了更多的内容。比如这篇文章讲述了一个发生在远古的故事：很久很久以前，在一个遥远的山谷里，住着一群快乐的小动物。他们过着平静祥和的生活，直到有一天，一场突如其来的暴风雨打破了这份宁静。这个故事告诉我们，生活中总会遇到各种各样的挑战，但只要我们团结一致，就一定能够克服困难。这个故事虽然简单，但却蕴含着深刻的道理。`
        : `这是一段较短的原始文本，用于测试滚动同步效果。这里包含了第 ${
            i + 1
          } 篇文章的简要内容。`
    }
  })

  const testData2 = Array.from({ length: 20 }, (_, i) => ({
    index: i + 1,
    title: `翻译文章 ${i + 1}`,
    text: `This is a longer translated text for testing scroll synchronization. This contains the detailed content of article ${
      i + 1
    }. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
  }))
</script>

<style scoped>
  .test-container {
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
  }
</style>
