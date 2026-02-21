// composables/useReportCard.ts
export const useReportCard = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiBase
  const authStore = useAuthStore()
  const getToken = () => authStore.token

  // Get all report cards
  const getReportCards = async (params?: { 
    class_id?: number
    academic_year?: string
    semester?: string 
  }) => {
    const token = getToken()
    const query = params ? `?${new URLSearchParams(params as any)}` : ''
    return await $fetch(`${API_URL}/report-cards${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get report card by student ID (with full details)
  const getReportCardByStudent = async (studentId: number, params?: {
    academic_year?: string
    semester?: string
  }) => {
    const token = getToken()
    const query = params ? `?${new URLSearchParams(params)}` : ''
    return await $fetch(`${API_URL}/report-cards/student/${studentId}${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Get report card by ID
  const getReportCardById = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/report-cards/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Generate report card for a student (special feature)
  const generateReportCard = async (studentId: number, params?: {
    academic_year?: string
    semester?: string
  }) => {
    const token = getToken()
    const query = params ? `?${new URLSearchParams(params)}` : ''
    return await $fetch(`${API_URL}/report-cards/generate/student/${studentId}${query}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Generate report cards for entire class (special feature)
  const generateReportCardsByClass = async (classId: number, params?: {
    academic_year?: string
    semester?: string
  }) => {
    const token = getToken()
    const query = params ? `?${new URLSearchParams(params)}` : ''
    return await $fetch(`${API_URL}/report-cards/generate/class/${classId}${query}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Update report card
  const updateReportCard = async (id: number, data: any) => {
    const token = getToken()
    return await $fetch(`${API_URL}/report-cards/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    })
  }

  // Publish report card (special feature)
  const publishReportCard = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/report-cards/${id}/publish`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Download PDF
  const downloadReportCardPDF = async (id: number) => {
    const token = getToken()
    const response = await fetch(`${API_URL}/report-cards/${id}/pdf`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
    
    if (!response.ok) {
      throw new Error('Failed to download PDF')
    }
    
    // Get filename from Content-Disposition header
    const contentDisposition = response.headers.get('Content-Disposition')
    let filename = 'raport.pdf'
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/)
      if (match) filename = match[1]
    }
    
    // Create blob and download
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  // Delete report card
  const deleteReportCard = async (id: number) => {
    const token = getToken()
    return await $fetch(`${API_URL}/report-cards/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return {
    getReportCards,
    getReportCardByStudent,
    getReportCardById,
    generateReportCard,
    generateReportCardsByClass,
    updateReportCard,
    publishReportCard,
    downloadReportCardPDF,
    deleteReportCard
  }
}
