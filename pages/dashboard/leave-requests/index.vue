<template>
  <div class="p-6">
    <div class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Pengajuan Izin/Cuti</h1>
          <p class="text-gray-600 mt-1">Kelola pengajuan izin dan cuti guru</p>
        </div>
        <NuxtLink
          to="/dashboard/leave-requests/create"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Ajukan Izin/Cuti
        </NuxtLink>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
            <input
              v-model="filters.start_date"
              type="date"
              @change="loadLeaveRequests"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Akhir</label>
            <input
              v-model="filters.end_date"
              type="date"
              @change="loadLeaveRequests"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="filters.status"
              @change="loadLeaveRequests"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Disetujui</option>
              <option value="rejected">Ditolak</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
            <select
              v-model="filters.leave_type"
              @change="loadLeaveRequests"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Tipe</option>
              <option value="sakit">Sakit</option>
              <option value="izin">Izin</option>
              <option value="cuti">Cuti</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Leave Requests Table -->
    <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guru</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipe</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Mulai</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Selesai</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alasan</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="request in paginatedRequests" :key="request.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ request.teacher?.full_name }}</div>
                <div class="text-sm text-gray-500">NIP: {{ request.teacher?.nip }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getTypeBadge(request.leave_type)">
                  {{ request.leave_type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(request.start_date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(request.end_date) }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                {{ request.reason }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadge(request.status)">
                  {{ getStatusText(request.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end gap-2">
                  <button
                    v-if="request.status === 'pending' && canApprove"
                    @click="approveRequest(request.id)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Setuju
                  </button>
                  <button
                    v-if="request.status === 'pending' && canApprove"
                    @click="rejectRequest(request.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Tolak
                  </button>
                  <button
                    @click="viewDetails(request)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Detail
                  </button>
                  <button
                    v-if="request.status === 'pending'"
                    @click="deleteRequest(request.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="paginatedRequests.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                Tidak ada pengajuan izin/cuti
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
        <div class="text-sm text-gray-700">
          Menampilkan {{ (currentPage - 1) * perPage + 1 }} - {{ Math.min(currentPage * perPage, requests.length) }} dari {{ requests.length }} data
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

    <!-- Detail Modal -->
    <div v-if="selectedRequest" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModal">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6" @click.stop>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Detail Pengajuan</h3>
        
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-600">Nama Guru</p>
              <p class="font-medium">{{ selectedRequest.teacher?.full_name }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">NIP</p>
              <p class="font-medium">{{ selectedRequest.teacher?.nip }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Tipe</p>
              <span :class="getTypeBadge(selectedRequest.leave_type)">
                {{ selectedRequest.leave_type }}
              </span>
            </div>
            <div>
              <p class="text-sm text-gray-600">Status</p>
              <span :class="getStatusBadge(selectedRequest.status)">
                {{ getStatusText(selectedRequest.status) }}
              </span>
            </div>
            <div>
              <p class="text-sm text-gray-600">Tanggal Mulai</p>
              <p class="font-medium">{{ formatDate(selectedRequest.start_date) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Tanggal Selesai</p>
              <p class="font-medium">{{ formatDate(selectedRequest.end_date) }}</p>
            </div>
          </div>

          <div>
            <p class="text-sm text-gray-600 mb-1">Alasan</p>
            <p class="font-medium">{{ selectedRequest.reason }}</p>
          </div>

          <div v-if="selectedRequest.notes">
            <p class="text-sm text-gray-600 mb-1">Catatan Tambahan</p>
            <p class="font-medium">{{ selectedRequest.notes }}</p>
          </div>

          <div v-if="selectedRequest.approval_notes">
            <p class="text-sm text-gray-600 mb-1">Catatan Persetujuan</p>
            <p class="font-medium">{{ selectedRequest.approval_notes }}</p>
          </div>

          <div v-if="selectedRequest.approved_by">
            <p class="text-sm text-gray-600 mb-1">Disetujui/Ditolak oleh</p>
            <p class="font-medium">{{ selectedRequest.approver?.full_name }}</p>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
          >
            Tutup
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
  getLeaveRequests, 
  approveLeaveRequest, 
  rejectLeaveRequest,
  deleteLeaveRequest 
} = useLeaveRequest()
const authStore = useAuthStore()
const toast = useToast()

const requests = ref([])
const selectedRequest = ref(null)
const loading = ref(true)
const currentPage = ref(1)
const perPage = ref(20)

const filters = ref({
  start_date: '',
  end_date: '',
  status: '',
  leave_type: ''
})

const canApprove = computed(() => authStore.user?.role === 'admin')

const loadLeaveRequests = async () => {
  try {
    loading.value = true
    const response = await getLeaveRequests(filters.value)
    requests.value = response.data || []
  } catch (error) {
    console.error('Failed to load leave requests:', error)
    toast.error('Gagal memuat data pengajuan')
  } finally {
    loading.value = false
  }
}

const approveRequest = async (id: number) => {
  const notes = prompt('Catatan persetujuan (opsional):')
  
  try {
    await approveLeaveRequest(id, notes || undefined)
    toast.success('Pengajuan disetujui')
    loadLeaveRequests()
  } catch (error: any) {
    console.error('Failed to approve request:', error)
    toast.error(error.data?.message || 'Gagal menyetujui pengajuan')
  }
}

const rejectRequest = async (id: number) => {
  const notes = prompt('Alasan penolakan:')
  if (!notes) return
  
  try {
    await rejectLeaveRequest(id, notes)
    toast.success('Pengajuan ditolak')
    loadLeaveRequests()
  } catch (error: any) {
    console.error('Failed to reject request:', error)
    toast.error(error.data?.message || 'Gagal menolak pengajuan')
  }
}

const deleteRequest = async (id: number) => {
  if (!confirm('Apakah Anda yakin ingin menghapus pengajuan ini?')) return
  
  try {
    await deleteLeaveRequest(id)
    toast.success('Pengajuan berhasil dihapus')
    loadLeaveRequests()
  } catch (error) {
    console.error('Failed to delete request:', error)
    toast.error('Gagal menghapus pengajuan')
  }
}

const viewDetails = (request: any) => {
  selectedRequest.value = request
}

const closeModal = () => {
  selectedRequest.value = null
}

const totalPages = computed(() => Math.ceil(requests.value.length / perPage.value))

const paginatedRequests = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return requests.value.slice(start, end)
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
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
}

const getTypeBadge = (type: string) => {
  const badges = {
    sakit: 'px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800',
    izin: 'px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800',
    cuti: 'px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800'
  }
  return badges[type] || badges.izin
}

const getStatusBadge = (status: string) => {
  const badges = {
    pending: 'px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800',
    approved: 'px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800',
    rejected: 'px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800'
  }
  return badges[status] || badges.pending
}

const getStatusText = (status: string) => {
  const texts = {
    pending: 'Pending',
    approved: 'Disetujui',
    rejected: 'Ditolak'
  }
  return texts[status] || status
}

onMounted(() => {
  loadLeaveRequests()
})
</script>
