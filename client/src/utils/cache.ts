/**
 * Cache utilities para armazenar dados localmente
 * com suporte a expiração
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number // em milissegundos
}

class CacheManager {
  private cache = new Map<string, CacheEntry<any>>()
  private readonly DEFAULT_TTL = 5 * 60 * 1000 // 5 minutos

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  clear(key?: string): void {
    if (key) {
      this.cache.delete(key)
    } else {
      this.cache.clear()
    }
  }

  // Métodos específicos para a aplicação
  setCards(cards: any[], ttl?: number): void {
    this.set('cards', cards, ttl)
  }

  getCards(): any[] | null {
    return this.get('cards')
  }

  setUserCards(cards: any[], ttl?: number): void {
    this.set('userCards', cards, ttl)
  }

  getUserCards(): any[] | null {
    return this.get('userCards')
  }

  setTrades(trades: any[], page: number, ttl?: number): void {
    this.set(`trades_page_${page}`, trades, ttl)
  }

  getTrades(page: number): any[] | null {
    return this.get(`trades_page_${page}`)
  }

  clearAllTrades(): void {
    // Limpar todas as páginas de trades
    const keysToDelete: string[] = []
    this.cache.forEach((_, key) => {
      if (key.startsWith('trades_page_')) {
        keysToDelete.push(key)
      }
    })
    keysToDelete.forEach((key) => this.cache.delete(key))
  }
}

export const cacheManager = new CacheManager()
