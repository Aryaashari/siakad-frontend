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
          <h1 class="text-3xl font-bold text-gray-900">Input Absensi Siswa</h1>
          <p class="text-gray-600 mt-1">Input absensi secara massal per kelas</p>
        </div>
      </div>
    </div>

    <!-- Class & Date Selection -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Pilih Kelas <span class="text-red-500">*</span>
          </label>
          <select
            v-model="selectedClassId"
            @change="loadStudents"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Kelas</option>
            <option v-for="cls in classes" :key="cls.id" :value="cls.id">
              {{ cls.name }} - {{ cls.grade }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tanggal <span class="text-red-500">*</span>
          </label>
          <input
            v-model="selectedDate"
            type="date"
            required
            :max="today"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex items-end">
          <button
            @click="setAllStatus('hadir')"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition mr-2"
          >
            Semua Hadir
          </button>
          <button
            @click="clearAll"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Students Table -->
    <div v-else-if="students.length > 0" class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIS</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Siswa</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status <span class="text-red-500">*</span></th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waktu Masuk</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keterangan</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(student, index) in students" :key="student.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ student.nis }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ student.full_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select
                  v-model="attendanceData[student.id].status"
                  @change="onStatusChange(student.id)"
                  class="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-</option>
                  <option value="hadir">Hadir</option>
                  <option value="sakit">Sakit</option>
                  <option value="izin">Izin</option>
                  <option value="alpha">Alpha</option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  v-model="attendanceData[student.id].time_in"
                  type="time"
                  :disabled="attendanceData[student.id].status !== 'hadir'"
                  class="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </td>
              <td class="px-6 py-4">
                <input
                  v-model="attendanceData[student.id].notes"
                  type="text"
                  placeholder="Keterangan"
                  class="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Summary -->
      <div class="bg-gray-50 px-6 py-4 border-t">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Total: {{ students.length }} siswa | 
            Hadir: <span class="font-semibold text-green-600">{{ countStatus('hadir') }}</span> | 
            Sakit: <span class="font-semibold text-yellow-600">{{ countStatus('sakit') }}</span> | 
            Izin: <span class="font-semibold text-blue-600">{{ countStatus('izin') }}</span> | 
            Alpha: <span class="font-semibold text-red-600">{{ countStatus('alpha') }}</span>
          </div>
          <button
            @click="handleSubmit"
            :disabled="submitting || !canSubmit"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ submitting ? 'Menyimpan...' : 'Simpan Absensi' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <p class="mt-4 text-gray-600">Pilih kelas untuk memulai input absensi</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const { bulkCreateStudentAttendance } = useStudentAttendance()
const { getClasses } = useClass()
const { getStudents } = useStudent()
const toast = useToast()
const router = useRouter()

const classes = ref([])
const students = ref([])
const selectedClassId = ref('')
const selectedDate = ref('')
const loading = ref(false)
const submitting = ref(false)
const attendanceData = ref({})

const today = computed(() => {
  const date = new Date()
  return date.toISOString().split('T')[0]
})

const canSubmit = computed(() => {
  if (!selectedClassId.value || !selectedDate.value || students.value.length === 0) return false
  return Object.values(attendanceData.value).some((data: any) => data.status !== '')
})

const loadClasses = async () => {
  try {
    const response = await getClasses()
    classes.value = response.data || []
  } catch (error) {
    console.error('Failed to load classes:', error)
    toast.error('Gagal memuat data kelas')
  }
}

const loadStudents = async () => {
  if (!selectedClassId.value) {
    students.value = []
    attendanceData.value = {}
    return
  }

  try {
    loading.value = true
    const response = await getStudents({ class_id: selectedClassId.value })
    students.value = response.data || []
    
    // Initialize attendance data
    attendanceData.value = {}
    students.value.forEach((student: any) => {
      attendanceData.value[student.id] = {
        student_id: student.id,
        status: '',
        time_in: '',
        notes: ''
      }
    })
  } catch (error) {
    console.error('Failed to load students:', error)
    toast.error('Gagal memuat data siswa')
  } finally {
    loading.value = false
  }
}

const setAllStatus = (status: string) => {
  if (!students.value.length) return
  
  const defaultTime = status === 'hadir' ? '07:00' : ''
  students.value.forEach((student: any) => {
    attendanceData.value[student.id].status = status
    attendanceData.value[student.id].time_in = defaultTime
  })
  
  toast.success(`Semua siswa diset ${status}`)
}

const clearAll = () => {
  students.value.forEach((student: any) => {
    attendanceData.value[student.id].status = ''
    attendanceData.value[student.id].time_in = ''
    attendanceData.value[student.id].notes = ''
  })
  toast.success('Data direset')
}

const onStatusChange = (studentId: number) => {
  if (attendanceData.value[studentId].status === 'hadir' && !attendanceData.value[studentId].time_in) {
    attendanceData.value[studentId].time_in = '07:00'
  } else if (attendanceData.value[studentId].status !== 'hadir') {
    attendanceData.value[studentId].time_in = ''
  }
}

const countStatus = (status: string) => {
  return Object.values(attendanceData.value).filter((data: any) => data.status === status).length
}

const handleSubmit = async () => {
  if (!canSubmit.value) return

  try {
    submitting.value = true

    const attendances = Object.values(attendanceData.value)
      .filter((data: any) => data.status !== '')
      .map((data: any) => ({
        student_id: data.student_id,
        status: data.status,
        time_in: data.time_in ? `${data.time_in}:00` : '',  // ✅ Convert HH:MM to HH:MM:SS
        is_late: data.is_late || false,
        notes: data.notes || ''
      }))

    if (attendances.length === 0) {
      toast.error('Tidak ada data absensi yang diinput')
      return
    }

    // Send with class_id and date as required by backend
    await bulkCreateStudentAttendance({
      class_id: parseInt(selectedClassId.value),
      date: selectedDate.value,
      attendances
    })
    toast.success(`Berhasil menyimpan ${attendances.length} data absensi`)
    router.push('/dashboard/student-attendances')
  } catch (error: any) {
    console.error('Failed to save attendances:', error)
    toast.error(error.data?.message || 'Gagal menyimpan absensi')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  selectedDate.value = today.value
  loadClasses()
})
</script>
