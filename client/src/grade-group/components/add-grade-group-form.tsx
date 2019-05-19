import React from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, Row, Col, FormGroup, Button, CardBody, CardFooter } from 'reactstrap';
import { l10n } from '../../l10n';
import { ApiService } from '../../shared/api.service';
import { apiRoutes } from '../../api.routes';

type AddGradeGroupFormProps = {
    onSubmit: (formData: any) => any,
    onCancel: () => any
}

function useTeachers(): any[] {
    const [teachers, setTeachers] = React.useState([])
  
    React.useEffect(function() {
      ApiService.get(apiRoutes.teachers).then(teachers => setTeachers(teachers))
    }, [])
  
    return teachers;
  }

export function AddGradeGroupForm(props: AddGradeGroupFormProps) {
    const acceptableYears = Array.from(new Array(20), (val, index) => new Date().getFullYear() - index);
    const acceptableGroups = ['A', 'B', 'C', 'D'];
    const teachers = useTeachers();
    return (
        <FinalForm onSubmit={props.onSubmit} render={({ handleSubmit, form }) => {
            return (
                <Form onSubmit={e => handleSubmit(e)!.then(form.reset)} autoComplete="off">
                    <CardBody>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Field
                                        name="admissionYear"
                                        className="form-control"
                                        component="select"
                                    >
                                        <option>Select year</option>
                                        {acceptableYears.map(year => (
                                            <option value={year} key={year}> {year} </option>
                                        ))}
                                        }}
                                    </Field>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Field
                                        name="group"
                                        className="form-control"
                                        component="select"
                                    >
                                        <option>Select group</option>
                                        {acceptableGroups.map((group, index) => (
                                            <option value={group} key = {`${group}${index}`}> {group} </option>
                                        ))}
                                        }}
                                    </Field>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Field
                                        name="classMaster"
                                        className="form-control"
                                        component="select"
                                    >
                                        <option>Select teacher</option>
                                        {teachers.map((teacher, index) => (
                                            <option value={teacher.id} key = {teacher.id}> {`${teacher.firstName} ${teacher.lastName}`} </option>
                                        ))}
                                        }}
                                    </Field>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Button color="success" className="mr-3">Save</Button>
                        <Button onClick={props.onCancel}>Cancel</Button>
                    </CardFooter>
                </Form>
            )
        }} />
    )
}
