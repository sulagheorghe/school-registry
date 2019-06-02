import React from 'react'
import { Table, Button, Collapse, Card, Spinner, Alert, CardHeader } from 'reactstrap'
import { l10n } from '../l10n';
import { ApiService } from '../shared/api.service';
import { apiRoutes } from '../api.routes';
import { AddGradeGroupForm } from './components/add-grade-group-form';
import { formatGradeGroup } from '../utils/format-grade-group';

type GradeGroupState = {
    gradeGroups: any[],
    showAddGradeGroupForm: boolean
}

export class GradeGroup extends React.Component<any, GradeGroupState> {
    state: GradeGroupState = {
        gradeGroups: [],
        showAddGradeGroupForm: false
    }

    async componentDidMount() {
        const gradeGroups = await ApiService.get(apiRoutes.gradeGroups);
        this.setState({
            gradeGroups: gradeGroups
        })
    }

    toggleShowCreateGradeForm = () =>
        this.setState({
            showAddGradeGroupForm: !this.state.showAddGradeGroupForm
        })

    submitAddStudentForm = (formdata: any) => {
        return ApiService.post(apiRoutes.gradeGroups, formdata).then((gradeGroup) => {
            this.setState({
                gradeGroups: this.state.gradeGroups.concat(gradeGroup),
                showAddGradeGroupForm: false
            })
        })
    }


    render() {
        const { gradeGroups, showAddGradeGroupForm } = this.state;

        if (!gradeGroups) {
            return <div><Spinner style={{ width: '3rem', height: '3rem' }} /></div>
        }

        return (

            <React.Fragment>
                <Card>
                    <CardHeader>
                        <Button
                            disabled={showAddGradeGroupForm}
                            onClick={this.toggleShowCreateGradeForm}
                            color="secondary">
                            {l10n('label.newGroup')}
                        </Button>
                    </CardHeader>
                    <Collapse isOpen={showAddGradeGroupForm}>
                        <AddGradeGroupForm
                            onCancel={this.toggleShowCreateGradeForm}
                            onSubmit={this.submitAddStudentForm}
                        />
                    </Collapse>
                </Card>
                {gradeGroups.length === 0 && <Alert color="secondary">No grade groups added yet.</Alert>}

                {gradeGroups.length !== 0 && <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{l10n('label.admissionYear')}</th>
                            <th>{l10n('label.group')}</th>
                            <th>{l10n('label.groupGrade')}</th>
                            <th>{l10n('label.classMaster')}</th>
                        </tr>
                    </thead>
                    <tbody> {
                        gradeGroups.map((gradeGroup, index) =>
                            <tr key={gradeGroup.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{gradeGroup.admissionYear}</td>
                                <td>{gradeGroup.group}</td>
                                <td>{formatGradeGroup(gradeGroup)}</td>
                                <td>{gradeGroup.classMaster.firstName + ' ' + gradeGroup.classMaster.lastName}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
                }
                <Card className="mb-3">

                </Card>
            </React.Fragment>
        )
    }
}