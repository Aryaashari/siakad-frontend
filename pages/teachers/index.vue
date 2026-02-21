<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Data Guru</h1>
        <p class="text-gray-600 mt-1">Kelola data guru dan tenaga pengajar</p>
      </div>
      <NuxtLink to="/teachers/create" class="btn btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Tambah Guru
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="card mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              placeholder="Cari nama atau NIP..."
              @input="handleSearch"
            />
          </div>
        </div>
        <select v-model="filters.status" @change="fetchTeachers" class="input">
          <option value="">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="tidak_aktif">Tidak Aktif</option>
          <option value="pensiun">Pensiun</option>
        </select>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="stat-card from-purple-500 to-purple-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm">Total Guru</p>
            <p class="text-2xl font-bold mt-1">{{ meta.total || 0 }}</p>
          </div>
          <svg class="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </div>
      </div>
      <div class="stat-card from-green-500 to-green-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm">Guru Aktif</p>
            <p class="text-2xl font-bold mt-1">{{ stats.aktif || 0 }}</p>
          </div>
          <svg class="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
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

    <!-- Table -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-gray-900">Daftar Guru</h2>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Export
          </button>
        </div>
      </div>

      <div v-if="loading" class="space-y-3">
        <div v-for="i in 5" :key="i" class="skeleton h-16"></div>
      </div>

      <div v-else-if="teachers.length > 0" class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>NIP</th>
              <th>Nama Lengkap</th>
              <th>JK</th>
              <th>Status Kepegawaian</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="teacher in teachers" :key="teacher.id">
              <td class="font-mono text-sm">{{ teacher.nip }}</td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {{ teacher.full_name?.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">{{ teacher.full_name }}</p>
                    <p class="text-sm text-gray-500">{{ teacher.email || '-' }}</p>
                  </div>
                </div>
              </td>
              <td>
                <span :class="teacher.gender === 'L' ? 'badge badge-info' : 'badge badge-pink'">
                  {{ teacher.gender === 'L' ? 'Laki-laki' : 'Perempuan' }}
                </span>
              </td>
              <td>
                <span class="badge badge-info capitalize">{{ teacher.employment_status?.replace('_', ' ') }}</span>
              </td>
              <td>
                <span :class="{
                  'badge badge-success': teacher.status === 'aktif',
                  'badge badge-warning': teacher.status === 'tidak_aktif',
                  'badge badge-gray': teacher.status === 'pensiun'
                }">
                  {{ teacher.status }}
                </span>
              </td>
              <td>
                <div class="flex gap-2">
                  <NuxtLink :to="`/teachers/${teacher.id}`" class="btn btn-sm btn-secondary">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </NuxtLink>
                  <button @click="confirmDelete(teacher)" class="btn btn-sm btn-danger">
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

      <div v-else class="empty-state">
        <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Tidak ada data guru</h3>
        <p class="text-gray-500 mb-4">Mulai tambahkan guru baru ke sistem</p>
        <NuxtLink to="/teachers/create" class="btn btn-primary">Tambah Guru Pertama</NuxtLink>
      </div>

      <div v-if="teachers.length > 0" class="pagination">
        <button @click="changePage(meta.current_page - 1)" :disabled="meta.current_page === 1" class="pagination-btn">← Previous</button>
        <div class="pagination-info">Halaman {{ meta.current_page }} dari {{ meta.last_page }}</div>
        <button @click="changePage(meta.current_page + 1)" :disabled="meta.current_page === meta.last_page" class="pagination-btn">Next →</button>
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
          <h3 class="text-xl font-bold text-gray-900 mb-2">Hapus Guru?</h3>
          <p class="text-gray-600">Apakah Anda yakin ingin menghapus <strong>{{ selectedTeacher?.full_name }}</strong>?</p>
        </div>
        <div class="flex gap-3 justify-center">
          <button @click="showDeleteModal = false" class="btn btn-secondary">Batal</button>
          <button @click="deleteTeacher" :disabled="deleting" class="btn btn-danger">
            <span v-if="!deleting">Ya, Hapus</span>
            <span v-else>Menghapus...</span>
          </button>
        </div>
      </div>
    </div>

    <Toast ref="toast" />
  </div>
</template>

<script setup lang="ts">
import type { Teacher } from '~/types'

definePageMeta({ middleware: 'auth' })

const api = useApi()
const toast = ref<any>(null)

const teachers = ref<Teacher[]>([])
const loading = ref(true)
const deleting = ref(false)
const showDeleteModal = ref(false)
const selectedTeacher = ref<Teacher | null>(null)

const filters = ref({ search: '', status: '', page: 1, per_page: 10 })
const meta = ref({ current_page: 1, last_page: 1, per_page: 10, total: 0 })
const stats = ref({ aktif: 0, tidak_aktif: 0, pensiun: 0 })

const fetchTeachers = async () => {
  try {
    loading.value = true
    const response = await api.getTeachers(filters.value)
    teachers.value = response.data
    meta.value = response.meta
    stats.value = teachers.value.reduce((acc, t) => { acc[t.status] = (acc[t.status] || 0) + 1; return acc }, {} as any)
  } catch (error) {
    toast.value?.error('Gagal memuat data guru')
  } finally {
    loading.value = false
  }
}

let searchTimeout: any
const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => { filters.value.page = 1; fetchTeachers() }, 500)
}

const changePage = (page: number) => { filters.value.page = page; fetchTeachers() }

const confirmDelete = (teacher: Teacher) => {
  selectedTeacher.value = teacher
  showDeleteModal.value = true
}

const deleteTeacher = async () => {
  if (!selectedTeacher.value) return
  try {
    deleting.value = true
    await api.deleteTeacher(selectedTeacher.value.id)
    toast.value?.success('Guru berhasil dihapus')
    showDeleteModal.value = false
    fetchTeachers()
  } catch (error) {
    toast.value?.error('Gagal menghapus guru')
  } finally {
    deleting.value = false
  }
}

onMounted(fetchTeachers)
</script>
