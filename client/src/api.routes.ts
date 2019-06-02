export const apiRoutes = {
  signIn: '/api/login',
  students: '/api/students',
  studentDetail: (id: number) => `/api/students/${id}`,
  gradeGroups: '/api/grade-groups',
  gradeGroupDetail: (id:number) => `/api/grade-groups/${id}`,
  subjects: '/api/subjects',
  subjectDetail: (id: number) => `/api/subjects/${id}`,
  teachers: '/api/teachers',
  teacherSubjects: '/api/teacher-subject',
  schedule: '/api/schedule',
  gradeGroupSchedule: (id:number) => `/api/schedule/grade-group/${id}`
}