import React from 'react'
import { ListGroup, ListGroupItem, Button, CardHeader, Card, Collapse } from 'reactstrap'
import { ApiService } from '../shared/api.service';
import { apiRoutes } from '../api.routes';
import { RouteComponentProps } from 'react-router';
import { AddStudentForm } from './components/add-student-form.component';

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
              color="link"
              onClick={this.toggleAddStudentForm}
              disabled={showAddStudentForm}>
              Add student
            </Button>
          </CardHeader>
          <Collapse isOpen={showAddStudentForm}>
            <AddStudentForm
              onCancel={this.toggleAddStudentForm}
              onSubmit={this.submitAddStudentForm}
            />
          </Collapse>
        </Card>
        <ListGroup>
          {students.length === 0 && <ListGroupItem>No Students</ListGroupItem>}
          {students.map(s => (
            <ListGroupItem key={s.id}>{s.email}</ListGroupItem>
          ))}
        </ListGroup>
      </React.Fragment>
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