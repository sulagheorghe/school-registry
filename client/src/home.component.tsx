import { default as React } from "react";
import { ApiService } from "./shared/api.service";
import { apiRoutes } from "./api.routes";
import lodash, { Dictionary } from "lodash";
import { formatGradeGroup } from "./utils/format-grade-group";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { marksRoutes } from "./marks/marks.route";

function useSchedule(): any[] | undefined {
  const [schedules, setSchedule] = React.useState(undefined);

  React.useEffect(function() {
    ApiService.get(apiRoutes.teacherSchedule).then(schedules =>
      setSchedule(schedules)
    );
  }, []);

  return schedules;
}

export function Home() {
  const schedules = useSchedule();
  const groupedSchedule: Dictionary<any[]> = lodash.groupBy(
    schedules,
    (schedule: any) => schedule.gradeGroup.id
  );
  if (!schedules) {
    return <div> 'Loading ...'</div>;
  }
  if (schedules.length === 0) {
    return <div>'No classess!!!'</div>;
  }
  return (
    <React.Fragment>
      {Object.values(groupedSchedule).map(value => (
        <React.Fragment>
          <h1>{formatGradeGroup(value[0].gradeGroup)}</h1>
          <ListGroup>
            {value.map(sch => (
              <ListGroupItem
                key={sch.id}
                action
                to={marksRoutes.list.url({
                  gradeGroupId: sch.gradeGroup.id,
                  subjectId: sch.subject.id
                })}
                tag={Link}
              >
                {sch.subject.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
