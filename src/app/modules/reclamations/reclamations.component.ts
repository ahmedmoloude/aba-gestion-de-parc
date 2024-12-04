import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { loadComplaints, selectedComplaint } from 'app/core/store/complaint';
import { AppState } from 'app/core/store/app.states';
import { selectedTask } from 'app/core/store/tasks/tasks.actions';
import { ReclamationDetailComponent } from './reclamation-detail/reclamation-detail.component';
import {
  selectComplaintIsLoading,
  selectComplaints,
} from 'app/core/store/complaint/complaint.selectors';
import { DETAILS_COMPLAINT } from '../../config/vars.config';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import * as moment from 'moment';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.scss'],
})
export class ReclamationsComponent implements OnInit {
  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  isLoading$ = this.store.select(selectComplaintIsLoading);
  groupedTasks: any;
  complaintForm: FormGroup;
  detailsComplaint = DETAILS_COMPLAINT;

  openReclamationDetailDialog(data: any): void {
    this.store.dispatch(selectedComplaint({ complaint: data.complaint }));
    this.dialog.open(ReclamationDetailComponent, {
      disableClose: true,
      width: '1600px',
      data,
    });
  }

  ngOnInit(): void {
    // this.store.dispatch(fetchTasks())
    this.setFilterForm();
    this.store.dispatch(loadComplaints({ filter: this.complaintForm.value }));
    // this.store.select(selectTaskPayload).subscribe(tasks => {
    //   this.resetGroupedTasks();
    //   for (const item of tasks) {
    //     this.groupedTasks[item.status].push(item)
    //   }
    // });
    this.store.select(selectComplaints).subscribe((state) => {
      this.resetGroupedTasks();
      state[0].forEach((item) => {
        this.groupedTasks[item.status].push(item);
      });
    });
    this.dateValidators();
  }

  dateValidators() {
    this.complaintForm
      .get('created_at_range.start')
      .valueChanges.subscribe((value) => {
        if (value) {
          this.complaintForm
            .get('created_at_range.end')
            .setValidators(Validators.required);
          this.complaintForm
            .get('created_at_range.end')
            .updateValueAndValidity();
        } else {
          this.complaintForm.get('created_at_range.end').clearValidators();
        }
      });
    // this.complaintForm.get('created_at_range.end').valueChanges
    // .subscribe(value => {
    // }
    // );
  }

  resetGroupedTasks() {
    this.groupedTasks = {
      CREATED: [],
      IN_PROGRESS: [],
      UNSOLVED: [],
      FINISHED: [],
    };
  }

  setFilterForm() {
    this.complaintForm = new FormGroup({
      parent: new FormControl(true),
      is_interne: new FormControl(false),
      types: new FormControl('Expedition,Invoice,General'),
      reference: new FormControl(''),
      created_at: new FormControl(''),
      status: new FormControl(''),
      permissions: new FormControl(true),
      num_envoi: new FormControl(''),
      created_at_range: new FormGroup({
        start: new FormControl(''),
        end: new FormControl(''),
      }),
    });
  }

  clearDate() {
    this.complaintForm.patchValue({
      created_at_range: {
        start: '',
        end: '',
      },
      created_at: '',
    });
  }

  openTaskDetailDialog(data) {
    // this.store.dispatch(getTask({ uuid: data.task.uuid }))
    this.store.dispatch(selectedTask({ task: data.task }));
    this.dialog.open(TaskDetailComponent, {
      disableClose: true,
      width: '1600px',
      data,
    });
  }

  applyFilter() {
    let start_date = this.complaintForm.get('created_at_range.start').value;
    let end_date = this.complaintForm.get('created_at_range.end').value;
    if (start_date && end_date) {
      this.complaintForm.controls['created_at'].setValue(
        moment(start_date).format('YYYY-MM-DD HH:mm:ss') +
          '_' +
          moment(end_date).format('YYYY-MM-DD HH:mm:ss')
      );
    }
    this.store.dispatch(loadComplaints({ filter: this.complaintForm.value }));
  }

  userDirection(tasks) {
    return tasks
      .map((item) =>
        item.assigned_user && item.assigned_user.email
          ? item.assigned_user.email.split('@')[0].split('-')[1] // todo refactor this by getting role
          : ''
      )
      .join(' | ');
  }
}
