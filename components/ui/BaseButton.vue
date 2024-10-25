<template>
  <div>
    <button :class="computedClass">
      <slot></slot>
    </button>
  </div>
</template>

<script setup>
  import { computed, defineProps } from 'vue'

  const props = defineProps({
    type: {
      type: String,
      default: 'primary' // primary 是实心白色, secondary 是空心白框, nav_primary 是白色边框, nav_secondary 是白色背景
    }
  })

  const computedClass = computed(() => {
    if (props.type === 'primary') {
      return 'w-60 rounded-full bg-white px-12 py-2 text-lg font-normal text-blue-500 transition-colors hover:bg-blue-100'
    } else if (props.type === 'secondary') {
      return 'w-60 rounded-full border-2 border-white bg-transparent px-12 py-[6px] text-lg font-normal text-white transition-colors hover:bg-white hover:text-blue-500'
    } else if (props.type === 'nav_primary') {
      return 'rounded border border-white px-4 py-1 text-white transition-colors hover:bg-white hover:text-gray-800 font-light'
    } else if (props.type === 'nav_secondary') {
      return 'rounded bg-white px-4 py-1 text-gray-500 transition-colors hover:text-gray-800 font-light'
    } else if (props.type === 'reserveing') {
      return 'rounded bg-orange-500 px-8 py-3 text-xl font-semibold text-white transition-colors hover:bg-orange-600'
    }
  })
</script>

<style scoped></style>
