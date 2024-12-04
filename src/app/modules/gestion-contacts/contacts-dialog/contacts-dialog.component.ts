import { ContactService } from 'app/core/services/contact.service';
import { environment } from 'environments/environment';
import { phoneValidator, PHONE_REGEX } from './../../../shared/validators/validators';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ToastService } from '../../../core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { addContact, updateContact } from 'app/core/store/contacts/contacts.actions';
import { selectEnvIsLoading, selectEnvStatus } from 'app/core/store/contacts/contacts.selectors';
import { selectEnvPayload } from 'app/core/store/customer/customer.selectors';
import { Config } from 'app/config';
interface Sexe {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-contacts-dialog',
  templateUrl: './contacts-dialog.component.html',
  styleUrls: ['./contacts-dialog.component.css'],
})
export class ContactsDialogComponent implements OnInit {
  filteredOptions: Observable<string[]>;
  contact : FormGroup;
  first_name:any;
  last_name:any;
  fonction_id:any;
  phone:any;
  departement_id:any;
  fax:any;
  email:any;
  customer_id:any;
  spinner : boolean=false;
  client:any;
  nbr:any;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  file = 'null';
  url = environment.STORAGE + '/logo/';
  customer : any;
  departements : any = [];
  fonctions : any = [];

  apiUri= `${Config.api.customers.searchList}?search=`;



  constructor(
          private store: Store<AppState>,
          public dialogRef: MatDialogRef<ContactsDialogComponent>,
          private boGridService: BoGridService,
          private contactService: ContactService,
          private _toast: ToastService) {}

  onClientChange(event){
    if(event){
      var id = event.id;
      console.log("ID CLIENT", event)
      this.customer = event;
      if(!event.logo_path){
        this.file = "no_logo_customer"
      }else{
        this.file = "with_logo_customer"
      }
      this.contact.controls['customer_id'].setValue(id);
    }else{
      this.file = "null"
    }
  }

  onDepartementChange(event){
    if(event){
      console.log("EVENT", event)
      this.contact.controls['departement_id'].setValue(event.id);
      this.fonctions = event.fonctions
    }
  }

  onFonctionChange(event){
    if(event){
      console.log("EVENT", event)
      this.contact.controls['fonction_id'].setValue(event.id);
      // this.fonctions = event.fonctions
    }
  }

  ngOnInit(): void {

    // this.boGridService.getCustomersProspects().subscribe((data) => {
    //   this.client = data["response"];
    //   console.log("allClient", data);
    //   this.nbr =  this.client.length;
    // },
    // (error) => {
    //   console.log('error', error);
    // });

    this.contact = new FormGroup({
      first_name: new FormControl("", Validators.required),
      last_name: new FormControl("", Validators.required),
      //office_phone: new FormControl("", Validators.required),
      fonction_id: new FormControl("", Validators.required),
      phone: new FormControl("", [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
      departement_id: new FormControl("", Validators.required),
      fax: new FormControl("", [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
      email: new FormControl("", [Validators.required, Validators.email]),
      customer_id: new FormControl("", Validators.required),
    })

    this.contactService.getContactDepartement().subscribe(
      (data) => {
        console.log("departement", data)
        this.departements = data['response'];
      },
      (error) => {
        console.log('error', error);
    });

    // this.contactService.getContactFonction().subscribe(
    //   (data) => {
    //     this.spinner = false;
    //     console.log("fonction", data)
    //     this.fonctions = data['response'];
    //   },
    //   (error) => {
    //     console.log('error', error);
    // });
  }

  addContact(){
    //console.log("add",this.contact.value);
    if (this.contact.invalid) {
      console.log("invalid");
      this._toast.warn("Certains champs ne sont pas definies !")
      return;
    }else{
      console.log("valid");
      this.spinner = true;
      this.store.dispatch(addContact({ data: this.contact.value }));
      this.store.select(selectEnvIsLoading).subscribe((res) => {
        this.spinner = res;
      });
      this.store.select(selectEnvStatus).subscribe((res) => {
        console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
      // this.spinner = false;
      //   this.spinner = false;
      // this.boGridService.addContact(this.contact.value).subscribe((data) => {
      //   //console.log("addContact", data);
      //   this.dialogRef.close(data);
      //   this.spinner = false;
      //   this._toast.success("Contact ajouter avec succés !")
      // },
      // (error) => {
      //   console.log('error', error);
      //   this._toast.error("Une erreur est survenue lors de l'ajout de contact!")
      // });
    }
  }
}
