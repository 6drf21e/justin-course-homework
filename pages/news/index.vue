<template>
  <div class="min-h-screen bg-gradient-to-b">
    <ClientOnly>
      <SectionHeader :is-scrolled="isScrolled" />
    </ClientOnly>
    <div class="p-4 bg-white mt-20 mx-auto max-w-7xl">
      <!-- news list -->
      <ContentList path="/news">
        <template #default="{ list }">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="article in list"
              :key="article._path"
              class="border rounded-lg shadow-md overflow-hidden min-w-[300px]"
            >
              <a :href="article._path" class="block" target="_blank">
                <img
                  :src="article.image"
                  :alt="article.title"
                  class="w-full h-48 object-cover"
                />
                <div class="p-4">
                  <h2 class="text-xl font-bold mb-2 truncate">
                    {{ article.title }}
                  </h2>
                  <p class="text-gray-600 mb-3 h-12 loverflow-hidden">
                    <span class="line-clamp-2">{{ article.description }}</span>
                  </p>
                  <div class="flex justify-between text-sm text-gray-500">
                    <span class="mr-4">作者: {{ article.author }}</span>
                    <span class="">发布日期: {{ article.date }}</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </template>
        <template #not-found>
          <p class="text-center text-gray-500">暂无文章。</p>
        </template>
      </ContentList>
    </div>
  </div>
</template>

<script setup>
  const isScrolled = ref(true)
  useSeoMeta({
    title: '新闻中心',
    description: '大米汽车 - 新闻中心'
  })
</script>

<style scoped>
  /* 如果需要额外的样式,可以在这里添加 */
</style>
