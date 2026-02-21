<template>
  <div class="max-w-5xl mx-auto">
    <FormHeader 
      back-link="/subjects"
      back-text="Kembali ke Daftar Mata Pelajaran"
      icon="mdi:book-open-page-variant"
      title="Tambah Mata Pelajaran Baru"
      subtitle="Lengkapi formulir di bawah untuk menambahkan mata pelajaran"
    />

    <form @submit.prevent="handleSubmit" class="space-y-6">
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
        success-message="Data mata pelajaran berhasil disimpan"
        cancel-link="/subjects"
        submit-text="Simpan Data"
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

const form = ref({
  code: '',
  name: '',
  category: 'wajib',
  kkm: 70,
  hours_per_week: 2,
  curriculum: 'K13',
  description: ''
})

const loading = ref(false)
const error = ref('')
const success = ref(false)

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

    const response = await api.createSubject(data)

    if (response.success) {
      success.value = true
      setTimeout(() => {
        router.push('/subjects')
      }, 1500)
    } else {
      error.value = response.error || 'Gagal menyimpan data mata pelajaran'
    }
  } catch (err: any) {
    error.value = err.data?.error || err.message || 'Terjadi kesalahan saat menyimpan data'
  } finally {
    loading.value = false
  }
}
</script>
