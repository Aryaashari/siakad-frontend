<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
    <!-- Enhanced Modern Sidebar with Glassmorphism -->
    <aside class="fixed inset-y-0 left-0 w-72 bg-white/80 backdrop-blur-xl shadow-2xl z-50 border-r border-gray-200/50">
      <div class="flex flex-col h-full">
        <!-- Logo Section with Enhanced Gradient & Animation -->
        <div class="relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 animate-gradient-xy"></div>
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          <div class="relative flex items-center justify-center h-24 px-6">
            <div class="flex items-center gap-4">
              <div class="relative">
                <div class="absolute inset-0 bg-white/30 blur-xl rounded-2xl"></div>
                <div class="relative w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30">
                  <svg class="w-8 h-8 text-white animate-bounce-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
              </div>
              <div class="text-white">
                <h1 class="text-2xl font-black tracking-tight">SIAKAD</h1>
                <p class="text-sm text-blue-100 font-medium">Sekolah Dasar ✨</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats Badge -->
        <div class="px-4 py-3">
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-100/50 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span class="text-white text-xs font-bold">{{ authStore.user?.full_name?.charAt(0) || 'A' }}</span>
                </div>
                <div>
                  <p class="text-xs font-semibold text-gray-700">{{ authStore.user?.role.toUpperCase() }}</p>
                  <p class="text-xs text-gray-500">Tahun 2024/2025</p>
                </div>
              </div>
              <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
          </div>
        </div>

        <!-- Navigation with Enhanced Modern Design -->
        <nav class="flex-1 px-4 py-6 overflow-y-auto">
          <div class="space-y-2">
            <!-- Dashboard -->
            <NuxtLink
              to="/dashboard"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path === '/dashboard' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700'"
            >
              <div class="relative flex-shrink-0">
                <svg class="w-5 h-5 mr-3 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                <div v-if="$route.path === '/dashboard'" class="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <span class="flex-1">Dashboard</span>
              <svg v-if="$route.path === '/dashboard'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>

            <!-- Data Siswa -->
            <NuxtLink
              to="/students"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path.startsWith('/students') 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-700'"
            >
              <svg class="w-5 h-5 mr-3 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              <span class="flex-1">Data Siswa</span>
              <svg v-if="$route.path.startsWith('/students')" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>

            <!-- Data Guru -->
            <NuxtLink
              to="/teachers"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path.startsWith('/teachers') 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-700'"
            >
              <svg class="w-5 h-5 mr-3 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span class="flex-1">Data Guru</span>
              <svg v-if="$route.path.startsWith('/teachers')" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>

            <!-- Data Kelas -->
            <NuxtLink
              to="/classes"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path.startsWith('/classes') 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700'"
            >
              <svg class="w-5 h-5 mr-3 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <span class="flex-1">Data Kelas</span>
              <svg v-if="$route.path.startsWith('/classes')" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>

            <!-- Mata Pelajaran -->
            <NuxtLink
              to="/subjects"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path.startsWith('/subjects') 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-700'"
            >
              <svg class="w-5 h-5 mr-3 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              <span class="flex-1">Mata Pelajaran</span>
              <svg v-if="$route.path.startsWith('/subjects')" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>

            <!-- Divider -->
            <div class="my-4 px-4">
              <div class="border-t border-gray-200"></div>
              <p class="text-xs font-semibold text-gray-500 mt-4 mb-2 px-2">AKADEMIK</p>
            </div>

            <!-- Jadwal Pelajaran -->
            <NuxtLink
              to="/dashboard/schedules"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path.startsWith('/dashboard/schedules') 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-700'"
            >
              <svg class="w-5 h-5 mr-3 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span class="flex-1">Jadwal Pelajaran</span>
              <svg v-if="$route.path.startsWith('/dashboard/schedules')" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>

            <!-- Absensi Siswa -->
            <NuxtLink
              to="/dashboard/student-attendances"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path.startsWith('/dashboard/student-attendances') 
                ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-lg shadow-teal-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-green-50 hover:text-teal-700'"
            >
              <svg class="w-5 h-5 mr-3 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="flex-1">Absensi Siswa</span>
              <svg v-if="$route.path.startsWith('/dashboard/student-attendances')" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>

            <!-- Absensi Guru -->
            <NuxtLink
              to="/dashboard/teacher-attendances"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path.startsWith('/dashboard/teacher-attendances') 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700'"
            >
              <svg class="w-5 h-5 mr-3 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="flex-1">Absensi Guru</span>
              <svg v-if="$route.path.startsWith('/dashboard/teacher-attendances')" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>

            <!-- Pengajuan Izin/Cuti -->
            <NuxtLink
              to="/dashboard/leave-requests"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path.startsWith('/dashboard/leave-requests') 
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-pink-700'"
            >
              <svg class="w-5 h-5 mr-3 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span class="flex-1">Izin/Cuti Guru</span>
              <svg v-if="$route.path.startsWith('/dashboard/leave-requests')" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>

            <!-- Divider -->
            <div class="my-4 px-4">
              <div class="border-t border-gray-200"></div>
              <p class="text-xs font-semibold text-gray-500 mt-4 mb-2 px-2">PENILAIAN</p>
            </div>

            <!-- Komponen Nilai -->
            <NuxtLink
              to="/dashboard/grades/components"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path.startsWith('/dashboard/grades/components') 
                ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 hover:text-violet-700'"
            >
              <svg class="w-5 h-5 mr-3 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
              </svg>
              <span class="flex-1">Komponen Nilai</span>
              <svg v-if="$route.path.startsWith('/dashboard/grades/components')" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>

            <!-- Input Nilai -->
            <NuxtLink
              to="/dashboard/grades/input"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path.startsWith('/dashboard/grades/input') 
                ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:text-purple-700'"
            >
              <svg class="w-5 h-5 mr-3 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              <span class="flex-1">Input Nilai</span>
              <svg v-if="$route.path.startsWith('/dashboard/grades/input')" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>

            <!-- Nilai Sikap -->
            <NuxtLink
              to="/dashboard/grades/attitude"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path.startsWith('/dashboard/grades/attitude') 
                ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-fuchsia-50 hover:to-pink-50 hover:text-fuchsia-700'"
            >
              <svg class="w-5 h-5 mr-3 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="flex-1">Nilai Sikap</span>
              <svg v-if="$route.path.startsWith('/dashboard/grades/attitude')" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>

            <!-- Nilai Akhir (Leger) -->
            <NuxtLink
              to="/dashboard/grades/final"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path.startsWith('/dashboard/grades/final') 
                ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-violet-50 hover:text-indigo-700'"
            >
              <svg class="w-5 h-5 mr-3 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              <span class="flex-1">Nilai Akhir</span>
              <svg v-if="$route.path.startsWith('/dashboard/grades/final')" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>

            <!-- Raport Siswa -->
            <NuxtLink
              to="/dashboard/report-cards"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path.startsWith('/dashboard/report-cards') 
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 hover:text-violet-700'"
            >
              <svg class="w-5 h-5 mr-3 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span class="flex-1">Raport Siswa</span>
              <svg v-if="$route.path.startsWith('/dashboard/report-cards')" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>

            <!-- Ekstrakurikuler -->
            <NuxtLink
              to="/dashboard/extracurriculars"
              class="group flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
              :class="$route.path.startsWith('/dashboard/extracurriculars') 
                ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/50' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:text-purple-700'"
            >
              <svg class="w-5 h-5 mr-3 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="flex-1">Ekstrakurikuler</span>
              <svg v-if="$route.path.startsWith('/dashboard/extracurriculars')" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>
          </div>
        </nav>

        <!-- User Section with Gradient -->
        <div class="relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50"></div>
          <div class="relative p-4 border-t border-gray-200">
            <div class="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
              <div class="relative">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-gray-900 truncate">{{ authStore.user?.full_name || 'Admin' }}</p>
                <p class="text-xs text-gray-500 capitalize truncate">{{ authStore.user?.role || 'Administrator' }}</p>
              </div>
              <button
                @click="handleLogout"
                class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Logout"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="ml-72">
      <!-- Top Bar with breadcrumbs -->
      <header class="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div class="px-8 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span class="text-gray-600">SIAKAD</span>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
              <span class="text-gray-900 font-semibold">{{ currentPageName }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm text-gray-600">{{ currentDate }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()
const route = useRoute()

const currentDate = computed(() => {
  return new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})

const currentPageName = computed(() => {
  const path = route.path
  if (path === '/dashboard') return 'Dashboard'
  if (path.includes('/students')) return 'Data Siswa'
  if (path.includes('/teachers')) return 'Data Guru'
  if (path.includes('/classes')) return 'Data Kelas'
  if (path.includes('/subjects')) return 'Mata Pelajaran'
  if (path.includes('/schedules')) return 'Jadwal Pelajaran'
  if (path.includes('/student-attendances')) return 'Absensi Siswa'
  if (path.includes('/teacher-attendances')) return 'Absensi Guru'
  if (path.includes('/leave-requests')) return 'Izin/Cuti Guru'
  return 'Page'
})

const handleLogout = async () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    authStore.logout()
    router.push('/auth/login')
  }
}
</script>
