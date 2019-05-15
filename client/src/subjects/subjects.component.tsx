import { default as React } from 'react'
import { ApiService } from '../shared/api.service'
import { subjectsRoutes} from './subjects.routes'


export class Subjects extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      subjects: []
    }
  }

  componentDidMount() {
    ApiService.get(subjectsRoutes.list.path).then(result => this.setState({subjects: result}));
  }
  
  render() {
    const { subjects } = this.state;
    console.log(subjects);
    return (
      <div></div>
    );
  }
}
