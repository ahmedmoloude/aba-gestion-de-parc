import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AffretementService } from 'app/core/services/affretement.service';
import { AppState } from 'app/core/store/app.states';

import {
  getCurrentStepSuccess,
  getDateReservationSuccess,
  getVehicules,
} from 'app/core/store/reservation/reservation.actions';
@Component({
  selector: 'app-dialog-reservation',
  templateUrl: './dialog-reservation.component.html',
  styleUrls: ['./dialog-reservation.component.css'],
})
export class DialogReservationComponent implements OnInit {
  formDate: FormGroup;
  step: number = 0;
  date_debut: any;
  todayDate: any;
  affretment_types = [];

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private affretmentService: AffretementService
  ) {}

  ngOnInit(): void {
    this.affretmentService.getAffretementTypes().subscribe((res) => {
      this.affretment_types = res;
    });
    this.store.dispatch(getCurrentStepSuccess({ currentStep: this.step }));
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    this.todayDate = formattedDate;
    //this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    console.log(this.todayDate); // Output: '2023-06-06'

    this.formDate = new FormGroup({
      date_debut: new FormControl('', [Validators.required]),
      date_fin: new FormControl('', [Validators.required]),
      affretment_type_id: new FormControl('', [Validators.required]),
    });
  }


  setDateDebutReservation(date) {
    console.log('DATE début', date);
    this.date_debut = date;
  }
  // ngAfterViewInit() {
  //   const inputElement: HTMLElement =
  //     this.elementRef.nativeElement.getElementById('autofocus');
  //   this.renderer.selectRootElement(inputElement).focus();
  // }

  onSubmitDateReservation() {
    console.log(this.formDate.value);
    this.store.dispatch(
      getDateReservationSuccess({
        dateReservation: {
          date_debut: this.formDate.value.date_debut,
          date_fin: this.formDate.value.date_fin,
        },
        affretment_type_id : this.formDate.value.affretment_type_id
      })
    );
    this.store.dispatch(getVehicules());
    // this.store.dispatch(getCustomers());
    this.store.dispatch(getCurrentStepSuccess({ currentStep: this.step + 1 }));
    this.router.navigate(['stepsreservations']);
  }

}
