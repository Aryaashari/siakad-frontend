// composables/useStudentGrade.ts
export const useStudentGrade = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all student grades
  const getStudentGrades = async (params?: { 
    class_id?: number
    subject_id?: number
    academic_year?: string
    semester?: string 
  }) => {
    const token = getToken()
    const query = params ? `?${new URLSearchParams(params as any)}` : ''
    return await $fetch(`${API_URL}/student-grades${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get student grades by student ID
  const getStudentGradesByStudent = async (studentId: number, params?: {
    academic_year?: string
    semester?: string
  }) => {
    const token = getToken()
    const query = params ? `?${new URLSearchParams(params)}` : ''
    return await $fetch(`${API_URL}/student-grades/student/${studentId}${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get student grade by ID
  const getStudentGradeById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-grades/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Create single student grade
  const createStudentGrade = async (data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-grades`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Bulk create student grades (special feature)
  const bulkCreateStudentGrades = async (data: {
    class_id: number
    subject_id: number
    component_id: number
    academic_year: string
    semester: string
    grades: Array<{ student_id: number; score: number }>
  }) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-grades/bulk`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Update student grade
  const updateStudentGrade = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-grades/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Delete student grade
  const deleteStudentGrade = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-grades/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getStudentGrades,
    getStudentGradesByStudent,
    getStudentGradeById,
    createStudentGrade,
    bulkCreateStudentGrades,
    updateStudentGrade,
    deleteStudentGrade
  }
}
