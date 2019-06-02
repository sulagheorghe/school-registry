import React from 'react';
import { ApiService } from '../../shared/api.service';
import { apiRoutes } from '../../api.routes';
import { GradeGroupInterface } from '../../../../common/interfaces/grade-group.interface';
import { formatGradeGroup } from '../../utils/format-grade-group';
import { Table, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { DailyConfigureModal } from './daily-cofigure-modal.component';
import { dayOfWeeks } from '../constants/day-of-week.constant';
import { RouteComponentProps } from 'react-router';

export function GradeGroupSchedule(props: RouteComponentProps<{ id: string }>) {
  const groupId = props.match.params.id
  const gradeGroup = useGradeGroup(groupId)
  const gradeWeekSchedule = useGradeWeekSchedule(groupId)
  const [isOpenAddSubjectModal, setIsOpenAddSubjectModal] = React.useState(false)

  if (!gradeWeekSchedule || !gradeGroup) {
    return <h1>Loading schedule...</h1>
  }

  return (
    <React.Fragment>
      <div className="d-flex align-items-center">
        <h1>Schedule for {formatGradeGroup(gradeGroup)}</h1>
        <Button className="ml-3" onClick={() => setIsOpenAddSubjectModal(true)}>Add</Button>
      </div>
      <Table responsive>
        <thead>
          <tr>{dayOfWeeks.map(d => <th key={d}>{d}</th>)}</tr>
        </thead>
        <tbody>
          <tr>
            {dayOfWeeks.map(weekDay => (
              <td key={weekDay}>
                {!gradeWeekSchedule[weekDay] && (
                  <ListGroup>
                    <ListGroupItem className="text-nowrap" color="warning">No Records</ListGroupItem>
                  </ListGroup>
                )}
                {gradeWeekSchedule[weekDay] && gradeWeekSchedule[weekDay].map((record: any) => (
                  <ListGroup key={record.id}>
                    <ListGroupItem className="mb-3 text-nowrap" key={record.id}>{record.subject.name}</ListGroupItem>
                  </ListGroup>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
      <DailyConfigureModal
        groupId={groupId}
        isOpen={isOpenAddSubjectModal}
        onAdd={() => window.location.reload()}
        onCancel={() => setIsOpenAddSubjectModal(false)}
      />
    </React.Fragment>
  )
}

function useGradeGroup(groupId: string): GradeGroupInterface | undefined {
  const [gradeGroup, setGradeGroup] = React.useState(undefined)

  React.useEffect(function () {
    const abortController = new AbortController()
    ApiService
      .get(apiRoutes.gradeGroupDetail(groupId), { signal: abortController.signal })
      .then(gradeGroup => setGradeGroup(gradeGroup))
    return () => abortController.abort()
  }, [groupId])

  return gradeGroup
}

function useGradeWeekSchedule(groupId: string): { [key: string]: any } | undefined {
  const [gradeWeekSchedule, setGradeWeekSchedule] = React.useState(undefined)

  React.useEffect(function () {
    const abortController = new AbortController()
    ApiService
      .get(apiRoutes.gradeGroupSchedule(groupId), { signal: abortController.signal })
      .then(gradeWeekSchedule => setGradeWeekSchedule(gradeWeekSchedule))
      return () => abortController.abort()
  }, [groupId])

  return gradeWeekSchedule
}
