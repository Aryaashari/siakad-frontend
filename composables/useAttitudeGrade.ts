// composables/useAttitudeGrade.ts
export const useAttitudeGrade = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all attitude grades
  const getAttitudeGrades = async (params?: { 
    class_id?: number
    academic_year?: string
    semester?: string 
  }) => {
    const token = getToken()
    const query = params ? `?${new URLSearchParams(params as any)}` : ''
    return await $fetch(`${API_URL}/attitude-grades${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get attitude grades by student ID
  const getAttitudeGradesByStudent = async (studentId: number, params?: {
    academic_year?: string
    semester?: string
  }) => {
    const token = getToken()
    const query = params ? `?${new URLSearchParams(params)}` : ''
    return await $fetch(`${API_URL}/attitude-grades/student/${studentId}${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get attitude grade by ID
  const getAttitudeGradeById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/attitude-grades/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Create attitude grade
  const createAttitudeGrade = async (data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/attitude-grades`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Update attitude grade
  const updateAttitudeGrade = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/attitude-grades/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Delete attitude grade
  const deleteAttitudeGrade = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/attitude-grades/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getAttitudeGrades,
    getAttitudeGradesByStudent,
    getAttitudeGradeById,
    createAttitudeGrade,
    updateAttitudeGrade,
    deleteAttitudeGrade
  }
}
