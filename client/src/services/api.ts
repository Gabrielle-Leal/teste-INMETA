import axios, { AxiosInstance } from 'axios'
import type {
  User,
  Card,
  Trade,
  AuthResponse,
  RegisterRequest,
  LoginRequest,
  CreateTradeRequest,
  AddCardsRequest,
  CardsResponse,
  TradesResponse,
  PaginationParams,
} from '@/types'

const API_BASE_URL = 'https://cards-marketplace-api.onrender.com'

class ApiService {
  private client: AxiosInstance
  private authToken: string | null = null

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Interceptor para adicionar token
    this.client.interceptors.request.use((config) => {
      if (this.authToken) {
        config.headers.Authorization = `Bearer ${this.authToken}`
      }
      return config
    })

    // Interceptor para tratamento de erros
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expirado ou inválido
          this.authToken = null
          localStorage.removeItem('token')
        }
        return Promise.reject(error.response?.data || error.message)
      }
    )
  }

  setAuthToken(token: string | null) {
    this.authToken = token
  }

  // Auth endpoints
  async register(data: RegisterRequest): Promise<{ userId: string }> {
    const response = await this.client.post('/register', data)
    return response.data
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.client.post('/login', data)
    return response.data
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.client.get('/me')
    return response.data
  }

  // Cards endpoints
  async getCards(params: PaginationParams): Promise<CardsResponse> {
    const response = await this.client.get('/cards', { params })
    return response.data
  }

  async getCard(id: string): Promise<Card> {
    const response = await this.client.get(`/cards/${id}`)
    return response.data
  }

  async getUserCards(): Promise<Card[]> {
    const response = await this.client.get('/me/cards')
    return response.data
  }

  async addCards(cardIds: string[]): Promise<void> {
    await this.client.post('/me/cards', { cardIds })
  }

  // Trades endpoints
  async getTrades(params: PaginationParams): Promise<TradesResponse> {
    const response = await this.client.get('/trades', { params })
    return response.data
  }

  async createTrade(data: CreateTradeRequest): Promise<{ tradeId: string }> {
    const response = await this.client.post('/trades', data)
    return response.data
  }

  async deleteTrade(id: string): Promise<void> {
    await this.client.delete(`/trades/${id}`)
  }
}

export const apiService = new ApiService()
