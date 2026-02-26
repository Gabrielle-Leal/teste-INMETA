import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, AuthResponse } from '@/types'
import { apiService } from '@services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const setToken = (newToken: string | null) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
      apiService.setAuthToken(newToken)
    } else {
      localStorage.removeItem('token')
      apiService.setAuthToken(null)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      await apiService.register({ name, email, password })
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao registrar'
      return false
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.login({ email, password })
      setToken(response.token)
      user.value = response.user
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao fazer login'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    setToken(null)
  }

  const fetchCurrentUser = async () => {
    if (!token.value) return false

    loading.value = true
    try {
      const userData = await apiService.getCurrentUser()
      user.value = userData
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar usuário'
      logout()
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    fetchCurrentUser,
    setToken,
  }
})
