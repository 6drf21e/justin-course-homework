<template>
  <div class="min-h-screen bg-gradient-to-b">
    <SectionHeader :is-scrolled="isScrolled" />
    <slot />
  </div>
</template>

<script setup>
  const { isScrolled } = useScroll()
</script>
