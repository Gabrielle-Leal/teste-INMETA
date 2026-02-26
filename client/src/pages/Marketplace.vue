<template>
  <div class="min-h-screen py-12">
    <div class="container">
      <h1 class="text-4xl font-bold mb-8">Marketplace de Trocas</h1>

      <LoadingSpinner v-if="loading" :height="400" />

      <div v-else-if="trades.length === 0" class="text-center py-12">
        <p class="text-lg text-muted-foreground">Nenhuma solicitação de troca disponível no momento.</p>
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="trade in trades"
          :key="trade.id"
          class="rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold">{{ trade.user.name }}</h3>
              <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{{ trade.tradeCards.length }} cartas</span>
            </div>

            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-muted-foreground mb-2">Oferecendo:</h4>
                <div class="space-y-2">
                  <div
                    v-for="tc in trade.tradeCards.filter((c) => c.type === 'OFFERING')"
                    :key="tc.id"
                    class="flex items-center gap-2"
                  >
                    <img :src="tc.card.imageUrl" :alt="tc.card.name" class="w-12 h-16 rounded object-cover" />
                    <span class="text-sm">{{ tc.card.name }}</span>
                  </div>
                </div>
              </div>

              <div class="border-t border-border pt-4">
                <h4 class="text-sm font-medium text-muted-foreground mb-2">Procurando:</h4>
                <div class="space-y-2">
                  <div
                    v-for="tc in trade.tradeCards.filter((c) => c.type === 'RECEIVING')"
                    :key="tc.id"
                    class="flex items-center gap-2"
                  >
                    <img :src="tc.card.imageUrl" :alt="tc.card.name" class="w-12 h-16 rounded object-cover" />
                    <span class="text-sm">{{ tc.card.name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <p class="text-xs text-muted-foreground mt-4">
              {{ formatDate(trade.createdAt) }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="tradesStore.hasMore" class="mt-8 text-center">
        <button
          @click="loadMore"
          :disabled="loading"
          class="rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
        >
          Carregar Mais
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTradesStore } from '@stores/trades'
import { useToast } from '@utils/useToast'
import LoadingSpinner from '@components/LoadingSpinner.vue'
import type { Trade } from '@/types'

const tradesStore = useTradesStore()
const { error: showError } = useToast()

const trades = ref<Trade[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    await tradesStore.loadTrades(1)
    trades.value = tradesStore.allTrades
  } catch (err) {
    showError('Erro ao carregar solicitações de troca')
  } finally {
    loading.value = false
  }
})

const loadMore = async () => {
  try {
    await tradesStore.loadTrades(tradesStore.currentPage + 1)
    trades.value = tradesStore.allTrades
  } catch (err) {
    showError('Erro ao carregar mais solicitações')
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR')
}
</script>
