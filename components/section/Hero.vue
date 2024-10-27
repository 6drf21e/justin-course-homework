<template>
  <div
    class="mb-10 flex h-screen flex-col justify-between bg-cover bg-top bg-no-repeat pt-40 text-center"
    :style="{ backgroundImage: `url('/images/${bgImage}')` }"
  >
    <div>
      <h1 class="mb-4 text-6xl font-bold text-white">{{ title }}</h1>
      <p class="mb-8 text-2xl text-white">{{ subtitle }}</p>
    </div>
    <div
      class="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:space-x-4"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    bgImage: {
      type: String,
      required: true
    }
  })
</script>

<style scoped></style>
