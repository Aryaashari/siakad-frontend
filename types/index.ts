export interface User {
  id: number
  username: string
  email: string
  full_name: string
  role: 'admin' | 'kepala_sekolah' | 'guru' | 'staff'
  phone?: string
  photo?: string
  is_active: boolean
  last_login?: string
  created_at: string
  updated_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  expires_at: string
  user: User
}

export interface Student {
  id: number
  nisn: string
  nik: string
  full_name: string
  nickname?: string
  gender: 'L' | 'P'
  birth_place?: string
  birth_date?: string
  religion?: string
  address?: string
  phone?: string
  email?: string
  photo?: string
  class_id?: number
  class?: Class
  status: 'aktif' | 'pindah' | 'mutasi' | 'alumni'
  admission_date?: string
  parent_name: string
  parent_phone: string
  parent_job?: string
  parent_education?: string
  created_at: string
  updated_at: string
}

export interface Teacher {
  id: number
  nip?: string
  nuptk?: string
  nik: string
  user_id?: number
  user?: User
  full_name: string
  gender: 'L' | 'P'
  birth_place?: string
  birth_date?: string
  religion?: string
  address?: string
  phone?: string
  email?: string
  photo?: string
  education_level?: string
  major?: string
  certification?: string
  employment_status?: 'PNS' | 'PPPK' | 'GTY' | 'GTT' | 'Honorer'
  join_date?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Class {
  id: number
  name: string
  level: number
  academic_year: string
  semester: '1' | '2'
  homeroom_teacher_id?: number
  homeroom_teacher?: Teacher
  capacity: number
  room?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Subject {
  id: number
  code: string
  name: string
  category: 'wajib' | 'muatan_lokal' | 'ekstrakurikuler'
  kkm?: number
  hours_per_week?: number
  curriculum?: string
  description?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export interface PaginationMeta {
  page: number
  per_page: number
  total: number
  total_pages: number
}

export interface PaginatedResponse<T> {
  success: boolean
  message: string
  data: T[]
  meta: PaginationMeta
}
