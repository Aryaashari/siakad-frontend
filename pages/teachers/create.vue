<template>
  <div class="max-w-5xl mx-auto">
    <!-- Header with gradient -->
    <div class="mb-8">
      <NuxtLink 
        to="/teachers" 
        class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 group transition-all"
      >
        <Icon name="mdi:arrow-left" class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Kembali ke Daftar Guru</span>
      </NuxtLink>
      
      <div class="gradient-header rounded-2xl p-6 shadow-xl">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Icon name="mdi:account-tie" class="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">Tambah Guru Baru</h1>
            <p class="text-blue-100 mt-1">Lengkapi formulir di bawah untuk menambahkan guru</p>
          </div>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Data Pribadi -->
      <div class="card hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <Icon name="mdi:account" class="w-6 h-6 text-white" />
          </div>
          <h2 class="text-xl font-bold text-gray-900">📋 Data Pribadi</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">NIP</label>
            <input v-model="form.nip" type="text" maxlength="18" class="input" placeholder="NIP (18 digit)" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">NUPTK</label>
            <input v-model="form.nuptk" type="text" maxlength="16" class="input" placeholder="NUPTK (16 digit)" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              NIK <span class="text-red-500">*</span>
            </label>
            <input v-model="form.nik" type="text" required maxlength="16" class="input" placeholder="NIK (16 digit)" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap <span class="text-red-500">*</span>
            </label>
            <input v-model="form.full_name" type="text" required class="input" placeholder="Nama lengkap guru" />
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
            <label class="block text-sm font-medium text-gray-700 mb-2">Tempat Lahir</label>
            <input v-model="form.birth_place" type="text" class="input" placeholder="Kota/Kabupaten" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir</label>
            <input v-model="form.birth_date" type="date" class="input" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Agama</label>
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
            <label class="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
            <textarea v-model="form.address" rows="3" class="input" placeholder="Alamat lengkap"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
            <input v-model="form.phone" type="tel" class="input" placeholder="08123456789" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input v-model="form.email" type="email" class="input" placeholder="email@example.com" />
          </div>
        </div>
      </div>

      <!-- Data Pendidikan -->
      <div class="card hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
            <Icon name="mdi:school" class="w-6 h-6 text-white" />
          </div>
          <h2 class="text-xl font-bold text-gray-900">🎓 Data Pendidikan</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Jenjang Pendidikan</label>
            <select v-model="form.education_level" class="input">
              <option value="">Pilih Jenjang</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Jurusan</label>
            <input v-model="form.major" type="text" class="input" placeholder="Jurusan/Program Studi" />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Sertifikasi</label>
            <input v-model="form.certification" type="text" class="input" placeholder="Sertifikat Pendidik/Sertifikat lainnya" />
          </div>
        </div>
      </div>

      <!-- Data Kepegawaian -->
      <div class="card hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <Icon name="mdi:briefcase" class="w-6 h-6 text-white" />
          </div>
          <h2 class="text-xl font-bold text-gray-900">💼 Data Kepegawaian</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status Kepegawaian</label>
            <select v-model="form.employment_status" class="input">
              <option value="">Pilih Status</option>
              <option value="PNS">PNS</option>
              <option value="PPPK">PPPK</option>
              <option value="GTY">GTY (Guru Tetap Yayasan)</option>
              <option value="GTT">GTT (Guru Tidak Tetap)</option>
              <option value="Honorer">Honorer</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Bergabung</label>
            <input v-model="form.join_date" type="date" class="input" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status Aktif</label>
            <select v-model="form.is_active" class="input">
              <option :value="true">Aktif</option>
              <option :value="false">Tidak Aktif</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="card bg-red-50 border-2 border-red-200 animate-shake">
        <div class="flex items-start gap-3">
          <Icon name="mdi:alert-circle" class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 class="font-semibold text-red-900 mb-1">Terjadi Kesalahan</h4>
            <p class="text-red-600">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="success" class="card bg-green-50 border-2 border-green-200 animate-fadeIn">
        <div class="flex items-start gap-3">
          <Icon name="mdi:check-circle" class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 class="font-semibold text-green-900 mb-1">Berhasil!</h4>
            <p class="text-green-600">Data guru berhasil disimpan</p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="sticky bottom-0 bg-white border-t border-gray-200 -mx-4 px-4 py-4 mt-8 flex gap-4 justify-end shadow-lg">
        <NuxtLink 
          to="/teachers" 
          class="btn btn-secondary hover:scale-105 transition-transform"
        >
          <Icon name="mdi:close" class="w-5 h-5 mr-2" />
          Batal
        </NuxtLink>
        <button 
          type="submit" 
          :disabled="loading" 
          class="btn btn-primary hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon v-if="loading" name="mdi:loading" class="w-5 h-5 mr-2 animate-spin" />
          <Icon v-else name="mdi:content-save" class="w-5 h-5 mr-2" />
          <span>{{ loading ? 'Menyimpan...' : 'Simpan Data' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const api = useApi()
const router = useRouter()

const form = ref({
  nip: '',
  nuptk: '',
  nik: '',
  full_name: '',
  gender: '',
  birth_place: '',
  birth_date: '',
  religion: '',
  address: '',
  phone: '',
  email: '',
  education_level: '',
  major: '',
  certification: '',
  employment_status: '',
  join_date: '',
  is_active: true
})

const loading = ref(false)
const error = ref('')
const success = ref(false)

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    success.value = false

    // Prepare data - remove empty strings
    const data: any = {}
    Object.entries(form.value).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        data[key] = value
      }
    })

    const response = await api.createTeacher(data)

    if (response.success) {
      success.value = true
      setTimeout(() => {
        router.push('/teachers')
      }, 1500)
    } else {
      error.value = response.error || 'Gagal menyimpan data guru'
    }
  } catch (err: any) {
    error.value = err.data?.error || err.message || 'Terjadi kesalahan saat menyimpan data'
  } finally {
    loading.value = false
  }
}
</script>
