<template>
  <div class="rounded-lg bg-white p-6 shadow-md">
    <h2 class="mb-4 text-2xl font-semibold text-gray-800">{{ title }}</h2>

    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  })
</script>

<style scoped></style>
