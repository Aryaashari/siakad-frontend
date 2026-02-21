<template>
  <div class="min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink
          to="/dashboard/grades/components"
          class="inline-flex items-center text-violet-600 hover:text-violet-700 mb-4"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Kembali
        </NuxtLink>
        <h1 class="text-3xl font-bold text-gray-900">Tambah Komponen Nilai</h1>
        <p class="text-gray-600 mt-2">Buat komponen penilaian baru</p>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-xl shadow-sm p-8">
        <form @submit.prevent="handleSubmit">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nama Komponen *</label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="Contoh: Ulangan Harian"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Kode *</label>
              <input
                v-model="form.code"
                type="text"
                required
                placeholder="Contoh: UH"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <p class="text-sm text-gray-500 mt-1">Kode singkat untuk komponen (UH, UTS, UAS, dll)</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bobot (%) *</label>
              <input
                v-model.number="form.weight"
                type="number"
                step="0.01"
                min="0"
                max="100"
                required
                placeholder="Contoh: 40"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <p class="text-sm text-gray-500 mt-1">Bobot dalam persen untuk kalkulasi nilai akhir</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tahun Ajaran *</label>
              <input
                v-model="form.academic_year"
                type="text"
                required
                placeholder="2024/2025"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Semester *</label>
              <select
                v-model="form.semester"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              >
                <option value="">Pilih Semester</option>
                <option value="ganjil">Ganjil</option>
                <option value="genap">Genap</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
              <textarea
                v-model="form.description"
                rows="3"
                placeholder="Deskripsi komponen nilai (opsional)"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              ></textarea>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-4 mt-8 pt-6 border-t">
            <NuxtLink
              to="/dashboard/grades/components"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </NuxtLink>
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
const { createGradeComponent } = useGradeComponent()

const loading = ref(false)
const form = ref({
  name: '',
  code: '',
  weight: 0,
  academic_year: '',
  semester: '',
  description: ''
})

const handleSubmit = async () => {
  loading.value = true
  try {
    await createGradeComponent(form.value)
    router.push('/dashboard/grades/components')
  } catch (err: any) {
    alert(err.data?.message || 'Gagal menyimpan komponen nilai')
  } finally {
    loading.value = false
  }
}
</script>
