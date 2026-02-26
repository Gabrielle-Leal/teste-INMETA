<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
      <div class="container">
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
            Bem-vindo ao <span class="text-primary">Cards Marketplace</span>
          </h1>
          <p class="mt-6 text-lg text-muted-foreground">
            A plataforma perfeita para trocar suas cartas colecionáveis com outros entusiastas.
            Encontre as cartas que você procura e ofereça as que você não precisa mais.
          </p>
          <div class="mt-10 flex gap-4 justify-center">
            <RouterLink
              to="/marketplace"
              class="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
            >
              Explorar Marketplace
            </RouterLink>
            <RouterLink
              v-if="!authStore.isAuthenticated"
              to="/register"
              class="rounded-lg border border-primary px-8 py-3 font-semibold text-primary transition-all hover:bg-primary/5"
            >
              Começar Agora
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16">
      <div class="container">
        <h2 class="text-3xl font-bold text-center mb-12">Como Funciona</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
            <div class="text-3xl mb-4">📝</div>
            <h3 class="text-xl font-semibold mb-2">Registre-se</h3>
            <p class="text-muted-foreground">
              Crie sua conta gratuitamente e comece a gerenciar suas cartas.
            </p>
          </div>
          <div class="rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
            <div class="text-3xl mb-4">🃏</div>
            <h3 class="text-xl font-semibold mb-2">Adicione Cartas</h3>
            <p class="text-muted-foreground">
              Adicione as cartas que você possui à sua coleção pessoal.
            </p>
          </div>
          <div class="rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
            <div class="text-3xl mb-4">🔄</div>
            <h3 class="text-xl font-semibold mb-2">Troque</h3>
            <p class="text-muted-foreground">
              Crie solicitações de troca e encontre parceiros para trocar cartas.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary/5 py-16">
      <div class="container text-center">
        <h2 class="text-3xl font-bold mb-4">Pronto para começar?</h2>
        <p class="text-lg text-muted-foreground mb-8">
          Junte-se a nossa comunidade de colecionadores hoje mesmo.
        </p>
        <RouterLink
          v-if="!authStore.isAuthenticated"
          to="/register"
          class="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
        >
          Registrar Agora
        </RouterLink>
        <RouterLink
          v-else
          to="/dashboard"
          class="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
        >
          Ir para Dashboard
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@stores/auth'

const authStore = useAuthStore()
</script>
