import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addTask, selectComplaint, selectedTask } from 'app/core/store';
import { map } from 'rxjs/operators';
import { AppState } from 'app/core/store/app.states';
import {
  COMPLAINT_STATUS,
  DETAILS_COMPLAINT,
  TASK_STATUS,
} from '../../../config';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { selectAuthUser } from 'app/core/store/profil/profil.selectors';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { selectAccountPayload } from 'app/core/store/accounts/accounts.selectors';
import { ShowImageComponent } from 'app/components';
import { addMessage } from 'app/core/store/messages/message.action';

@Component({
  selector: 'app-reclamation-detail',
  templateUrl: './reclamation-detail.component.html',
  styleUrls: ['./reclamation-detail.component.scss'],
})
export class ReclamationDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ReclamationDetailComponent>,
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {}
  selectedComplaint: any;
  status = COMPLAINT_STATUS;
  statusLength = Object.keys(COMPLAINT_STATUS).length;
  detailsComplaint = DETAILS_COMPLAINT;
  messageForm: FormGroup;
  messages$: any;
  loggedUser: any;
  isSuperAdmin = false;
  statusTask = TASK_STATUS;
  taskForm: FormGroup;
  label = {
    Expedition: "N° de l'expédition",
    Invoice: 'N° de la facture',
  };
  detailsExp = [
    {
      label: 'Client',
      value: '',
      supp: '',
    },
    {
      label: 'Destinataire',
      value: ['receiver', 'first_name'],
      supp: '',
    },
    {
      label: 'Adresse de ramassage',
      value: ['adress_expedition'],
      icon: 'place',
      supp: '',
    },
    {
      label: 'Adresse de livraison',
      value: ['adress_delivery'],
      icon: 'place',
      supp: '',
    },
    // {
    //   label: 'Ville de ramassage',
    //   value: ['city_expedition'],
    //   icon: 'place',
    //   supp: '',
    // },
    // {
    //   label: 'Ville de livraison',
    //   value: ['city_destination'],
    //   icon: 'place',
    //   supp: '',
    // },
    {
      label: 'Valeur déclarée',
      value: ['declared_value'],
      supp: 'Dhs',
    },

    {
      label: 'HT',
      value: ['amount'],
      supp: 'Dhs',
    },
  ];
  accounts$ = this.store.select(selectAccountPayload);

  ngOnInit(): void {
    this.store.select(selectComplaint).subscribe((state) => {
      this.selectedComplaint = state;
      this.setForm();
    });

    this.store.select(selectAuthUser).subscribe((state) => {
      this.loggedUser = state;
      // Todo specifier le role manager des reclamations
      if (state.email.split('@')[0].split('-')[1] === 'bo') {
        this.isSuperAdmin = true;
      }
    });
  }

  setForm() {
    this.messageForm = new FormGroup({
      message: new FormControl('', Validators.required),
      complaint_id: new FormControl(this.selectedComplaint.id),
      is_interne: new FormControl(false),
    });
    this.taskForm = new FormGroup({
      description: new FormControl(''),
      assigned_user: new FormControl(''),
      id_complaint: new FormControl(''),
    });
  }

  deepValue(obj, keys) {
    return keys.reduce((newObj, item) => {
      return newObj && newObj[item] !== null && newObj[item] !== undefined
        ? newObj[item]
        : null;
    }, obj);
  }

  prepareIds(details) {
    return details.map((item) => item.reference).join('. ');
  }

  addMessage() {
    this.store.dispatch(addMessage(this.messageForm.value));
  }

  openTaskDetailDialog(data) {
    // this.store.dispatch(getTask({ uuid: data.task.uuid }))
    this.store.dispatch(selectedTask({ task: data.task }));
    this.dialog.open(TaskDetailComponent, {
      disableClose: true,
      width: '1600px',
      data,
    });
    this.dialogRef.close();
  }

  fileName(file) {
    // let name = path.split('/');
    // return name[name.length - 1];
    return file['id'] + '.' + file['extension'];
  }

  openImage(data): void {
    this.dialog.open(ShowImageComponent, {
      disableClose: true,
      width: '1400px',
      data,
    });
  }

  onSubmit(id) {
    this.taskForm.controls['id_complaint'].setValue(id);
    this.store.dispatch(addTask({ data: this.taskForm.value }));
  }
}
