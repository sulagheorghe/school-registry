import React from 'react'
import { ListGroupItem, Button, CardHeader, Card, Collapse, Table } from 'reactstrap'
import { ApiService } from '../shared/api.service';
import { apiRoutes } from '../api.routes';
import { RouteComponentProps } from 'react-router';
import { AddStudentForm } from './components/add-student-form.component';
import { l10n } from '../l10n'
import { formatGradeGroup } from '../utils/format-grade-group';

type StudentsState = {
  students: any[] | undefined
  showAddStudentForm: boolean
}

export class Students extends React.Component<RouteComponentProps, StudentsState> {
  state: StudentsState = {
    students: undefined,
    showAddStudentForm: false,
  }

  componentDidMount() {
    ApiService.get(apiRoutes.students).then(students => this.setState({ students }))
  }

  render() {
    const { students, showAddStudentForm } = this.state


    if (!students) {
      return <div>Loading...</div>
    }

    return (
      <React.Fragment>
        <Card className="mb-3">
          <CardHeader>
            <Button
              color="secondary"
              onClick={this.toggleAddStudentForm}
              disabled={showAddStudentForm}>
              {l10n('label.addStudent')}
            </Button>
          </CardHeader>
          <Collapse isOpen={showAddStudentForm}>
            <AddStudentForm
              onCancel={this.toggleAddStudentForm}
              onSubmit={this.submitAddStudentForm}
            />
          </Collapse>
        </Card>
        {students.length === 0 && <ListGroupItem>No Students</ListGroupItem>}
        {students.length !==0 && <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>{l10n('label.lastname')}</th>
              <th>{l10n('label.firstname')}</th>
              <th>{l10n('label.groupGrade')}</th>
              <th>{l10n('label.email')}</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map((student, index) =>
                <tr key={student.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {student.firstname}
                  </td>
                  <td>
                    {student.lastname}
                  </td><td>
                    {formatGradeGroup(student.gradeGroup)}
                  </td>
                  <td>
                    {student.email}
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>
        }
      </React.Fragment >
    )
  }

  toggleAddStudentForm = () => {
    this.setState({ showAddStudentForm: !this.state.showAddStudentForm })
  }

  submitAddStudentForm = (formData: any) => {
    return ApiService.post(apiRoutes.students, formData)
      .then(student => {
        this.setState({
          students: [student, ...this.state.students!],
          showAddStudentForm: false,
        })
      })
  }
}