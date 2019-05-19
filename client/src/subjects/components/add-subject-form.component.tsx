import React from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, Row, Col, FormGroup, Button, CardBody} from 'reactstrap';
import { l10n } from '../../l10n';

type AddSubjectFormProps = {
    onSubmit: (formData: any) => any,
    onCancel: () => any
}

export function AddSubjectForm(props: AddSubjectFormProps) {
    return (
        <FinalForm onSubmit={props.onSubmit} render={({ handleSubmit, form }) => {
            return (
                <Form onSubmit={e => handleSubmit(e)!.then(form.reset)} autoComplete="off">
                    <CardBody>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Field
                                        name="name"
                                        className="form-control"
                                        component="input"
                                        placeholder={l10n('label.subjectName')}
                                    />
                                </FormGroup> 
                            </Col>
                        </Row>
                    </CardBody>
                    <CardBody>
                        <Button color="success" className="mr-3">Save</Button>
                        <Button onClick={props.onCancel}>Cancel</Button>
                    </CardBody>
                </Form>
            )
        }} />
    )
}