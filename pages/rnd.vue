<template>
  <div class="min-h-screen bg-gradient-to-b">
    <ClientOnly>
      <SectionHeader v-if="!isScrolled" />
    </ClientOnly>
    <div class="p-4 bg-white mt-10 mx-auto">
      <div class="max-w-4xl mx-auto">
        <ClientOnly>
          <!-- 添加刷新按钮 -->
          <UButton
            icon="i-material-symbols:cycle"
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
            换一换
          </UButton>
          <!-- 添加加载和错误状态的处理 -->
          <div v-if="status === 'pending'" class="text-center py-10">
            <UIcon
              name="i-material-symbols:cycle"
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
        </ClientOnly>
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
  } = await useAsyncData('doc_rnd', () => {
    return queryContent()
      .where({ _path: path_regex })
      .skip(Math.floor(Math.random() * count.value))
      .findOne()
  })

  useSeoMeta({
    title: doc && doc.title ? `趣闻 - ${doc.title}` : '趣闻'
  })

  // 添加刷新页面的函数
  function refreshPage() {
    refresh()
    // window.location.reload()
  }
</script>

<style scoped>
  /* 如果需要额外的样式,可以在这里添加 */
</style>
