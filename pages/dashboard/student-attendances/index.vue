<template>
  <div class="p-6">
    <div class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Absensi Siswa</h1>
          <p class="text-gray-600 mt-1">Kelola absensi siswa per kelas</p>
        </div>
        <NuxtLink
          to="/dashboard/student-attendances/input"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Input Absensi
        </NuxtLink>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
            <select
              v-model="filters.class_id"
              @change="loadAttendances"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Kelas</option>
              <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                {{ cls.name }} - {{ cls.grade }}
              </option>
            </select>
          </div>

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
              v-model="filters.status"
              @change="loadAttendances"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Status</option>
              <option value="hadir">Hadir</option>
              <option value="sakit">Sakit</option>
              <option value="izin">Izin</option>
              <option value="alpha">Alpha</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Attendance Table -->
    <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Siswa</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kelas</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waktu Masuk</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keterangan</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="attendance in paginatedAttendances" :key="attendance.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(attendance.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ attendance.student?.full_name }}</div>
                <div class="text-sm text-gray-500">NIS: {{ attendance.student?.nis }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ attendance.class?.name || attendance.student?.class?.name || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadge(attendance.status)">
                  {{ attendance.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ attendance.time_in || '-' }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ attendance.notes || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="editAttendance(attendance)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Edit
                </button>
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
          Menampilkan {{ (currentPage - 1) * perPage + 1 }} - {{ Math.min(currentPage * perPage, filteredAttendances.length) }} dari {{ filteredAttendances.length }} data
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

    <!-- Edit Modal -->
    <div v-if="editModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Edit Absensi</h3>
        
        <div v-if="editingAttendance" class="mb-4">
          <p class="text-sm text-gray-600">
            <strong>Siswa:</strong> {{ editingAttendance.student?.full_name }}
          </p>
          <p class="text-sm text-gray-600">
            <strong>Tanggal:</strong> {{ formatDate(editingAttendance.date) }}
          </p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="editForm.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="hadir">Hadir</option>
              <option value="sakit">Sakit</option>
              <option value="izin">Izin</option>
              <option value="alpha">Alpha</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Waktu Masuk</label>
            <input
              v-model="editForm.time_in"
              type="time"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
            <textarea
              v-model="editForm.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Keterangan (opsional)"
            ></textarea>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            @click="closeEditModal"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            @click="saveEdit"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Simpan
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

const { getStudentAttendances, deleteAttendance: deleteStudentAttendance, updateAttendance } = useStudentAttendance()
const { getClasses } = useClass()
const toast = useToast()

const attendances = ref([])
const classes = ref([])
const loading = ref(true)
const currentPage = ref(1)
const perPage = ref(20)

// Edit modal state
const editModalOpen = ref(false)
const editingAttendance = ref<any>(null)
const editForm = ref({
  status: '',
  time_in: '',
  notes: ''
})

const filters = ref({
  class_id: '',
  start_date: '',
  end_date: '',
  status: ''
})

const loadAttendances = async () => {
  try {
    loading.value = true
    const response = await getStudentAttendances(filters.value)
    attendances.value = response.data || []
  } catch (error) {
    console.error('Failed to load attendances:', error)
    toast.error('Gagal memuat data absensi')
  } finally {
    loading.value = false
  }
}

const loadClasses = async () => {
  try {
    const response = await getClasses()
    classes.value = response.data || []
  } catch (error) {
    console.error('Failed to load classes:', error)
  }
}

const filteredAttendances = computed(() => {
  return attendances.value
})

const totalPages = computed(() => Math.ceil(filteredAttendances.value.length / perPage.value))

const paginatedAttendances = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredAttendances.value.slice(start, end)
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

const getStatusBadge = (status: string) => {
  const badges = {
    hadir: 'px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800',
    sakit: 'px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800',
    izin: 'px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800',
    alpha: 'px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800'
  }
  return badges[status] || badges.alpha
}

const editAttendance = (attendance: any) => {
  editingAttendance.value = attendance
  
  // Helper to convert time from HH:MM:SS to HH:MM for HTML input
  const formatTimeForInput = (timeStr: string | null) => {
    if (!timeStr) return ''
    // If format is HH:MM:SS, extract HH:MM
    if (timeStr.length === 8 && timeStr.includes(':')) {
      return timeStr.substring(0, 5)  // "07:00:00" -> "07:00"
    }
    return timeStr
  }
  
  editForm.value = {
    status: attendance.status,
    time_in: formatTimeForInput(attendance.time_in),
    notes: attendance.notes || ''
  }
  editModalOpen.value = true
}

const closeEditModal = () => {
  editModalOpen.value = false
  editingAttendance.value = null
  editForm.value = {
    status: '',
    time_in: '',
    notes: ''
  }
}

const saveEdit = async () => {
  if (!editingAttendance.value) return
  
  try {
    // Convert time from HH:MM to HH:MM:SS for backend
    const payload = {
      status: editForm.value.status,
      time_in: editForm.value.time_in ? `${editForm.value.time_in}:00` : '',
      notes: editForm.value.notes
    }
    
    await updateAttendance(editingAttendance.value.id, payload)
    toast.success('Absensi berhasil diupdate')
    closeEditModal()
    loadAttendances()
  } catch (error) {
    console.error('Failed to update attendance:', error)
    toast.error('Gagal mengupdate absensi')
  }
}

const deleteAttendance = async (id: number) => {
  if (!confirm('Apakah Anda yakin ingin menghapus data absensi ini?')) return
  
  try {
    await deleteStudentAttendance(id)
    toast.success('Absensi berhasil dihapus')
    loadAttendances()
  } catch (error) {
    console.error('Failed to delete attendance:', error)
    toast.error('Gagal menghapus absensi')
  }
}

onMounted(() => {
  loadClasses()
  loadAttendances()
})
</script>
