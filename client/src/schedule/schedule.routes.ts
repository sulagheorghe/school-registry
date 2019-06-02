import {createRoute} from '../utils/create-route';

export const scheduleRoutes = {
    list: createRoute('/schedule'),
    view: createRoute('/schedule/grade-group/:id')
}