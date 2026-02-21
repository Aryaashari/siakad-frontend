<template>
  <div class="min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink
          to="/dashboard/grades/attitude"
          class="inline-flex items-center text-fuchsia-600 hover:text-fuchsia-700 mb-4"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Kembali
        </NuxtLink>
        <h1 class="text-3xl font-bold text-gray-900">Input Nilai Sikap</h1>
        <p class="text-gray-600 mt-2">Input penilaian sikap spiritual dan sosial siswa</p>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-xl shadow-sm p-8">
        <form @submit.prevent="handleSubmit">
          <div class="space-y-6">
            <!-- Student Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Siswa *</label>
              <select
                v-model="form.student_id"
                required
                @change="onStudentChange"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              >
                <option value="">Pilih Siswa</option>
                <option v-for="student in students" :key="student.id" :value="student.id">
                  {{ student.full_name }} - {{ student.nis }}
                </option>
              </select>
            </div>

            <!-- Class (auto-filled) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
              <input
                :value="selectedClass"
                type="text"
                disabled
                class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>

            <!-- Academic Year & Semester -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tahun Ajaran *</label>
                <input
                  v-model="form.academic_year"
                  type="text"
                  required
                  placeholder="2024/2025"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Semester *</label>
                <select
                  v-model="form.semester"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                >
                  <option value="">Pilih Semester</option>
                  <option value="ganjil">Ganjil</option>
                  <option value="genap">Genap</option>
                </select>
              </div>
            </div>

            <!-- Spiritual Grade -->
            <div class="border-t pt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Nilai Spiritual</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Predikat *</label>
                  <select
                    v-model="form.spiritual_grade"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                  >
                    <option value="">Pilih Predikat</option>
                    <option value="sangat_baik">Sangat Baik</option>
                    <option value="baik">Baik</option>
                    <option value="cukup">Cukup</option>
                    <option value="kurang">Kurang</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi *</label>
                  <textarea
                    v-model="form.spiritual_description"
                    rows="3"
                    required
                    placeholder="Deskripsi penilaian spiritual (min. 20 karakter)"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                  ></textarea>
                  <p class="text-sm text-gray-500 mt-1">
                    Contoh: Siswa rajin melaksanakan ibadah, berdoa sebelum dan sesudah belajar
                  </p>
                </div>
              </div>
            </div>

            <!-- Social Grade -->
            <div class="border-t pt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Nilai Sosial</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Predikat *</label>
                  <select
                    v-model="form.social_grade"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                  >
                    <option value="">Pilih Predikat</option>
                    <option value="sangat_baik">Sangat Baik</option>
                    <option value="baik">Baik</option>
                    <option value="cukup">Cukup</option>
                    <option value="kurang">Kurang</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi *</label>
                  <textarea
                    v-model="form.social_description"
                    rows="3"
                    required
                    placeholder="Deskripsi penilaian sosial (min. 20 karakter)"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                  ></textarea>
                  <p class="text-sm text-gray-500 mt-1">
                    Contoh: Siswa sopan, suka menolong teman, dan menghormati guru
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-4 mt-8 pt-6 border-t">
            <NuxtLink
              to="/dashboard/grades/attitude"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </NuxtLink>
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-3 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
const { createAttitudeGrade } = useAttitudeGrade()
const { getStudents } = useStudent()

const loading = ref(false)
const students = ref<any[]>([])
const selectedClass = ref('')

const form = ref({
  student_id: '',
  class_id: '',
  academic_year: '',
  semester: '',
  spiritual_grade: '',
  spiritual_description: '',
  social_grade: '',
  social_description: ''
})

const loadStudents = async () => {
  try {
    const response = await getStudents()
    students.value = response.data || []
  } catch (err) {
    console.error('Error loading students:', err)
  }
}

const onStudentChange = () => {
  const student = students.value.find((s: any) => s.id === Number(form.value.student_id))
  if (student) {
    form.value.class_id = student.class_id
    selectedClass.value = student.class?.name || 'N/A'
  }
}

const handleSubmit = async () => {
  // Validate description length
  if (form.value.spiritual_description.length < 20) {
    alert('Deskripsi spiritual minimal 20 karakter')
    return
  }
  if (form.value.social_description.length < 20) {
    alert('Deskripsi sosial minimal 20 karakter')
    return
  }

  loading.value = true
  try {
    await createAttitudeGrade(form.value)
    router.push('/dashboard/grades/attitude')
  } catch (err: any) {
    alert(err.data?.message || 'Gagal menyimpan nilai sikap')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStudents()
})
</script>
