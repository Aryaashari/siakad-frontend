<template>
  <div class="min-h-screen p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="relative overflow-hidden rounded-2xl mb-8">
        <div class="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600"></div>
        <div class="relative p-8 text-white">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold mb-2">Raport Siswa</h1>
              <p class="text-violet-100">Kelola dan generate raport siswa per semester</p>
            </div>
            <button
              @click="showGenerateModal = true"
              class="px-6 py-3 bg-white text-violet-600 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Generate Raport
            </button>
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
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
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
              @click="loadReportCards"
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
      </div>

      <!-- Report Cards Table -->
      <div v-else class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-violet-50 to-purple-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Siswa</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Kelas</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Periode</th>
                <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Ranking</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="reportCards.length === 0">
                <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                  <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <p class="text-lg font-semibold">Belum ada raport</p>
                  <p class="text-sm mt-2">Klik "Generate Raport" untuk membuat raport siswa</p>
                </td>
              </tr>
              <tr v-for="card in reportCards" :key="card.id" class="hover:bg-violet-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-gray-900">{{ card.student?.full_name || 'N/A' }}</div>
                  <div class="text-sm text-gray-500">NIS: {{ card.student?.nis || 'N/A' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                  {{ card.class?.name || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ card.academic_year }} - {{ card.semester === 'ganjil' ? 'Ganjil' : 'Genap' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <div class="text-lg font-bold text-violet-600">{{ card.class_rank || '-' }}</div>
                  <div class="text-xs text-gray-500">Kelas</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 rounded-full text-sm font-medium" :class="getStatusColor(card.status)">
                    {{ formatStatus(card.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex items-center gap-2">
                    <NuxtLink
                      :to="`/dashboard/report-cards/${card.id}`"
                      class="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      Lihat
                    </NuxtLink>
                    <button
                      v-if="card.status === 'draft'"
                      @click="handlePublish(card.id)"
                      class="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      Publish
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Generate Modal -->
    <div v-if="showGenerateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Generate Raport</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Kelas *</label>
            <select
              v-model="generateForm.class_id"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
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
              v-model="generateForm.academic_year"
              type="text"
              placeholder="2024/2025"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Semester</label>
            <select
              v-model="generateForm.semester"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Pilih Semester</option>
              <option value="ganjil">Ganjil</option>
              <option value="genap">Genap</option>
            </select>
          </div>
        </div>
        <div class="flex items-center gap-4 mt-6">
          <button
            @click="showGenerateModal = false"
            class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            @click="handleGenerate"
            :disabled="generating"
            class="flex-1 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-50"
          >
            {{ generating ? 'Generating...' : 'Generate' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { getReportCards, generateReportCardsByClass, publishReportCard } = useReportCard()
const { getClasses } = useClass()

const reportCards = ref<any[]>([])
const classes = ref<any[]>([])
const loading = ref(false)
const generating = ref(false)
const error = ref('')
const showGenerateModal = ref(false)
const filters = ref({
  class_id: '',
  academic_year: '',
  semester: ''
})
const generateForm = ref({
  class_id: '',
  academic_year: '',
  semester: ''
})

const getStatusColor = (status: string) => {
  const colors: any = {
    'draft': 'bg-yellow-100 text-yellow-700',
    'published': 'bg-green-100 text-green-700',
    'printed': 'bg-blue-100 text-blue-700'
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

const formatStatus = (status: string) => {
  const map: any = {
    'draft': 'Draft',
    'published': 'Published',
    'printed': 'Printed'
  }
  return map[status] || status
}

const loadClasses = async () => {
  try {
    const response = await getClasses()
    classes.value = response.data || []
  } catch (err) {
    console.error('Error loading classes:', err)
  }
}

const loadReportCards = async () => {
  loading.value = true
  error.value = ''
  try {
    const params: any = {}
    if (filters.value.class_id) params.class_id = Number(filters.value.class_id)
    if (filters.value.academic_year) params.academic_year = filters.value.academic_year
    if (filters.value.semester) params.semester = filters.value.semester
    
    const response = await getReportCards(params)
    reportCards.value = response.data || []
  } catch (err: any) {
    error.value = err.data?.message || 'Gagal memuat data raport'
    console.error('Error loading report cards:', err)
  } finally {
    loading.value = false
  }
}

const handleGenerate = async () => {
  if (!generateForm.value.class_id) {
    alert('Silakan pilih kelas')
    return
  }

  generating.value = true
  try {
    const params: any = {}
    if (generateForm.value.academic_year) params.academic_year = generateForm.value.academic_year
    if (generateForm.value.semester) params.semester = generateForm.value.semester
    
    await generateReportCardsByClass(Number(generateForm.value.class_id), params)
    alert('Generate raport berhasil!')
    showGenerateModal.value = false
    await loadReportCards()
  } catch (err: any) {
    alert(err.data?.message || 'Gagal generate raport')
  } finally {
    generating.value = false
  }
}

const handlePublish = async (id: number) => {
  if (!confirm('Publish raport ini? Status tidak dapat diubah kembali setelah di-publish')) return
  
  try {
    await publishReportCard(id)
    alert('Raport berhasil di-publish!')
    await loadReportCards()
  } catch (err: any) {
    alert(err.data?.message || 'Gagal publish raport')
  }
}

onMounted(() => {
  loadClasses()
  loadReportCards()
})
</script>
