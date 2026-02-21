<template>
  <div class="min-h-screen p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="relative overflow-hidden rounded-2xl mb-8">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600"></div>
        <div class="relative p-8 text-white">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold mb-2">Ekstrakurikuler</h1>
              <p class="text-purple-100">Kelola kegiatan ekstrakurikuler sekolah</p>
            </div>
            <NuxtLink
              to="/dashboard/extracurriculars/create"
              class="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Tambah Ekstrakurikuler
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Filter -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="flex items-center gap-4">
          <label class="flex items-center gap-2">
            <input
              v-model="showActiveOnly"
              type="checkbox"
              class="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span class="text-sm font-medium text-gray-700">Tampilkan hanya yang aktif</span>
          </label>
          <button
            @click="loadExtracurriculars"
            class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-600">Memuat data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-red-600 font-semibold">{{ error }}</p>
        <button @click="loadExtracurriculars" class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Coba Lagi
        </button>
      </div>

      <!-- Data Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Empty State -->
        <div v-if="extracurriculars.length === 0" class="col-span-full bg-white rounded-xl shadow-sm p-12 text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-lg font-semibold text-gray-700">Belum ada ekstrakurikuler</p>
          <p class="text-sm text-gray-500 mt-2">Klik "Tambah Ekstrakurikuler" untuk membuat yang baru</p>
        </div>

        <!-- Ekstrakurikuler Cards -->
        <div
          v-for="ekskul in extracurriculars"
          :key="ekskul.id"
          class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          <div class="relative h-32 bg-gradient-to-br from-purple-500 to-fuchsia-500 p-6">
            <div class="absolute top-4 right-4">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="ekskul.is_active ? 'bg-green-400 text-green-900' : 'bg-gray-400 text-gray-900'"
              >
                {{ ekskul.is_active ? 'Aktif' : 'Nonaktif' }}
              </span>
            </div>
            <div class="flex items-center justify-center h-full">
              <svg class="w-16 h-16 text-white opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ ekskul.name }}</h3>
            <p v-if="ekskul.description" class="text-sm text-gray-600 mb-4 line-clamp-2">
              {{ ekskul.description }}
            </p>
            <div v-if="ekskul.instructor_name" class="flex items-center gap-2 text-sm text-gray-700 mb-4">
              <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <span class="font-medium">{{ ekskul.instructor_name }}</span>
            </div>

            <div class="flex items-center gap-2 pt-4 border-t">
              <NuxtLink
                :to="`/dashboard/extracurriculars/${ekskul.id}`"
                class="flex-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-center font-medium"
              >
                Detail
              </NuxtLink>
              <button
                @click="handleDelete(ekskul.id)"
                class="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { getExtracurriculars, deleteExtracurricular } = useExtracurricular()

const extracurriculars = ref<any[]>([])
const loading = ref(false)
const error = ref('')
const showActiveOnly = ref(false)

const loadExtracurriculars = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await getExtracurriculars(showActiveOnly.value)
    extracurriculars.value = response.data || []
  } catch (err: any) {
    error.value = err.data?.message || 'Gagal memuat data ekstrakurikuler'
    console.error('Error loading extracurriculars:', err)
  } finally {
    loading.value = false
  }
}

const handleDelete = async (id: number) => {
  if (!confirm('Yakin ingin menghapus ekstrakurikuler ini?')) return
  
  try {
    await deleteExtracurricular(id)
    await loadExtracurriculars()
  } catch (err: any) {
    alert(err.data?.message || 'Gagal menghapus ekstrakurikuler')
  }
}

watch(showActiveOnly, () => {
  loadExtracurriculars()
})

onMounted(() => {
  loadExtracurriculars()
})
</script>
