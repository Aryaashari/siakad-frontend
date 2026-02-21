<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Jadwal Pelajaran</h1>
        <p class="text-gray-600 mt-1">Kelola jadwal pelajaran sekolah</p>
      </div>
      <NuxtLink
        to="/dashboard/schedules/create"
        class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Jadwal
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Filter Kelas</label>
          <select
            v-model="filterClass"
            @change="loadSchedules"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Semua Kelas</option>
            <option v-for="cls in classes" :key="cls.id" :value="cls.id">
              {{ cls.name }} - {{ cls.grade }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Filter Guru</label>
          <select
            v-model="filterTeacher"
            @change="loadSchedules"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Semua Guru</option>
            <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
              {{ teacher.full_name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Hari</label>
          <select
            v-model="filterDay"
            @change="loadSchedules"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Semua Hari</option>
            <option value="senin">Senin</option>
            <option value="selasa">Selasa</option>
            <option value="rabu">Rabu</option>
            <option value="kamis">Kamis</option>
            <option value="jumat">Jumat</option>
            <option value="sabtu">Sabtu</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!filteredSchedules.length" class="bg-white rounded-lg shadow-sm p-12 text-center">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Belum ada jadwal</h3>
      <p class="text-gray-600 mb-4">Mulai dengan menambahkan jadwal pelajaran pertama</p>
      <NuxtLink
        to="/dashboard/schedules/create"
        class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        Tambah Jadwal
      </NuxtLink>
    </div>

    <!-- Schedule Table -->
    <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hari</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guru</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ruangan</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="schedule in paginatedSchedules" :key="schedule.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize" :class="getDayColor(schedule.day_of_week)">
                  {{ schedule.day_of_week }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ schedule.start_time }} - {{ schedule.end_time }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ schedule.class?.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ schedule.subject?.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ schedule.teacher?.full_name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ schedule.room || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <NuxtLink
                  :to="`/dashboard/schedules/${schedule.id}`"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Edit
                </NuxtLink>
                <button
                  @click="confirmDelete(schedule)"
                  class="text-red-600 hover:text-red-900"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
        <div class="text-sm text-gray-700">
          Menampilkan {{ ((currentPage - 1) * perPage) + 1 }} - {{ Math.min(currentPage * perPage, filteredSchedules.length) }} dari {{ filteredSchedules.length }} jadwal
        </div>
        <div class="flex gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Prev
          </button>
          <button
            v-for="page in totalPages"
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
            class="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
        <p class="text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus jadwal ini?
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            @click="handleDelete"
            :disabled="deleting"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {{ deleting ? 'Menghapus...' : 'Hapus' }}
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

const { getSchedules, getSchedulesByClass, getSchedulesByTeacher, deleteSchedule } = useSchedule()
const { getClasses } = useClass()
const { getTeachers } = useTeacher()
const toast = useToast()

const schedules = ref([])
const classes = ref([])
const teachers = ref([])
const loading = ref(true)
const deleting = ref(false)
const showDeleteModal = ref(false)
const scheduleToDelete = ref(null)

const filterClass = ref('')
const filterTeacher = ref('')
const filterDay = ref('')

const currentPage = ref(1)
const perPage = ref(10)

const filteredSchedules = computed(() => {
  let result = schedules.value

  if (filterDay.value) {
    result = result.filter(s => s.day_of_week === filterDay.value)
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredSchedules.value.length / perPage.value))

const paginatedSchedules = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredSchedules.value.slice(start, end)
})

const getDayColor = (day: string) => {
  const colors = {
    'senin': 'bg-blue-100 text-blue-800',
    'selasa': 'bg-green-100 text-green-800',
    'rabu': 'bg-yellow-100 text-yellow-800',
    'kamis': 'bg-purple-100 text-purple-800',
    'jumat': 'bg-pink-100 text-pink-800',
    'sabtu': 'bg-gray-100 text-gray-800',
  }
  return colors[day] || 'bg-gray-100 text-gray-800'
}

const loadSchedules = async () => {
  try {
    loading.value = true
    
    if (filterClass.value) {
      const response = await getSchedulesByClass(filterClass.value)
      schedules.value = response.data || []
    } else if (filterTeacher.value) {
      const response = await getSchedulesByTeacher(filterTeacher.value)
      schedules.value = response.data || []
    } else {
      const response = await getSchedules()
      schedules.value = response.data || []
    }
  } catch (error) {
    console.error('Failed to load schedules:', error)
    toast.error('Gagal memuat data jadwal')
  } finally {
    loading.value = false
  }
}

const loadMasterData = async () => {
  try {
    const [classesRes, teachersRes] = await Promise.all([
      getClasses(),
      getTeachers()
    ])
    classes.value = classesRes.data || []
    teachers.value = teachersRes.data || []
  } catch (error) {
    console.error('Failed to load master data:', error)
  }
}

const confirmDelete = (schedule: any) => {
  scheduleToDelete.value = schedule
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!scheduleToDelete.value) return

  try {
    deleting.value = true
    await deleteSchedule(scheduleToDelete.value.id)
    toast.success('Jadwal berhasil dihapus')
    showDeleteModal.value = false
    scheduleToDelete.value = null
    await loadSchedules()
  } catch (error) {
    console.error('Failed to delete schedule:', error)
    toast.error('Gagal menghapus jadwal')
  } finally {
    deleting.value = false
  }
}

onMounted(async () => {
  await Promise.all([loadSchedules(), loadMasterData()])
})
</script>
