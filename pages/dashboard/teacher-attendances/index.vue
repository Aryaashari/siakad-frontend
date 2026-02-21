<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Absensi Guru</h1>
      <p class="text-gray-600 mt-1">Check-in dan rekap absensi guru</p>
    </div>

    <!-- Check-in Card -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Check-in / Check-out Hari Ini</h2>
      
      <!-- Admin Notice -->
      <div v-if="authStore.user?.role === 'admin'" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-yellow-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <div>
            <h3 class="text-sm font-medium text-yellow-800">Hanya Guru yang Bisa Check-in</h3>
            <p class="text-sm text-yellow-700 mt-1">Anda login sebagai Admin. Fitur check-in/check-out hanya tersedia untuk akun Guru. Anda dapat melihat rekap absensi semua guru di bawah.</p>
          </div>
        </div>
      </div>
      
      <div v-else-if="todayAttendance" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <p class="text-sm text-gray-600">Check-in</p>
            <p class="text-2xl font-bold text-green-700">{{ todayAttendance.check_in_time || '-' }}</p>
            <p v-if="todayAttendance.is_late" class="text-xs text-red-600 mt-1">Terlambat</p>
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-sm text-gray-600">Check-out</p>
            <p class="text-2xl font-bold text-blue-700">{{ todayAttendance.check_out_time || 'Belum checkout' }}</p>
          </div>
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p class="text-sm text-gray-600">Lokasi</p>
            <p class="text-sm font-medium text-gray-900 mt-2">{{ todayAttendance.location || 'Tidak ada' }}</p>
          </div>
        </div>

        <button
          v-if="!todayAttendance.check_out_time"
          @click="handleCheckout"
          :disabled="submitting"
          class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition disabled:opacity-50"
        >
          {{ submitting ? 'Processing...' : 'Check-out' }}
        </button>
      </div>

      <div v-else-if="authStore.user?.role !== 'admin'" class="space-y-4">
        <p class="text-gray-600">Anda belum melakukan check-in hari ini</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lokasi (Opsional)</label>
            <input
              v-model="checkInData.location"
              type="text"
              placeholder="Contoh: Ruang Guru, Kelas 1A"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Catatan (Opsional)</label>
            <input
              v-model="checkInData.notes"
              type="text"
              placeholder="Catatan tambahan"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          @click="handleCheckin"
          :disabled="submitting"
          class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-50"
        >
          {{ submitting ? 'Processing...' : 'Check-in Sekarang' }}
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
          <input
            v-model="filters.start_date"
            type="date"
            @change="loadAttendances"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Akhir</label>
          <input
            v-model="filters.end_date"
            type="date"
            @change="loadAttendances"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="filters.is_late"
            @change="loadAttendances"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua</option>
            <option value="true">Terlambat</option>
            <option value="false">Tepat Waktu</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Attendance History -->
    <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Riwayat Absensi</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-in</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-out</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lokasi</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catatan</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="attendance in paginatedAttendances" :key="attendance.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(attendance.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ attendance.check_in_time }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ attendance.check_out_time || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="attendance.is_late" class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                  Terlambat
                </span>
                <span v-else class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Tepat Waktu
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ attendance.location || '-' }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ attendance.notes || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="deleteAttendance(attendance.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Hapus
                </button>
              </td>
            </tr>
            <tr v-if="paginatedAttendances.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                Tidak ada data absensi
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
        <div class="text-sm text-gray-700">
          Menampilkan {{ (currentPage - 1) * perPage + 1 }} - {{ Math.min(currentPage * perPage, attendances.length) }} dari {{ attendances.length }} data
        </div>
        <div class="flex gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3 py-1 border rounded-lg',
              currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
            ]"
          >
            {{ page }}
          </button>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const { 
  getTeacherAttendances, 
  getTodayTeacherAttendance,
  createTeacherAttendance,
  checkoutTeacherAttendance,
  deleteTeacherAttendance 
} = useTeacherAttendance()
const toast = useToast()
const authStore = useAuthStore()

const attendances = ref([])
const todayAttendance = ref(null)
const loading = ref(true)
const submitting = ref(false)
const currentPage = ref(1)
const perPage = ref(20)

const checkInData = ref({
  location: '',
  notes: ''
})

const filters = ref({
  start_date: '',
  end_date: '',
  is_late: ''
})

const loadTodayAttendance = async () => {
  try {
    const response = await getTodayTeacherAttendance()
    // Backend returns array, get first item for current user's attendance
    const attendances = response.data
    todayAttendance.value = Array.isArray(attendances) && attendances.length > 0 
      ? attendances[0] 
      : null
  } catch (error) {
    console.error('Failed to load today attendance:', error)
    todayAttendance.value = null
  }
}

const loadAttendances = async () => {
  try {
    loading.value = true
    const params: any = {}
    if (filters.value.start_date) params.start_date = filters.value.start_date
    if (filters.value.end_date) params.end_date = filters.value.end_date
    if (filters.value.is_late) params.is_late = filters.value.is_late === 'true'
    
    const response = await getTeacherAttendances(params)
    attendances.value = response.data || []
  } catch (error) {
    console.error('Failed to load attendances:', error)
    toast.error('Gagal memuat data absensi')
  } finally {
    loading.value = false
  }
}

const handleCheckin = async () => {
  // Prevent admin from checking in
  if (authStore.user?.role === 'admin') {
    toast.error('Admin tidak dapat melakukan check-in. Hanya akun guru yang dapat check-in.')
    return
  }
  
  try {
    submitting.value = true
    await createTeacherAttendance({
      date: new Date().toISOString().split('T')[0],
      location: checkInData.value.location || null,
      notes: checkInData.value.notes || null
    })
    toast.success('Check-in berhasil')
    checkInData.value = { location: '', notes: '' }
    await Promise.all([loadTodayAttendance(), loadAttendances()])
  } catch (error: any) {
    console.error('Failed to check-in:', error)
    toast.error(error.data?.message || 'Gagal melakukan check-in')
  } finally {
    submitting.value = false
  }
}

const handleCheckout = async () => {
  if (!todayAttendance.value) return
  
  try {
    submitting.value = true
    await checkoutTeacherAttendance(todayAttendance.value.id)
    toast.success('Check-out berhasil')
    await Promise.all([loadTodayAttendance(), loadAttendances()])
  } catch (error: any) {
    console.error('Failed to check-out:', error)
    toast.error(error.data?.message || 'Gagal melakukan check-out')
  } finally {
    submitting.value = false
  }
}

const deleteAttendance = async (id: number) => {
  if (!confirm('Apakah Anda yakin ingin menghapus data absensi ini?')) return
  
  try {
    await deleteTeacherAttendance(id)
    toast.success('Absensi berhasil dihapus')
    loadAttendances()
  } catch (error) {
    console.error('Failed to delete attendance:', error)
    toast.error('Gagal menghapus absensi')
  }
}

const totalPages = computed(() => Math.ceil(attendances.value.length / perPage.value))

const paginatedAttendances = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return attendances.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

onMounted(() => {
  loadTodayAttendance()
  loadAttendances()
})
</script>
