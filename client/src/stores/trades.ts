import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Trade, CreateTradeRequest } from '@/types'
import { apiService } from '@services/api'
import { useAuthStore } from './auth'

export const useTradesStore = defineStore('trades', () => {
  const allTrades = ref<Trade[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const hasMore = ref(false)
  const rpp = 9

  const loadTrades = async (page: number = 1) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.getTrades({ page, rpp })
      if (page === 1) {
        allTrades.value = response.list
      } else {
        allTrades.value.push(...response.list)
      }
      hasMore.value = response.more
      currentPage.value = page
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar trades'
    } finally {
      loading.value = false
    }
  }

  const createTrade = async (data: CreateTradeRequest) => {
    try {
      const response = await apiService.createTrade(data)
      // Recarregar trades após criar
      await loadTrades(1)
      return response.tradeId
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao criar trade'
      throw err
    }
  }

  const deleteTrade = async (tradeId: string) => {
    try {
      await apiService.deleteTrade(tradeId)
      // Remover do array local
      allTrades.value = allTrades.value.filter((trade) => trade.id !== tradeId)
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao deletar trade'
      return false
    }
  }

  const userTrades = computed(() => {
    const authStore = useAuthStore()
    return allTrades.value.filter((trade) => trade.userId === authStore.user?.id)
  })

  const getTradeById = (id: string) => {
    return allTrades.value.find((trade) => trade.id === id)
  }

  return {
    allTrades,
    loading,
    error,
    currentPage,
    hasMore,
    rpp,
    loadTrades,
    createTrade,
    deleteTrade,
    userTrades,
    getTradeById,
  }
})
