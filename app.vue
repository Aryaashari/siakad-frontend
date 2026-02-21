<template>
  <div>
    <NuxtLayout>
      <ClientOnly>
        <NuxtPage :page-key="route => route.fullPath" />
      </ClientOnly>
    </NuxtLayout>
  </div>
</template>

<script setup>
// Force client-side navigation
if (process.client) {
  const router = useRouter()
  
  // Prevent multiple rapid navigations
  let navigating = false
  router.beforeEach((to, from, next) => {
    if (navigating) {
      next(false)
      return
    }
    navigating = true
    setTimeout(() => { navigating = false }, 100)
    next()
  })
}
</script>
