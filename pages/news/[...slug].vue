<template>
  <div class="lg:p-0 bg-white mt-20 mx-auto p-4">
    <div class="max-w-4xl mx-auto">
      <!-- 面包屑导航 -->
      <UBreadcrumb
        :links="[
          { label: '主页', to: '/' },
          { label: '新闻', to: '/news' }
        ]"
        :ui="{
          wrapper: 'sticky top-0 z-10 bg-white py-auto',
          ol: 'gap-x-3 mb-4 py-2 px-0',
          li: 'text-lg'
        }"
      />

      <ContentDoc
        class="prose lg:prose-xl prose-img:mx-auto prose-img:w-full prose-img:max-w-4xl prose-h1:text-2xl mt-2"
      >
        <template #not-found>
          <div class="text-center text-2xl">没有信息</div>
        </template>
      </ContentDoc>
    </div>
  </div>
</template>

<script setup>
  // const { isScrolled } = useScroll()
  definePageMeta({
    layout: 'news'
  })
</script>

<style scoped>
  /* 如果需要额外的样式,可以在这里添加 */
</style>
