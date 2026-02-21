// composables/useStudentExtracurricular.ts
export const useStudentExtracurricular = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all student extracurricular assignments
  const getStudentExtracurriculars = async (params?: { 
    extracurricular_id?: number
    academic_year?: string
    semester?: string 
  }) => {
    const token = getToken()
    const query = params ? `?${new URLSearchParams(params as any)}` : ''
    return await $fetch(`${API_URL}/student-extracurriculars${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get student extracurriculars by student ID
  const getStudentExtracurricularsByStudent = async (studentId: number, params?: {
    academic_year?: string
    semester?: string
  }) => {
    const token = getToken()
    const query = params ? `?${new URLSearchParams(params)}` : ''
    return await $fetch(`${API_URL}/student-extracurriculars/student/${studentId}${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get student extracurricular by ID
  const getStudentExtracurricularById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-extracurriculars/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Assign student to extracurricular
  const assignStudentExtracurricular = async (data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-extracurriculars`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Update student extracurricular
  const updateStudentExtracurricular = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-extracurriculars/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Delete student extracurricular assignment
  const deleteStudentExtracurricular = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-extracurriculars/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getStudentExtracurriculars,
    getStudentExtracurricularsByStudent,
    getStudentExtracurricularById,
    assignStudentExtracurricular,
    updateStudentExtracurricular,
    deleteStudentExtracurricular
  }
}
