// composables/useToast.ts
import { ref } from 'vue'

export const useToast = () => {
  const show = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration: number = 3000) => {
    // Simple console log for now - you can implement a proper toast UI later
    console.log(`[${type.toUpperCase()}] ${message}`)
    
    // You can also trigger a custom event that a Toast component listens to
    if (process.client) {
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message, type, duration }
      }))
    }
  }

  return {
    show,
    success: (message: string, duration?: number) => show(message, 'success', duration),
    error: (message: string, duration?: number) => show(message, 'error', duration),
    warning: (message: string, duration?: number) => show(message, 'warning', duration),
    info: (message: string, duration?: number) => show(message, 'info', duration),
  }
}
