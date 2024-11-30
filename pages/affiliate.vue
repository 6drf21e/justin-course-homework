<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- 页面标题 -->
    <div class="text-center mb-12 pt-12">
      <h1 class="text-4xl font-bold text-orange-600">推荐资源</h1>
      <p class="mt-4 text-lg text-gray-600">精选的小红书运营学习资源</p>
    </div>

    <!-- 加载状态 -->
    <div v-if="pending" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"
      ></div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="text-center py-12 text-red-500">
      加载失败，请稍后重试
    </div>

    <!-- 数据展示 -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in data"
        :key="item.title"
        class="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-orange-100"
      >
        <!-- 图片容器 -->
        <div class="relative overflow-hidden">
          <img
            :src="item.image.src"
            :alt="item.image.alt"
            class="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <!-- 作者标签 -->
          <div
            class="absolute bottom-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm text-orange-500"
          >
            {{ item.author }}
          </div>
        </div>

        <!-- 内容区域 -->
        <div class="p-6">
          <!-- 标题 -->
          <h3
            class="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors"
          >
            {{ item.title }}
          </h3>

          <!-- 描述 -->
          <div
            class="text-gray-600 text-sm mb-4 line-clamp-3 h-[4.5rem]"
            v-html="formatDescription(item.description)"
          ></div>

          <!-- 统计信息 -->
          <div class="flex items-center space-x-4 mb-4 text-sm text-gray-500">
            <div class="flex items-center">
              <IconUser class="w-4 h-4 mr-1" />
              <span>{{ item.subscription.count }}人订阅</span>
            </div>
            <div class="flex items-center">
              <IconDocument class="w-4 h-4 mr-1" />
              <span>{{ item.subscription.content }}篇内容</span>
            </div>
          </div>

          <!-- 链接按钮 -->
          <a
            :href="item.link"
            target="_blank"
            class="block w-full text-center py-2.5 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300"
          >
            查看详情
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: 'news'
  })
  // 导入图标组件
  const IconUser = defineComponent({
    render: () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          fill: 'none',
          viewBox: '0 0 24 24',
          stroke: 'currentColor'
        },
        [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
          })
        ]
      )
  })

  const IconDocument = defineComponent({
    render: () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          fill: 'none',
          viewBox: '0 0 24 24',
          stroke: 'currentColor'
        },
        [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          })
        ]
      )
  })

  // 获取数据
  const { data, pending, error } = await useFetch('/api/affiliate')

  // 格式化描述文本
  const formatDescription = (desc) => {
    if (!desc) return ''
    return desc.replace(/<br>/g, ' ')
  }

  // 设置页面元数据
  useHead({
    title: '推荐资源 - 小红书运营学习资源',
    meta: [
      {
        name: 'description',
        content:
          '精选的小红书运营学习资源，包含运营手册、案例库、变现指南等优质内容'
      }
    ]
  })
</script>

<style scoped>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
