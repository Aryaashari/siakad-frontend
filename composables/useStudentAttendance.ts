// composables/useStudentAttendance.ts
export const useStudentAttendance = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all attendances
  const getAttendances = async () => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-attendances`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get attendance by ID
  const getAttendanceById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-attendances/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get attendances by student
  const getAttendancesByStudent = async (studentId: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-attendances/student/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get attendances by class and date
  const getAttendancesByClass = async (classId: number, date: string) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-attendances/class/${classId}?date=${date}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get student recap
  const getStudentRecap = async (studentId: number, startDate?: string, endDate?: string) => {
    const token = getToken()
    let url = `${API_URL}/student-attendances/student-recap/${studentId}`
    const params = new URLSearchParams()
    if (startDate) params.append('start_date', startDate)
    if (endDate) params.append('end_date', endDate)
    if (params.toString()) url += `?${params.toString()}`
    
    return await $fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get class recap
  const getClassRecap = async (classId: number, startDate?: string, endDate?: string) => {
    const token = getToken()
    let url = `${API_URL}/student-attendances/class-recap/${classId}`
    const params = new URLSearchParams()
    if (startDate) params.append('start_date', startDate)
    if (endDate) params.append('end_date', endDate)
    if (params.toString()) url += `?${params.toString()}`
    
    return await $fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Create single attendance
  const createAttendance = async (data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-attendances`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Bulk create attendances
  const bulkCreateAttendance = async (data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-attendances/bulk`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Update attendance
  const updateAttendance = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-attendances/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Delete attendance
  const deleteAttendance = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/student-attendances/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getAttendances,
    getStudentAttendances: getAttendances,  // Alias
    getAttendanceById,
    getAttendancesByStudent,
    getAttendancesByClass,
    getStudentRecap,
    getClassRecap,
    createAttendance,
    bulkCreateAttendance,
    bulkCreateStudentAttendance: bulkCreateAttendance,  // Alias for compatibility
    updateAttendance,
    deleteAttendance
  }
}
