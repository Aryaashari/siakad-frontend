<template>
  <div class="max-w-5xl mx-auto">
    <FormHeader 
      back-link="/subjects"
      back-text="Kembali ke Daftar Mata Pelajaran"
      icon="mdi:book-edit"
      title="Edit Data Mata Pelajaran"
      subtitle="Perbarui informasi mata pelajaran di bawah ini"
    />

    <div v-if="loadingSubject" class="card text-center py-16 animate-pulse">
      <Icon name="mdi:loading" class="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
      <p class="text-gray-600 text-lg font-medium">Memuat data mata pelajaran...</p>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <FormSection icon="mdi:book" title="📖 Informasi Mata Pelajaran" gradient-class="from-blue-500 to-blue-600">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Kode Mapel <span class="text-red-500">*</span>
            </label>
            <input v-model="form.code" type="text" required class="input" placeholder="Contoh: MTK, IPA" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Mata Pelajaran <span class="text-red-500">*</span>
            </label>
            <input v-model="form.name" type="text" required class="input" placeholder="Contoh: Matematika" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select v-model="form.category" class="input">
              <option value="wajib">Wajib</option>
              <option value="muatan_lokal">Muatan Lokal</option>
              <option value="ekstrakurikuler">Ekstrakurikuler</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">KKM</label>
            <input v-model.number="form.kkm" type="number" step="0.01" min="0" max="100" class="input" placeholder="70.00" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Jam Per Minggu</label>
            <input v-model.number="form.hours_per_week" type="number" min="1" max="20" class="input" placeholder="2" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Kurikulum</label>
            <select v-model="form.curriculum" class="input">
              <option value="K13">Kurikulum 2013</option>
              <option value="Merdeka">Kurikulum Merdeka</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="form.is_active" class="input">
              <option :value="true">Aktif</option>
              <option :value="false">Tidak Aktif</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
            <textarea v-model="form.description" rows="3" class="input" placeholder="Deskripsi mata pelajaran"></textarea>
          </div>
        </div>
      </FormSection>

      <FormActions 
        :loading="loading"
        :error="error"
        :success="success"
        success-message="Perubahan data mata pelajaran berhasil disimpan"
        cancel-link="/subjects"
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

const subjectId = parseInt(route.params.id as string)

const form = ref({
  code: '',
  name: '',
  category: 'wajib',
  kkm: 70,
  hours_per_week: 2,
  curriculum: 'K13',
  description: '',
  is_active: true
})

const loading = ref(false)
const loadingSubject = ref(false)
const error = ref('')
const success = ref(false)

const fetchSubject = async () => {
  try {
    loadingSubject.value = true
    const response = await api.getSubject(subjectId)
    
    if (response.success && response.data) {
      const subject = response.data
      form.value = {
        code: subject.code || '',
        name: subject.name || '',
        category: subject.category || 'wajib',
        kkm: subject.kkm || 70,
        hours_per_week: subject.hours_per_week || 2,
        curriculum: subject.curriculum || 'K13',
        description: subject.description || '',
        is_active: subject.is_active !== false
      }
    } else {
      error.value = 'Gagal memuat data mata pelajaran'
    }
  } catch (err: any) {
    error.value = err.message || 'Terjadi kesalahan saat memuat data'
  } finally {
    loadingSubject.value = false
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

    const response = await api.updateSubject(subjectId, data)

    if (response.success) {
      success.value = true
      setTimeout(() => {
        router.push('/subjects')
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
  fetchSubject()
})
</script>
