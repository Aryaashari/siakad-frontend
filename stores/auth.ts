import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    refreshToken: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
    isKepalaSekolah: (state) => state.user?.role === 'kepala_sekolah',
    isGuru: (state) => state.user?.role === 'guru',
    isStaff: (state) => state.user?.role === 'staff',
  },

  actions: {
    setAuth(data: { user: User; access_token: string; refresh_token: string }) {
      console.log('🔐 setAuth called with:', { 
        hasUser: !!data.user, 
        hasToken: !!data.access_token,
        hasRefresh: !!data.refresh_token,
        userName: data.user?.full_name || data.user?.username
      })
      
      this.user = data.user
      this.token = data.access_token
      this.refreshToken = data.refresh_token
      
      // Save to localStorage
      if (process.client) {
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('refreshToken', data.refresh_token)
        localStorage.setItem('user', JSON.stringify(data.user))
        console.log('✅ Auth data saved to localStorage')
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.refreshToken = null
      
      // Clear localStorage
      if (process.client) {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
      }
    },

    loadFromStorage() {
      if (process.client) {
        try {
          const token = localStorage.getItem('token')
          const refreshToken = localStorage.getItem('refreshToken')
          const userStr = localStorage.getItem('user')
          
          // Validate that values are not null, undefined, or string "undefined"
          if (token && token !== 'undefined' && 
              refreshToken && refreshToken !== 'undefined' && 
              userStr && userStr !== 'undefined') {
            this.token = token
            this.refreshToken = refreshToken
            this.user = JSON.parse(userStr)
          } else {
            // Clear invalid data
            this.logout()
          }
        } catch (error) {
          console.error('Failed to load auth from storage:', error)
          // Clear corrupted data
          this.logout()
        }
      }
    }
  },

  persist: true
})
