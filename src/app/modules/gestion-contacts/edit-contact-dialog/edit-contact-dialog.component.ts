import { ContactService } from 'app/core/services/contact.service';
import { environment } from 'environments/environment';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { phoneValidator, PHONE_REGEX } from './../../../shared/validators/validators';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from './../../../core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { updateContact } from 'app/core/store/contacts/contacts.actions';
import { selectEnvIsLoading, selectEnvStatus } from 'app/core/store/contacts/contacts.selectors';
import { selectEnvPayload } from 'app/core/store/customer/customer.selectors';
import { Config } from 'app/config';
@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.css']
})
export class EditContactDialogComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;
contact:any;
filteredOptions: Observable<string[]>;
contacts : FormGroup;
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
customer:any;
file = 'null';
searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
url = environment.STORAGE + '/logo/';
departements : any = [];
fonctions : any = [];

apiUri= `${Config.api.customers.searchList}?search=`;



  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private store: Store<AppState>,
                public dialog: MatDialog,
                public dialogRef: MatDialogRef<EditContactDialogComponent>,
                private boGridService: BoGridService,
                private contactService: ContactService,
                private _toast: ToastService,)
{ }

onClientChange(event){
  if(event){
    var id = event.id;
    console.log("ID CLIENT", id)
    this.customer = event;
    if(!event.logo_path){
      this.file = "no_logo_customer"
    }else{
      this.file = "with_logo_customer"
    }
    console.log("Logo CLIENT", this.file)
    this.contacts.controls['customer_id'].setValue(id);
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

  // ngAfterViewInit(){
  //   console.log("AFTER VIEW", this.contact.customer)

  // }

  ngOnInit(): void {
    this.contact = this.data["contact"];
    console.log("data get edit", this.contact)

    this.file = this.contact.customer.logo_path
    this.customer = this.contact.customer
    setTimeout(() => {
          this.searchComponents.toArray()[0].selectObject(this.contact.customer)
        })

    // this.store.select(selectEnvPayload).subscribe((res) => {
    //   // console.log(" contact========>", res)
    //   // this.contact = res;
    //   console.log(" client========>", res)
    //   this.client = res
    // });

    // this.boGridService.getCustomersProspects().subscribe((data) => {
    //   this.client = data["response"];
    //   console.log("allClient", data);
    //   this.nbr =  this.client.length;
    //   setTimeout(() => {
    //     this.searchComponents.toArray()[0].selectObject(this.contact.customer)
    //   })
    // },
    // (error) => {
    //   console.log('error', error);
    // });

    this.contacts = new FormGroup({
      first_name: new FormControl(this.contact.first_name, Validators.required),
      last_name: new FormControl(this.contact.last_name, Validators.required),
      fonction_id: new FormControl(this.contact.fonction_id, Validators.required),
      phone: new FormControl(this.contact.phone, [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
      departement_id: new FormControl(this.contact.departement_id, Validators.required),
      fax: new FormControl(this.contact.fax, [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
      email: new FormControl(this.contact.email, [Validators.required, Validators.email]),
      customer_id: new FormControl(this.contact.customer_id, Validators.required),
    })

    this.contactService.getContactDepartement().subscribe(
      (data) => {
        console.log("departement", data)
        this.departements = data['response'];
        this.fonctions = this.departements.find(d=> d.id == this.contact.departement_id).fonctions
        // setTimeout(() => this.searchComponents['_results'][1].selectObject(this.contact.departement))
        // setTimeout(() => this.searchComponents['_results'][7].selectObject(this.contact.fonction))
        // setTimeout(() => {
        //   this.searchComponents.toArray()[1].selectObject(this.contact.departement)
        // })
        // setTimeout(() => {
        //   this.searchComponents.toArray()[7].selectObject(this.contact.fonction)
        // })
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

  editContact(){
    console.log("add",this.contacts.value);
    console.log("uuid",this.contact.uuid);
    this.spinner = true;
    this.store.dispatch(updateContact({data: this.contacts.value,uuid: this.contact.uuid}));
    this.store.select(selectEnvIsLoading).subscribe((res) => {
      this.spinner = res;
    });
    this.store.select(selectEnvStatus).subscribe((res) => {
      console.log("status", res);
      if(res == 'SUCCESS'){
        this.dialogRef.close();
      }
    });
    // this.boGridService.editContact(this.contacts.value, this.contact.uuid).subscribe((data) => {
    //   console.log("editContact", data);
    //   this.spinner = false;
    //   this.dialogRef.close();
    //   this._toast.success("Contact modifier avec succés !")
    // },
    // (error) => {
    //   console.log('error', error);
    //   this._toast.error("Une erreur est survenue lors de la modificationout de contact!")
    // });
  }


}
