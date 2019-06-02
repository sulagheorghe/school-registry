import React from 'react';
import { ApiService } from '../../shared/api.service';
import { apiRoutes } from '../../api.routes';
import { GradeGroupInterface } from '../../../../common/interfaces/grade-group.interface';
import { formatGradeGroup } from '../../utils/format-grade-group';
import { Table, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { DailyConfigureModal } from './daily-cofigure-modal.component';

type GradeGroupScheduleState = {
    gradeWeekSchedule: any[],
    showScheduleConfigureModal: boolean,
    gradeGroup: GradeGroupInterface,
    dayOfWeek: string,
    activeSchedule: any[]
}

export class GradeGroupSchedule extends React.Component<any, GradeGroupScheduleState> {
    state: GradeGroupScheduleState = {
        gradeWeekSchedule: [],
        showScheduleConfigureModal: false,
        gradeGroup: { admissionYear: 0, classMaster: 1, group: "" },
        dayOfWeek: "",
        activeSchedule: []
    }

    componentDidMount = () => {
        Promise.all([
            ApiService.get(apiRoutes.gradeGroupDetail(this.props.match.params.id)),
            ApiService.get(apiRoutes.gradeGroupSchedule(this.props.match.params.id)),
        ])
            .then(results => {
                this.setState({
                    gradeGroup: results[0],
                    gradeWeekSchedule: results[1]
                })
            })

    }

    render = () => {
        const {
            gradeWeekSchedule,
            showScheduleConfigureModal,
            gradeGroup,
            dayOfWeek,
            activeSchedule
        } = this.state;

        if (!gradeWeekSchedule) {
            return "Loading..."
        }
        
        return (
            <React.Fragment>
                <h1>Schedule for {formatGradeGroup(gradeGroup)} </h1>
                <Table>
                <tbody>{this.displayScheduleByDays(gradeWeekSchedule)}</tbody>
                </Table>
                <DailyConfigureModal
                    isOpen={showScheduleConfigureModal} toggle={this.toggle}
                    dayOfWeek={dayOfWeek} currentDaySchedule={activeSchedule} gradeGroup={gradeGroup} />
            </React.Fragment>
        )
    }

    toggle = () => {
        this.setState({
            showScheduleConfigureModal: !this.state.showScheduleConfigureModal
        });
    }

    showModal = (e: any) => {
        this.setState({
            dayOfWeek: e.currentTarget.value,
            showScheduleConfigureModal: true,
            activeSchedule: this.state.gradeWeekSchedule[e.currentTarget.value]
        });
    }

    displayScheduleByDays = (gradeWeekSchedule: any[]) => {
        const rows = []
        for (const weekDay in gradeWeekSchedule) {
            const dailySchedule: any[] = gradeWeekSchedule[weekDay];

            const schedule = dailySchedule.map((record, key) => (
                <ListGroup key={key}>
                    <ListGroupItem key={record.id}>{record.subject.name}</ListGroupItem>
                </ListGroup>
            ))
            rows.push(
                <tr>
                    <th>{weekDay}</th>
                    <td>{schedule}</td>
                    <td><Button color="secondary" value={weekDay} onClick={this.showModal}>Configure</Button>
                    
            </td></tr>)
        }
        return rows;
    }
}