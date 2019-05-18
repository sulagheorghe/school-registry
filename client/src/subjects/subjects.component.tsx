import { default as React } from 'react'
import { Table, Button } from 'reactstrap'
import { ApiService } from '../shared/api.service'
import { subjectsRoutes } from './subjects.routes'
import { l10n } from '../l10n';
import { ISubject } from '../../../common/interfaces/subject.interface';

type SubjectState = {
  subjects: ISubject[],
  editable: number
}

export class Subjects extends React.Component<any, SubjectState> {
  constructor(props: any) {
    super(props);
    this.state = {
      subjects: [],
      editable: -1
    }
    this.onNewClick = this.onNewClick.bind(this);
  }

  componentDidMount() {
    ApiService
      .get(subjectsRoutes.list.path)
      .then(result => this.setState({ subjects: result }))
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
    try {
      if (subject.id) {
        await ApiService.put(subjectsRoutes.detail.url({ id: subject.id }),subject)
      } else {
        const result = await ApiService.post(subjectsRoutes.create.url(), subject); 
        this.setState({
          subjects: this.state.subjects.concat(result),
          editable: this.state.subjects.length
        })
      }
    } catch(e) {
      alert(e.message);
    }
  }

  onNewClick = (lastEdited:number) => (e:any) => {
    const newSubject = {
      name: ''
    };
    this.setState({
      subjects: this.state.subjects.concat(newSubject),
      editable: lastEdited
    })

  }

  render() {
    const { subjects, editable } = this.state;
    return (<div>
      <Table striped>
        <thead>
          <tr key={subjects.length + 1}>
            <th>#</th>
            <th>{l10n('label.subjectTitle')}</th>
          </tr>
        </thead>
        <tbody>
          {
            subjects.map((subject, index) =>
              <tr key={subject.id}>
                <th scope="row">{subject.id}</th>
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
      <Button onClick={this.onNewClick(subjects.length)} color="secondary">Disciplina noua</Button>
    </div>
    );
  }
}
