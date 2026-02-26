import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Card } from '@/types'
import { apiService } from '@services/api'

export const useCardsStore = defineStore('cards', () => {
  const allCards = ref<Card[]>([])
  const userCards = ref<Card[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const hasMore = ref(false)
  const rpp = 12

  const loadAllCards = async (page: number = 1) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.getCards({ page, rpp })
      if (page === 1) {
        allCards.value = response.list
      } else {
        allCards.value.push(...response.list)
      }
      hasMore.value = response.more
      currentPage.value = page
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar cartas'
    } finally {
      loading.value = false
    }
  }

  const loadUserCards = async () => {
    loading.value = true
    error.value = null
    try {
      userCards.value = await apiService.getUserCards()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar cartas do usuário'
    } finally {
      loading.value = false
    }
  }

  const addCards = async (cardIds: string[]) => {
    try {
      await apiService.addCards(cardIds)
      await loadUserCards()
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao adicionar cartas'
      return false
    }
  }

  const getCardById = (id: string) => {
    return allCards.value.find((card) => card.id === id)
  }

  const userCardIds = computed(() => userCards.value.map((card) => card.id))

  const availableCards = computed(() => {
    return allCards.value.filter((card) => !userCardIds.value.includes(card.id))
  })

  return {
    allCards,
    userCards,
    loading,
    error,
    currentPage,
    hasMore,
    rpp,
    loadAllCards,
    loadUserCards,
    addCards,
    getCardById,
    userCardIds,
    availableCards,
  }
})
