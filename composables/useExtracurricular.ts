// composables/useExtracurricular.ts
export const useExtracurricular = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all extracurriculars
  const getExtracurriculars = async (activeOnly?: boolean) => {
    const token = getToken()
    const query = activeOnly ? '?active_only=true' : ''
    return await $fetch(`${API_URL}/extracurriculars${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get extracurricular by ID
  const getExtracurricularById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/extracurriculars/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Create extracurricular
  const createExtracurricular = async (data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/extracurriculars`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Update extracurricular
  const updateExtracurricular = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/extracurriculars/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Delete extracurricular
  const deleteExtracurricular = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/extracurriculars/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getExtracurriculars,
    getExtracurricularById,
    createExtracurricular,
    updateExtracurricular,
    deleteExtracurricular
  }
}
