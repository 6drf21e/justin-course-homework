<template>
  <div class="p-4 bg-white mt-16 mx-auto max-w-7xl">
    <!-- news list -->
    <ContentList :query="query" v-slot="{ list }">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="article in list"
          :key="article._path"
          class="border rounded-lg shadow-md overflow-hidden min-w-[240px]"
        >
          <a :href="article._path" class="block" target="_blank">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-40 object-cover"
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
    </ContentList>

    <!-- 添加分页组件 -->
    <div class="mt-8 flex justify-center">
      <UPagination
        v-model="currentPage"
        :active-button="{
          variant: 'solid',
          color: 'orange',
          class: 'bg-orange-500 text-white hover:bg-orange-600'
        }"
        :inactive-button="{
          variant: 'outline',
          color: 'orange',
          class: 'hover:bg-orange-100'
        }"
        :prevButton="{
          variant: 'outline',
          color: 'orange',
          class: 'hover:bg-orange-100'
        }"
        :nextButton="{
          variant: 'outline',
          color: 'orange',
          class: 'hover:bg-orange-100'
        }"
        :page-count="pageSize"
        :total="total"
        :ui="{ wrapper: 'gap-2' }"
      />
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: 'news'
  })

  // 分页相关的状态
  const currentPage = ref(1)
  const pageSize = ref(6) // 每页显示9篇文章
  const total = ref(0)

  // 构建查询参数
  const query = computed(() => ({
    path: '/news',
    limit: pageSize.value,
    skip: (currentPage.value - 1) * pageSize.value,
    sort: [{ date: -1 }] // 按日期降序排序
  }))

  watch(currentPage, (newVal) => {
    // console.log('currentPage', newVal)
    if (import.meta.client) {
      setTimeout(() => {
        document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }, 0)
    }
  })

  // 获取文章总数
  const { data: totalArticles } = await useAsyncData('total-articles', () =>
    queryContent('/news').count()
  )
  total.value = totalArticles.value

  // 页码改变时的处理函数
  const handlePageChange = (page) => {
    console.log('page', page)
    currentPage.value = page

    // 添加平滑滚动到顶部
    // nextTick(() => {
    //   // 检查是否在客户端环境
    //   console.log('import.meta.client', import.meta.client)
    //   if (import.meta.client) {
    //     setTimeout(() => {
    //       alert('')
    //       document.documentElement.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //       })
    //     }, 0)
    //   }
    // })
  }

  useSeoMeta({
    title: '新闻中心',
    description: '大米汽车 - 新闻中心'
  })
</script>

<style scoped>
  /* 如果需要额外的样式,可以在这里添加 */
</style>
