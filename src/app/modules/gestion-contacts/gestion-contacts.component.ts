import { ContactsDialogComponent } from './contacts-dialog/contacts-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ContactService } from 'app/core/services/contact.service';
import { ToastService } from './../../core';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { EditContactDialogComponent } from './edit-contact-dialog/edit-contact-dialog.component';
import {
  selectEnvPayload,
  selectEnvIsLoading,
  selectEnvError,
  appSelectContact,
} from 'app/core/store/contacts/contacts.selectors';
import { deleteContact, fetchContacts } from 'app/core/store/contacts/contacts.actions';
import { Config } from 'app/config';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-gestion-contacts',
  templateUrl: './gestion-contacts.component.html',
  styleUrls: ['./gestion-contacts.component.css'],
})
export class GestionContactsComponent implements OnInit {
  inputsFiler = [
    {
      name: 'first_name',
      placeholder: 'Prénom',
      type: 'text'
    },
    {
      name: 'last_name',
      placeholder: 'Nom',
      type: 'text'
    },
    {
      name: 'client',
      placeholder: 'Client/Prospect',
      type: 'select',
      keys: ['code', 'name'],
      apiUrl: `${Config.api.customers.searchList}?type=prospect&search=`,
      options: []
    },
    {
      name: 'departement_id',
      placeholder: 'Département',
      type: 'select',
      options: []
    },
    {
      name: 'fonction_id',
      placeholder: 'Fonction',
      type: 'select',
      options: []
    },

  ];

  extraInputsFilter = [
    {
      name: 'phone',
      placeholder: 'Téléphone',
      type: 'text'
    },
    {
      name: 'email',
      placeholder: 'E-mail',
      type: 'text'
    },
    {
      name: 'fax',
      placeholder: 'GSM',
      type: 'text'
    },
  ]

  headerColumuns = [
    'Client',
    'Nom',
    'Prénom',
    'Fonction',
    'Département',
    'Téléphone',
    'E-mail',
    'GSM',
  ];
  page: number = 1;
  contact: any;
  clients: any;
  links : any = [];
  spinner: boolean = false;
  departements : any = [];
  fonctions : any = [];
  datafilter : any;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private boGridService: BoGridService,
    private contactService: ContactService,
    private _toast: ToastService,
    public permissionService: PermissionService
  ) {}

  filter($event){
    this.spinner = true;
    console.log("FILTER CONTACT", $event)
    this.datafilter = $event
    this.contactService.getContact($event).subscribe((data) => {
      this.spinner = false;
      console.log('data retourné ', data);
      this.contact = data["response"].data;
      this.links = data["response"].links;
    })
  }

  ngOnInit(): void {
    this.store.dispatch(fetchContacts());

    // this.boGridService.getCustomersProspects().subscribe((data) => {
    //   console.log("data client ",data)
    //   this.clients = data["response"];
    //   for(var i=0; i<this.clients.length; i++){
    //     this.inputsFiler["2"].options.push({
    //       'text' : this.clients[i].name,
    //       'value' : this.clients[i].id,
    //     })
    //   }
    // });

    this.contactService.getContactDepartement().subscribe(
      (data) => {
        console.log("departement", data)
        this.departements = data['response'];
        for(var i=0; i<this.departements.length; i++){
          this.inputsFiler["3"].options.push({
            'text' : this.departements[i].name,
            'value' : this.departements[i].id,
          })
        }
      },
      (error) => {
        console.log('error', error);
    });

    this.contactService.getContactFonction().subscribe(
      (data) => {
        this.spinner = false;
        console.log("fonction", data)
        this.fonctions = data['response'];
        for(var i=0; i<this.fonctions.length; i++){
          this.inputsFiler["4"].options.push({
            'text' : this.fonctions[i].name,
            'value' : this.fonctions[i].id,
          })
        }
      },
      (error) => {
        console.log('error', error);
    });

    // this.spinner = true ;
    // this.boGridService.getContact().subscribe(
    //   (response:any) => {
    //    this.contact = response.response.data
    //   this.spinner = false
    //   this.links = response.response.links
    //   },
    //   (error) => {
    //     console.log('error', error);
    //   }
    // );
    this.store.select(selectEnvPayload).subscribe((res) => {
      this.contact = res.data;
      this.links = res.links
      console.log("contact", res)
    });

    this.store.select(selectEnvIsLoading).subscribe((res) => {
      console.log("SPINNER CONTACT", this.spinner)
      this.spinner = res;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ContactsDialogComponent, {
      disableClose: true,
      width: '831px',
      data: {},
    });

  }

  deletTask(uuid) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer Task ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deleteContact({ uuid }));
        // this.boGridService.deletContact(uuid).subscribe(
        //   (data) => {
        //     console.log('delet', data),
        //       this._toast.success('Contact supprimé avec succès!');
        //     this.boGridService.getContact().subscribe(
        //       (data) => {
        //         this.contact = data['response'].contacts;
        //       },
        //       (error) => {
        //         console.log('error', error);
        //       }
        //     );
        //   },
        //   (error) => {
        //     console.log('error', error);
        //     this._toast.error(
        //       'Une erreur est survenue lors de la suppression de contact !'
        //     );
        //   }
        // );
      } else {
        // console.log("nn")
      }
    });
  }

  openDialogEdit(contact): void {
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      disableClose: true,
      width: '831px',
      data: { contact },
    });

    // dialogRef.afterClosed().subscribe((data) => {
    //   this.boGridService.getContact().subscribe(
    //     (data) => {
    //       this.contact = data['response'].contacts;
    //     },
    //     (error) => {
    //       console.log('error', error);
    //     }
    //   );
    // });
  }
  getTheNext(event) {
    this.spinner = true ;
    this.contactService.getContact(this.datafilter, event).subscribe(
      (response:any) => {
        this.contact = Object.values(response.response.data)
        this.spinner = false
        this.links = response.response.links
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
