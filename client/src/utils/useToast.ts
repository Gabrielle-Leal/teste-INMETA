import { ref } from 'vue'

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration: number
}

const toasts = ref<ToastMessage[]>([])

export const useToast = () => {
  const addToast = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    duration: number = 3000
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    const toast: ToastMessage = { id, message, type, duration }

    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  const success = (message: string, duration?: number) =>
    addToast(message, 'success', duration)

  const error = (message: string, duration?: number) =>
    addToast(message, 'error', duration)

  const warning = (message: string, duration?: number) =>
    addToast(message, 'warning', duration)

  const info = (message: string, duration?: number) =>
    addToast(message, 'info', duration)

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  }
}
