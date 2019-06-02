import React from 'react'
import { CardBody, CardFooter, Button, Form, FormGroup, Row, Col } from 'reactstrap';
import { Form as FinalForm, Field } from 'react-final-form';
import { ApiService } from '../../shared/api.service';
import { apiRoutes } from '../../api.routes';

type AddScheduleRecordProps = {
    onCancel: () => any
    onSubmit: (formData: any) => any
  }

type AddScheduleRecordState = {
    teachers: any[],
    subjects: any[],
    teacherSubjects: any[],
    allowedTeachers: any[],
    allowSelectTeacher: boolean
}

export class AddScheduleRecordForm extends React.Component<AddScheduleRecordProps, AddScheduleRecordState> {
    state: AddScheduleRecordState = {
        teachers: [],
        subjects: [],
        teacherSubjects: [],
        allowedTeachers: [],
        allowSelectTeacher: false
    }

    componentDidMount = () => {
        Promise.all([
            ApiService.get(apiRoutes.subjects),
            ApiService.get(apiRoutes.teachers),
            ApiService.get(apiRoutes.teacherSubjects)
        ])
        .then(results => {
            this.setState({
                subjects: results[0],
                teachers: results[1],
                teacherSubjects: results[2]
            })
        })
    }

    render = () => {
        const {teachers, subjects, allowedTeachers} = this.state;
        return (
            <FinalForm onSubmit={this.props.onSubmit} render={({ handleSubmit, form }) => {
              return (
                <Form onSubmit={e => handleSubmit(e)!.then(form.reset)} autoComplete="off">
                  <fieldset disabled={!teachers || !subjects}>
                    <CardBody>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Field name="subject" className="custom-select" component="select" >
                              {!subjects && <option>Loading subjects</option>}
                              {subjects && (
                                <React.Fragment>
                                  <option value="">Select subject</option>
                                  {subjects.map(subject => (
                                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                                  ))}
                                </React.Fragment>
                              )}
                            </Field>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Field name="teacher" className="custom-select" component="select">
                              {!teachers && <option>Loading teachers</option>}
                              {teachers && (
                                <React.Fragment>
                                  <option value="">Select teacher</option>
                                  {teachers.map(teacher => (
                                    <option key={teacher.id} value={teacher.id}>{`${teacher.lastName} ${teacher.firstName}`}</option>
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
                      <Button onClick={this.props.onCancel}>Cancel</Button>
                    </CardFooter>
                  </fieldset>
                </Form>
              )
            }} />
          )
    }

}