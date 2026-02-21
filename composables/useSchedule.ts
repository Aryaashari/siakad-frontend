// composables/useSchedule.ts
export const useSchedule = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all schedules
  const getSchedules = async () => {
    const token = getToken()
    return await $fetch(`${API_URL}/schedules`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get schedule by ID
  const getScheduleById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/schedules/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get schedules by class
  const getSchedulesByClass = async (classId: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/schedules/class/${classId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get schedules by teacher
  const getSchedulesByTeacher = async (teacherId: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/schedules/teacher/${teacherId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Create schedule
  const createSchedule = async (data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/schedules`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Update schedule
  const updateSchedule = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/schedules/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Delete schedule
  const deleteSchedule = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/schedules/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getSchedules,
    getScheduleById,
    getSchedulesByClass,
    getSchedulesByTeacher,
    createSchedule,
    updateSchedule,
    deleteSchedule
  }
}
