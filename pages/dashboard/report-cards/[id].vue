<template>
  <div class="min-h-screen p-8">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink
          to="/dashboard/report-cards"
          class="inline-flex items-center text-violet-600 hover:text-violet-700 mb-4"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Kembali
        </NuxtLink>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-600">Memuat raport...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-red-600 font-semibold">{{ error }}</p>
      </div>

      <!-- Report Card Content -->
      <div v-else class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-violet-600 to-purple-600 p-8 text-white text-center">
          <h1 class="text-3xl font-bold mb-2">RAPORT SISWA</h1>
          <p class="text-violet-100">{{ reportCard.academic_year }} - Semester {{ reportCard.semester === 'ganjil' ? 'Ganjil' : 'Genap' }}</p>
        </div>

        <!-- Student Info -->
        <div class="p-8 border-b">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-gray-600">Nama Siswa</p>
              <p class="text-lg font-bold text-gray-900">{{ reportCard.student?.full_name }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">NIS</p>
              <p class="text-lg font-bold text-gray-900">{{ reportCard.student?.nis }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Kelas</p>
              <p class="text-lg font-bold text-gray-900">{{ reportCard.class?.name }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Ranking</p>
              <p class="text-lg font-bold text-violet-600">{{ reportCard.class_rank || '-' }}</p>
            </div>
          </div>
        </div>

        <!-- Grades Summary -->
        <div class="p-8">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Nilai Mata Pelajaran</h3>
          
          <div v-if="finalGrades.length === 0" class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <p>Belum ada nilai untuk siswa ini</p>
          </div>
          
          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mata Pelajaran</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">PH</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">UTS</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">UAS</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Nilai Akhir</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Huruf</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Predikat</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="grade in finalGrades" :key="grade.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ grade.subject?.name || '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                    {{ grade.daily_score?.toFixed(0) || '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                    {{ grade.midterm_score?.toFixed(0) || '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                    {{ grade.final_exam_score?.toFixed(0) || '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-gray-900">
                    {{ grade.final_score?.toFixed(0) || '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <span 
                      class="px-3 py-1 rounded-full text-sm font-bold"
                      :class="getGradeColor(grade.letter_grade)"
                    >
                      {{ grade.letter_grade || '-' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center capitalize text-gray-600">
                    {{ grade.predicate?.replace('_', ' ') || '-' }}
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-gray-50">
                <tr>
                  <td colspan="4" class="px-6 py-4 text-right text-sm font-bold text-gray-700">
                    Rata-rata:
                  </td>
                  <td class="px-6 py-4 text-center text-lg font-bold text-violet-600">
                    {{ reportCard.average_score?.toFixed(2) || '-' }}
                  </td>
                  <td colspan="2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <!-- Attitude Grades -->
        <div class="p-8 border-t">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Nilai Sikap</h3>
          
          <div v-if="attitudeGrades.length === 0" class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <p>Belum ada nilai sikap untuk siswa ini</p>
          </div>
          
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="attitude in attitudeGrades" 
              :key="attitude.id"
              class="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border border-violet-200"
            >
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-bold capitalize" :class="attitude.type === 'spiritual' ? 'text-violet-700' : 'text-purple-700'">
                  {{ attitude.type === 'spiritual' ? '🤲 Spiritual' : '🤝 Sosial' }}
                </h4>
                <span 
                  class="px-4 py-2 rounded-full text-sm font-bold"
                  :class="getPredicateColor(attitude.predicate)"
                >
                  {{ formatPredicate(attitude.predicate) }}
                </span>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">{{ attitude.description || '-' }}</p>
            </div>
          </div>
        </div>

        <!-- Extracurriculars -->
        <div class="p-8 border-t">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Kegiatan Ekstrakurikuler</h3>
          
          <div v-if="extracurriculars.length === 0" class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <p>Belum ada kegiatan ekstrakurikuler untuk siswa ini</p>
          </div>
          
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="ekskul in extracurriculars" 
              :key="ekskul.id"
              class="bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-xl p-5 border border-fuchsia-200"
            >
              <h4 class="text-lg font-bold text-fuchsia-700 mb-2">
                {{ ekskul.extracurricular?.name || '-' }}
              </h4>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Nilai:</span>
                <span 
                  class="px-3 py-1 rounded-full text-sm font-bold"
                  :class="getPredicateColor(ekskul.predicate)"
                >
                  {{ formatPredicate(ekskul.predicate) }}
                </span>
              </div>
              <p v-if="ekskul.notes" class="mt-3 text-sm text-gray-600 italic">{{ ekskul.notes }}</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="p-8 border-t bg-gray-50 flex items-center justify-between">
          <div>
            <span class="px-4 py-2 rounded-full text-sm font-medium" :class="getStatusColor(reportCard.status)">
              {{ formatStatus(reportCard.status) }}
            </span>
          </div>
          <div class="flex gap-3">
            <button 
              @click="handleDownloadPDF"
              :disabled="downloading"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg v-if="downloading" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ downloading ? 'Downloading...' : '📄 Export PDF' }}</span>
            </button>
            <button
              v-if="reportCard.status === 'draft'"
              @click="handlePublish"
              class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              ✅ Publish
            </button>
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
const { getReportCardById, publishReportCard, downloadReportCardPDF } = useReportCard()

const reportCard = ref<any>({})
const finalGrades = ref<any[]>([])
const attitudeGrades = ref<any[]>([])
const extracurriculars = ref<any[]>([])
const loading = ref(false)
const error = ref('')
const downloading = ref(false)

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

const getGradeColor = (letter: string) => {
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
  return predicate?.replace('_', ' ').toUpperCase() || '-'
}

const loadReportCard = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await getReportCardById(Number(route.params.id))
    
    // Extract data from ReportCardDetail structure
    const detail = response.data
    reportCard.value = detail.report_card || {}
    finalGrades.value = detail.final_grades || []
    attitudeGrades.value = detail.attitude_grades || []
    extracurriculars.value = detail.extracurriculars || []
  } catch (err: any) {
    error.value = err.data?.message || 'Gagal memuat raport'
  } finally {
    loading.value = false
  }
}

const handlePublish = async () => {
  if (!confirm('Publish raport ini? Status tidak dapat diubah kembali')) return
  
  try {
    await publishReportCard(Number(route.params.id))
    alert('Raport berhasil di-publish!')
    await loadReportCard()
  } catch (err: any) {
    alert(err.data?.message || 'Gagal publish raport')
  }
}

const handleDownloadPDF = async () => {
  downloading.value = true
  try {
    await downloadReportCardPDF(Number(route.params.id))
    // Success - file will download automatically
  } catch (err: any) {
    alert('Gagal download PDF: ' + (err.message || 'Unknown error'))
  } finally {
    downloading.value = false
  }
}

onMounted(() => {
  loadReportCard()
})
</script>
