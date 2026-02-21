<template>
  <div class="mb-8">
    <NuxtLink 
      :to="backLink" 
      class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 group transition-all"
    >
      <Icon name="mdi:arrow-left" class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span>{{ backText }}</span>
    </NuxtLink>
    
    <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white rounded-2xl shadow-xl p-8 animate-fade-in">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
          <Icon :name="icon" class="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 class="text-4xl font-bold text-white">{{ title }}</h1>
          <p class="text-blue-100 text-lg mt-1">{{ subtitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  backLink: string
  backText: string
  icon: string
  title: string
  subtitle: string
}>()
</script>
