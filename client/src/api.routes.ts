export const apiRoutes = {
  signIn: "/api/login",
  students: "/api/students",
  studentDetail: (id: number) => `/api/students/${id}`,
  groupStudents: (groupId: string) => `/api/grade-groups/${groupId}/students`,
  gradeGroups: "/api/grade-groups",
  gradeGroupDetail: (id: string) => `/api/grade-groups/${id}`,
  subjects: "/api/subjects",
  subjectDetail: (id: number) => `/api/subjects/${id}`,
  teachers: "/api/teachers",
  teacherSubjects: "/api/teacher-subjects",
  schedule: "/api/schedules",
  teacherSchedule: "/api/schedules/teacher",
  gradeGroupSchedule: (gradeGroupId: string) =>
    `/api/schedules/grade-group/${gradeGroupId}`,
  gradeSubjectSchedule: (gradeGroupId: string, subjectId: string) =>
    `/api/schedules/grade-group/${gradeGroupId}/subjects/${subjectId}`,
  gradeGroupSubjectMarks: (gradeGroupId: string, subjectId: string) =>
    `/api/marks/grade-group/${gradeGroupId}/subject/${subjectId}`,
  marks: '/api/marks',
};
