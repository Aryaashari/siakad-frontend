<template>
  <div class="p-6">
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-2">
        <NuxtLink
          to="/dashboard/leave-requests"
          class="text-gray-600 hover:text-gray-900"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Ajukan Izin/Cuti</h1>
          <p class="text-gray-600 mt-1">Buat pengajuan izin atau cuti baru</p>
        </div>
      </div>
    </div>

    <div class="max-w-2xl">
      <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <!-- Leave Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tipe Izin <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.leave_type"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Pilih Tipe</option>
            <option value="sakit">Sakit</option>
            <option value="izin">Izin</option>
            <option value="cuti">Cuti</option>
          </select>
        </div>

        <!-- Date Range -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Mulai <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.start_date"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Selesai <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.end_date"
              type="date"
              required
              :min="form.start_date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Reason -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Alasan <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="form.reason"
            required
            rows="4"
            placeholder="Jelaskan alasan pengajuan izin/cuti"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Catatan Tambahan
          </label>
          <textarea
            v-model="form.notes"
            rows="3"
            placeholder="Catatan tambahan (opsional)"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>

        <!-- Duration Info -->
        <div v-if="duration > 0" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <div>
              <h4 class="text-sm font-medium text-blue-800">Durasi Izin/Cuti</h4>
              <p class="text-sm text-blue-700 mt-1">{{ duration }} hari ({{ form.start_date }} s/d {{ form.end_date }})</p>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end gap-3 pt-4 border-t">
          <NuxtLink
            to="/dashboard/leave-requests"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Batal
          </NuxtLink>
          <button
            type="submit"
            :disabled="submitting"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ submitting ? 'Menyimpan...' : 'Ajukan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const { createLeaveRequest } = useLeaveRequest()
const toast = useToast()
const router = useRouter()

const submitting = ref(false)

const form = ref({
  leave_type: '',
  start_date: '',
  end_date: '',
  reason: '',
  notes: ''
})

const duration = computed(() => {
  if (!form.value.start_date || !form.value.end_date) return 0
  
  const start = new Date(form.value.start_date)
  const end = new Date(form.value.end_date)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays + 1
})

const handleSubmit = async () => {
  try {
    submitting.value = true

    // Validate dates
    if (form.value.start_date > form.value.end_date) {
      toast.error('Tanggal selesai harus lebih dari atau sama dengan tanggal mulai')
      return
    }

    await createLeaveRequest({
      leave_type: form.value.leave_type,
      start_date: form.value.start_date,
      end_date: form.value.end_date,
      reason: form.value.reason,
      notes: form.value.notes || null
    })

    toast.success('Pengajuan berhasil dibuat')
    router.push('/dashboard/leave-requests')
  } catch (error: any) {
    console.error('Failed to create leave request:', error)
    toast.error(error.data?.message || 'Gagal membuat pengajuan')
  } finally {
    submitting.value = false
  }
}

// Set minimum date to today
onMounted(() => {
  const today = new Date().toISOString().split('T')[0]
  form.value.start_date = today
  form.value.end_date = today
})
</script>
