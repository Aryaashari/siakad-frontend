// composables/useSubject.ts
export const useSubject = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all subjects
  const getSubjects = async () => {
    const token = getToken()
    return await $fetch(`${API_URL}/subjects`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get subject by ID
  const getSubjectById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/subjects/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Create subject
  const createSubject = async (data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/subjects`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Update subject
  const updateSubject = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/subjects/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Delete subject
  const deleteSubject = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/subjects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    deleteSubject
  }
}
