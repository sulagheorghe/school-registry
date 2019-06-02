import React from "react";
import ReactDataGrid, { Column, GridRowsUpdatedEvent } from "react-data-grid";
import { getDaysInMonth, startOfDay, format } from 'date-fns'
import { ApiService } from "../shared/api.service";
import { apiRoutes } from "../api.routes";
import { RouteComponentProps } from "react-router";
import {
  getDayOfWeek,
  DayOfWeek
} from "../schedule/constants/day-of-week.constant";

type Params = {
  gradeGroupId: string;
  subjectId: string
}

const staticColumns = [
  { key: "firstname", name: "Nume", frozen: true, width: 100 },
  { key: "lastname", name: "Prenume", frozen: true, width: 100 },
]

export function Marks(props: RouteComponentProps<Params>) {
  const { gradeGroupId, subjectId } = props.match.params
  const [students, setStudents] = useStudents(gradeGroupId)
  const schedules = useSchedules(gradeGroupId, subjectId)
  const marks = useMarks(gradeGroupId, subjectId)

  const dynamicColumns = React.useMemo(
    () => generateMonthColumns(staticColumns, schedules || []),
    [schedules]
  )

  if (!students || !schedules) {
    return <h1>Loading...</h1>
  }

  function onGridRowsUpdated (event: GridRowsUpdatedEvent<any> & { [key: string]: any }) {
    const { fromRow, toRow, updated, cellKey, fromRowData } = event
    const timestamp = parseInt(cellKey.split('-')[0], 10)
    const mark = updated[cellKey]

    if (!mark) return

    console.log(event);

    ApiService.post(apiRoutes.marks, {
      mark,
      isPresent: true,
      planedOn: timestamp,
      student: fromRowData.id,
      teacher: 1,
      subject: subjectId,
    })

    setStudents((students: any) => {
      const rows = students.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return rows;
    });
  };

  return (
    <ReactDataGrid
      columns={dynamicColumns}
      rowsCount={students.length}
      rowGetter={i => students[i]}
      onGridRowsUpdated={onGridRowsUpdated}
      enableCellSelect
    />
  )
}

function generateMonthColumns(staticColumns: any, schedules: any[]): any[] {
  const times = schedules
    .flatMap(schedule => daysOfMonth(schedule.dayOfWeek))
    .sort((a, b) => a - b)

  return [
    ...staticColumns,
    ...times.map((t, index) => ({
      key: `${t}-${index}`,
      name: format(t, 'MM/DD'),
      editable: true
    }))
  ]
}

function daysOfMonth(dayOfWeek: DayOfWeek) {
  const d = new Date()
  const month = d.getMonth()
  const days = []

  d.setDate(1);

  // Get the first day in the month
  while (d.getDay() !== getDayOfWeek(dayOfWeek)) {
    d.setDate(d.getDate() + 1);
  }
  // Get all the other days in the month
  while (d.getMonth() === month) {
    days.push(startOfDay(d).getTime());
    d.setDate(d.getDate() + 7);
  }

  return days;
}

function useSchedules(gradeGroupId: string, subjectId: string): any[] | undefined {
  const [schedules, setSchedules] = React.useState(undefined);

  React.useEffect(function () {
    const abortController = new AbortController()
    const url = apiRoutes.gradeSubjectSchedule(gradeGroupId, subjectId)
    ApiService.get(url, { signal: abortController.signal })
      .then(schedules => setSchedules(schedules));

    return () => abortController.abort()
  }, [gradeGroupId, subjectId]);

  return schedules;
}

function useStudents(gradeGroupId: string): [any[] | undefined, any] {
  const [students, setStudents] = React.useState(undefined);

  React.useEffect(function () {
    const abortController = new AbortController()
    const url = apiRoutes.groupStudents(gradeGroupId)
    ApiService.get(url, { signal: abortController.signal })
      .then(students => setStudents(students))

    return () => abortController.abort()
  }, [gradeGroupId]);

  return [students, setStudents];
}

function useMarks(gradeGroupId: string, subjectId: string): any[] | undefined {
  const [marks, setMarks] = React.useState(undefined);

  React.useEffect(function () {
    const abortController = new AbortController()
    const url = apiRoutes.gradeGroupSubjectMarks(gradeGroupId, subjectId)
    ApiService.get(url, { signal: abortController.signal })
      .then(marks => setMarks(marks));

    return () => abortController.abort()
  }, [gradeGroupId, subjectId]);

  return marks;
}
