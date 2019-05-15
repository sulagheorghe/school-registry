import { createRoute } from "../utils/create-route";

export const studentsRoutes = {
  list: createRoute('/students'),
  detail: createRoute('/students/:id'),
}
