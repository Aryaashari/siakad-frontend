// composables/useGradeComponent.ts
export const useGradeComponent = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all grade components
  const getGradeComponents = async (params?: { academic_year?: string; semester?: string }) => {
    const token = getToken()
    const query = params ? `?${new URLSearchParams(params)}` : ''
    return await $fetch(`${API_URL}/grade-components${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get grade component by ID
  const getGradeComponentById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/grade-components/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Create grade component
  const createGradeComponent = async (data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/grade-components`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Update grade component
  const updateGradeComponent = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/grade-components/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Delete grade component
  const deleteGradeComponent = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/grade-components/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getGradeComponents,
    getGradeComponentById,
    createGradeComponent,
    updateGradeComponent,
    deleteGradeComponent
  }
}
