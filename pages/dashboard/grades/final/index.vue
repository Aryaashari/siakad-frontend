<template>
  <div class="min-h-screen p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="relative overflow-hidden rounded-2xl mb-8">
        <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600"></div>
        <div class="relative p-8 text-white">
          <h1 class="text-3xl font-bold mb-2">Nilai Akhir (Leger)</h1>
          <p class="text-indigo-100">Lihat dan kelola nilai akhir siswa hasil kalkulasi otomatis</p>
        </div>
      </div>

      <!-- Filters & Actions -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Kelas *</label>
            <select
              v-model="filters.class_id"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Pilih Kelas</option>
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
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Semester</label>
            <select
              v-model="filters.semester"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Semua</option>
              <option value="ganjil">Ganjil</option>
              <option value="genap">Genap</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="loadFinalGrades"
              class="w-full px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Tampilkan
            </button>
          </div>
          <div class="flex items-end">
            <button
              @click="handleCalculate"
              :disabled="!filters.class_id || calculating"
              class="w-full px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ calculating ? 'Menghitung...' : '🔄 Hitung Ulang' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-600">Memuat data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-red-600 font-semibold">{{ error }}</p>
      </div>

      <!-- Leger Table -->
      <div v-else class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-indigo-50 to-violet-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nama Siswa</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Mata Pelajaran</th>
                <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Nilai Akhir</th>
                <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Huruf</th>
                <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Predikat</th>
                <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">KKM</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="finalGrades.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                  <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  <p class="text-lg font-semibold">Belum ada nilai akhir</p>
                  <p class="text-sm mt-2">Pilih kelas dan klik "Hitung Ulang" untuk generate nilai akhir</p>
                </td>
              </tr>
              <tr v-for="(grade, index) in finalGrades" :key="grade.id" class="hover:bg-indigo-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-gray-700">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-gray-900">{{ grade.student?.full_name || 'N/A' }}</div>
                  <div class="text-sm text-gray-500">NIS: {{ grade.student?.nis || 'N/A' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                  {{ grade.subject?.name || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span class="text-lg font-bold text-gray-900">{{ grade.final_score?.toFixed(2) || '-' }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span class="px-3 py-1 rounded-full text-sm font-bold" :class="getLetterGradeColor(grade.letter_grade)">
                    {{ grade.letter_grade || '-' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span class="px-3 py-1 rounded-full text-sm font-medium" :class="getPredicateColor(grade.predicate)">
                    {{ formatPredicate(grade.predicate) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span :class="grade.final_score >= (grade.kkm || 70) ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
                    {{ grade.kkm || 70 }}
                  </span>
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

const { getFinalGrades, calculateFinalGradesByClass } = useFinalGrade()
const { getClasses } = useClass()

const finalGrades = ref<any[]>([])
const classes = ref<any[]>([])
const loading = ref(false)
const calculating = ref(false)
const error = ref('')
const filters = ref({
  class_id: '',
  academic_year: '',
  semester: ''
})

const getLetterGradeColor = (letter: string) => {
  const colors: any = {
    'A': 'bg-green-100 text-green-700',
    'B': 'bg-blue-100 text-blue-700',
    'C': 'bg-yellow-100 text-yellow-700',
    'D': 'bg-orange-100 text-orange-700',
    'E': 'bg-red-100 text-red-700'
  }
  return colors[letter] || 'bg-gray-100 text-gray-700'
}

const getPredicateColor = (predicate: string) => {
  const colors: any = {
    'sangat_baik': 'bg-green-100 text-green-700',
    'baik': 'bg-blue-100 text-blue-700',
    'cukup': 'bg-yellow-100 text-yellow-700',
    'kurang': 'bg-red-100 text-red-700'
  }
  return colors[predicate] || 'bg-gray-100 text-gray-700'
}

const formatPredicate = (predicate: string) => {
  const map: any = {
    'sangat_baik': 'Sangat Baik',
    'baik': 'Baik',
    'cukup': 'Cukup',
    'kurang': 'Kurang'
  }
  return map[predicate] || predicate
}

const loadClasses = async () => {
  try {
    const response = await getClasses()
    classes.value = response.data || []
  } catch (err) {
    console.error('Error loading classes:', err)
  }
}

const loadFinalGrades = async () => {
  if (!filters.value.class_id) {
    error.value = 'Silakan pilih kelas terlebih dahulu'
    return
  }

  loading.value = true
  error.value = ''
  try {
    const params: any = { class_id: Number(filters.value.class_id) }
    if (filters.value.academic_year) params.academic_year = filters.value.academic_year
    if (filters.value.semester) params.semester = filters.value.semester
    
    const response = await getFinalGrades(params)
    finalGrades.value = response.data || []
  } catch (err: any) {
    error.value = err.data?.message || 'Gagal memuat data nilai akhir'
    console.error('Error loading final grades:', err)
  } finally {
    loading.value = false
  }
}

const handleCalculate = async () => {
  if (!filters.value.class_id) {
    alert('Silakan pilih kelas terlebih dahulu')
    return
  }

  if (!confirm('Hitung ulang nilai akhir untuk seluruh siswa di kelas ini?')) return

  calculating.value = true
  try {
    const params: any = {}
    if (filters.value.academic_year) params.academic_year = filters.value.academic_year
    if (filters.value.semester) params.semester = filters.value.semester
    
    await calculateFinalGradesByClass(Number(filters.value.class_id), params)
    alert('Kalkulasi nilai akhir berhasil!')
    await loadFinalGrades()
  } catch (err: any) {
    alert(err.data?.message || 'Gagal menghitung nilai akhir')
  } finally {
    calculating.value = false
  }
}

onMounted(() => {
  loadClasses()
})
</script>
