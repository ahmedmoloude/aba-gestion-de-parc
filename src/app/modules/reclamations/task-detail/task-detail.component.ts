import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {  selectTask, updateTask } from 'app/core/store';
import { selectAccountPayload } from 'app/core/store/accounts/accounts.selectors';
import { AppState } from 'app/core/store/app.states';
import { selectAuthUser } from 'app/core/store/profil/profil.selectors';
import { ToastService } from 'app/services';
import { debounceTime, map } from 'rxjs/operators';
import { TASK_STATUS } from '../../../config/vars.config';
import { addMessage } from 'app/core/store/messages/message.action';



@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  selectedTask: any;
  taskForm: FormGroup;
  messageForm: FormGroup
  loggedUser: any;
  accounts$ = this.store.select(selectAccountPayload);
  isSuperAdmin = false;
  statusMapper = TASK_STATUS



  constructor(
    public dialogRef: MatDialogRef<TaskDetailComponent>,
    private store: Store<AppState>,
    public _toast: ToastService
  ) {}


  ngOnInit(): void {
    this.store.select(selectAuthUser).subscribe((state) => {
      this.loggedUser = state;
      // Todo specifier le role manager des reclamations
      if (state.email.split("@")[0].split("-")[1] === 'bo') {
        this.isSuperAdmin = true
      }

    });
    this.store.select(selectTask).subscribe((state) => {
      console.log('-------------- task in compoment', state)
      this.selectedTask = state;
      this.setForm();
    });
    this.taskForm.get('description').valueChanges.pipe(
      debounceTime(2000),
      map((value) => this.storeDescription(value))
      ).subscribe()
  }

  storeDescription(value){
    if (value) {
      this.store.dispatch(updateTask({uuid: this.selectedTask.uuid, data:{description: value}}))
    }
  }
  setForm(){
    this.taskForm = new FormGroup({
      description: new FormControl(''),
      status: new FormControl(''),
      assigned_user: new FormControl(this.selectedTask.assigned_user ? this.selectedTask.assigned_user.id : ''),
      id_complaint: new FormControl(this.selectedTask.complaint_id),
    });
    this.messageForm = new FormGroup({
      message: new FormControl('', Validators.required),
      complaint_id: new FormControl(this.selectedTask.complaint_id),
      task_id: new FormControl(this.selectedTask.id),
      is_interne: new FormControl(true),
    });
  }

  resetTask() {
    this.store.dispatch(
      updateTask({
        uuid: this.selectedTask.uuid,
        data: { status: "OPEN", assigned_user: null, id_complaint: this.selectedTask.complaint_id},
      })
    );
    this.dialogRef.close();
  }


  onSubmit() {
    let payload = { ...this.taskForm.value }


    if (this.isSuperAdmin) {
      /* error */
      if (this.selectedTask.status === 'OPEN' && !payload.assigned_user) {
        this._toast.error("Merci d'assigner le ticket a un compte !")
        return;
      }
      /* */

      if (this.selectedTask.status === 'OPEN' && this.taskForm.controls['status'].value == '') {
        this.taskForm.controls['status'].setValue('OPEN')
      }
      // else {
      //   if (payload.assigned_user != this.authUserId) {
      //     payload.status = 'IN_PROGRESS'
      //   }
      // }
    } else {
      // payload.assigned_user = this.authUserId
      this.taskForm.controls['assigned_user'].setValue(this.loggedUser.id)

      if (this.selectedTask.status === 'OPEN' && this.taskForm.controls['status'].value == '') {
        this.taskForm.controls['status'].setValue('OPEN')
      }
    }
    this.taskForm.controls['description'].disable()
    this.store.dispatch(
      updateTask({
        uuid: this.selectedTask.uuid,
        data: this.taskForm.value,
      })
    );
    this.dialogRef.close();

  }

  addMessage() {
    this.store.dispatch(addMessage(this.messageForm.value));
  }
}
