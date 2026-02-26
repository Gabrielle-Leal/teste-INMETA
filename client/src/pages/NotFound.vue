<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold mb-4">404</h1>
      <p class="text-xl text-muted-foreground mb-8">Página não encontrada</p>
      <RouterLink to="/" class="inline-block rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground">
        Voltar para Home
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
