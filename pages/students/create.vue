<template>
  <div class="max-w-5xl mx-auto">
    <FormHeader 
      back-link="/students"
      back-text="Kembali ke Daftar Siswa"
      icon="mdi:account-plus"
      title="Tambah Siswa Baru"
      subtitle="Lengkapi formulir di bawah untuk menambahkan siswa"
    />

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <FormSection icon="mdi:account" title="📋 Data Pribadi" gradient-class="from-blue-500 to-blue-600">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              NISN <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.nisn"
              type="text"
              required
              maxlength="10"
              class="input"
              placeholder="1234567890"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              NIK <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.nik"
              type="text"
              required
              maxlength="16"
              class="input"
              placeholder="1234567890123456"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.full_name"
              type="text"
              required
              class="input"
              placeholder="Nama lengkap siswa"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Panggilan
            </label>
            <input
              v-model="form.nickname"
              type="text"
              class="input"
              placeholder="Nama panggilan"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Jenis Kelamin <span class="text-red-500">*</span>
            </label>
            <select v-model="form.gender" required class="input">
              <option value="">Pilih Jenis Kelamin</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tempat Lahir
            </label>
            <input
              v-model="form.birth_place"
              type="text"
              class="input"
              placeholder="Kota/Kabupaten"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Lahir
            </label>
            <input
              v-model="form.birth_date"
              type="date"
              class="input"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Agama
            </label>
            <select v-model="form.religion" class="input">
              <option value="">Pilih Agama</option>
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
              <option value="Katolik">Katolik</option>
              <option value="Hindu">Hindu</option>
              <option value="Buddha">Buddha</option>
              <option value="Konghucu">Konghucu</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Alamat
            </label>
            <textarea
              v-model="form.address"
              rows="3"
              class="input"
              placeholder="Alamat lengkap"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              No. Telepon
            </label>
            <input
              v-model="form.phone"
              type="tel"
              class="input"
              placeholder="08123456789"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              v-model="form.email"
              type="email"
              class="input"
              placeholder="email@example.com"
            />
          </div>
        </div>
      </FormSection>

      <FormSection icon="mdi:school" title="🎓 Data Akademik" gradient-class="from-green-500 to-green-600">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Kelas
            </label>
            <select v-model="form.class_id" class="input">
              <option value="">Pilih Kelas</option>
              <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                {{ cls.name }} - {{ cls.academic_year }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select v-model="form.status" class="input">
              <option value="aktif">Aktif</option>
              <option value="pindah">Pindah</option>
              <option value="mutasi">Mutasi</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Masuk
            </label>
            <input
              v-model="form.admission_date"
              type="date"
              class="input"
            />
          </div>
        </div>
      </FormSection>

      <FormSection icon="mdi:account-group" title="👨‍👩‍👧 Data Orang Tua/Wali" gradient-class="from-purple-500 to-purple-600">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Orang Tua/Wali
            </label>
            <input
              v-model="form.parent_name"
              type="text"
              class="input"
              placeholder="Nama orang tua"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              No. Telepon Orang Tua
            </label>
            <input
              v-model="form.parent_phone"
              type="tel"
              class="input"
              placeholder="08123456789"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Pekerjaan Orang Tua
            </label>
            <input
              v-model="form.parent_job"
              type="text"
              class="input"
              placeholder="Pekerjaan"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Pendidikan Orang Tua
            </label>
            <select v-model="form.parent_education" class="input">
              <option value="">Pilih Pendidikan</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
          </div>
        </div>
      </FormSection>

      <FormActions 
        :loading="loading"
        :error="error"
        :success="success"
        success-message="Data siswa berhasil disimpan"
        cancel-link="/students"
        submit-text="Simpan Data"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Class } from '~/types'

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const api = useApi()
const router = useRouter()

const form = ref({
  nisn: '',
  nik: '',
  full_name: '',
  nickname: '',
  gender: '',
  birth_place: '',
  birth_date: '',
  religion: '',
  address: '',
  phone: '',
  email: '',
  class_id: '',
  status: 'aktif',
  admission_date: '',
  parent_name: '',
  parent_phone: '',
  parent_job: '',
  parent_education: ''
})

const classes = ref<Class[]>([])
const loading = ref(false)
const error = ref('')
const success = ref(false)

const fetchClasses = async () => {
  try {
    const response = await api.getClasses({ page: 1, per_page: 100 })
    if (response.success && response.data) {
      classes.value = response.data.filter((c: Class) => c.is_active)
    }
  } catch (err) {
    console.error('Failed to fetch classes:', err)
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

    if (data.class_id) {
      data.class_id = parseInt(data.class_id)
    }

    const response = await api.createStudent(data)

    if (response.success) {
      success.value = true
      setTimeout(() => {
        router.push('/students')
      }, 1500)
    } else {
      error.value = response.error || 'Gagal menyimpan data siswa'
    }
  } catch (err: any) {
    error.value = err.data?.error || err.message || 'Terjadi kesalahan saat menyimpan data'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchClasses()
})
</script>
