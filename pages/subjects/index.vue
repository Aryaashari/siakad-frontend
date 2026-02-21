<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Mata Pelajaran</h1>
        <p class="text-gray-600 mt-1">Kelola mata pelajaran sekolah</p>
      </div>
      <NuxtLink to="/subjects/create" class="btn btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Tambah Mata Pelajaran
      </NuxtLink>
    </div>

    <div class="card mb-6">
      <input v-model="filters.search" type="text" class="input" placeholder="Cari nama mata pelajaran..." @input="handleSearch" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="stat-card from-orange-500 to-orange-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-orange-100 text-sm">Total Mata Pelajaran</p>
            <p class="text-2xl font-bold mt-1">{{ meta.total || 0 }}</p>
          </div>
          <svg class="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
        </div>
      </div>
      <div class="stat-card from-blue-500 to-blue-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm">Mapel Aktif</p>
            <p class="text-2xl font-bold mt-1">{{ activeSubjectsCount }}</p>
          </div>
          <svg class="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="card">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Daftar Mata Pelajaran</h2>

      <div v-if="loading" class="space-y-3">
        <div v-for="i in 5" :key="i" class="skeleton h-16"></div>
      </div>

      <div v-else-if="subjects.length > 0" class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Kode</th>
              <th>Nama Mata Pelajaran</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subject in subjects" :key="subject.id">
              <td>
                <span class="badge badge-info font-mono">{{ subject.code }}</span>
              </td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                    {{ subject.name?.charAt(0) }}
                  </div>
                  <span class="font-semibold text-gray-900">{{ subject.name }}</span>
                </div>
              </td>
              <td class="text-gray-600">{{ subject.description || '-' }}</td>
              <td>
                <div class="flex gap-2">
                  <NuxtLink :to="`/subjects/${subject.id}`" class="btn btn-sm btn-secondary">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </NuxtLink>
                  <button @click="confirmDelete(subject)" class="btn btn-sm btn-danger">
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
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Tidak ada mata pelajaran</h3>
        <NuxtLink to="/subjects/create" class="btn btn-primary">Tambah Mapel Pertama</NuxtLink>
      </div>

      <div v-if="subjects.length > 0" class="pagination">
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
          <h3 class="text-xl font-bold text-gray-900 mb-2">Hapus Mata Pelajaran?</h3>
          <p class="text-gray-600">Apakah Anda yakin ingin menghapus <strong>{{ selectedSubject?.name }}</strong>?</p>
        </div>
        <div class="flex gap-3 justify-center">
          <button @click="showDeleteModal = false" class="btn btn-secondary">Batal</button>
          <button @click="deleteSubject" :disabled="deleting" class="btn btn-danger">Ya, Hapus</button>
        </div>
      </div>
    </div>

    <Toast ref="toast" />
  </div>
</template>

<script setup lang="ts">
import type { Subject } from '~/types'

definePageMeta({ middleware: 'auth' })

const api = useApi()
const toast = ref<any>(null)

const subjects = ref<Subject[]>([])
const loading = ref(true)
const deleting = ref(false)
const showDeleteModal = ref(false)
const selectedSubject = ref<Subject | null>(null)

const filters = ref({ search: '', page: 1, per_page: 10 })
const meta = ref({ current_page: 1, last_page: 1, per_page: 10, total: 0 })

// Computed property untuk menghitung mapel aktif
const activeSubjectsCount = computed(() => {
  return subjects.value.filter(s => s.is_active !== false).length
})

const fetchSubjects = async () => {
  try {
    loading.value = true
    const response = await api.getSubjects(filters.value)
    subjects.value = response.data
    meta.value = response.meta
  } catch (error) {
    toast.value?.error('Gagal memuat data mata pelajaran')
  } finally {
    loading.value = false
  }
}

let searchTimeout: any
const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => { filters.value.page = 1; fetchSubjects() }, 500)
}

const changePage = (page: number) => { filters.value.page = page; fetchSubjects() }

const confirmDelete = (subject: Subject) => {
  selectedSubject.value = subject
  showDeleteModal.value = true
}

const deleteSubject = async () => {
  if (!selectedSubject.value) return
  try {
    deleting.value = true
    await api.deleteSubject(selectedSubject.value.id)
    toast.value?.success('Mata pelajaran berhasil dihapus')
    showDeleteModal.value = false
    fetchSubjects()
  } catch (error) {
    toast.value?.error('Gagal menghapus mata pelajaran')
  } finally {
    deleting.value = false
  }
}

onMounted(fetchSubjects)
</script>
