import React from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Label, Button } from 'reactstrap'
import { l10n } from './l10n';
import { ApiService } from './shared/api.service';
import { apiRoutes } from './api.routes';
import { RouteComponentProps } from 'react-router';
import { appRoutes } from './app.routes';
import { GlobalContext } from './shared/global.context';

type SignInResponse = {
  access_token: string
}

type SignInFormData = {
  email: string,
  password: string
}

function saveToLocalStorage(response: SignInResponse): SignInResponse {
  localStorage.setItem('access_token', response.access_token)
  return response
}

export function SignIn(props: RouteComponentProps) {
  const context = React.useContext(GlobalContext)
  function onSubmit(formData: any) {
    return ApiService
      .post<SignInResponse>(apiRoutes.signIn, formData)
      .then(saveToLocalStorage)
      .then(context.setProfile)
      .then(() => props.history.push(appRoutes.home.url()))
  }

  return (
    <FinalForm onSubmit={onSubmit} render={({ handleSubmit }) => {
      return (
        <Form onSubmit={handleSubmit} autoComplete="off">
          <FormGroup>
            <Label for="email">{l10n('label.email')}</Label>
            <Field
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder={l10n('label.email')}
              component="input"
              autoComplete="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">{l10n('label.password')}</Label>
            <Field
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder={l10n('label.password')}
              component="input"
              autoComplete="current-password"
            />
          </FormGroup>
          <Button>{l10n('label.submit')}</Button>
        </Form>
      )
    }} />
  )
}
