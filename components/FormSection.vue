<template>
  <div class="card hover:shadow-xl transition-all duration-300 border border-gray-100">
    <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
      <div 
        class="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br"
        :class="gradientClass || 'from-blue-500 to-blue-600'"
      >
        <Icon :name="icon" class="w-7 h-7 text-white" />
      </div>
      <h2 class="text-xl font-bold text-gray-900">{{ title }}</h2>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  gradientClass?: string
}>()
</script>
