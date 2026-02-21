// composables/useClass.ts
export const useClass = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all classes
  const getClasses = async () => {
    const token = getToken()
    return await $fetch(`${API_URL}/classes`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get class by ID
  const getClassById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/classes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Create class
  const createClass = async (data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/classes`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Update class
  const updateClass = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/classes/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Delete class
  const deleteClass = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/classes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass
  }
}
