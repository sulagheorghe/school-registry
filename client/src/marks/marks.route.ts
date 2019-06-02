import { createRoute } from '../utils/create-route'

export const marksRoutes ={
    list: createRoute('/marks/grade-group/:gradeGroupId/subjects/:subjectId')
}
