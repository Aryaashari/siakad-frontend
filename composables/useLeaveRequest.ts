// composables/useLeaveRequest.ts
export const useLeaveRequest = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all leave requests with optional filters
  const getLeaveRequests = async (filters?: any) => {
    const token = getToken()
    let url = `${API_URL}/leave-requests`
    
    if (filters) {
      const params = new URLSearchParams()
      if (filters.start_date) params.append('start_date', filters.start_date)
      if (filters.end_date) params.append('end_date', filters.end_date)
      if (filters.status) params.append('status', filters.status)
      if (filters.leave_type) params.append('leave_type', filters.leave_type)
      
      const queryString = params.toString()
      if (queryString) url += `?${queryString}`
    }
    
    return await $fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get leave request by ID
  const getLeaveRequestById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/leave-requests/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get pending leave requests
  const getPendingLeaveRequests = async () => {
    const token = getToken()
    return await $fetch(`${API_URL}/leave-requests/pending`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get leave requests by teacher
  const getLeaveRequestsByTeacher = async (teacherId: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/leave-requests/teacher/${teacherId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get leave requests by status
  const getLeaveRequestsByStatus = async (status: string) => {
    const token = getToken()
    return await $fetch(`${API_URL}/leave-requests/status?status=${status}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Create leave request
  const createLeaveRequest = async (data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/leave-requests`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Update leave request
  const updateLeaveRequest = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/leave-requests/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Approve leave request
  const approveLeaveRequest = async (id: number, notes?: string) => {
    const token = getToken()
    const body = notes ? { notes } : {}
    return await $fetch(`${API_URL}/leave-requests/${id}/approve`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body
    })
  }

  // Reject leave request
  const rejectLeaveRequest = async (id: number, rejectionReason: string) => {
    const token = getToken()
    return await $fetch(`${API_URL}/leave-requests/${id}/reject`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: { rejection_reason: rejectionReason }
    })
  }

  // Delete leave request
  const deleteLeaveRequest = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/leave-requests/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getLeaveRequests,
    getLeaveRequestById,
    getPendingLeaveRequests,
    getLeaveRequestsByTeacher,
    getLeaveRequestsByStatus,
    createLeaveRequest,
    updateLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    deleteLeaveRequest
  }
}
