import React from 'react'
import { CardBody, CardFooter, Button, Form, FormGroup, Row, Col } from 'reactstrap';
import { Form as FinalForm, Field } from 'react-final-form';
import { ApiService } from '../../shared/api.service';
import { apiRoutes } from '../../api.routes';
import { formatGradeGroup } from '../../utils/format-grade-group'
import { GradeGroupInterface } from '../../../../common/interfaces/grade-group.interface';

type AddStudentFormProps = {
  onCancel: () => any
  onSubmit: (formData: any) => any
}

export function useGrades(): GradeGroupInterface[] | undefined {
  const [grades, setGrades] = React.useState(undefined)

  React.useEffect(function() {
    ApiService.get(apiRoutes.gradeGroups).then(grades => setGrades(grades))
  }, [])

  return grades
}

export function AddStudentForm(props: AddStudentFormProps) {
  const grades = useGrades()
  return (
    <FinalForm onSubmit={props.onSubmit} render={({ handleSubmit, form }) => {
      return (
        <Form onSubmit={e => handleSubmit(e)!.then(form.reset)} autoComplete="off">
          <fieldset disabled={!grades}>
            <CardBody>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Field
                      name="firstname"
                      className="form-control"
                      component="input"
                      placeholder="First name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name="lastname"
                      className="form-control"
                      component="input"
                      placeholder="Last name"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Field
                      name="email"
                      className="form-control"
                      component="input"
                      placeholder="Email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Field name="gradeGroup" className="custom-select" component="select">
                      {!grades && <option>Loading grades</option>}
                      {grades && (
                        <React.Fragment>
                          <option value="">Select Grade</option>
                          {grades.map(g => (
                            <option key={g.id} value={g.id}>{ formatGradeGroup(g) }</option>
                          ))}
                        </React.Fragment>
                      )}
                    </Field>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Button color="success" className="mr-3">Save</Button>
              <Button onClick={props.onCancel}>Cancel</Button>
            </CardFooter>
          </fieldset>
        </Form>
      )
    }} />
  )
}