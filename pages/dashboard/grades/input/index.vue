<template>
  <div class="min-h-screen p-8">
    <div class="max-w-[1400px] mx-auto">
      <!-- Header Section -->
      <div class="relative overflow-hidden rounded-2xl mb-8">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600"></div>
        <div class="relative p-8 text-white">
          <h1 class="text-3xl font-bold mb-2">Input Nilai - Bulk Entry</h1>
          <p class="text-purple-100">Input nilai untuk seluruh siswa dalam satu kelas secara bersamaan</p>
        </div>
      </div>

      <!-- Selection Filters -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Kelas *</label>
            <select
              v-model="filters.class_id"
              @change="loadStudents"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Pilih Kelas</option>
              <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                {{ cls.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Mata Pelajaran *</label>
            <select
              v-model="filters.subject_id"
              @change="loadGradeComponents"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Pilih Mapel</option>
              <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                {{ subject.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Komponen Nilai *</label>
            <select
              v-model="filters.component_id"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Pilih Komponen</option>
              <option v-for="comp in gradeComponents" :key="comp.id" :value="comp.id">
                {{ comp.name }} ({{ comp.code }}) - {{ comp.weight }}%
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tahun Ajaran *</label>
            <input
              v-model="filters.academic_year"
              type="text"
              placeholder="2024/2025"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Semester *</label>
            <select
              v-model="filters.semester"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Pilih</option>
              <option value="ganjil">Ganjil</option>
              <option value="genap">Genap</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Info Banner -->
      <div v-if="students.length > 0" class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center gap-3">
        <svg class="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div class="flex-1">
          <p class="text-sm font-medium text-blue-900">
            {{ students.length }} siswa ditemukan • Input nilai antara 0-100 • Otomatis disimpan setelah klik "Simpan Semua"
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-600">Memuat data siswa...</p>
      </div>

      <!-- No Selection State -->
      <div v-else-if="!filters.class_id" class="bg-white rounded-xl shadow-sm p-12 text-center">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        <p class="text-lg font-semibold text-gray-700">Pilih Kelas untuk Memulai</p>
        <p class="text-sm text-gray-500 mt-2">Pilih kelas, mata pelajaran, dan komponen nilai di atas</p>
      </div>

      <!-- Grade Input Grid -->
      <div v-else-if="students.length > 0" class="bg-white rounded-xl shadow-sm overflow-hidden">
        <!-- Table Header -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-purple-50 to-fuchsia-50 sticky top-0">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-12">No</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[200px]">Nama Siswa</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">NIS</th>
                <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-48">
                  Nilai
                  <div class="text-purple-600 font-normal text-xs mt-1">(0-100)</div>
                </th>
                <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr 
                v-for="(student, index) in students" 
                :key="student.id"
                class="hover:bg-purple-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap text-gray-700 text-center">
                  {{ index + 1 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-gray-900">{{ student.full_name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                  {{ student.nis }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center justify-center gap-2">
                    <input
                      v-model.number="gradeInputs[student.id]"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="0-100"
                      @input="validateScore(student.id)"
                      class="w-32 px-4 py-2 text-center border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      :class="getInputClass(student.id)"
                    />
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span v-if="gradeInputs[student.id] !== null && gradeInputs[student.id] !== undefined && gradeInputs[student.id] !== ''" class="text-xs">
                    <span v-if="isValidScore(gradeInputs[student.id])" class="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                      ✓ Valid
                    </span>
                    <span v-else class="px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                      ✗ Invalid
                    </span>
                  </span>
                  <span v-else class="text-xs text-gray-400">-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Actions -->
        <div class="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
          <div class="text-sm text-gray-600">
            <span class="font-semibold text-purple-600">{{ countFilledGrades() }}</span> dari {{ students.length }} nilai terisi
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="fillAllWithZero"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              Isi Semua dengan 0
            </button>
            <button
              @click="clearAll"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              Reset Semua
            </button>
            <button
              @click="handleBulkSave"
              :disabled="saving || !canSave()"
              class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              <span v-if="saving">
                <svg class="inline w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Menyimpan...
              </span>
              <span v-else>💾 Simpan Semua ({{ countFilledGrades() }})</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-xl shadow-sm p-12 text-center">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <p class="text-lg font-semibold text-gray-700">Tidak Ada Siswa</p>
        <p class="text-sm text-gray-500 mt-2">Kelas yang dipilih belum memiliki siswa</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { bulkCreateStudentGrades } = useStudentGrade()
const { getGradeComponents } = useGradeComponent()
const { getClasses } = useClass()
const { getSubjects } = useSubject()
const { getStudents } = useStudent()

const classes = ref<any[]>([])
const subjects = ref<any[]>([])
const gradeComponents = ref<any[]>([])
const students = ref<any[]>([])
const gradeInputs = ref<{[key: number]: number | null}>({})
const loading = ref(false)
const saving = ref(false)

const filters = ref({
  class_id: '',
  subject_id: '',
  component_id: '',
  academic_year: '',
  semester: ''
})

const isValidScore = (score: any) => {
  if (score === null || score === undefined || score === '') return false
  const num = Number(score)
  return !isNaN(num) && num >= 0 && num <= 100
}

const getInputClass = (studentId: number) => {
  const score = gradeInputs.value[studentId]
  if (score === null || score === undefined || score === '') return 'border-gray-300'
  return isValidScore(score) ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
}

const validateScore = (studentId: number) => {
  const score = gradeInputs.value[studentId]
  if (score !== null && score !== undefined && score !== '') {
    const num = Number(score)
    if (num < 0) gradeInputs.value[studentId] = 0
    if (num > 100) gradeInputs.value[studentId] = 100
  }
}

const countFilledGrades = () => {
  return Object.values(gradeInputs.value).filter(v => v !== null && v !== undefined && v !== '').length
}

const canSave = () => {
  if (!filters.value.class_id || !filters.value.subject_id || !filters.value.component_id) return false
  if (!filters.value.academic_year || !filters.value.semester) return false
  
  const filled = Object.entries(gradeInputs.value).filter(([_, score]) => 
    score !== null && score !== undefined && score !== ''
  )
  
  if (filled.length === 0) return false
  
  return filled.every(([_, score]) => isValidScore(score))
}

const fillAllWithZero = () => {
  if (!confirm('Isi semua nilai dengan 0?')) return
  students.value.forEach(student => {
    gradeInputs.value[student.id] = 0
  })
}

const clearAll = () => {
  if (!confirm('Reset semua input nilai?')) return
  gradeInputs.value = {}
}

const loadClasses = async () => {
  try {
    const response = await getClasses()
    classes.value = response.data || []
  } catch (err) {
    console.error('Error loading classes:', err)
  }
}

const loadSubjects = async () => {
  try {
    const response = await getSubjects()
    subjects.value = response.data || []
  } catch (err) {
    console.error('Error loading subjects:', err)
  }
}

const loadGradeComponents = async () => {
  if (!filters.value.subject_id) return
  
  try {
    const params: any = {}
    if (filters.value.academic_year) params.academic_year = filters.value.academic_year
    if (filters.value.semester) params.semester = filters.value.semester
    
    const response = await getGradeComponents(params)
    gradeComponents.value = response.data || []
  } catch (err) {
    console.error('Error loading grade components:', err)
  }
}

const loadStudents = async () => {
  if (!filters.value.class_id) {
    students.value = []
    return
  }

  loading.value = true
  try {
    const response = await getStudents({ class_id: Number(filters.value.class_id) })
    students.value = response.data || []
    
    // Reset grade inputs
    gradeInputs.value = {}
  } catch (err) {
    console.error('Error loading students:', err)
    students.value = []
  } finally {
    loading.value = false
  }
}

const handleBulkSave = async () => {
  if (!canSave()) {
    alert('Pastikan semua filter terisi dan nilai valid (0-100)')
    return
  }

  const grades = Object.entries(gradeInputs.value)
    .filter(([_, score]) => score !== null && score !== undefined && score !== '')
    .map(([studentId, score]) => ({
      student_id: Number(studentId),
      score: Number(score)
    }))

  if (grades.length === 0) {
    alert('Tidak ada nilai yang terisi')
    return
  }

  if (!confirm(`Simpan ${grades.length} nilai untuk ${students.value.length} siswa?`)) return

  saving.value = true
  try {
    await bulkCreateStudentGrades({
      class_id: Number(filters.value.class_id),
      subject_id: Number(filters.value.subject_id),
      component_id: Number(filters.value.component_id),
      academic_year: filters.value.academic_year,
      semester: filters.value.semester,
      grades: grades
    })

    alert(`Berhasil menyimpan ${grades.length} nilai!`)
    
    // Reset inputs
    gradeInputs.value = {}
  } catch (err: any) {
    alert(err.data?.message || 'Gagal menyimpan nilai')
    console.error('Error bulk saving grades:', err)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadClasses()
  loadSubjects()
})
</script>
