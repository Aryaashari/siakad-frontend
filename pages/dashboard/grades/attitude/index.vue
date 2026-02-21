<template>
  <div class="min-h-screen p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="relative overflow-hidden rounded-2xl mb-8">
        <div class="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-pink-600"></div>
        <div class="relative p-8 text-white">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold mb-2">Nilai Sikap</h1>
              <p class="text-fuchsia-100">Input penilaian sikap spiritual dan sosial siswa</p>
            </div>
            <NuxtLink
              to="/dashboard/grades/attitude/create"
              class="px-6 py-3 bg-white text-fuchsia-600 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Input Nilai Sikap
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
            <select
              v-model="filters.class_id"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            >
              <option value="">Semua Kelas</option>
              <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                {{ cls.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tahun Ajaran</label>
            <input
              v-model="filters.academic_year"
              type="text"
              placeholder="2024/2025"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Semester</label>
            <select
              v-model="filters.semester"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            >
              <option value="">Semua Semester</option>
              <option value="ganjil">Ganjil</option>
              <option value="genap">Genap</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="loadAttitudeGrades"
              class="w-full px-6 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-colors"
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block w-12 h-12 border-4 border-fuchsia-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-600">Memuat data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-red-600 font-semibold">{{ error }}</p>
        <button @click="loadAttitudeGrades" class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Coba Lagi
        </button>
      </div>

      <!-- Data Table -->
      <div v-else class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-fuchsia-50 to-pink-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Siswa</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Kelas</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Spiritual</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sosial</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Periode</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="attitudeGrades.length === 0">
                <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                  <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <p class="text-lg font-semibold">Belum ada nilai sikap</p>
                  <p class="text-sm mt-2">Klik "Input Nilai Sikap" untuk menambahkan nilai</p>
                </td>
              </tr>
              <tr v-for="grade in attitudeGrades" :key="grade.id" class="hover:bg-fuchsia-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-gray-900">{{ grade.student?.full_name || 'N/A' }}</div>
                  <div class="text-sm text-gray-500">NIS: {{ grade.student?.nis || 'N/A' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                  {{ grade.class?.name || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 rounded-full text-sm font-medium" :class="getGradeColor(grade.spiritual_grade)">
                    {{ grade.spiritual_grade }}
                  </span>
                  <div v-if="grade.spiritual_description" class="text-xs text-gray-500 mt-1">
                    {{ grade.spiritual_description }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 rounded-full text-sm font-medium" :class="getGradeColor(grade.social_grade)">
                    {{ grade.social_grade }}
                  </span>
                  <div v-if="grade.social_description" class="text-xs text-gray-500 mt-1">
                    {{ grade.social_description }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ grade.academic_year }} - {{ grade.semester === 'ganjil' ? 'Ganjil' : 'Genap' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    @click="handleDelete(grade.id)"
                    class="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Hapus
                  </button>
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

const { getAttitudeGrades, deleteAttitudeGrade } = useAttitudeGrade()
const { getClasses } = useClass()

const attitudeGrades = ref<any[]>([])
const classes = ref<any[]>([])
const loading = ref(false)
const error = ref('')
const filters = ref({
  class_id: '',
  academic_year: '',
  semester: ''
})

const getGradeColor = (grade: string) => {
  const gradeMap: any = {
    'sangat_baik': 'bg-green-100 text-green-700',
    'baik': 'bg-blue-100 text-blue-700',
    'cukup': 'bg-yellow-100 text-yellow-700',
    'kurang': 'bg-red-100 text-red-700'
  }
  return gradeMap[grade] || 'bg-gray-100 text-gray-700'
}

const loadAttitudeGrades = async () => {
  loading.value = true
  error.value = ''
  try {
    const params: any = {}
    if (filters.value.class_id) params.class_id = Number(filters.value.class_id)
    if (filters.value.academic_year) params.academic_year = filters.value.academic_year
    if (filters.value.semester) params.semester = filters.value.semester
    
    const response = await getAttitudeGrades(params)
    attitudeGrades.value = response.data || []
  } catch (err: any) {
    error.value = err.data?.message || 'Gagal memuat data nilai sikap'
    console.error('Error loading attitude grades:', err)
  } finally {
    loading.value = false
  }
}

const loadClasses = async () => {
  try {
    const response = await getClasses()
    classes.value = response.data || []
  } catch (err) {
    console.error('Error loading classes:', err)
  }
}

const handleDelete = async (id: number) => {
  if (!confirm('Yakin ingin menghapus nilai sikap ini?')) return
  
  try {
    await deleteAttitudeGrade(id)
    await loadAttitudeGrades()
  } catch (err: any) {
    alert(err.data?.message || 'Gagal menghapus nilai sikap')
  }
}

onMounted(() => {
  loadClasses()
  loadAttitudeGrades()
})
</script>
