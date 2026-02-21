// Phase 3: Grading & Report Cards Type Definitions

// ==================== Grade Components ====================
export interface GradeComponent {
  id: number
  name: string
  code: string
  weight: number
  academic_year: string
  semester: 'ganjil' | 'genap'
  description?: string
  created_at?: string
  updated_at?: string
}

export interface CreateGradeComponentInput {
  name: string
  code: string
  weight: number
  academic_year: string
  semester: 'ganjil' | 'genap'
  description?: string
}

// ==================== Student Grades ====================
export interface StudentGrade {
  id: number
  student_id: number
  class_id: number
  subject_id: number
  component_id: number
  score: number
  academic_year: string
  semester: 'ganjil' | 'genap'
  created_at?: string
  updated_at?: string
  // Relations
  student?: Student
  class?: Class
  subject?: Subject
  component?: GradeComponent
}

export interface CreateStudentGradeInput {
  student_id: number
  class_id: number
  subject_id: number
  component_id: number
  score: number
  academic_year: string
  semester: 'ganjil' | 'genap'
}

export interface BulkGradeInput {
  class_id: number
  subject_id: number
  component_id: number
  academic_year: string
  semester: 'ganjil' | 'genap'
  grades: Array<{
    student_id: number
    score: number
  }>
}

// ==================== Final Grades ====================
export interface FinalGrade {
  id: number
  student_id: number
  class_id: number
  subject_id: number
  final_score: number
  letter_grade: 'A' | 'B' | 'C' | 'D' | 'E'
  predicate: 'sangat_baik' | 'baik' | 'cukup' | 'kurang'
  kkm: number
  academic_year: string
  semester: 'ganjil' | 'genap'
  created_at?: string
  updated_at?: string
  // Relations
  student?: Student
  class?: Class
  subject?: Subject
}

export interface CalculateFinalGradeParams {
  class_id: number
  academic_year?: string
  semester?: string
}

// ==================== Attitude Grades ====================
export interface AttitudeGrade {
  id: number
  student_id: number
  class_id: number
  spiritual_grade: 'sangat_baik' | 'baik' | 'cukup' | 'kurang'
  spiritual_description: string
  social_grade: 'sangat_baik' | 'baik' | 'cukup' | 'kurang'
  social_description: string
  academic_year: string
  semester: 'ganjil' | 'genap'
  created_at?: string
  updated_at?: string
  // Relations
  student?: Student
  class?: Class
}

export interface CreateAttitudeGradeInput {
  student_id: number
  class_id: number
  spiritual_grade: 'sangat_baik' | 'baik' | 'cukup' | 'kurang'
  spiritual_description: string
  social_grade: 'sangat_baik' | 'baik' | 'cukup' | 'kurang'
  social_description: string
  academic_year: string
  semester: 'ganjil' | 'genap'
}

// ==================== Report Cards ====================
export interface ReportCard {
  id: number
  student_id: number
  class_id: number
  academic_year: string
  semester: 'ganjil' | 'genap'
  class_rank: number
  parallel_rank: number
  total_students: number
  total_absences: Record<string, number> // JSON: {sakit: 2, izin: 1, alpa: 0}
  teacher_notes?: string
  principal_notes?: string
  status: 'draft' | 'published' | 'printed'
  published_at?: string
  created_at?: string
  updated_at?: string
  // Relations
  student?: Student
  class?: Class
  final_grades?: FinalGrade[]
  attitude_grades?: AttitudeGrade[]
  extracurriculars?: StudentExtracurricular[]
}

export interface GenerateReportCardParams {
  academic_year?: string
  semester?: string
}

// ==================== Extracurriculars ====================
export interface Extracurricular {
  id: number
  name: string
  description?: string
  instructor_name?: string
  schedule?: string
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface CreateExtracurricularInput {
  name: string
  description?: string
  instructor_name?: string
  schedule?: string
  is_active?: boolean
}

// ==================== Student Extracurriculars ====================
export interface StudentExtracurricular {
  id: number
  student_id: number
  extracurricular_id: number
  academic_year: string
  semester: 'ganjil' | 'genap'
  score?: number
  notes?: string
  created_at?: string
  updated_at?: string
  // Relations
  student?: Student
  extracurricular?: Extracurricular
}

export interface CreateStudentExtracurricularInput {
  student_id: number
  extracurricular_id: number
  academic_year: string
  semester: 'ganjil' | 'genap'
  score?: number
  notes?: string
}

// ==================== Existing Types (Reference) ====================
export interface Student {
  id: number
  nis: string
  full_name: string
  class_id: number
  gender: 'L' | 'P'
  birth_date?: string
  address?: string
  phone?: string
  email?: string
  parent_name?: string
  parent_phone?: string
  status: 'aktif' | 'nonaktif' | 'lulus' | 'pindah'
  class?: Class
}

export interface Class {
  id: number
  name: string
  level: number
  academic_year: string
  homeroom_teacher_id?: number
  capacity?: number
}

export interface Subject {
  id: number
  name: string
  code: string
  description?: string
}

// ==================== API Response Types ====================
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  success: boolean
  message: string
  data: T[]
  meta?: {
    page: number
    per_page: number
    total: number
    total_pages: number
  }
}

// ==================== Filter Types ====================
export interface GradeComponentFilter {
  academic_year?: string
  semester?: string
}

export interface StudentGradeFilter {
  class_id?: number
  subject_id?: number
  academic_year?: string
  semester?: string
}

export interface FinalGradeFilter {
  class_id?: number
  academic_year?: string
  semester?: string
}

export interface AttitudeGradeFilter {
  class_id?: number
  academic_year?: string
  semester?: string
}

export interface ReportCardFilter {
  class_id?: number
  academic_year?: string
  semester?: string
}

export interface StudentExtracurricularFilter {
  extracurricular_id?: number
  academic_year?: string
  semester?: string
}
