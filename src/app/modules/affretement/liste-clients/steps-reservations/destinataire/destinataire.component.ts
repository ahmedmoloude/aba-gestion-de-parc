import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
 import {
  deleteDestinataireSuccess,
  getCurrentStepSuccess,
  getDestinataireSuccess,
  getExpediteurSuccess,
  getVehicules,
} from 'app/core/store/reservation/reservation.actions';
import {
  SelectStatusReservation,
  selectReservationDestinataire,
  selectReservationExpediteur,
} from 'app/core/store/reservation/reservation.selectors';
import { Observable } from 'rxjs';
import { SelectClientComponent } from '../../select-client/select-client.component';
import Swal from 'sweetalert2';
import { ToastService } from 'app/services';
import { AppState } from 'app/core/store/app.states';
import { SelectExpediteurComponent } from '../../select-expediteur/select-expediteur.component';

@Component({
  selector: 'app-destinataire',
  templateUrl: './destinataire.component.html',
  styleUrls: ['./destinataire.component.css'],
})
export class DestinataireComponent implements OnInit {
  @Output() stepNextEvent = new EventEmitter<number>();
  destinataireForm: FormGroup;
  myDestinataires = [];
  myExpediteur:any;
  step: number = 1;
  disabledField: true;
  status: string;
  expediteurForm: FormGroup;
  selectedType: any = '';
  @ViewChildren(SelectClientComponent)
  selectClientsComponents: QueryList<SelectClientComponent>;
  @ViewChild(SelectExpediteurComponent)
  selectExpediteurComponent: SelectExpediteurComponent;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  destinataireList$: Observable<any> = this.store.select(
    selectReservationDestinataire
  );

  ngOnInit(): void {
    this.store.select(selectReservationDestinataire).subscribe((data) => {


      this.myDestinataires = data.destinataireList.destinataires || [];
      if (typeof  this.myDestinataires === 'object') {
        this.myDestinataires = Object.values(this.myDestinataires);
      }
      console.log('my destemnataires ' , this.myDestinataires)
      if (this.myDestinataires.length > 0) {
        this.destinatairesFormStep(this.myDestinataires);
      }
      else{
        this.destinatairesFormInit();
      }
    });
    this.store.select(selectReservationExpediteur).subscribe((data) => {
      this.myExpediteur = data.expediteur;

      if (this.myExpediteur) {
        this.expediteurFormEdit(this.myExpediteur);

      }else{
        this.expediteurFormInit()

      }


    });

    // if (this.myDestinataires?.length > 0) {
    //   console.log('full');
    //  } else {
    //   console.log('empty');
    // }
  }

