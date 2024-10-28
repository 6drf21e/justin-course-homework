<template>
  <div>
    <SectionHeader :is-scrolled="isScrolled" />
    <slot />
  </div>
</template>

<script setup>
  const { isScrolled } = useScroll()
</script>
