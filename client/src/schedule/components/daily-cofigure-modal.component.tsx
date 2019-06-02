import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardHeader,
  Collapse
} from "reactstrap";
import { GradeGroupInterface } from "../../../../common/interfaces/grade-group.interface";
import { AddScheduleRecordForm } from "./add-schedule-record-form.component";
import { ApiService } from "../../shared/api.service";
import { apiRoutes } from "../../api.routes";

type DailyConfigureModalProps = {
  dayOfWeek: string;
  gradeGroup: GradeGroupInterface;
  currentDaySchedule: any[];
  isOpen: boolean;
  toggle: () => any;
  updateCurrentSchedule: (newRecord: any) => any;
};

type DailyConfigureModalState = {
  showAddRecordForm: boolean;
  currentDaySchedule: any[];
};

export class DailyConfigureModal extends React.Component<
  DailyConfigureModalProps,
  DailyConfigureModalState
> {
  state: DailyConfigureModalState = {
    showAddRecordForm: false,
    currentDaySchedule: this.props.currentDaySchedule
  };

  render = () => {
    console.log(this.state, this.props);
    const { showAddRecordForm, currentDaySchedule } = this.state;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          {this.props.dayOfWeek}
        </ModalHeader>
        <ModalBody>
          <ol type="1">
            {currentDaySchedule.map(record => (
              <li key={record.subject.id}>{record.subject.name}</li>
            ))}
          </ol>
          <Card className="mb-3">
            <CardHeader>
              <Button
                color="secondary"
                onClick={this.toggleAddRecordForm}
                disabled={showAddRecordForm}
              >
                Add
              </Button>
            </CardHeader>
            <Collapse isOpen={showAddRecordForm}>
              <AddScheduleRecordForm
                onCancel={this.toggleAddRecordForm}
                onSubmit={this.submitAddRecordForm}
              />
            </Collapse>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={this.props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  toggleAddRecordForm = () => {
    this.setState({
      showAddRecordForm: !this.state.showAddRecordForm
    });
  };

  submitAddRecordForm = (formData: any) => {
    const request = {
      gradeGroup: this.props.gradeGroup.id,
      dayOfWeek: this.props.dayOfWeek,
      ...formData
    };
    return ApiService.post(apiRoutes.schedule, request).then(newRecord => {
      this.setState({
        showAddRecordForm: false
      });
      this.props.updateCurrentSchedule(newRecord);
    });
  };
}
