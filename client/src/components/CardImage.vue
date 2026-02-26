<template>
  <div class="group relative overflow-hidden rounded-lg bg-muted">
    <img
      :src="imageUrl"
      :alt="name"
      class="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      @error="handleImageError"
    />
    <div
      v-if="showOverlay"
      class="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end"
    >
      <div class="w-full p-4 text-white">
        <h3 class="font-semibold truncate">{{ name }}</h3>
        <p class="text-sm text-gray-200 line-clamp-2">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  imageUrl: string
  name: string
  description?: string
  showOverlay?: boolean
}

withDefaults(defineProps<Props>(), {
  showOverlay: true,
})

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"%3E%3Crect fill="%23e5e7eb" width="400" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%236b7280"%3EImagem não disponível%3C/text%3E%3C/svg%3E'
}
</script>
