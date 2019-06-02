import React from "react";
import { Form as FinalForm, Field } from 'react-final-form'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Form,
} from "reactstrap";
import { ApiService } from "../../shared/api.service";
import { apiRoutes } from "../../api.routes";
import { useTeachers } from "../../grade-group/components/add-grade-group-form";
import { dayOfWeeks } from "../constants/day-of-week.constant";

type DailyConfigureModalProps = {
  isOpen: boolean
  onAdd: (data: any) => any
  onCancel: () => any
  groupId: string
}

export function DailyConfigureModal(props: DailyConfigureModalProps) {
  const teachers = useTeachers()
  const subjects = useSubjects()

  function onSubmit(formData: any) {
    return ApiService.post(apiRoutes.schedule, {
      gradeGroup: parseInt(props.groupId, 10),
      ...formData
    }).then(props.onAdd);
  }

  return (
    <Modal isOpen={props.isOpen}>
      <FinalForm onSubmit={onSubmit} render={({ handleSubmit, form }) => {
        return (
          <Form onSubmit={e => handleSubmit(e)!.then(form.reset)} autoComplete="off">
            <ModalHeader>Add subject</ModalHeader>
            <fieldset disabled={!teachers || !subjects}>
              <ModalBody>
                <FormGroup>
                  <Field name="subject" className="custom-select" component="select" >
                    {!subjects && <option>Loading subjects</option>}
                    {subjects && (
                      <React.Fragment>
                        <option hidden>Select subject</option>
                        {subjects.map(subject => (
                          <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))}
                      </React.Fragment>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Field name="teacher" className="custom-select" component="select">
                    {!teachers && <option>Loading teachers</option>}
                    {teachers && (
                      <React.Fragment>
                        <option hidden>Select teacher</option>
                        {teachers.map(teacher => (
                          <option key={teacher.id} value={teacher.id}>{`${teacher.lastName} ${teacher.firstName}`}</option>
                        ))}
                      </React.Fragment>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Field name="dayOfWeek" className="custom-select" component="select">
                    <option hidden>Select day of week</option>
                    {dayOfWeeks.map(d => <option key={d} value={d}>{d}</option>)}
                  </Field>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="success" className="mr-3">Save</Button>
                <Button onClick={props.onCancel}>Cancel</Button>
              </ModalFooter>
            </fieldset>
          </Form>
        )
      }} />
    </Modal>
  );
}

function useSubjects(): any[] | undefined {
  const [subjects, setSubjects] = React.useState(undefined)

  React.useEffect(function () {
    ApiService.get(apiRoutes.subjects).then(subjects => setSubjects(subjects))
  }, [])

  return subjects;
}
