<template>
  <div class="max-w-5xl mx-auto">
    <FormHeader 
      back-link="/classes"
      back-text="Kembali ke Daftar Kelas"
      icon="mdi:google-classroom"
      title="Tambah Kelas Baru"
      subtitle="Lengkapi formulir di bawah untuk menambahkan kelas"
    />

    <form @submit.prevent="handleSubmit" class="space-y-6">
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
        </div>
      </FormSection>

      <FormActions 
        :loading="loading"
        :error="error"
        :success="success"
        success-message="Data kelas berhasil disimpan"
        cancel-link="/classes"
        submit-text="Simpan Data"
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

const form = ref({
  name: '',
  level: '',
  academic_year: '',
  semester: '',
  homeroom_teacher_id: '',
  capacity: 30,
  room: ''
})

const teachers = ref<Teacher[]>([])
const loading = ref(false)
const error = ref('')
const success = ref(false)

const fetchTeachers = async () => {
  try {
    const response = await api.getTeachers({ page: 1, per_page: 100 })
    if (response.success && response.data) {
      teachers.value = response.data.filter((t: Teacher) => t.is_active)
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
    if (data.homeroom_teacher_id) data.homeroom_teacher_id = parseInt(data.homeroom_teacher_id)

    const response = await api.createClass(data)

    if (response.success) {
      success.value = true
      setTimeout(() => {
        router.push('/classes')
      }, 1500)
    } else {
      error.value = response.error || 'Gagal menyimpan data kelas'
    }
  } catch (err: any) {
    error.value = err.data?.error || err.message || 'Terjadi kesalahan saat menyimpan data'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTeachers()
})
</script>
