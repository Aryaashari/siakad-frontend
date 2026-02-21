<template>
  <div>
    <!-- Error Message -->
    <div v-if="error" class="card bg-red-50 border-2 border-red-200 animate-shake mb-6">
      <div class="flex items-start gap-3">
        <Icon name="mdi:alert-circle" class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 class="font-semibold text-red-900 mb-1">Terjadi Kesalahan</h4>
          <p class="text-red-600">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="success" class="card bg-green-50 border-2 border-green-200 animate-fadeIn mb-6">
      <div class="flex items-start gap-3">
        <Icon name="mdi:check-circle" class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 class="font-semibold text-green-900 mb-1">Berhasil!</h4>
          <p class="text-green-600">{{ successMessage }}</p>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="sticky bottom-0 bg-white border-t border-gray-200 -mx-4 px-4 py-4 mt-8 flex gap-4 justify-end shadow-lg">
      <NuxtLink 
        :to="cancelLink" 
        class="btn btn-secondary hover:scale-105 transition-transform"
      >
        <Icon name="mdi:close" class="w-5 h-5 mr-2" />
        Batal
      </NuxtLink>
      <button 
        type="submit" 
        :disabled="loading" 
        class="btn btn-primary hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon v-if="loading" name="mdi:loading" class="w-5 h-5 mr-2 animate-spin" />
        <Icon v-else name="mdi:content-save" class="w-5 h-5 mr-2" />
        <span>{{ loading ? 'Menyimpan...' : submitText }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean
  error: string
  success: boolean
  successMessage: string
  cancelLink: string
  submitText: string
}>()
</script>
