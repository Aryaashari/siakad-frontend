<template>
  <div class="w-full max-w-md">
    <!-- Login Card with Gradient Border -->
    <div class="relative">
      <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 animate-pulse"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
        <!-- Logo & Title -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">SIAKAD</h1>
          <p class="text-gray-600">Sistem Informasi Akademik Sekolah Dasar</p>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-sm text-red-600 font-medium">{{ error }}</p>
          </div>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                </svg>
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="input pl-12"
                placeholder="admin@siakad.com"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="input pl-12"
                placeholder="••••••••"
              />
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center group cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition" />
              <span class="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition">Ingat saya</span>
            </label>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-700 font-medium transition">
              Lupa password?
            </a>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="loading"
            class="btn btn-primary w-full text-lg py-3"
          >
            <span v-if="!loading" class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
              </svg>
              Masuk
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </span>
          </button>
        </form>

        <!-- Demo Credentials -->
        <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p class="text-xs font-semibold text-blue-800 mb-2">🔑 Demo Credentials:</p>
          <p class="text-xs text-blue-700">Email: <span class="font-mono font-semibold">admin@siakad.com</span></p>
          <p class="text-xs text-blue-700">Password: <span class="font-mono font-semibold">admin123</span></p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <p class="text-center text-sm text-gray-500 mt-6">
      © 2024 SIAKAD SD - All rights reserved
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
  layout: 'auth'
})

const api = useApi()
const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  try {
    error.value = ''
    loading.value = true

    console.log('🔑 Attempting login with:', form.value.email)
    
    const response = await api.login({
      email: form.value.email,
      password: form.value.password
    })
    
    console.log('✅ Login API response:', {
      success: response.success,
      hasData: !!response.data,
      hasUser: !!response.data?.user,
      hasToken: !!response.data?.access_token
    })
    
    // setAuth expects an object with user, access_token, and refresh_token
    authStore.setAuth({
      user: response.data.user,
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token
    })
    
    console.log('🔐 Auth store updated, isAuthenticated:', authStore.isAuthenticated)
    
    // Navigate to dashboard
    console.log('🚀 Navigating to dashboard...')
    await router.push('/dashboard')
    console.log('✅ Navigation complete')
  } catch (err: any) {
    console.error('❌ Login error:', err)
    error.value = err?.data?.error || err?.message || 'Login gagal. Periksa email dan password Anda.'
  } finally {
    loading.value = false
  }
}
</script>
