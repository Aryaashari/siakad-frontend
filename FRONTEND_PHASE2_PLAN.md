# Frontend Phase 2 - Implementation Plan

## Overview
Implementasi UI untuk fitur Jadwal Pelajaran dan Absensi (Schedules & Attendance)

## Backend APIs Ready (120 endpoints total)

### 1. Schedules (7 endpoints)
- GET /schedules - List all
- GET /schedules/:id - Get detail
- GET /schedules/class/:classId - By class
- GET /schedules/teacher/:teacherId - By teacher
- POST /schedules - Create
- PUT /schedules/:id - Update
- DELETE /schedules/:id - Delete

### 2. Student Attendances (10 endpoints)
- GET /student-attendances - List all
- GET /student-attendances/:id - Get detail
- GET /student-attendances/student/:studentId - By student
- GET /student-attendances/class/:classId - By class & date
- GET /student-attendances/student-recap/:studentId - Recap
- GET /student-attendances/class-recap/:classId - Class recap
- POST /student-attendances - Create single
- POST /student-attendances/bulk - Bulk create
- PUT /student-attendances/:id - Update
- DELETE /student-attendances/:id - Delete

### 3. Teacher Attendances (10 endpoints)
- GET /teacher-attendances - List all
- GET /teacher-attendances/:id - Get detail
- GET /teacher-attendances/teacher/:teacherId - By teacher
- GET /teacher-attendances/date - By date
- GET /teacher-attendances/teacher-recap/:teacherId - Recap
- POST /teacher-attendances - Create manual
- POST /teacher-attendances/check-in - Check-in
- POST /teacher-attendances/check-out - Check-out
- PUT /teacher-attendances/:id - Update
- DELETE /teacher-attendances/:id - Delete

### 4. Leave Requests (10 endpoints)
- GET /leave-requests - List all
- GET /leave-requests/:id - Get detail
- GET /leave-requests/pending - Pending only
- GET /leave-requests/teacher/:teacherId - By teacher
- GET /leave-requests/status - By status
- POST /leave-requests - Create
- PUT /leave-requests/:id - Update
- PUT /leave-requests/:id/approve - Approve
- PUT /leave-requests/:id/reject - Reject
- DELETE /leave-requests/:id - Delete

---

## Frontend Pages to Implement

### 1. Jadwal Pelajaran (Schedules)
**Path:** `/dashboard/schedules`

**Features:**
- [ ] List view dengan filter by class/teacher
- [ ] Calendar view (weekly/daily)
- [ ] Create/Edit schedule form
- [ ] Conflict detection UI warning
- [ ] Delete confirmation

**Components Needed:**
- ScheduleList.vue
- ScheduleForm.vue
- ScheduleCalendar.vue
- ScheduleCard.vue

### 2. Absensi Siswa (Student Attendance)
**Path:** `/dashboard/student-attendances`

**Features:**
- [ ] Bulk input per class (select date & class)
- [ ] Quick mark all as "Hadir"
- [ ] Individual status selector (Hadir/Sakit/Izin/Alpa)
- [ ] Time-in input for present students
- [ ] Recap view per student/class
- [ ] Export to Excel/PDF

**Components Needed:**
- AttendanceInput.vue (bulk form)
- AttendanceList.vue
- AttendanceRecap.vue
- AttendanceStats.vue (charts)

### 3. Absensi Guru (Teacher Attendance)
**Path:** `/dashboard/teacher-attendances`

**Features:**
- [ ] Quick check-in button (with location)
- [ ] Check-out button
- [ ] Late detection indicator (after 07:30)
- [ ] Daily attendance list
- [ ] Recap view per teacher
- [ ] Monthly summary

**Components Needed:**
- TeacherCheckIn.vue
- TeacherAttendanceList.vue
- TeacherRecap.vue

### 4. Pengajuan Cuti (Leave Requests)
**Path:** `/dashboard/leave-requests`

**Features:**
- [ ] Create leave request form
- [ ] List all requests (with status badges)
- [ ] Approval/Rejection buttons (admin only)
- [ ] Rejection reason modal
- [ ] Filter by status/teacher
- [ ] Calendar view of approved leaves

**Components Needed:**
- LeaveRequestForm.vue
- LeaveRequestList.vue
- LeaveApprovalModal.vue
- LeaveCalendar.vue

---

## Implementation Strategy

### Phase 2.1: Jadwal Pelajaran (Week 1)
1. Create pages and routes
2. Build schedule list with filters
3. Implement create/edit form
4. Add conflict validation
5. Test CRUD operations

### Phase 2.2: Absensi Siswa (Week 1-2)
1. Create bulk input form
2. Implement quick actions
3. Build recap/stats view
4. Add export functionality
5. Test with real data

### Phase 2.3: Absensi Guru (Week 2)
1. Create check-in/out interface
2. Implement late detection
3. Build attendance list
4. Add recap view
5. Test workflow

### Phase 2.4: Pengajuan Cuti (Week 2)
1. Create request form
2. Build list with filters
3. Implement approval workflow
4. Add rejection modal
5. Test approval process

---

## Technical Stack

- **Framework:** Nuxt 3
- **UI Library:** TailwindCSS + shadcn-vue
- **State:** Pinia stores
- **API Client:** $fetch (Nuxt)
- **Forms:** Vee-Validate + Zod
- **Charts:** Chart.js or ApexCharts
- **Calendar:** FullCalendar or custom
- **Export:** xlsx, jsPDF

---

## File Structure

```
frontend/
├── pages/
│   └── dashboard/
│       ├── schedules/
│       │   ├── index.vue (list)
│       │   ├── create.vue
│       │   └── [id].vue (edit)
│       ├── student-attendances/
│       │   ├── index.vue (list)
│       │   ├── input.vue (bulk)
│       │   └── recap.vue
│       ├── teacher-attendances/
│       │   ├── index.vue
│       │   └── recap.vue
│       └── leave-requests/
│           ├── index.vue
│           └── create.vue
├── components/
│   ├── schedule/
│   ├── attendance/
│   └── leave/
└── composables/
    ├── useSchedule.ts
    ├── useStudentAttendance.ts
    ├── useTeacherAttendance.ts
    └── useLeaveRequest.ts
```

---

## Success Criteria

- [ ] All CRUD operations working
- [ ] Bulk operations functional
- [ ] Real-time validation working
- [ ] Responsive on mobile/tablet
- [ ] Proper error handling
- [ ] Loading states implemented
- [ ] Success/error notifications
- [ ] Data persistence verified

---

## Next Steps (Immediate)

1. ✅ Backend APIs verified (120 endpoints)
2. Create page structure for Phase 2
3. Build composables for API integration
4. Implement Schedule management UI
5. Implement Attendance input UI
6. Test end-to-end workflow

