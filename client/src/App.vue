<template>
  <div id="app" class="min-h-screen bg-background text-foreground">
    <Header />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@stores/auth'
import Header from '@components/Header.vue'
import Footer from '@components/Footer.vue'
import ToastContainer from '@components/ToastContainer.vue'
import { RouterView } from 'vue-router'

const authStore = useAuthStore()

onMounted(async () => {
  // Restaurar sessão do usuário se houver token
  if (authStore.token) {
    await authStore.fetchCurrentUser()
  }
})
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
