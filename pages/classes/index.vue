<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Data Kelas</h1>
        <p class="text-gray-600 mt-1">Kelola kelas dan wali kelas</p>
      </div>
      <NuxtLink to="/classes/create" class="btn btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Tambah Kelas
      </NuxtLink>
    </div>

    <div class="card mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input v-model="filters.search" type="text" class="input" placeholder="Cari nama kelas..." @input="handleSearch" />
        <input v-model="filters.academic_year" type="text" class="input" placeholder="Tahun Ajaran" @change="fetchClasses" />
        <select v-model="filters.semester" @change="fetchClasses" class="input">
          <option value="">Semua Semester</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="stat-card from-green-500 to-green-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm">Total Kelas</p>
            <p class="text-2xl font-bold mt-1">{{ meta.total || 0 }}</p>
          </div>
          <svg class="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
        </div>
      </div>
      <div class="stat-card from-blue-500 to-blue-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm">Tahun Ajaran Aktif</p>
            <p class="text-xl font-bold mt-1">2024/2025</p>
          </div>
          <svg class="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
      </div>
      <div class="stat-card from-purple-500 to-purple-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm">Semester</p>
            <p class="text-xl font-bold mt-1">1 (Ganjil)</p>
          </div>
          <svg class="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="card">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Daftar Kelas</h2>

      <div v-if="loading" class="space-y-3">
        <div v-for="i in 5" :key="i" class="skeleton h-16"></div>
      </div>

      <div v-else-if="classes.length > 0" class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Nama Kelas</th>
              <th>Wali Kelas</th>
              <th>Kapasitas</th>
              <th>Tahun Ajaran</th>
              <th>Semester</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cls in classes" :key="cls.id">
              <td>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold">
                    {{ cls.name?.split(' ')[0] }}
                  </div>
                  <span class="font-semibold text-gray-900">{{ cls.name }}</span>
                </div>
              </td>
              <td>
                <span v-if="cls.homeroom_teacher" class="text-gray-900">{{ cls.homeroom_teacher.full_name }}</span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td>
                <span class="badge badge-info">{{ cls.capacity }} siswa</span>
              </td>
              <td class="font-semibold">{{ cls.academic_year }}</td>
              <td>
                <span class="badge badge-purple">Semester {{ cls.semester }}</span>
              </td>
              <td>
                <div class="flex gap-2">
                  <NuxtLink :to="`/classes/${cls.id}`" class="btn btn-sm btn-secondary">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </NuxtLink>
                  <button @click="confirmDelete(cls)" class="btn btn-sm btn-danger">
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
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Tidak ada data kelas</h3>
        <NuxtLink to="/classes/create" class="btn btn-primary">Tambah Kelas Pertama</NuxtLink>
      </div>

      <div v-if="classes.length > 0" class="pagination">
        <button @click="changePage(meta.current_page - 1)" :disabled="meta.current_page === 1" class="pagination-btn">← Previous</button>
        <div class="pagination-info">Halaman {{ meta.current_page }} dari {{ meta.last_page }}</div>
        <button @click="changePage(meta.current_page + 1)" :disabled="meta.current_page === meta.last_page" class="pagination-btn">Next →</button>
      </div>
    </div>

    <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
      <div class="modal-content animate-scale-in">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Hapus Kelas?</h3>
          <p class="text-gray-600">Apakah Anda yakin ingin menghapus kelas <strong>{{ selectedClass?.name }}</strong>?</p>
        </div>
        <div class="flex gap-3 justify-center">
          <button @click="showDeleteModal = false" class="btn btn-secondary">Batal</button>
          <button @click="deleteClass" :disabled="deleting" class="btn btn-danger">Ya, Hapus</button>
        </div>
      </div>
    </div>

    <Toast ref="toast" />
  </div>
</template>

<script setup lang="ts">
import type { Class } from '~/types'

definePageMeta({ middleware: 'auth' })

const api = useApi()
const toast = ref<any>(null)

const classes = ref<Class[]>([])
const loading = ref(true)
const deleting = ref(false)
const showDeleteModal = ref(false)
const selectedClass = ref<Class | null>(null)

const filters = ref({ search: '', academic_year: '', semester: '', page: 1, per_page: 10 })
const meta = ref({ current_page: 1, last_page: 1, per_page: 10, total: 0 })

const fetchClasses = async () => {
  try {
    loading.value = true
    const response = await api.getClasses(filters.value)
    classes.value = response.data
    meta.value = response.meta
  } catch (error) {
    toast.value?.error('Gagal memuat data kelas')
  } finally {
    loading.value = false
  }
}

let searchTimeout: any
const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => { filters.value.page = 1; fetchClasses() }, 500)
}

const changePage = (page: number) => { filters.value.page = page; fetchClasses() }

const confirmDelete = (cls: Class) => {
  selectedClass.value = cls
  showDeleteModal.value = true
}

const deleteClass = async () => {
  if (!selectedClass.value) return
  try {
    deleting.value = true
    await api.deleteClass(selectedClass.value.id)
    toast.value?.success('Kelas berhasil dihapus')
    showDeleteModal.value = false
    fetchClasses()
  } catch (error) {
    toast.value?.error('Gagal menghapus kelas')
  } finally {
    deleting.value = false
  }
}

onMounted(fetchClasses)
</script>
