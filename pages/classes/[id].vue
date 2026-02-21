<template>
  <div class="max-w-5xl mx-auto">
    <FormHeader 
      back-link="/classes"
      back-text="Kembali ke Daftar Kelas"
      icon="mdi:google-classroom"
      title="Edit Data Kelas"
      subtitle="Perbarui informasi kelas di bawah ini"
    />

    <div v-if="loadingClass" class="card text-center py-16 animate-pulse">
      <Icon name="mdi:loading" class="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
      <p class="text-gray-600 text-lg font-medium">Memuat data kelas...</p>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <FormSection icon="mdi:school" title="📚 Informasi Kelas" gradient-class="from-blue-500 to-blue-600">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Kelas <span class="text-red-500">*</span>
            </label>
            <input v-model="form.name" type="text" required class="input" placeholder="Contoh: 1A, 2B" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tingkat <span class="text-red-500">*</span>
            </label>
            <select v-model="form.level" required class="input">
              <option value="">Pilih Tingkat</option>
              <option v-for="i in 6" :key="i" :value="i">Kelas {{ i }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tahun Ajaran <span class="text-red-500">*</span>
            </label>
            <input v-model="form.academic_year" type="text" required class="input" placeholder="2023/2024" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Semester <span class="text-red-500">*</span>
            </label>
            <select v-model="form.semester" required class="input">
              <option value="">Pilih Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Wali Kelas</label>
            <select v-model="form.homeroom_teacher_id" class="input">
              <option value="">Pilih Wali Kelas</option>
              <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
                {{ teacher.full_name }} {{ teacher.nip ? `(${teacher.nip})` : '' }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Kapasitas</label>
            <input v-model.number="form.capacity" type="number" class="input" placeholder="30" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ruang Kelas</label>
            <input v-model="form.room" type="text" class="input" placeholder="Ruang 101" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="form.is_active" class="input">
              <option :value="true">Aktif</option>
              <option :value="false">Tidak Aktif</option>
            </select>
          </div>
        </div>
      </FormSection>

      <FormActions 
        :loading="loading"
        :error="error"
        :success="success"
        success-message="Perubahan data kelas berhasil disimpan"
        cancel-link="/classes"
        submit-text="Simpan Perubahan"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Teacher } from '~/types'

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const api = useApi()
const router = useRouter()
const route = useRoute()

const classId = parseInt(route.params.id as string)

const form = ref({
  name: '',
  level: '',
  academic_year: '',
  semester: '',
  homeroom_teacher_id: null as number | null,
  capacity: 30,
  room: '',
  is_active: true
})

const teachers = ref<Teacher[]>([])
const loading = ref(false)
const loadingClass = ref(false)
const error = ref('')
const success = ref(false)

const fetchClass = async () => {
  try {
    loadingClass.value = true
    const response = await api.getClass(classId)
    
    if (response.success && response.data) {
      const cls = response.data
      form.value = {
        name: cls.name || '',
        level: cls.level || '',
        academic_year: cls.academic_year || '',
        semester: cls.semester || '',
        homeroom_teacher_id: cls.homeroom_teacher_id || null,
        capacity: cls.capacity || 30,
        room: cls.room || '',
        is_active: cls.is_active !== false
      }
    } else {
      error.value = 'Gagal memuat data kelas'
    }
  } catch (err: any) {
    error.value = err.message || 'Terjadi kesalahan saat memuat data'
  } finally {
    loadingClass.value = false
  }
}

const fetchTeachers = async () => {
  try {
    const response = await api.getTeachers({ page: 1, per_page: 100 })
    console.log('Teachers API Response:', response)
    if (response.success && response.data) {
      // Support both array dan paginated response
      const teachersData = Array.isArray(response.data) ? response.data : response.data.data || response.data
      teachers.value = teachersData.filter((t: Teacher) => t.is_active !== false)
      console.log('Filtered Teachers:', teachers.value)
    }
  } catch (err) {
    console.error('Failed to fetch teachers:', err)
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    success.value = false

    const data: any = {}
    Object.entries(form.value).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        data[key] = value
      }
    })

    if (data.level) data.level = parseInt(data.level)
    if (data.homeroom_teacher_id) data.homeroom_teacher_id = parseInt(data.homeroom_teacher_id.toString())

    const response = await api.updateClass(classId, data)

    if (response.success) {
      success.value = true
      setTimeout(() => {
        router.push('/classes')
      }, 1500)
    } else {
      error.value = response.error || 'Gagal menyimpan perubahan'
    }
  } catch (err: any) {
    error.value = err.data?.error || err.message || 'Terjadi kesalahan saat menyimpan data'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchClass()
  fetchTeachers()
})
</script>
