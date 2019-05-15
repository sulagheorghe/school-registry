import { createRoute } from "./utils/create-route";

export const appRoutes = {
  signIn: createRoute('/sign-in'),
  home: createRoute('/')
}