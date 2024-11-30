<template>
  <div class="lg:p-0 bg-white mt-20 mx-auto p-4">
    <div class="max-w-4xl mx-auto">
      <!-- 面包屑导航 -->
      <UBreadcrumb
        :links="[
          { label: '主页', to: '/' },
          { label: '常见问题', to: '/faq' }
        ]"
        :ui="{
          wrapper: 'sticky top-0 z-10 bg-white py-auto',
          ol: 'gap-x-3 mb-4 py-2 px-0',
          li: 'text-lg'
        }"
      />

      <!-- FAQ内容 -->
      <ContentDoc
        class="prose lg:prose-xl prose-img:mx-auto prose-img:w-full prose-img:max-w-4xl prose-h1:text-2xl mt-2"
      >
        <template #not-found>
          <div class="text-center py-8">
            <h2 class="text-2xl font-bold text-gray-600">未找到相关内容</h2>
            <p class="mt-4 text-gray-500">该FAQ可能已被移除或更新</p>
            <UButton to="/faq" color="orange" class="mt-6">
              返回FAQ列表
            </UButton>
          </div>
        </template>
      </ContentDoc>

      <!-- 相关问题推荐 -->
      <div class="mt-12 border-t pt-8 pb-12">
        <h3 class="text-xl font-bold mb-6">相关问题</h3>
        <ContentList
          :query="{
            path: '/faq',
            limit: 2,
            where: { _path: { $ne: $route.path } },
            sort: [{ date: -1 }]
          }"
          v-slot="{ list }"
        >
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              v-for="item in list"
              :key="item._path"
              class="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <a :href="item._path" class="block">
                <h4 class="font-bold mb-2">{{ item.title }}</h4>
                <p class="text-gray-600 text-sm line-clamp-2">
                  {{ item.description }}
                </p>
              </a>
            </div>
          </div>
        </ContentList>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: 'news'
  })

  // 获取当前页面的元数据用于SEO
  const { data } = await useAsyncData('current-faq', () => {
    return queryContent(useRoute().path).findOne()
  })

  useSeoMeta({
    title: computed(() => `${data.value?.title || '常见问题'} - 大米汽车`),
    description: computed(
      () => data.value?.description || '大米汽车常见问题解答'
    )
  })
</script>

<style scoped>
  /* 自定义样式可以在这里添加 */
</style>
