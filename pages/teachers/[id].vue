<template>
  <div class="max-w-5xl mx-auto">
    <FormHeader 
      back-link="/teachers"
      back-text="Kembali ke Daftar Guru"
      icon="mdi:account-edit"
      title="Edit Data Guru"
      subtitle="Perbarui informasi guru di bawah ini"
    />

    <div v-if="loadingTeacher" class="card text-center py-16 animate-pulse">
      <Icon name="mdi:loading" class="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
      <p class="text-gray-600 text-lg font-medium">Memuat data guru...</p>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <FormSection icon="mdi:account" title="📋 Data Pribadi" gradient-class="from-blue-500 to-blue-600">
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
            <label class="block text-sm font-medium text-gray-700 mb-2">NIK <span class="text-red-500">*</span></label>
            <input v-model="form.nik" type="text" required maxlength="16" class="input" placeholder="NIK (16 digit)" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap <span class="text-red-500">*</span></label>
            <input v-model="form.full_name" type="text" required class="input" placeholder="Nama lengkap guru" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin <span class="text-red-500">*</span></label>
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
      </FormSection>

      <FormSection icon="mdi:school" title="🎓 Data Pendidikan" gradient-class="from-green-500 to-green-600">
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
      </FormSection>

      <FormSection icon="mdi:briefcase" title="💼 Data Kepegawaian" gradient-class="from-purple-500 to-purple-600">
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
      </FormSection>

      <FormActions 
        :loading="loading"
        :error="error"
        :success="success"
        success-message="Perubahan data guru berhasil disimpan"
        cancel-link="/teachers"
        submit-text="Simpan Perubahan"
      />
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
const route = useRoute()

const teacherId = parseInt(route.params.id as string)

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
const loadingTeacher = ref(false)
const error = ref('')
const success = ref(false)

const fetchTeacher = async () => {
  try {
    loadingTeacher.value = true
    const response = await api.getTeacher(teacherId)
    
    if (response.success && response.data) {
      const teacher = response.data
      
      // Helper function to format date from ISO to YYYY-MM-DD
      const formatDate = (dateStr: string | null) => {
        if (!dateStr) return ''
        try {
          const date = new Date(dateStr)
          return date.toISOString().split('T')[0]
        } catch {
          return ''
        }
      }
      
      form.value = {
        nip: teacher.nip || '',
        nuptk: teacher.nuptk || '',
        nik: teacher.nik || '',
        full_name: teacher.full_name || '',
        gender: teacher.gender || '',
        birth_place: teacher.birth_place || '',
        birth_date: formatDate(teacher.birth_date),
        religion: teacher.religion || '',
        address: teacher.address || '',
        phone: teacher.phone || '',
        email: teacher.email || '',
        education_level: teacher.education_level || '',
        major: teacher.major || '',
        certification: teacher.certification || '',
        employment_status: teacher.employment_status || '',
        join_date: formatDate(teacher.join_date),
        is_active: teacher.is_active !== false
      }
    } else {
      error.value = 'Gagal memuat data guru'
    }
  } catch (err: any) {
    error.value = err.message || 'Terjadi kesalahan saat memuat data'
  } finally {
    loadingTeacher.value = false
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

    const response = await api.updateTeacher(teacherId, data)

    if (response.success) {
      success.value = true
      setTimeout(() => {
        router.push('/teachers')
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
  fetchTeacher()
})
</script>
