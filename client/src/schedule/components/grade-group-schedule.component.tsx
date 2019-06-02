import React from 'react';
import { ApiService } from '../../shared/api.service';
import { apiRoutes } from '../../api.routes';
import { GradeGroupInterface } from '../../../../common/interfaces/grade-group.interface';
import { formatGradeGroup } from '../../utils/format-grade-group';
import { Table, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { DailyConfigureModal } from './daily-cofigure-modal.component';
import { dayOfWeeks } from '../constants/day-of-week.constant';

type GradeGroupScheduleState = {
  gradeWeekSchedule: { [key: string]: any },
  showScheduleConfigureModal: boolean,
  gradeGroup?: GradeGroupInterface,
  dayOfWeek: string,
  activeSchedule: any[]
}

export class GradeGroupSchedule extends React.Component<any, GradeGroupScheduleState> {
  state: GradeGroupScheduleState = {
    gradeWeekSchedule: [],
    showScheduleConfigureModal: false,
    gradeGroup: undefined,
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

  render() {
    const {
      gradeWeekSchedule,
      showScheduleConfigureModal,
      gradeGroup,
      dayOfWeek,
      activeSchedule
    } = this.state;

    return (
      <React.Fragment>
        {gradeGroup && <h1>Schedule for {formatGradeGroup(gradeGroup)}</h1>}
        <Table>
          <thead>
            <tr>{dayOfWeeks.map(d => <th key={d}>{d}</th>)}</tr>
          </thead>
          <tbody>
            <tr>
              {dayOfWeeks.map(weekDay => (
                <td key={weekDay}>
                  {!gradeWeekSchedule[weekDay] && <div>No Records</div>}
                  {gradeWeekSchedule[weekDay] && gradeWeekSchedule[weekDay].map((record: any) => (
                    <ListGroup key={record.id}>
                      <ListGroupItem key={record.id}>{record.subject.name}</ListGroupItem>
                    </ListGroup>
                  ))}
                  <Button onClick={this.showModal(weekDay)}>Configure</Button>
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
        {gradeGroup && (
          <DailyConfigureModal
            isOpen={showScheduleConfigureModal} toggle={this.toggle} updateCurrentSchedule = {this.toggle}
            dayOfWeek={dayOfWeek} currentDaySchedule={activeSchedule} gradeGroup={gradeGroup} />
        )}
      </React.Fragment>
    )
  }

  toggle = () => {
    this.setState({
      showScheduleConfigureModal: !this.state.showScheduleConfigureModal
    });
  }

  showModal = (weekDay: string) => (e: any) => {
    this.setState({
      dayOfWeek: weekDay,
      showScheduleConfigureModal: true,
      activeSchedule: this.state.gradeWeekSchedule[e.currentTarget.value]
    });
  }
}