  expediteurFormInit() {
    this.expediteurForm = new FormGroup({
      type: this.fb.control('', [Validators.required]),
      id: new FormControl(null, [Validators.required]),

      first_name: new FormControl('', []),
      last_name: new FormControl('', []),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      email: new FormControl('', [Validators.required]),
      identity_number: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', []),
      logo_path: new FormControl('', []),
      Social_reason: new FormControl('', []),
    });
  }
  expediteurFormEdit(expediteur) {
    console.log('expediteur Edit',expediteur)
    this.expediteurForm = new FormGroup({
      type: this.fb.control(expediteur.type, [Validators.required]),
      id: new FormControl(expediteur.id, [Validators.required]),

      first_name: new FormControl(expediteur.first_name, []),
      last_name: new FormControl(expediteur.last_name, []),
      phone: new FormControl(expediteur.phone, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      email: new FormControl(expediteur.email, [Validators.required]),
      identity_number: new FormControl(expediteur.identity_number, [
        Validators.required,
      ]),
      name: new FormControl(expediteur.name, []),
      logo_path: new FormControl(expediteur.logo_path, []),
      Social_reason: new FormControl(expediteur.Social_reason, []),
    });
  }

  destinatairesFormInit() {
    // Check if destinataireForm is already initialized
    if (!this.destinataireForm) {
      const destinataire = new FormGroup({
        type: this.fb.control('', [Validators.required]),
        id: new FormControl(null, [Validators.required]),

        first_name: new FormControl('', []),
        last_name: new FormControl('', []),
        phone: new FormControl('', [
          Validators.required,
          Validators.maxLength(10),
        ]),
        email: new FormControl('', [Validators.required]),
        identity_number: new FormControl('', [
          Validators.required,
        ]),
        name: new FormControl('', []),
        logo_path: new FormControl('', []),
        Social_reason: new FormControl('', []),
      });

      this.destinataireForm = this.fb.group({
        destinataires: this.fb.array([destinataire]),
      });
    }
  }


  uniqueIdValidator(destinataires: FormGroup[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const id = control.value;

      // Check if the id already exists in the destinataires array
      const isDuplicate = destinataires.some(
        (destinataire) => destinataire.get('id').value === id
      );
      return isDuplicate ? { duplicateId: true } : null;
    };
  }

  destinatairesFormStep(myDestinataires) {
    const destinationForm2 = myDestinataires.map((destinataire) => {
      return new FormGroup({
        type: new FormControl(destinataire.type || '', [Validators.required]),
        id: new FormControl(destinataire.id || '', [Validators.required]),
        first_name: new FormControl(destinataire.first_name || '', [,]),
        last_name: new FormControl(destinataire.last_name || '', [,]),
        phone: new FormControl(destinataire.phone || '', [Validators.required]),
        email: new FormControl(destinataire.email || '', [Validators.required]),
        identity_number: new FormControl(destinataire.identity_number || '', [
          Validators.required,
        ]),
        name: new FormControl(destinataire.name || '', []),
        logo_path: new FormControl(destinataire.logo_path || '', [,]),
        Social_reason: new FormControl(destinataire.Social_reason || '', [,]),
      });
    });
    const DataDestinataires = new FormArray([]);

    destinationForm2.forEach((e) => {
      DataDestinataires.push(e);
    });
    this.destinataireForm = this.fb.group({
      destinataires: DataDestinataires,
    });
  }

  goNext() {
    this.stepNextEvent.emit(this.step);
  }

  onCustomerChange(customer, i) {
    console.log('onCustomerChange parent', customer);
    console.log('position of child in parent', i);
    //check if customer.id exist in the form array then patchValue
    const destinataire = this.destinataires.at(i); // at the position i in formarray
    const matchingDestinataire = this.destinataires.controls.find(
      (destinataire) => destinataire.get('id').value === customer.id || this.expediteurForm.get('id').value===customer.id
    );
    if (matchingDestinataire) {
      // this.toastService.warn('Destinataire déjà utilisé !');
    } else {
      destinataire.patchValue(customer);
    }
  }

  onExpediteurChange(customer){
    console.log('Change parent', customer);
    this.expediteurForm.patchValue(customer);
  }



  onTypeChange(i: number) {

console.log('destinataire child ',i)
       this.selectClientsComponents.get(i).customerChange={
        id:'',
        name : 'Sélectionner un destinataire',
       };
      console.log(this.selectClientsComponents);



    const currentDestinataire = this.destinataires.at(i) as FormGroup;
    this.selectedType = currentDestinataire.controls['type'].value as string;
    currentDestinataire.controls['id'].setValue('');
    currentDestinataire.controls['first_name'].setValue('');
    currentDestinataire.controls['last_name'].setValue('');
    currentDestinataire.controls['phone'].setValue('');
    currentDestinataire.controls['email'].setValue('');
    currentDestinataire.controls['identity_number'].setValue('');
    currentDestinataire.controls['name'].setValue('');
    currentDestinataire.controls['logo_path'].setValue('');
    currentDestinataire.controls['Social_reason'].setValue('');
  }

  onTypeChangeExpediteur() {

    console.log('expediteur child ',1)
    this.selectExpediteurComponent.customerChange={
        id:'',
       name : 'Sélectionner un expediteur',
       };
      console.log(this.selectExpediteurComponent);


    this.selectedType =this.expediteurForm.controls['type'].value as string;
    this.expediteurForm.controls['type'].valueChanges.subscribe((data)=>{
     console.log('=====>Change',data)
     this.expediteurForm.controls['id'].setValue('');
     this.expediteurForm.controls['first_name'].setValue('');
     this.expediteurForm.controls['last_name'].setValue('');
     this.expediteurForm.controls['phone'].setValue('');
     this.expediteurForm.controls['email'].setValue('');
     this.expediteurForm.controls['identity_number'].setValue('');
     this.expediteurForm.controls['name'].setValue('');
     this.expediteurForm.controls['logo_path'].setValue('');
     this.expediteurForm.controls['Social_reason'].setValue('');


    })
   }



  ngAfterViewInit() {

    if (Object.keys(this.myExpediteur).length !== 0) {
      console.log(this.myExpediteur)
      this.selectExpediteurComponent.onCustomerChange(this.myExpediteur);
    }

    if(this.myDestinataires?.length>0){
      for (let i = 0; i < this.myDestinataires?.length; i++) {
        this.selectClientsComponents.get(i).onCustomerChange(this.myDestinataires[i]);
        console.log(this.selectClientsComponents);
      }
      this.cdr.markForCheck();
    }

  }

  get destinataires() {
    return this.destinataireForm.controls['destinataires'] as FormArray;
  }

  addDestinataires() {
    const destinationForm = new FormGroup({
      type: this.fb.control('', [Validators.required]),
      id: new FormControl(null, [Validators.required]),
      first_name: new FormControl('', []),
      last_name: new FormControl('', []),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      email: new FormControl('', [Validators.required]),
      identity_number: new FormControl('', [
        Validators.required      ]),
      name: new FormControl('', []),
      logo_path: new FormControl('', []),
      Social_reason: new FormControl('', []),
    });
    this.destinataires.push(destinationForm);
  }

  deleteDestinataire(i: number) {
    Swal.fire({
      text: 'Êtes-vous sûr(e) de vouloir supprimer ce Destinataire ?',
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.destinataires.removeAt(i);
        console.log('destinataire form deleted !');
        if (this.myDestinataires && this.myDestinataires[i] !== undefined) {
          this.store.dispatch(deleteDestinataireSuccess({ position: i }));
          console.log('destinataire store deleted !');
        }
      }
    });
  }

  onSubmitDestinataire() {

    this.getFormValidationErrors(this.destinataireForm);

    console.log( 'dest form ' ,this.destinataireForm);

    if (this.destinataireForm.valid && this.expediteurForm.valid) {


      this.stepNextEvent.emit(this.step);

      this.store.dispatch(getExpediteurSuccess({expediteur :this.expediteurForm.value}))

      console.log('destenataire ....  ' , this.destinataireForm.value )

      this.store.dispatch(
        getDestinataireSuccess({ destinataire: this.destinataireForm.value }));


      this.store.dispatch(
        getCurrentStepSuccess({
          currentStep: this.step + 1,
        })
      );
      // this.store.dispatch(getStepsDataSuccess({ stepsData: this.step + 1 }));
    }
  }

  getFormValidationErrors(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.getFormValidationErrors(control);
      } else {
        const controlErrors: ValidationErrors = control.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach((keyError) => {
            console.log(
              `Control: ${key}, Error: ${keyError}, Value: ${controlErrors[keyError]}`
            );
          });
        }
      }
    });
  }
}
