// composables/useTeacherAttendance.ts
export const useTeacherAttendance = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all attendances
  const getAttendances = async () => {
    const token = getToken()
    return await $fetch(`${API_URL}/teacher-attendances`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get attendance by ID
  const getAttendanceById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/teacher-attendances/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get attendances by teacher
  const getAttendancesByTeacher = async (teacherId: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/teacher-attendances/teacher/${teacherId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get attendances by date
  const getAttendancesByDate = async (date: string) => {
    const token = getToken()
    return await $fetch(`${API_URL}/teacher-attendances/date?date=${date}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get teacher recap
  const getTeacherRecap = async (teacherId: number, startDate?: string, endDate?: string) => {
    const token = getToken()
    let url = `${API_URL}/teacher-attendances/teacher-recap/${teacherId}`
    const params = new URLSearchParams()
    if (startDate) params.append('start_date', startDate)
    if (endDate) params.append('end_date', endDate)
    if (params.toString()) url += `?${params.toString()}`
    
    return await $fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Check-in
  const checkIn = async (data: { teacher_id: number; location?: string }) => {
    const token = getToken()
    return await $fetch(`${API_URL}/teacher-attendances/check-in`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Check-out by attendance ID
  const checkOut = async (attendanceId: number, notes?: string) => {
    const token = getToken()
    return await $fetch(`${API_URL}/teacher-attendances/${attendanceId}/checkout`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: { notes: notes || '' }
    })
  }

  // Create manual attendance
  const createAttendance = async (data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/teacher-attendances`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Update attendance
  const updateAttendance = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/teacher-attendances/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Delete attendance
  const deleteAttendance = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/teacher-attendances/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get today's attendance (alias for today)
  const getTodayTeacherAttendance = async () => {
    const token = getToken()
    return await $fetch(`${API_URL}/teacher-attendances/today`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getAttendances,
    getTeacherAttendances: getAttendances,  // Alias
    getTodayTeacherAttendance,
    getAttendanceById,
    getAttendancesByTeacher,
    getAttendancesByDate,
    getTeacherRecap,
    checkIn,
    checkOut,
    createAttendance,
    createTeacherAttendance: createAttendance,  // Alias
    updateAttendance,
    deleteAttendance,
    deleteTeacherAttendance: deleteAttendance,  // Alias
    checkoutTeacherAttendance: checkOut  // Alias for checkout
  }
}
