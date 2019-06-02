import React from "react";
import ReactDataGrid from "react-data-grid";
import { ApiService } from "../shared/api.service";
import { apiRoutes } from "../api.routes";
import { RouteComponentProps } from "react-router";
import { func } from "prop-types";
import {
  getDayOfWeek,
  DayOfWeek
} from "../schedule/constants/day-of-week.constant";

function useSchedule(
  gradeGroupId: string,
  subjectId: string
): any[] | undefined {
  const [schedules, setSchedule] = React.useState(undefined);

  React.useEffect(function() {
    ApiService.get(
      apiRoutes.gradeSubjectSchedule(gradeGroupId, subjectId)
    ).then(schedules => setSchedule(schedules));
  }, [gradeGroupId, subjectId]);

  return schedules;
}

function useStudents(gradeGroupId: string): any[] | undefined {
  const [students, setStudents] = React.useState(undefined);

  React.useEffect(function() {
    ApiService.get(apiRoutes.groupStudents(gradeGroupId)).then(students =>
      setStudents(students)
    );
  }, []);

  return students;
}

function useMarks(gradeGroupId: string, subjectId: string): any[] | undefined {
  const [marks, setMarks] = React.useState(undefined);

  React.useEffect(function() {
    ApiService.get(
      apiRoutes.gradeGroupSubjectMarks(gradeGroupId, subjectId)
    ).then(marks => setMarks(marks));
  }, []);

  return marks;
}

export function Marks(
  props: any & RouteComponentProps<{ gradeGroupId: string; subjectId: string }>
) {
  const schedules = useSchedule(
    props.match.params.gradeGroupId,
    props.match.params.subjectId
  );
  if (schedules) {
    generateColumns(schedules);
  }

  return <React.Fragment>iuhuii</React.Fragment>;
  /* return (
      <React.Fragment>
        <ReactDataGrid 
          columns={columns}
          //rowGetter = {i = > row}          
        />
      </React.Fragment>
    )  */
}

const columns = [
  {
    key: "id",
    name: "#",
    frozen: true
  },
  {
    key: "name",
    name: "Lastname, Firstname",
    frozen: true
  }
];

function daysOfMonth(dayOfWeek: DayOfWeek) {
  var d = new Date(),
    month = d.getMonth(),
    days = [];

  d.setDate(1);
  // Get the first day in the month
  while (d.getDay() !== getDayOfWeek(dayOfWeek)) {
    d.setDate(d.getDate() + 1);
  }
  // Get all the other days in the month
  while (d.getMonth() === month) {
    const nextDate = new Date(d.getTime());
    days.push(nextDate.getTime());
    d.setDate(d.getDate() + 7);
  }
  return days;
}

function generateColumns(schedules: any[]) {
  const dayOfMonth: number[] = schedules.flatMap(schedule =>
    daysOfMonth(schedule.dayOfWeek)
  );
  dayOfMonth.sort((a, b) => a - b );
  
}
