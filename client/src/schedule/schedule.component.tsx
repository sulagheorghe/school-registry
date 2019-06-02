import React from 'react';
import { Link } from 'react-router-dom';
import { scheduleRoutes } from './schedule.routes';
import { useGrades } from '../students/components/add-student-form.component';
import { ListGroupItem, ListGroup } from 'reactstrap';
import { formatGradeGroup } from '../utils/format-grade-group';

export function Schedule() {
  const grades = useGrades()
  return (
    <ListGroup>
      {!grades && <ListGroupItem>Loading grade groups</ListGroupItem>}
      {grades && grades.length === 0 && <ListGroupItem>Loading grade groups</ListGroupItem>}
      {grades && grades.map(g => (
        <ListGroupItem
          action
          to={scheduleRoutes.view.url({ id: g.id })}
          tag={Link}>
          {formatGradeGroup(g)}
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}
