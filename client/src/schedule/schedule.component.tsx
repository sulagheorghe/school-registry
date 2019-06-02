import React from 'react';
import { GradeGroupSchedule } from './components/grade-group-schedule.component';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import { scheduleRoutes } from './schedule.routes';

export class Schedule extends React.Component<any, any> {
    render = () => {
        return(<Link to={scheduleRoutes.view.path}>Ceva</Link>)
    }
}