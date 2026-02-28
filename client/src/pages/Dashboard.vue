<template>
  <div class="min-h-screen py-12">
    <div class="container">
      <div class="grid lg:grid-cols-4 gap-6">
        <!-- Sidebar -->
        <aside class="lg:col-span-1">
          <div class="sticky top-20 space-y-4">
            <button
              @click="activeTab = 'cards'"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg font-medium transition-colors',
                activeTab === 'cards'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80',
              ]"
            >
              Minhas Cartas
            </button>
            <button
              @click="activeTab = 'trades'"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg font-medium transition-colors',
                activeTab === 'trades'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80',
              ]"
            >
              Minhas Trocas
            </button>
            <button
              @click="activeTab = 'create-trade'"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg font-medium transition-colors',
                activeTab === 'create-trade'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80',
              ]"
            >
              Criar Troca
            </button>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="lg:col-span-3">
          <!-- Minhas Cartas -->
          <div v-if="activeTab === 'cards'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold">Minhas Cartas</h2>
              <button
                @click="showAddCardsModal = true"
                class="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Adicionar Cartas
              </button>
            </div>

            <LoadingSpinner v-if="cardsStore.loading" :height="300" />

            <div v-else-if="userCards.length === 0" class="text-center py-12">
              <p class="text-lg text-muted-foreground">Você ainda não tem cartas. Adicione algumas!</p>
            </div>

            <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="card in userCards" 
                :key="card.id" 
                @click="openCardDetails(card)"
                class="rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img :src="card.imageUrl" :alt="card.name" class="w-full h-64 object-cover" />
                <div class="p-4">
                  <h3 class="font-semibold mb-2">{{ card.name }}</h3>
                  <p class="text-sm text-muted-foreground line-clamp-2">{{ card.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Minhas Trocas -->
          <div v-if="activeTab === 'trades'" class="space-y-6">
            <h2 class="text-2xl font-bold">Minhas Solicitações de Troca</h2>

            <LoadingSpinner v-if="tradesStore.loading" :height="300" />

            <div v-else-if="userTrades.length === 0" class="text-center py-12">
              <p class="text-lg text-muted-foreground">Você ainda não criou nenhuma solicitação de troca.</p>
            </div>

            <div v-else class="space-y-4">
              <div v-for="trade in userTrades" :key="trade.id" class="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-semibold">Solicitação de Troca</h3>
                  <button
                    @click="deleteTrade(trade.id)"
                    class="text-sm text-destructive hover:text-destructive/80 font-medium"
                  >
                    Deletar
                  </button>
                </div>

                <div class="grid md:grid-cols-2 gap-4">
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

                  <div>
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

                <p class="text-xs text-muted-foreground mt-4">{{ formatDate(trade.createdAt) }}</p>
              </div>
            </div>
          </div>

          <!-- Criar Troca -->
          <div v-if="activeTab === 'create-trade'" class="space-y-6">
            <h2 class="text-2xl font-bold">Criar Nova Solicitação de Troca</h2>

            <div class="rounded-lg border border-border bg-card p-6">
              <form @submit.prevent="handleCreateTrade" class="space-y-6">
                <div>
                  <label class="block text-sm font-medium mb-2">Cartas que você oferece:</label>
                  <div class="space-y-2 max-h-64 overflow-y-auto border border-border rounded-md p-4 bg-muted/50">
                    <label v-for="card in userCards" :key="card.id" class="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded">
                      <input
                        type="checkbox"
                        :value="card.id"
                        v-model="tradeForm.offeringCards"
                        class="rounded border-input"
                      />
                      <img :src="card.imageUrl" :alt="card.name" class="w-8 h-12 rounded object-cover" />
                      <span class="text-sm">{{ card.name }}</span>
                    </label>
                  </div>
                  <span v-if="errors.offering" class="text-sm text-destructive">{{ errors.offering }}</span>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">Cartas que você procura:</label>
                  <div class="space-y-2 max-h-64 overflow-y-auto border border-border rounded-md p-4 bg-muted/50">
                    <label v-for="card in availableCards" :key="card.id" class="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded">
                      <input
                        type="checkbox"
                        :value="card.id"
                        v-model="tradeForm.receivingCards"
                        class="rounded border-input"
                      />
                      <img :src="card.imageUrl" :alt="card.name" class="w-8 h-12 rounded object-cover" />
                      <span class="text-sm">{{ card.name }}</span>
                    </label>
                  </div>
                  <span v-if="errors.receiving" class="text-sm text-destructive">{{ errors.receiving }}</span>
                </div>

                <button
                  type="submit"
                  :disabled="creatingTrade"
                  class="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  {{ creatingTrade ? 'Criando...' : 'Criar Solicitação' }}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Add Cards Modal -->
    <div v-if="showAddCardsModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-card rounded-lg max-w-4xl w-full h-[85vh] flex flex-col">
        <div class="flex items-center justify-between p-6 pb-4 border-b border-border shrink-0">
          <h3 class="text-xl font-bold">Adicionar Cartas</h3>
          <button @click="showAddCardsModal = false" class="text-muted-foreground hover:text-foreground">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-2 min-h-0">
          <label v-for="card in availableCards" :key="card.id" class="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded">
            <input
              type="checkbox"
              :value="card.id"
              v-model="selectedCardsToAdd"
              class="rounded border-input"
            />
            <img :src="card.imageUrl" :alt="card.name" class="w-8 h-12 rounded object-cover" />
            <span class="text-sm">{{ card.name }}</span>
          </label>
        </div>

        <div class="flex gap-2 p-6 pt-4 border-t border-border bg-card shrink-0">
          <button
            @click="handleAddCards"
            :disabled="selectedCardsToAdd.length === 0 || addingCards"
            class="flex-1 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            {{ addingCards ? 'Adicionando...' : 'Adicionar' }}
          </button>
          <button
            @click="showAddCardsModal = false"
            class="flex-1 rounded-lg border border-border px-4 py-2 font-semibold transition-all hover:bg-muted"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Card Details Modal -->
    <div v-if="showCardDetailsModal && selectedCard" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="relative bg-muted">
          <button 
            @click="showCardDetailsModal = false" 
            class="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
          <img :src="selectedCard.imageUrl" :alt="selectedCard.name" class="w-full h-80 object-contain rounded-t-lg" />
        </div>
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-4">{{ selectedCard.name }}</h2>
          <p class="text-muted-foreground mb-6">{{ selectedCard.description }}</p>
          <button 
            @click="showCardDetailsModal = false"
            class="w-full rounded-lg border border-border px-4 py-2 font-semibold transition-all hover:bg-muted"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@stores/auth'
import { useCardsStore } from '@stores/cards'
import { useTradesStore } from '@stores/trades'
import { useToast } from '@utils/useToast'
import LoadingSpinner from '@components/LoadingSpinner.vue'

const authStore = useAuthStore()
const cardsStore = useCardsStore()
const tradesStore = useTradesStore()
const { success: showSuccess, error: showError } = useToast()

const activeTab = ref<'cards' | 'trades' | 'create-trade'>('cards')
const showAddCardsModal = ref(false)
const showCardDetailsModal = ref(false)
const selectedCard = ref<any>(null)
const selectedCardsToAdd = ref<string[]>([])
const addingCards = ref(false)
const creatingTrade = ref(false)

const tradeForm = ref({
  offeringCards: [] as string[],
  receivingCards: [] as string[],
})

const errors = ref({
  offering: '',
  receiving: '',
})

const userCards = computed(() => cardsStore.userCards)
const allCards = computed(() => cardsStore.allCards)
const userTrades = computed(() => tradesStore.userTrades)
const availableCards = computed(() => cardsStore.availableCards)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const loadData = async () => {
  try {
    await Promise.all([
      cardsStore.loadUserCards(),
      cardsStore.loadAllCards(1),
      tradesStore.loadTrades(1),
    ])
  } catch (error) {
    showError('Erro ao carregar dados')
  }
}

const handleAddCards = async () => {
  if (selectedCardsToAdd.value.length === 0) return

  addingCards.value = true
  try {
    const success = await cardsStore.addCards(selectedCardsToAdd.value)
    if (success) {
      showSuccess('Cartas adicionadas com sucesso!')
      showAddCardsModal.value = false
      selectedCardsToAdd.value = []
    } else {
      showError('Erro ao adicionar cartas')
    }
  } finally {
    addingCards.value = false
  }
}

const handleCreateTrade = async () => {
  errors.value = { offering: '', receiving: '' }

  if (tradeForm.value.offeringCards.length === 0) {
    errors.value.offering = 'Selecione pelo menos uma carta para oferecer'
    return
  }

  if (tradeForm.value.receivingCards.length === 0) {
    errors.value.receiving = 'Selecione pelo menos uma carta para receber'
    return
  }

  creatingTrade.value = true
  try {
    const cards = [
      ...tradeForm.value.offeringCards.map((cardId) => ({ cardId, type: 'OFFERING' as const })),
      ...tradeForm.value.receivingCards.map((cardId) => ({ cardId, type: 'RECEIVING' as const })),
    ]

    await tradesStore.createTrade({ cards })
    showSuccess('Solicitacao de troca criada com sucesso!')
    tradeForm.value = { offeringCards: [], receivingCards: [] }
    activeTab.value = 'trades'
  } catch (error) {
    showError('Erro ao criar solicitacao de troca')
  } finally {
    creatingTrade.value = false
  }
}

const deleteTrade = async (tradeId: string) => {
  if (!confirm('Tem certeza que deseja deletar esta solicitacao de troca?')) return

  try {
    const success = await tradesStore.deleteTrade(tradeId)
    if (success) {
      showSuccess('Solicitacao deletada com sucesso!')
    } else {
      showError('Erro ao deletar solicitacao')
    }
  } catch (error) {
    showError('Erro ao deletar solicitacao')
  }
}

const openCardDetails = (card: any) => {
  selectedCard.value = card
  showCardDetailsModal.value = true
}

onMounted(() => {
  loadData()
})
</script>
