<template>
  <div class="min-h-screen p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink
          to="/dashboard/extracurriculars"
          class="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Kembali
        </NuxtLink>
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
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Detail Card -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div class="relative h-48 bg-gradient-to-br from-purple-600 to-fuchsia-600 p-8">
            <div class="absolute top-6 right-6">
              <span
                class="px-4 py-2 rounded-full text-sm font-semibold"
                :class="extracurricular.is_active ? 'bg-green-400 text-green-900' : 'bg-gray-400 text-gray-900'"
              >
                {{ extracurricular.is_active ? 'Aktif' : 'Nonaktif' }}
              </span>
            </div>
            <div class="flex items-center gap-6 h-full text-white">
              <div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h1 class="text-4xl font-bold mb-2">{{ extracurricular.name }}</h1>
                <p v-if="extracurricular.instructor_name" class="text-purple-100 text-lg">
                  Pembina: {{ extracurricular.instructor_name }}
                </p>
              </div>
            </div>
          </div>

          <div class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">Deskripsi</h3>
                <p class="text-gray-900">{{ extracurricular.description || '-' }}</p>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">Jadwal</h3>
                <p class="text-gray-900">{{ extracurricular.schedule || '-' }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4 mt-8 pt-6 border-t">
              <NuxtLink
                :to="`/dashboard/extracurriculars/${route.params.id}/edit`"
                class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Edit
              </NuxtLink>
              <button
                @click="handleDelete"
                class="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>

        <!-- Student Assignments Section -->
        <div class="bg-white rounded-xl shadow-sm p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Daftar Peserta</h2>
            <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
              + Tambah Peserta
            </button>
          </div>
          
          <div class="text-center py-8 text-gray-500">
            <p>Fitur manajemen peserta akan segera ditambahkan</p>
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

const route = useRoute()
const router = useRouter()
const { getExtracurricularById, deleteExtracurricular } = useExtracurricular()

const extracurricular = ref<any>({})
const loading = ref(false)
const error = ref('')

const loadExtracurricular = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await getExtracurricularById(Number(route.params.id))
    extracurricular.value = response.data
  } catch (err: any) {
    error.value = err.data?.message || 'Gagal memuat data ekstrakurikuler'
  } finally {
    loading.value = false
  }
}

const handleDelete = async () => {
  if (!confirm('Yakin ingin menghapus ekstrakurikuler ini?')) return
  
  try {
    await deleteExtracurricular(Number(route.params.id))
    router.push('/dashboard/extracurriculars')
  } catch (err: any) {
    alert(err.data?.message || 'Gagal menghapus ekstrakurikuler')
  }
}

onMounted(() => {
  loadExtracurricular()
})
</script>
