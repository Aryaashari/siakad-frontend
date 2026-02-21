<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Data Siswa</h1>
          <p class="text-gray-600 mt-1">Kelola data siswa sekolah</p>
        </div>
        <NuxtLink to="/students/create" class="btn btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Tambah Siswa
        </NuxtLink>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="card mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="md:col-span-2">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              v-model="filters.search"
              type="text"
              class="input pl-10"
              placeholder="Cari nama atau NISN..."
              @input="handleSearch"
            />
          </div>
        </div>
        <select v-model="filters.class_id" @change="fetchStudents" class="input">
          <option value="">Semua Kelas</option>
          <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
        </select>
        <select v-model="filters.status" @change="fetchStudents" class="input">
          <option value="">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="tidak_aktif">Tidak Aktif</option>
          <option value="lulus">Lulus</option>
        </select>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="stat-card from-blue-500 to-blue-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm">Total Siswa</p>
            <p class="text-2xl font-bold mt-1">{{ meta.total || 0 }}</p>
          </div>
          <svg class="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
      </div>
      <div class="stat-card from-green-500 to-green-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm">Siswa Aktif</p>
            <p class="text-2xl font-bold mt-1">{{ stats.aktif || 0 }}</p>
          </div>
          <svg class="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
      </div>
      <div class="stat-card from-purple-500 to-purple-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm">Lulus</p>
            <p class="text-2xl font-bold mt-1">{{ stats.lulus || 0 }}</p>
          </div>
          <svg class="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          </svg>
        </div>
      </div>
      <div class="stat-card from-orange-500 to-orange-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-orange-100 text-sm">Tidak Aktif</p>
            <p class="text-2xl font-bold mt-1">{{ stats.tidak_aktif || 0 }}</p>
          </div>
          <svg class="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Table Card -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-gray-900">Daftar Siswa</h2>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Export Excel
          </button>
          <button class="btn btn-secondary btn-sm">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
            </svg>
            Print
          </button>
        </div>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="loading" class="space-y-3">
        <div v-for="i in 5" :key="i" class="skeleton h-16"></div>
      </div>

      <!-- Table -->
      <div v-else-if="students.length > 0" class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>NISN</th>
              <th>Nama Lengkap</th>
              <th>Kelas</th>
              <th>JK</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.id">
              <td class="font-mono text-sm">{{ student.nisn }}</td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {{ student.full_name?.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">{{ student.full_name }}</p>
                    <p class="text-sm text-gray-500">{{ student.email || '-' }}</p>
                  </div>
                </div>
              </td>
              <td>
                <span v-if="student.class" class="badge badge-info">
                  {{ student.class.name }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td>
                <span :class="student.gender === 'L' ? 'badge badge-info' : 'badge badge-pink'">
                  {{ student.gender === 'L' ? 'Laki-laki' : 'Perempuan' }}
                </span>
              </td>
              <td>
                <span :class="{
                  'badge badge-success': student.status === 'aktif',
                  'badge badge-warning': student.status === 'tidak_aktif',
                  'badge badge-purple': student.status === 'lulus'
                }">
                  {{ student.status }}
                </span>
              </td>
              <td>
                <div class="flex gap-2">
                  <NuxtLink :to="`/students/${student.id}`" class="btn btn-sm btn-secondary">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </NuxtLink>
                  <button @click="confirmDelete(student)" class="btn btn-sm btn-danger">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Tidak ada data siswa</h3>
        <p class="text-gray-500 mb-4">Mulai tambahkan siswa baru ke sistem</p>
        <NuxtLink to="/students/create" class="btn btn-primary">
          Tambah Siswa Pertama
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <div v-if="students.length > 0" class="pagination">
        <button
          @click="changePage(meta.current_page - 1)"
          :disabled="meta.current_page === 1"
          class="pagination-btn"
        >
          ← Previous
        </button>
        <div class="pagination-info">
          Halaman {{ meta.current_page }} dari {{ meta.last_page }}
        </div>
        <button
          @click="changePage(meta.current_page + 1)"
          :disabled="meta.current_page === meta.last_page"
          class="pagination-btn"
        >
          Next →
        </button>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
      <div class="modal-content animate-scale-in">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Hapus Siswa?</h3>
          <p class="text-gray-600">
            Apakah Anda yakin ingin menghapus <strong>{{ selectedStudent?.full_name }}</strong>?
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>
        <div class="flex gap-3 justify-center">
          <button @click="showDeleteModal = false" class="btn btn-secondary">
            Batal
          </button>
          <button @click="deleteStudent" :disabled="deleting" class="btn btn-danger">
            <span v-if="!deleting">Ya, Hapus</span>
            <span v-else>Menghapus...</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Component -->
    <Toast ref="toast" />
  </div>
</template>

<script setup lang="ts">
import type { Student, Class } from '~/types'

definePageMeta({
  middleware: 'auth'
})

const api = useApi()
const toast = ref<any>(null)

const students = ref<Student[]>([])
const classes = ref<Class[]>([])
const loading = ref(true)
const deleting = ref(false)
const showDeleteModal = ref(false)
const selectedStudent = ref<Student | null>(null)

const filters = ref({
  search: '',
  class_id: '',
  status: '',
  page: 1,
  per_page: 10
})

const meta = ref({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0
})

const stats = ref({
  aktif: 0,
  lulus: 0,
  tidak_aktif: 0
})

const fetchStudents = async () => {
  try {
    loading.value = true
    const response = await api.getStudents(filters.value)
    students.value = response.data
    meta.value = response.meta

    // Calculate stats
    stats.value = students.value.reduce((acc, s) => {
      acc[s.status] = (acc[s.status] || 0) + 1
      return acc
    }, {} as any)
  } catch (error) {
    console.error('Error fetching students:', error)
    toast.value?.error('Gagal memuat data siswa')
  } finally {
    loading.value = false
  }
}

const fetchClasses = async () => {
  try {
    const response = await api.getClasses({ page: 1, per_page: 100 })
    classes.value = response.data
  } catch (error) {
    console.error('Error fetching classes:', error)
  }
}

let searchTimeout: any
const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    filters.value.page = 1
    fetchStudents()
  }, 500)
}

const changePage = (page: number) => {
  filters.value.page = page
  fetchStudents()
}

const confirmDelete = (student: Student) => {
  selectedStudent.value = student
  showDeleteModal.value = true
}

const deleteStudent = async () => {
  if (!selectedStudent.value) return

  try {
    deleting.value = true
    await api.deleteStudent(selectedStudent.value.id)
    toast.value?.success('Siswa berhasil dihapus')
    showDeleteModal.value = false
    fetchStudents()
  } catch (error) {
    console.error('Error deleting student:', error)
    toast.value?.error('Gagal menghapus siswa')
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  fetchStudents()
  fetchClasses()
})
</script>
