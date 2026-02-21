<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Redirecting...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

onMounted(() => {
  authStore.loadFromStorage()
  
  if (authStore.isAuthenticated) {
    navigateTo('/dashboard')
  } else {
    navigateTo('/auth/login')
  }
})
</script>
