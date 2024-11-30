<template>
  <div class="p-4 bg-white mt-16 mx-auto max-w-5xl">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold mb-4">常见问题</h1>
      <p class="text-gray-600">为您解答关于大米汽车的常见问题</p>
    </div>

    <!-- 搜索框 -->
    <div class="mb-8 max-w-2xl mx-auto">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="搜索常见问题..."
        size="lg"
        color="orange"
        class="w-full"
        @input="handleSearch"
      />
    </div>

    <!-- FAQ分类标签 -->
    <div class="mb-8 flex flex-wrap justify-center gap-2">
      <UButton
        v-for="category in categories"
        :key="category"
        :variant="selectedCategory === category ? 'solid' : 'outline'"
        color="orange"
        @click="handleCategoryChange(category)"
      >
        {{ category }}
      </UButton>
    </div>

    <!-- faq list -->
    <ContentList :query="query" v-slot="{ list }">
      <div v-if="list.length > 0" class="space-y-4">
        <div
          v-for="faq in filteredFaqs(list)"
          :key="faq._path"
          class="bg-white border rounded-lg hover:shadow-md transition-shadow"
        >
          <NuxtLink :to="faq._path" class="block p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 mt-1">
                <div
                  class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center"
                >
                  <span class="text-orange-600 text-lg">Q</span>
                </div>
              </div>
              <div class="flex-grow">
                <h2 class="text-lg font-semibold text-gray-900 mb-2">
                  {{ faq.title }}
                </h2>
                <p class="text-gray-600 line-clamp-2">
                  {{ faq.description }}
                </p>
                <div class="mt-3 flex items-center text-sm text-gray-500">
                  <span class="flex items-center">
                    <span class="i-heroicons-clock-20-solid mr-1"></span>
                    更新于: {{ faq.date }}
                  </span>
                  <span class="mx-3">|</span>
                  <span
                    class="px-2 py-1 rounded border border-orange-200 bg-orange-50 text-orange-500"
                  >
                    {{ faq.category }}
                  </span>
                  <span
                    class="ml-auto text-orange-500 hover:text-orange-600 flex items-center"
                  >
                    查看详情
                    <span class="i-heroicons-arrow-right-20-solid ml-1"></span>
                  </span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div v-else class="text-center py-12">
        <div class="text-gray-500 mb-4">未找到相关问题</div>
        <UButton color="orange" variant="outline" @click="resetFilters">
          重置筛选
        </UButton>
      </div>
    </ContentList>

    <!-- 分页组件 -->
    <div v-if="total > pageSize" class="mt-8 flex justify-center">
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

  // 分类列表
  const categories = ['全部', '预订', '售后', '保修', '充电']

  // 搜索和分类状态
  const searchQuery = ref('')
  const selectedCategory = ref('全部')

  // 分页相关的状态
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)

  // 构建查询参数
  const query = computed(() => ({
    path: '/faq',
    limit: pageSize.value,
    skip: (currentPage.value - 1) * pageSize.value,
    sort: [{ date: -1 }],
    where:
      selectedCategory.value !== '全部'
        ? {
            category: selectedCategory.value
          }
        : undefined
  }))

  // 处理搜索
  const handleSearch = () => {
    currentPage.value = 1
  }

  // 处理分类切换
  const handleCategoryChange = (category) => {
    selectedCategory.value = category
    currentPage.value = 1
  }

  // 重置筛选
  const resetFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = '全部'
    currentPage.value = 1
  }

  // 过滤FAQ列表
  const filteredFaqs = (list) => {
    if (!searchQuery.value) return list

    const query = searchQuery.value.toLowerCase()
    return list.filter(
      (faq) =>
        faq.title.toLowerCase().includes(query) ||
        faq.description.toLowerCase().includes(query)
    )
  }

  // 监听页面变化，滚动到顶部
  watch(currentPage, (newVal) => {
    if (import.meta.client) {
      setTimeout(() => {
        document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }, 0)
    }
  })

  // 获取FAQ总数
  const { data: totalFaqs } = await useAsyncData('total-faqs', () =>
    queryContent('/faq')
      .where(
        selectedCategory.value !== '全部'
          ? {
              category: selectedCategory.value
            }
          : {}
      )
      .count()
  )
  total.value = totalFaqs.value

  // 监听分类变化，重新获取总数
  watch(selectedCategory, async (newCategory) => {
    const { data } = await useAsyncData('total-faqs-' + newCategory, () =>
      queryContent('/faq')
        .where(
          newCategory !== '全部'
            ? {
                category: newCategory
              }
            : {}
        )
        .count()
    )
    total.value = data.value
  })

  useSeoMeta({
    title: '常见问题 - 大米汽车',
    description:
      '大米汽车常见问题解答中心，为您提供预订、售后等相关问题的详细解答'
  })
</script>

<style scoped>
  /* 自定义样式可以在这里添加 */
</style>
