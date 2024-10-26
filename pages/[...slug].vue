<template>
  <div class="min-h-screen bg-gradient-to-b">
    <ClientOnly>
      <SectionHeader :is-scrolled="isScrolled" />
    </ClientOnly>
    <div class="p-4 bg-white shadow-md rounded-lg mt-20 mx-auto max-w-2xl">
      <ContentDoc class="prose lg:prose-xl" />
    </div>
  </div>
</template>

<script setup>
  const isScrolled = ref(true)
</script>

<style scoped>
  /* 如果需要额外的样式,可以在这里添加 */
</style>
