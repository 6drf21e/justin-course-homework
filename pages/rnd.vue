<template>
  <div class="min-h-screen bg-gradient-to-b">
    <SectionHeader v-if="!isScrolled" />
    <div class="p-4 bg-white mt-10 mx-auto">
      <div class="max-w-4xl mx-auto">
        <!-- 添加刷新按钮 -->
        <UButton
          icon="i-heroicons:arrow-path-20-solid"
          :loading="status === 'pending'"
          size="xl"
          color="orange"
          variant="solid"
          label="Button"
          :ui="{ rounded: 'rounded-full' }"
          :trailing="false"
          class="mt-4 mb-4 py-2 px-4 ml-0"
          @click="refreshPage"
        >
          {{ status === 'pending' ? '加载中...' : '换一换' }}
        </UButton>
        <!-- 添加加载和错误状态的处理 -->
        <div v-if="status === 'pending'" class="text-center py-10">
          <UIcon
            name="i-heroicons:arrow-path-20-solid"
            class="animate-spin text-4xl text-gray-500"
          />
          <p class="mt-2 text-gray-600">正在加载内容...</p>
        </div>
        <div v-else-if="status === 'error'" class="text-center py-10">
          <UIcon
            name="i-material-symbols:error-outline"
            class="text-4xl text-red-500"
          />
          <p class="mt-2 text-red-600">加载内容时出错，请稍后再试。</p>
        </div>
        <ContentRenderer v-else :value="doc">
          <ContentRendererMarkdown
            :value="doc"
            class="prose lg:prose-2xl prose-img:mx-auto prose-h1:text-3xl mt-2 mx-auto"
          />

          <NuxtImg
            class="w-[720px] mx-auto mt-10"
            :src="doc.image"
            placeholder="https://placehold.co/400"
          />
          <template #empty>
            <p class="text-center text-2xl mt-10">No content found.</p>
          </template>
        </ContentRenderer>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { isScrolled } = useScroll()

  // 随机获取文档的 content 目录
  const content_path = 'history'
  const path_regex = new RegExp(`^/${content_path}/`)

  const { data: count } = await useAsyncData('doc_count', () => {
    return queryContent(content_path).count()
  })

  // 随机获取一篇文章
  const {
    data: doc,
    refresh,
    status
  } = await useAsyncData(
    'doc_rnd',
    () => {
      return new Promise((resolve) => {
        setTimeout(async () => {
          const doc = await queryContent()
            .where({ _path: path_regex })
            .skip(Math.floor(Math.random() * count.value))
            .findOne()
          resolve(doc)
        }, 1000)
      })
    },
    {
      immediate: false
    }
  )

  useSeoMeta({
    title: doc && doc.title ? `趣闻 - ${doc.title}` : '趣闻'
  })

  onMounted(() => {
    refreshPage()
    console.log('doc', doc)
  })

  // 添加刷新页面的函数
  function refreshPage() {
    refresh()
    // window.location.reload()
  }

  definePageMeta({
    layout: false // 不使用任何 layout （本页的 navbar 是自动隐藏和其他页面不同
  })
</script>

<style scoped>
  /* 如果需要额外的样式,可以在这里添加 */
</style>
