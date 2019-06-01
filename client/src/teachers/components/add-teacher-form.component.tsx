import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, CardBody, Row, Col, FormGroup, CardFooter, Button } from 'reactstrap';
import { teacherRoles } from '../teacher-roles';

type TeacherFormProps = {
    onSubmit: (formData: any) => any
    onCancel: () => any
}

export function AddTeacherForm(props: TeacherFormProps) {
    return (
        <FinalForm onSubmit={props.onSubmit} render={({ handleSubmit, form }) => {
          return (
            <Form onSubmit={e => handleSubmit(e)!.then(form.reset)} autoComplete="off">
              <fieldset >
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Field
                          name="firstName"
                          className="form-control"
                          component="input"
                          placeholder="First name"
                        />
                      </FormGroup>
                      </Col>
                      <Col md={6}>
                      <FormGroup>
                        <Field
                          name="lastName"
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
                      </Col>
                      <Col md={6}>
                      <FormGroup>
                        <Field name="role" className="custom-select" component="select">
                            <option>Select role</option>
                          {Object.keys(teacherRoles).map(role => (
                              <option key={role} value = {role}> {role} </option>
                          ))
                          }                         
                        </Field>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Field
                          name="password"
                          className="form-control"
                          component="input"
                          placeholder="Password"
                        />
                      </FormGroup>
                      </Col>
                      <Col md={6}>
                      <FormGroup>
                        <Field
                          name="phoneNumber"
                          className="form-control"
                          component="input"
                          placeholder="Phone number"
                        />
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