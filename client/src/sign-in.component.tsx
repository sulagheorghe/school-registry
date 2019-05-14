import React from 'react'
import { Form as FinalForm, Field, FieldRenderProps } from 'react-final-form'
import { Form, FormGroup, Input as ReactInput, Label, Button } from 'reactstrap'
import { l10n } from './l10n';
import { ApiService } from './shared/api.service';
import { apiRoutes } from './api.routes';

function onSubmit(formData: any) {
  return ApiService.post(apiRoutes.signIn, formData)
}

function Input(props: FieldRenderProps<HTMLElement>) {
  return <ReactInput {...props.input} />
}

export function SignIn() {
  return (
    <FinalForm onSubmit={onSubmit} render={({ handleSubmit }) => {
      return (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">{l10n('label.email')}</Label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder={l10n('label.email')}
              component={Input}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">{l10n('label.password')}</Label>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder={l10n('label.password')}
              component={Input}
            />
          </FormGroup>
          <Button>{l10n('label.submit')}</Button>
        </Form>
      )
    }} />
  )
}
