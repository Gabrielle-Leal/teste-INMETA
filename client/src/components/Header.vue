<template>
  <header class="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-16 items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2 font-bold text-xl">
        <span class="text-primary">🃏</span>
        <span class="hidden sm:inline">Cards Marketplace</span>
      </RouterLink>

      <nav class="flex items-center gap-4">
        <RouterLink
          to="/marketplace"
          class="text-sm font-medium transition-colors hover:text-primary"
          :class="{ 'text-primary': route.name === 'Marketplace' }"
        >
          Marketplace
        </RouterLink>

        <template v-if="authStore.isAuthenticated">
          <RouterLink
            to="/dashboard"
            class="text-sm font-medium transition-colors hover:text-primary"
            :class="{ 'text-primary': route.name === 'Dashboard' }"
          >
            Dashboard
          </RouterLink>
          <button
            @click="handleLogout"
            class="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Sair
          </button>
        </template>

        <template v-else>
          <RouterLink
            to="/login"
            class="text-sm font-medium transition-colors hover:text-primary"
            :class="{ 'text-primary': route.name === 'Login' }"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            class="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Registrar
          </RouterLink>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useAuthStore } from '@stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
