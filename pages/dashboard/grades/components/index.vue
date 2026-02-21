<template>
  <div class="min-h-screen p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section with Gradient -->
      <div class="relative overflow-hidden rounded-2xl mb-8">
        <div class="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600"></div>
        <div class="relative p-8 text-white">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold mb-2">Komponen Nilai</h1>
              <p class="text-violet-100">Kelola komponen penilaian (UH, UTS, UAS, dll)</p>
            </div>
            <NuxtLink
              to="/dashboard/grades/components/create"
              class="px-6 py-3 bg-white text-violet-600 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Tambah Komponen
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tahun Ajaran</label>
            <input
              v-model="filters.academic_year"
              type="text"
              placeholder="2024/2025"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Semester</label>
            <select
              v-model="filters.semester"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="">Semua Semester</option>
              <option value="ganjil">Ganjil</option>
              <option value="genap">Genap</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="loadGradeComponents"
              class="w-full px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-600">Memuat data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-red-600 font-semibold">{{ error }}</p>
        <button @click="loadGradeComponents" class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Coba Lagi
        </button>
      </div>

      <!-- Data Table -->
      <div v-else class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-violet-50 to-purple-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nama Komponen</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Kode</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bobot (%)</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tahun Ajaran</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Semester</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="gradeComponents.length === 0">
                <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                  <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <p class="text-lg font-semibold">Belum ada komponen nilai</p>
                  <p class="text-sm mt-2">Klik "Tambah Komponen" untuk membuat komponen nilai baru</p>
                </td>
              </tr>
              <tr v-for="component in gradeComponents" :key="component.id" class="hover:bg-violet-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-gray-900">{{ component.name }}</div>
                  <div v-if="component.description" class="text-sm text-gray-500">{{ component.description }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                    {{ component.code }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-gray-900 font-semibold">{{ component.weight }}%</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                  {{ component.academic_year }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 rounded-full text-sm font-medium" :class="component.semester === 'ganjil' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'">
                    {{ component.semester === 'ganjil' ? 'Ganjil' : 'Genap' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex items-center gap-2">
                    <NuxtLink
                      :to="`/dashboard/grades/components/${component.id}`"
                      class="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      Detail
                    </NuxtLink>
                    <button
                      @click="handleDelete(component.id)"
                      class="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { getGradeComponents, deleteGradeComponent } = useGradeComponent()

const gradeComponents = ref<any[]>([])
const loading = ref(false)
const error = ref('')
const filters = ref({
  academic_year: '',
  semester: ''
})

const loadGradeComponents = async () => {
  loading.value = true
  error.value = ''
  try {
    const params: any = {}
    if (filters.value.academic_year) params.academic_year = filters.value.academic_year
    if (filters.value.semester) params.semester = filters.value.semester
    
    const response = await getGradeComponents(params)
    gradeComponents.value = response.data || []
  } catch (err: any) {
    error.value = err.data?.message || 'Gagal memuat data komponen nilai'
    console.error('Error loading grade components:', err)
  } finally {
    loading.value = false
  }
}

const handleDelete = async (id: number) => {
  if (!confirm('Yakin ingin menghapus komponen nilai ini?')) return
  
  try {
    await deleteGradeComponent(id)
    await loadGradeComponents()
  } catch (err: any) {
    alert(err.data?.message || 'Gagal menghapus komponen nilai')
  }
}

onMounted(() => {
  loadGradeComponents()
})
</script>
