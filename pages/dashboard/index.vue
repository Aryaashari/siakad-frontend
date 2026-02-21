<template>
  <div class="min-h-screen">
    <!-- Page Header with Gradient -->
    <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white rounded-2xl shadow-xl p-8 mb-8 animate-fade-in">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold mb-2">Dashboard</h1>
          <p class="text-blue-100 text-lg">Selamat datang kembali, {{ authStore.user?.full_name || 'Admin' }}! 👋</p>
        </div>
        <div class="hidden md:block">
          <div class="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
            <p class="text-sm text-blue-100">Tahun Ajaran</p>
            <p class="text-xl font-bold">2024/2025</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Siswa Card -->
      <div class="stat-card from-blue-500 to-blue-600 text-white animate-slide-up" style="animation-delay: 0.1s">
        <div class="flex items-center justify-between mb-4">
          <div class="stat-icon bg-white/20 backdrop-blur-sm">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold">{{ stats.totalStudents }}</p>
            <p class="text-blue-100 text-sm mt-1">Total Siswa</p>
          </div>
        </div>
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
          <span class="text-xs text-blue-100">Siswa Aktif</span>
          <span class="text-sm font-semibold">{{ stats.totalStudents }}</span>
        </div>
      </div>

      <!-- Total Guru Card -->
      <div class="stat-card from-purple-500 to-purple-600 text-white animate-slide-up" style="animation-delay: 0.2s">
        <div class="flex items-center justify-between mb-4">
          <div class="stat-icon bg-white/20 backdrop-blur-sm">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold">{{ stats.totalTeachers }}</p>
            <p class="text-purple-100 text-sm mt-1">Total Guru</p>
          </div>
        </div>
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
          <span class="text-xs text-purple-100">Guru Aktif</span>
          <span class="text-sm font-semibold">{{ stats.totalTeachers }}</span>
        </div>
      </div>

      <!-- Total Kelas Card -->
      <div class="stat-card from-green-500 to-green-600 text-white animate-slide-up" style="animation-delay: 0.3s">
        <div class="flex items-center justify-between mb-4">
          <div class="stat-icon bg-white/20 backdrop-blur-sm">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold">{{ stats.totalClasses }}</p>
            <p class="text-green-100 text-sm mt-1">Total Kelas</p>
          </div>
        </div>
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
          <span class="text-xs text-green-100">Kelas Aktif</span>
          <span class="text-sm font-semibold">{{ stats.totalClasses }}</span>
        </div>
      </div>

      <!-- Total Mata Pelajaran Card -->
      <div class="stat-card from-orange-500 to-orange-600 text-white animate-slide-up" style="animation-delay: 0.4s">
        <div class="flex items-center justify-between mb-4">
          <div class="stat-icon bg-white/20 backdrop-blur-sm">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold">{{ stats.totalSubjects }}</p>
            <p class="text-orange-100 text-sm mt-1">Mata Pelajaran</p>
          </div>
        </div>
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
          <span class="text-xs text-orange-100">Mapel Aktif</span>
          <span class="text-sm font-semibold">{{ stats.totalSubjects }}</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Quick Actions Card -->
      <div class="card animate-fade-in">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          Quick Actions
        </h2>
        <div class="space-y-3">
          <NuxtLink to="/students/create" class="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50 transition-all group border-2 border-transparent hover:border-blue-200">
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-gray-800 group-hover:text-blue-700">Tambah Siswa</p>
              <p class="text-sm text-gray-500">Daftar siswa baru</p>
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>

          <NuxtLink to="/teachers/create" class="flex items-center gap-3 p-4 rounded-xl hover:bg-purple-50 transition-all group border-2 border-transparent hover:border-purple-200">
            <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-gray-800 group-hover:text-purple-700">Tambah Guru</p>
              <p class="text-sm text-gray-500">Daftar guru baru</p>
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>

          <NuxtLink to="/classes/create" class="flex items-center gap-3 p-4 rounded-xl hover:bg-green-50 transition-all group border-2 border-transparent hover:border-green-200">
            <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-gray-800 group-hover:text-green-700">Tambah Kelas</p>
              <p class="text-sm text-gray-500">Buat kelas baru</p>
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>

          <NuxtLink to="/subjects/create" class="flex items-center gap-3 p-4 rounded-xl hover:bg-orange-50 transition-all group border-2 border-transparent hover:border-orange-200">
            <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-gray-800 group-hover:text-orange-700">Tambah Mapel</p>
              <p class="text-sm text-gray-500">Buat mata pelajaran</p>
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- System Info -->
      <div class="lg:col-span-2 card animate-fade-in" style="animation-delay: 0.1s">
        <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Informasi Sistem
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border-l-4 border-blue-600">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Role Anda</p>
                  <p class="font-bold text-gray-800 capitalize">{{ authStore.user?.role || 'Admin' }}</p>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-transparent rounded-xl border-l-4 border-green-600">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Status</p>
                  <p class="font-bold text-green-600">Aktif</p>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-transparent rounded-xl border-l-4 border-purple-600">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Semester</p>
                  <p class="font-bold text-gray-800">1 (Ganjil)</p>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-transparent rounded-xl border-l-4 border-orange-600">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Tahun Ajaran</p>
                  <p class="font-bold text-gray-800">2024/2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity & Statistics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Distribution Chart -->
      <div class="card animate-fade-in" style="animation-delay: 0.2s">
        <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          Distribusi Data
        </h2>
        <div class="space-y-6">
          <!-- Siswa Progress Bar -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Siswa</span>
              <span class="text-sm font-bold text-blue-600">{{ stats.totalStudents }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-lg transition-all duration-1000" :style="`width: ${Math.min((stats.totalStudents / 600) * 100, 100)}%`"></div>
            </div>
          </div>

          <!-- Guru Progress Bar -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Guru</span>
              <span class="text-sm font-bold text-purple-600">{{ stats.totalTeachers }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full shadow-lg transition-all duration-1000" :style="`width: ${Math.min((stats.totalTeachers / 50) * 100, 100)}%`"></div>
            </div>
          </div>

          <!-- Kelas Progress Bar -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Kelas</span>
              <span class="text-sm font-bold text-green-600">{{ stats.totalClasses }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div class="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full shadow-lg transition-all duration-1000" :style="`width: ${Math.min((stats.totalClasses / 20) * 100, 100)}%`"></div>
            </div>
          </div>

          <!-- Mata Pelajaran Progress Bar -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Mata Pelajaran</span>
              <span class="text-sm font-bold text-orange-600">{{ stats.totalSubjects }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div class="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full shadow-lg transition-all duration-1000" :style="`width: ${Math.min((stats.totalSubjects / 15) * 100, 100)}%`"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Welcome Message -->
      <div class="card bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 animate-fade-in" style="animation-delay: 0.3s">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-800 mb-2">Selamat Datang di SIAKAD! 🎉</h3>
            <p class="text-gray-600 mb-4">
              Sistem Informasi Akademik Sekolah Dasar membantu Anda mengelola data siswa, guru, kelas, dan mata pelajaran dengan mudah dan efisien.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="badge badge-info">📊 Phase 1 Complete</span>
              <span class="badge badge-success">✅ Fully Tested</span>
              <span class="badge badge-purple">🚀 Ready to Use</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const api = useApi()
const authStore = useAuthStore()

const stats = ref({
  totalStudents: 0,
  totalTeachers: 0,
  totalClasses: 0,
  totalSubjects: 0
})

// Fetch stats
onMounted(async () => {
  try {
    const [students, teachers, classes, subjects] = await Promise.all([
      api.getStudents({ page: 1, per_page: 1 }),
      api.getTeachers({ page: 1, per_page: 1 }),
      api.getClasses({ page: 1, per_page: 1 }),
      api.getSubjects({ page: 1, per_page: 1 })
    ])

    stats.value = {
      totalStudents: students.meta?.total || 0,
      totalTeachers: teachers.meta?.total || 0,
      totalClasses: classes.meta?.total || 0,
      totalSubjects: subjects.meta?.total || 0
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
})
</script>
