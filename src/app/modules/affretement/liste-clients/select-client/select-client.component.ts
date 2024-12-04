import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
 import Swal from 'sweetalert2';

import {} from 'app/core/store/reservation/reservation.actions';
import { ToastService } from 'app/services';
import { Customer } from 'app/core/services/customer.service';

@Component({
  selector: 'app-select-client',
  templateUrl: './select-client.component.html',
  styleUrls: ['./select-client.component.css'],
})
export class SelectClientComponent implements OnInit {
  toggleClientList: boolean = true;
  isOpend: boolean = false;
  customers: Array<any>;
  filtredCustomers: any[];
  searchCustomer: any = '';
  addCustomerForm: FormGroup;
  isSpinner = true;
  url: string = '../../../../assets/img/customers/';
  defaultImage: string = '../../../../assets/img/user.png';
  customerChange: any;
  customerAfterChecked: any;
  @Output() customerEvent = new EventEmitter<any>();
  @Input() selectedType: any;

  @ViewChild('clicDiv', { static: false }) clicDiv: ElementRef;

  constructor(
    private customerService: Customer,
    private _toast: ToastService,
     private renderer: Renderer2
  ) {}

  ngOnChanges() {
   //this.customerChange={name : 'Sélectionner un destinataire'};
    //listen to Input() proprety emited from the parent
    console.log('===============> selectedType', this.selectedType);
  }
  ngOnInit(): void {
    //====> get all customers from the selectors state
    /*  this.store.select(selectAllCustomers).subscribe((data) => {
      this.customers = data;
      this.isSpinner = this.customers.length > 0 ? false : true;
    });*/

    //====> get all customers from the service
    // this.customerService.getCustomers().subscribe((data) => {
    //   this.customers = data.response;
    //   this.isSpinner = false;
    //   console.log(this.customers);
    // });

    this.addCustomerForm = new FormGroup({
      type: new FormControl(''),
      first_name: new FormControl('', []),
      last_name: new FormControl('', []),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      identity_number: new FormControl('', [Validators.required]),
      name: new FormControl('', []),

      // Social_reason: new FormControl('', [Validators.required]),
    });

    this.addCustomerForm.valueChanges.subscribe((c: FormControl) => {
      console.log('addCustomerForm structure :', this.addCustomerForm);
    });
  }

  toogleisOpen() {
    this.isOpend = !this.isOpend;

    if (this.isOpend) {
      this.renderer.addClass(this.clicDiv.nativeElement, 'z-absolute');
      this.filtredCustomers = this.customers;
    } else {
      this.renderer.removeClass(this.clicDiv.nativeElement, 'z-absolute');
    }
  }

  checkInfoLength() {
    return this.customers?.length > 0 ? true : false;
  }
  // checkInfoLength() {
  //   return Object.keys(this.customers?).length > 0 ? true : false;
  // }

  addCustomerFormReset() {
    this.addCustomerForm.reset();
  }

  onCustomerChange(customer) {
    console.log('onCustomerChange child', customer);
    this.customerChange = {
      id: customer.id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      name: customer.name,
      phone: customer.phone,
      identity_number: customer.identity_number,
      email: customer.email,
      Social_reason: customer.Social_reason,
      logo_path: customer.logo_path,
    };

    this.isOpend = false;
    this.customerEvent.emit(this.customerChange);

    console.log('onCustomerChange emited by child', customer);

    // this.stepperService.currentDestinataire.next(customer);
    // console.log('current Destinataire', this.stepperService.currentDestinataire.getValue());
  }

  ngAfterContentChecked() {
    this.customerAfterChecked = this.customerChange;
  }

  searchKeyword = '';

  onInput(event: any) {
    this.searchKeyword = event.target.value;
  }

  filteredCustomers() {
    this.searchCustomer.length > 3
      ? this.customerService
          .getCustomersByNameAndType(this.selectedType, this.searchCustomer)
          .subscribe((data) => {
            this.filtredCustomers = data.response;
            console.log('search_customer list', this.customers);
          })
      : this._toast.warn('Enter un destinataire avec plus de 3 lettres!');
  }

  changeLabel = 'ICE';

  onTypeChange(event: any) {
    console.log('label event ', event);
    if (event.value === 'individual') {
      this.changeLabel = 'CIN';
    } else {
      this.changeLabel = 'ICE';
    }
  }

  convertJsonToFormData(
    jsonData: any,
    formData?: FormData,
    parentKey?: string
  ) {
    formData = formData || new FormData();

    for (let key in jsonData) {
      if (!jsonData.hasOwnProperty(key)) {
        continue;
      }

      let value = jsonData[key];
      let formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (
        typeof value === 'object' &&
        !Array.isArray(value) &&
        value !== null
      ) {
        if (value instanceof Blob) {
          formData.append(formKey, value); // Append Blob to FormData
        } else {
          this.convertJsonToFormData(value, formData, formKey); // Recursively process nested objects
        }
      } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          if (
            typeof value[i] === 'object' &&
            !Array.isArray(value[i]) &&
            value[i] !== null
          ) {
            if (value[i] instanceof Blob) {
              formData.append(`${formKey}[${i}]`, value[i]); // Append Blob within the array to FormData
            } else {
              this.convertJsonToFormData(
                value[i],
                formData,
                `${formKey}[${i}]`
              ); // Recursively process nested objects within the array
            }
          } else {
            formData.append(`${formKey}[${i}]`, value[i]); // Append array element to FormData
          }
        }
      } else {
        formData.append(formKey, value); // Append the key-value pair to FormData
      }
    }

    return formData;
  }

  onSubmitNewDestinataire() {
    console.log('new customer', this.addCustomerForm.value);
    const fullName: string =
      this.addCustomerForm.value.first_name +
      ' ' +
      this.addCustomerForm.value.last_name;
    this.addCustomerForm.addControl('update_mode', new FormControl('0'));

    if (
      this.addCustomerForm.value.first_name !== '' &&
      this.addCustomerForm.value.last_name !== ''
    ) {
      console.log('isParticulier', fullName);
      this.addCustomerForm.get('name').setValue(fullName);
    }
    this.addCustomerForm.addControl('type_contrat', new FormControl('Cash'));

    //this fields are isset payload in backend service
    this.addCustomerForm.addControl('city_id', new FormControl(1));
    this.addCustomerForm.addControl('secteur_activite', new FormControl(4));
    this.addCustomerForm.addControl('user_id', new FormControl(1));
    this.addCustomerForm.addControl(
      'Social_reason',
      new FormControl(fullName || this.addCustomerForm.value.name)
    );

    this.addCustomerForm.get('type').setValue(this.selectedType);


    Swal.fire({
      //title: 'Êtes-vous sûr(e) de vouloir ajouter ce client ?',
      text: 'Êtes-vous sûr(e) de vouloir ajouter ce client ?',
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
      /*customClass: {
        title: 'my-title-class',
      },*/
    }).then((result) => {
      if (result.value) {
        // this.store.dispatch();
        console.log('new prospect', this.addCustomerForm.value);
        this.customerService
          .createProspect(
            this.convertJsonToFormData(this.addCustomerForm.value)
          )
          .subscribe(
            (data) => {
              console.log(data);
              this.toggleClientList = true; // hide add form and  back to the list
              this.isOpend = false; // close the toggleClientList and add form
              this._toast.success('Client ajouté avec succès !');
              this.onCustomerChange(data.response);
            },
            (error) => {
              console.log('error', error);
              this._toast.error("Une erreur est survenue lors de l'ajout !");
            }
          );
      } else {
      }
    });
  }
  onClose() {
    this.isOpend = false;
  }
}
