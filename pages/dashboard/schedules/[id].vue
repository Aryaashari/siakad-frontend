<template>
  <div class="p-6">
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-2">
        <NuxtLink
          to="/dashboard/schedules"
          class="text-gray-600 hover:text-gray-900"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Edit Jadwal Pelajaran</h1>
          <p class="text-gray-600 mt-1">Ubah jadwal pelajaran</p>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else class="max-w-3xl">
      <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <!-- Class Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Kelas <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.class_id"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Pilih Kelas</option>
            <option v-for="cls in classes" :key="cls.id" :value="cls.id">
              {{ cls.name }} - {{ cls.grade }}
            </option>
          </select>
        </div>

        <!-- Subject Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Mata Pelajaran <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.subject_id"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Pilih Mata Pelajaran</option>
            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
              {{ subject.name }}
            </option>
          </select>
        </div>

        <!-- Teacher Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Guru <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.teacher_id"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Pilih Guru</option>
            <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
              {{ teacher.full_name }}
            </option>
          </select>
        </div>

        <!-- Day Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Hari <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.day_of_week"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Pilih Hari</option>
            <option value="senin">Senin</option>
            <option value="selasa">Selasa</option>
            <option value="rabu">Rabu</option>
            <option value="kamis">Kamis</option>
            <option value="jumat">Jumat</option>
            <option value="sabtu">Sabtu</option>
          </select>
        </div>

        <!-- Time Range -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Waktu Mulai <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.start_time"
              type="time"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Waktu Selesai <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.end_time"
              type="time"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Room -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Ruangan
          </label>
          <input
            v-model="form.room"
            type="text"
            placeholder="Contoh: Kelas 1A, Lab Komputer"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Semester -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Semester
            </label>
            <select
              v-model="form.semester"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ganjil">Ganjil</option>
              <option value="genap">Genap</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tahun Ajaran
            </label>
            <input
              v-model="form.academic_year"
              type="text"
              placeholder="2024/2025"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Catatan
          </label>
          <textarea
            v-model="form.notes"
            rows="3"
            placeholder="Catatan tambahan (opsional)"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>

        <!-- Conflict Warning -->
        <div v-if="conflictError" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-red-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <div>
              <h4 class="text-sm font-medium text-red-800">Konflik Jadwal Terdeteksi</h4>
              <p class="text-sm text-red-700 mt-1">{{ conflictError }}</p>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end gap-3 pt-4 border-t">
          <NuxtLink
            to="/dashboard/schedules"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Batal
          </NuxtLink>
          <button
            type="submit"
            :disabled="submitting"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ submitting ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const route = useRoute()
const { getScheduleById, updateSchedule } = useSchedule()
const { getClasses } = useClass()
const { getSubjects } = useSubject()
const { getTeachers } = useTeacher()
const toast = useToast()
const router = useRouter()

const scheduleId = computed(() => parseInt(route.params.id as string))
const classes = ref([])
const subjects = ref([])
const teachers = ref([])
const loading = ref(true)
const submitting = ref(false)
const conflictError = ref('')

const form = ref({
  class_id: '',
  subject_id: '',
  teacher_id: '',
  day_of_week: '',
  start_time: '',
  end_time: '',
  room: '',
  semester: 'ganjil',
  academic_year: '2024/2025',
  notes: ''
})

const loadData = async () => {
  try {
    loading.value = true
    const [scheduleRes, classesRes, subjectsRes, teachersRes] = await Promise.all([
      getScheduleById(scheduleId.value),
      getClasses(),
      getSubjects(),
      getTeachers()
    ])
    
    const schedule = scheduleRes.data
    form.value = {
      class_id: schedule.class_id,
      subject_id: schedule.subject_id,
      teacher_id: schedule.teacher_id,
      day_of_week: schedule.day_of_week,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      room: schedule.room || '',
      semester: schedule.semester || 'ganjil',
      academic_year: schedule.academic_year || '2024/2025',
      notes: schedule.notes || ''
    }
    
    classes.value = classesRes.data || []
    subjects.value = subjectsRes.data || []
    teachers.value = teachersRes.data || []
  } catch (error) {
    console.error('Failed to load data:', error)
    toast.error('Gagal memuat data')
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  try {
    submitting.value = true
    conflictError.value = ''

    if (form.value.start_time >= form.value.end_time) {
      toast.error('Waktu selesai harus lebih dari waktu mulai')
      return
    }

    await updateSchedule(scheduleId.value, {
      class_id: parseInt(form.value.class_id),
      subject_id: parseInt(form.value.subject_id),
      teacher_id: parseInt(form.value.teacher_id),
      day_of_week: form.value.day_of_week,
      start_time: form.value.start_time,
      end_time: form.value.end_time,
      room: form.value.room,
      semester: form.value.semester,
      academic_year: form.value.academic_year,
      notes: form.value.notes
    })

    toast.success('Jadwal berhasil diperbarui')
    router.push('/dashboard/schedules')
  } catch (error: any) {
    console.error('Failed to update schedule:', error)
    
    if (error.data?.message?.includes('conflict')) {
      conflictError.value = error.data.message
    } else {
      toast.error(error.data?.message || 'Gagal memperbarui jadwal')
    }
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>
