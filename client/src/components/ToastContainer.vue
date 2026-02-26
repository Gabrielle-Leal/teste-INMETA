<template>
  <Teleport to="body">
    <div class="fixed bottom-4 right-4 z-50 space-y-2">
      <transition-group name="toast" tag="div">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'rounded-lg px-4 py-3 text-sm font-medium shadow-lg max-w-sm animate-in fade-in slide-in-from-bottom-2',
            getToastClasses(toast.type),
          ]"
        >
          <div class="flex items-center gap-2">
            <span>{{ toast.message }}</span>
            <button
              @click="removeToast(toast.id)"
              class="ml-2 inline-flex text-current opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        </div>
      </transition-group>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '@utils/useToast'

const { toasts, removeToast } = useToast()

const getToastClasses = (type: string) => {
  const classes: Record<string, string> = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  }
  return classes[type] || classes.info
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
