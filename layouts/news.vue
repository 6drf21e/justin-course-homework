<template>
  <div class="min-h-screen bg-gradient-to-b">
    <SectionHeader :is-scrolled="isShowHeader" v-if="!isScrolled" />
    <slot />
  </div>
</template>

<script setup>
  const { isScrolled } = useScroll(40)
  const isShowHeader = ref(true)
</script>
