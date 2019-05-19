import { default as React } from 'react'
import { Table, Button, Collapse } from 'reactstrap'
import { ApiService } from '../shared/api.service'
import { apiRoutes } from '../api.routes'
import { l10n } from '../l10n';
import { ISubject } from '../../../common/interfaces/subject.interface';
import { AddSubjectForm} from './components/add-subject-form.component';

type SubjectState = {
  subjects: ISubject[],
  editable: number,
  showAddSubjectForm: boolean
}

export class Subjects extends React.Component<any, SubjectState> {
  constructor(props: any) {
    super(props);
    this.state = {
      subjects: [],
      editable: -1,
      showAddSubjectForm: false
    }
  }

  componentDidMount() {
    ApiService
      .get(apiRoutes.subjects)
      .then(subjects => this.setState({ subjects: subjects }))
      .catch(error => alert(error.message));
  }

  onChange = (subject: ISubject) => (e: any) => {
    const value = e.target.value;
    this.setState(({ subjects }) => {
      const result = subjects.map((subj) => {
        if (subj.id === subject.id) {
          subj.name = value
        }
        return subj;
      });
      return ({
        subjects: result
      })
    });
  };

  onClick = (index: number) => (e: any) => this.setState({ editable: index });

  onBlur = (subject: ISubject) => async  (e: any) => {
      await ApiService.put(apiRoutes.subjectDetail(subject.id? subject.id: 0), subject)
  } 

  toggleAddSubjectForm = () => {

    this.setState({showAddSubjectForm: !this.state.showAddSubjectForm })
  }

  submitAddStudentForm = (formData: any) => {
    return ApiService.post(apiRoutes.subjects, formData)
      .then(subject => {
        this.setState({
          subjects: this.state.subjects.concat(subject),
          showAddSubjectForm: false
        })
      })
  }

  render() {
    const { subjects, editable, showAddSubjectForm } = this.state;
    return (<div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>{l10n('label.subjectTitle')}</th>
          </tr>
        </thead>
        <tbody>
          {
            subjects.map((subject, index) =>
              <tr key={subject.id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <input
                    type="text"
                    style={{ paddingLeft: "0.75rem" }}
                    readOnly={index !== editable}
                    className={
                      index === editable ? "form-control" : "form-control-plaintext"
                    }
                    value={subject.name}
                    onChange={this.onChange(subject)}
                    onClick={this.onClick(index)}
                    onBlur={this.onBlur(subject)}
                  /></td>
              </tr>
            )
          }
        </tbody>
      </Table>
      <Button 
        disabled={showAddSubjectForm}
        onClick={this.toggleAddSubjectForm} 
        color="secondary">
        {l10n('label.newSubject')}
      </Button>
      <Collapse isOpen={showAddSubjectForm}>
            <AddSubjectForm
              onCancel={this.toggleAddSubjectForm}
              onSubmit={this.submitAddStudentForm}
            />
          </Collapse>
    </div>
    );
  }
}
