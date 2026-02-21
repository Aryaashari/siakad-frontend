// composables/useTeacher.ts
export const useTeacher = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all teachers
  const getTeachers = async () => {
    const token = getToken()
    return await $fetch(`${API_URL}/teachers`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get teacher by ID
  const getTeacherById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/teachers/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Create teacher
  const createTeacher = async (data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/teachers`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Update teacher
  const updateTeacher = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/teachers/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Delete teacher
  const deleteTeacher = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/teachers/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher
  }
}
