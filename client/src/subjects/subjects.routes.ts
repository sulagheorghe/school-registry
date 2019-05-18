import { createRoute } from '../utils/create-route'

export const subjectsRoutes = {
  create: createRoute('/subjects'),
  list: createRoute('/subjects'),
  detail: createRoute('/subjects/:id')
}
