import type { ApiResponse, LoginRequest, LoginResponse } from '~/types'

export const useApi = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const apiFetch = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      const token = authStore.token
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        authStore.logout()
        navigateTo('/auth/login')
      }
    }
  })

  return {
    // Auth endpoints
    async login(credentials: LoginRequest) {
      return apiFetch<ApiResponse<LoginResponse>>('/auth/login', {
        method: 'POST',
        body: credentials
      })
    },

    async register(data: any) {
      return apiFetch<ApiResponse<any>>('/auth/register', {
        method: 'POST',
        body: data
      })
    },

    // Student endpoints
    async getStudents(params?: any) {
      return apiFetch<any>('/students', { params })
    },

    async getStudent(id: number) {
      return apiFetch<any>(`/students/${id}`)
    },

    async createStudent(data: any) {
      return apiFetch<any>('/students', {
        method: 'POST',
        body: data
      })
    },

    async updateStudent(id: number, data: any) {
      return apiFetch<any>(`/students/${id}`, {
        method: 'PUT',
        body: data
      })
    },

    async deleteStudent(id: number) {
      return apiFetch<any>(`/students/${id}`, {
        method: 'DELETE'
      })
    },

    // Teacher endpoints
    async getTeachers(params?: any) {
      return apiFetch<any>('/teachers', { params })
    },

    async getTeacher(id: number) {
      return apiFetch<any>(`/teachers/${id}`)
    },

    async createTeacher(data: any) {
      return apiFetch<any>('/teachers', {
        method: 'POST',
        body: data
      })
    },

    async updateTeacher(id: number, data: any) {
      return apiFetch<any>(`/teachers/${id}`, {
        method: 'PUT',
        body: data
      })
    },

    async deleteTeacher(id: number) {
      return apiFetch<any>(`/teachers/${id}`, {
        method: 'DELETE'
      })
    },

    // Class endpoints
    async getClasses(params?: any) {
      return apiFetch<any>('/classes', { params })
    },

    async getClass(id: number) {
      return apiFetch<any>(`/classes/${id}`)
    },

    async createClass(data: any) {
      return apiFetch<any>('/classes', {
        method: 'POST',
        body: data
      })
    },

    async updateClass(id: number, data: any) {
      return apiFetch<any>(`/classes/${id}`, {
        method: 'PUT',
        body: data
      })
    },

    async deleteClass(id: number) {
      return apiFetch<any>(`/classes/${id}`, {
        method: 'DELETE'
      })
    },

    // Subject endpoints
    async getSubjects(params?: any) {
      return apiFetch<any>('/subjects', { params })
    },

    async getSubject(id: number) {
      return apiFetch<any>(`/subjects/${id}`)
    },

    async createSubject(data: any) {
      return apiFetch<any>('/subjects', {
        method: 'POST',
        body: data
      })
    },

    async updateSubject(id: number, data: any) {
      return apiFetch<any>(`/subjects/${id}`, {
        method: 'PUT',
        body: data
      })
    },

    async deleteSubject(id: number) {
      return apiFetch<any>(`/subjects/${id}`, {
        method: 'DELETE'
      })
    }
  }
}
