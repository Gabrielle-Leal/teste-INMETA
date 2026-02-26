/**
 * Tipos TypeScript para o Cards Marketplace
 * Definições de modelos de dados e interfaces da API
 */

export interface User {
  id: string;
  name: string;
  email: string;
  cards?: Card[];
}

export interface Card {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface UserCard {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface TradeCard {
  id: string;
  cardId: string;
  tradeId: string;
  type: 'OFFERING' | 'RECEIVING';
  card: Card;
}

export interface Trade {
  id: string;
  userId: string;
  createdAt: string;
  user: {
    name: string;
  };
  tradeCards: TradeCard[];
}

export interface TradesResponse {
  list: Trade[];
  rpp: number;
  page: number;
  more: boolean;
}

export interface CardsResponse {
  list: Card[];
  rpp: number;
  page: number;
  more: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateTradeRequest {
  cards: Array<{
    cardId: string;
    type: 'OFFERING' | 'RECEIVING';
  }>;
}

export interface AddCardsRequest {
  cardIds: string[];
}

export interface PaginationParams {
  rpp: number;
  page: number;
}

export interface ApiError {
  message: string;
  status: number;
  data?: unknown;
}
