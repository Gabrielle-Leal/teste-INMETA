<template>
  <div class="flex items-center justify-center" :style="{ minHeight: `${height}px` }">
    <div class="relative w-12 h-12">
      <div class="absolute inset-0 rounded-full border-4 border-border"></div>
      <div
        class="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  height?: number
}

withDefaults(defineProps<Props>(), {
  height: 200,
})
</script>
