<template>
  <div>
    <SectionHeader :is-scrolled="isShowHeader" v-if="!isScrolled" />
    <slot />
  </div>
</template>

<script setup>
  const { isScrolled } = useScroll(36)
  const isShowHeader = ref(true)
</script>
