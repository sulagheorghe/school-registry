import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Card, CardHeader, Button, Collapse, ListGroupItem, Table } from 'reactstrap';
import { l10n } from '../l10n';
import { AddTeacherForm } from './components/add-teacher-form.component';
import { ApiService } from '../shared/api.service';
import { apiRoutes } from '../api.routes';

type TeachersState = {
  teachers: any[] | undefined,
  showAddTeacherForm: boolean
}

export class Teachers extends React.Component<RouteComponentProps, TeachersState> {
  state: TeachersState = {
    teachers: [],
    showAddTeacherForm: false
  }

  async componentDidMount() {
    const teachers = await ApiService.get(apiRoutes.teachers);
    this.setState({ teachers: teachers })
  }

  render() {
    const { teachers, showAddTeacherForm } = this.state;
    if (!teachers) {
      return <div>Loading...</div>
    }

    return (
      <React.Fragment>
        <Card className="mb-3">
          <CardHeader>
            <Button
              color="secondary"
              onClick={this.toggleAddTeacherForm}
              disabled={showAddTeacherForm}>
              {l10n('label.addTeacher')}
            </Button>
          </CardHeader>
          <Collapse isOpen={showAddTeacherForm}>
            <AddTeacherForm
              onCancel={this.toggleAddTeacherForm}
              onSubmit={this.submitAddTeacherForm}
            />
          </Collapse>
        </Card>
        {teachers.length === 0 && <ListGroupItem>No Students</ListGroupItem>}
        {teachers.length !== 0 && <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>{l10n('label.lastname')}</th>
              <th>{l10n('label.firstname')}</th>
              <th>{l10n('label.email')}</th>
              <th>{l10n('label.phoneNumber')}</th>
              <th>{l10n('label.role')}</th>
            </tr>
          </thead>
          <tbody>
            {
              teachers.map((teacher, index) =>
                <tr key={teacher.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {teacher.firstName}
                  </td>
                  <td>
                    {teacher.lastName}
                  </td><td>
                    {teacher.email}
                  </td>
                  <td>
                    {teacher.phoneNumber}
                  </td>
                  <td>
                    {teacher.role}
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>
        }
      </React.Fragment>
    )
  }

  toggleAddTeacherForm = () => {
    this.setState({ showAddTeacherForm: !this.state.showAddTeacherForm })
  }

  submitAddTeacherForm = (formData: any) => {
    return ApiService.post(apiRoutes.teachers, formData)
      .then(teacher => {
        this.setState({
          teachers: [...this.state.teachers!, teacher],
          showAddTeacherForm: false
        })
      })
  }
}