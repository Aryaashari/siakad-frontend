<template>
  <div class="min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink
          to="/dashboard/extracurriculars"
          class="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Kembali
        </NuxtLink>
        <h1 class="text-3xl font-bold text-gray-900">Tambah Ekstrakurikuler</h1>
        <p class="text-gray-600 mt-2">Buat kegiatan ekstrakurikuler baru</p>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-xl shadow-sm p-8">
        <form @submit.prevent="handleSubmit">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nama Ekstrakurikuler *</label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="Contoh: Pramuka, Basket, Tari"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
              <textarea
                v-model="form.description"
                rows="4"
                placeholder="Deskripsi kegiatan ekstrakurikuler"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nama Pembina</label>
              <input
                v-model="form.instructor_name"
                type="text"
                placeholder="Nama guru/pembina"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Jadwal</label>
              <input
                v-model="form.schedule"
                type="text"
                placeholder="Contoh: Setiap Jumat, 14:00 - 16:00"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="flex items-center gap-3">
                <input
                  v-model="form.is_active"
                  type="checkbox"
                  class="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span class="text-sm font-medium text-gray-700">Aktif</span>
              </label>
              <p class="text-sm text-gray-500 mt-1 ml-8">Centang jika ekstrakurikuler sedang berjalan</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-4 mt-8 pt-6 border-t">
            <NuxtLink
              to="/dashboard/extracurriculars"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </NuxtLink>
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Menyimpan...</span>
              <span v-else>Simpan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const router = useRouter()
const { createExtracurricular } = useExtracurricular()

const loading = ref(false)
const form = ref({
  name: '',
  description: '',
  instructor_name: '',
  schedule: '',
  is_active: true
})

const handleSubmit = async () => {
  loading.value = true
  try {
    await createExtracurricular(form.value)
    router.push('/dashboard/extracurriculars')
  } catch (err: any) {
    alert(err.data?.message || 'Gagal menyimpan ekstrakurikuler')
  } finally {
    loading.value = false
  }
}
</script>
