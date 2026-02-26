<template>
  <Teleport to="body">
    <div v-if="isVisible" class="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-2">
      <div
        :class="[
          'rounded-lg px-4 py-3 text-sm font-medium shadow-lg',
          typeClasses,
        ]"
      >
        <div class="flex items-center gap-2">
          <span>{{ message }}</span>
          <button
            @click="close"
            class="ml-2 inline-flex text-current opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 3000,
})

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(true)
let timeoutId: ReturnType<typeof setTimeout> | null = null

const typeClasses = computed(() => {
  const classes: Record<string, string> = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  }
  return classes[props.type]
})

const close = () => {
  isVisible.value = false
  emit('close')
  if (timeoutId) clearTimeout(timeoutId)
}

onMounted(() => {
  if (props.duration > 0) {
    timeoutId = setTimeout(close, props.duration)
  }
})

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
})
</script>
