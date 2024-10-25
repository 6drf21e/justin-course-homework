<template>
  <NuxtLink
    :to="href"
    class="relative group text-gray-50 hover:text-white font-light text-lg transition-colors duration-300"
  >
    <span class="relative">
      <slot />
      <span
        class="absolute left-0 right-0 bottom-[-4px] w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transform origin-right group-hover:origin-left transition-transform duration-300"
      ></span>
    </span>
  </NuxtLink>
</template>

<script setup>
  defineProps({
    href: {
      type: String,
      required: true
    }
  })
</script>

<style scoped></style>
