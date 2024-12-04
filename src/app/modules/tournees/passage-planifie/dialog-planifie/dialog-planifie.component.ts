import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvPayload, selectEnvIsLoading, selectEnvError, appSelectCustomer } from 'app/core/store/customer/customer.selectors';
import { SearchService } from 'app/services/search.service';

@Component({
  selector: 'app-dialog-planifie',
  templateUrl: './dialog-planifie.component.html',
  styleUrls: ['./dialog-planifie.component.css'],
})
export class DialogPlanifieComponent implements OnInit {
  // [0 => 'SU', 1 => 'MO', 2 => 'TU', 3 => 'WE', 4 => 'TH', 5 => 'FR', 6 => 'SA'];
  clients: any;
  addresses: any;
  adresseSpinner: boolean = false;
  spinnerAdd: boolean = false;
  spinner: boolean = false;
  createPassage: FormGroup;
  isChecked: any;
  heure: any;

  daysConfig = [
    {
      index: 0,
      name: 'Dimanche',
    },
    {
      index: 1,
      name: 'Lundi',
    },
    {
      index: 2,
      name: 'Mardi',
    },
    {
      index: 3,
      name: 'Mercredi',
    },
    {
      index: 4,
      name: 'Jeudi',
    },
    {
      index: 5,
      name: 'Vendredi',
    },
    {
      index: 6,
      name: 'Samedi',
    },
  ];
  display: boolean;
  constructor(private store: Store<AppState>,
    public dialogRef: MatDialogRef<DialogPlanifieComponent>,
    private boGridService: BoGridService,
    private _toast: ToastService,
    private search :SearchService
  ) { }

  ngOnInit(): void {
    this.spinner = true;
    this.setForm();
    this.daysConfig.map((day) => {
      this.days.push(
        new FormGroup({
          index: new FormControl(day.index),
          name: new FormControl(day.name),
          checkbox: new FormControl(false),
          hours: new FormControl([{ value: '10:00' }]),
        })
      );
    });

    this.store.select(selectEnvPayload).subscribe((res) => {  
      this.clients = res
      console.log(" client========>", this.clients)
    });

    this.store.select(selectEnvIsLoading).subscribe((res) => {  
      this.spinner = res
      console.log(" spinner========>", this.spinner)
    });

    // this.boGridService.getCustomer().subscribe(
    //   (data) => {
    //     this.spinner = false;
    //     this.clients = data['response'];
    //     console.log('allClient', this.clients);
    //   },
    //   (error) => {
    //     console.log('error', error);
    //   }
    // );
  }

  onChangeDemo(ob) {
    console.log('checked: ' + ob.checked);
    this.isChecked = ob.checked;
  }

  addHour(idx: number) {
    const currentHours = this.days.value[idx].hours;
    currentHours.push({ value: '10:00' });
    this.days.controls[idx].patchValue({
      hours: currentHours,
    });
  }

  removeHour(idx: number) {
    const currentHours = this.days.value[idx].hours;
    currentHours.removeAt(idx);
  }

  setForm() {
    this.createPassage = new FormGroup({
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
      customer_id: new FormControl('', Validators.required),
      customer_name: new FormControl('', Validators.required),

      pickup_address_id: new FormControl('', Validators.required),
      days: new FormArray([]),
    });
  }

  get days() {
    return this.createPassage.controls['days'] as FormArray;
  }

  addPassage() {
    this.spinnerAdd = true;
    const payload = { ...this.createPassage.value }
    payload.days = payload.days.map((day: any) => {
      day.hours = day.hours.map((h: any) => h.value)
      return day;
    })
    console.log(payload);
    this.boGridService.addPassagePlanified(payload).subscribe(
      (data) => {
        console.log('passages ', data);
        this.dialogRef.close(data);
        this.spinnerAdd = false;
        this._toast.success('Passage ajouté avec succes');
      },
      (error) => {
        this._toast.error(
          "Une erreur est survenue lors de l'ajout de passage !"
        );
      }
    );
  }

  // clientChange($event) {
  //   console.log('id client', $event.value);
  //   console.log(this.clients[$event.value]);
  //   if (!this.clients.find((client) => client.id == $event.value).pick_up_adresses?.length) {
  //     //this.addresses = this.clients[$event.value].pick_up_adresses;
  //     this.adresseSpinner = false;
  //     this._toast.error("Ce client n'a aucune adresse de ramassage !");
  //   } else {
  //     this.addresses = this.clients.find((client) => client.id == $event.value).pick_up_adresses
  //     this.adresseSpinner = true;
  //   }
  // }


  is_show() {
  }

  modelChangeFn(query: string) {
    this.display = !this.display
    if (query !== '') {
      this.search.getClient(query).subscribe(res => {
        this.clients = res.response;
      })
    } else {
      this.clients = [];
    }
  }


  to_fill(val: any) {

 
    
    
    if (val.pick_up_adresses.length == 0) {

      this.adresseSpinner = false;
      this._toast.error("Ce client n'a aucune adresse de ramassage !");
    } else {
      this.addresses = val.pick_up_adresses
      this.adresseSpinner = true;
      this.createPassage.patchValue({
        customer_id: val?.id,
        customer_name: val.name
      });
    }
 
  }

}
