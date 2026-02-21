// composables/useFinalGrade.ts
export const useFinalGrade = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all final grades
  const getFinalGrades = async (params?: { 
    class_id?: number
    academic_year?: string
    semester?: string 
  }) => {
    const token = getToken()
    const query = params ? `?${new URLSearchParams(params as any)}` : ''
    return await $fetch(`${API_URL}/final-grades${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get final grades by student ID
  const getFinalGradesByStudent = async (studentId: number, params?: {
    academic_year?: string
    semester?: string
  }) => {
    const token = getToken()
    const query = params ? `?${new URLSearchParams(params)}` : ''
    return await $fetch(`${API_URL}/final-grades/student/${studentId}${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get final grade by ID
  const getFinalGradeById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/final-grades/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Calculate final grade for a student (special feature)
  const calculateFinalGrade = async (studentId: number, params: {
    class_id: number
    academic_year?: string
    semester?: string
  }) => {
    const token = getToken()
    const query = new URLSearchParams(params as any)
    return await $fetch(`${API_URL}/final-grades/calculate/student/${studentId}?${query}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Calculate final grades for entire class (special feature)
  const calculateFinalGradesByClass = async (classId: number, params?: {
    academic_year?: string
    semester?: string
  }) => {
    const token = getToken()
    const query = params ? `?${new URLSearchParams(params)}` : ''
    return await $fetch(`${API_URL}/final-grades/calculate/class/${classId}${query}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Update final grade
  const updateFinalGrade = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/final-grades/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Delete final grade
  const deleteFinalGrade = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/final-grades/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getFinalGrades,
    getFinalGradesByStudent,
    getFinalGradeById,
    calculateFinalGrade,
    calculateFinalGradesByClass,
    updateFinalGrade,
    deleteFinalGrade
  }
}
