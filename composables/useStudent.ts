// composables/useStudent.ts
export const useStudent = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all students
  const getStudents = async () => {
    const token = getToken()
    return await $fetch(`${API_URL}/students`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get student by ID
  const getStudentById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get students by class
  const getStudentsByClass = async (classId: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/students/class/${classId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Create student
  const createStudent = async (data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Update student
  const updateStudent = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/students/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Delete student
  const deleteStudent = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/students/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getStudents,
    getStudentById,
    getStudentsByClass,
    createStudent,
    updateStudent,
    deleteStudent
  }
}
