export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Load auth from storage if not already loaded
  if (!authStore.token && process.client) {
    authStore.loadFromStorage()
  }
  
  // If authenticated, redirect to dashboard
  if (authStore.isAuthenticated) {
    return navigateTo('/dashboard')
  }
})
