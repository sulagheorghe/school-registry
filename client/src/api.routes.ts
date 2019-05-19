export const apiRoutes = {
  signIn: '/api/login',
  students: '/api/students',
  studentDetail: (id: number) => `/api/students/${id}`,
  gradeGroups: '/api/grade-groups',
  subjects: '/api/subjects',
  subjectDetail: (id: number) => `/api/subjects/${id}`,
  teachers: '/api/teachers'
}