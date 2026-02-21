<template>
  <div class="p-6">
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-2">
        <NuxtLink
          to="/dashboard/student-attendances"
          class="text-gray-600 hover:text-gray-900"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Rekap Absensi Siswa</h1>
          <p class="text-gray-600 mt-1">Statistik dan rekap absensi per siswa atau kelas</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
          <select
            v-model="filters.class_id"
            @change="loadRecap"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Kelas</option>
            <option v-for="cls in classes" :key="cls.id" :value="cls.id">
              {{ cls.name }} - {{ cls.grade }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
          <input
            v-model="filters.start_date"
            type="date"
            @change="loadRecap"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Akhir</label>
          <input
            v-model="filters.end_date"
            type="date"
            @change="loadRecap"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex items-end">
          <button
            @click="loadRecap"
            class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Tampilkan
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Statistics Cards -->
    <div v-else-if="recap.length > 0" class="space-y-6">
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-100 rounded-lg p-3">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Hadir</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalHadir }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
              <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Sakit</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalSakit }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-blue-100 rounded-lg p-3">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Izin</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalIzin }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-red-100 rounded-lg p-3">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Alpha</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalAlpha }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recap Table -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Detail Rekap Per Siswa</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIS</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Siswa</th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Total Hari</th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Hadir</th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Sakit</th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Izin</th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Alpha</th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">% Kehadiran</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(item, index) in recap" :key="item.student_id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.student?.nis }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ item.student?.full_name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {{ item.total_days }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {{ item.total_hadir }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {{ item.total_sakit }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ item.total_izin }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    {{ item.total_alpha }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span :class="getAttendancePercentageClass(item.attendance_percentage)">
                    {{ item.attendance_percentage }}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p class="mt-4 text-gray-600">Pilih kelas dan rentang tanggal untuk melihat rekap</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const { getStudentAttendanceRecap } = useStudentAttendance()
const { getClasses } = useClass()
const toast = useToast()

const classes = ref([])
const recap = ref([])
const loading = ref(false)

const filters = ref({
  class_id: '',
  start_date: '',
  end_date: ''
})

const totalHadir = computed(() => recap.value.reduce((sum, item) => sum + (item.total_hadir || 0), 0))
const totalSakit = computed(() => recap.value.reduce((sum, item) => sum + (item.total_sakit || 0), 0))
const totalIzin = computed(() => recap.value.reduce((sum, item) => sum + (item.total_izin || 0), 0))
const totalAlpha = computed(() => recap.value.reduce((sum, item) => sum + (item.total_alpha || 0), 0))

const loadClasses = async () => {
  try {
    const response = await getClasses()
    classes.value = response.data || []
  } catch (error) {
    console.error('Failed to load classes:', error)
  }
}

const loadRecap = async () => {
  if (!filters.value.class_id) {
    toast.error('Pilih kelas terlebih dahulu')
    return
  }

  try {
    loading.value = true
    const response = await getStudentAttendanceRecap(parseInt(filters.value.class_id), {
      start_date: filters.value.start_date,
      end_date: filters.value.end_date
    })
    recap.value = response.data || []
  } catch (error) {
    console.error('Failed to load recap:', error)
    toast.error('Gagal memuat rekap absensi')
  } finally {
    loading.value = false
  }
}

const getAttendancePercentageClass = (percentage: number) => {
  if (percentage >= 90) return 'px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'
  if (percentage >= 75) return 'px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800'
  if (percentage >= 60) return 'px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800'
  return 'px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800'
}

onMounted(() => {
  loadClasses()
})
</script>
