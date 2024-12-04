import { CommercialesDialogComponent } from './commerciales-dialog/commerciales-dialog.component';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoOfferService } from 'app/core/services/admin-bo/bo-offers.service';
import { Router } from '@angular/router';
import { ToastService } from 'app/services';
import { environment } from 'environments/environment';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { Config } from 'app/config';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-offer-commerciales',
  templateUrl: './offer-commerciales.component.html',
  styleUrls: ['./offer-commerciales.component.css'],
})
export class OfferCommercialesComponent implements OnInit {
  @Input() merchant_uuid?: string;
  headerColumuns = [
    'Type de service',
    'Référence',
    'Code Client',
    'Client',
    "Date d'activation",
    'Date de création',
    'Date d’expiration'
  ];
  p: number = 1;
  offers: any;
  links: [];
  spinner: boolean = false;
  constructor(
    private _toast: ToastService,
    public dialog: MatDialog,
    private boOfferService: BoOfferService,
    private _router: Router,
    private boGridService: BoGridService,
    public permissionService: PermissionService
  ) {}

  attached_piece = '';
  inputsFiler = [
    {
      name: 'start_date',
      placeholder: 'Du',
      type: 'date'
    },
    {
      name: 'end_date',
      placeholder: 'Au',
      type: 'date'
    },
    {
      name: 'reference',
      placeholder: 'Référence',
      type: 'text'
    },
    {
      name: 'customer_id',
      placeholder: 'Client',
      type: 'select',
      keys: ['code', 'name'],
      apiUrl: `${Config.api.customers.searchList}?search=`,
      options: []
    },
    {
      name: 'date_expiration',
      placeholder: 'Date d\'expiration',
      type: 'date'
    },
    {
      name: 'date_activation',
      placeholder: 'Date d\'activation',
      type: 'date'
    }
  ];
  onFileSelected(event, uuid) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      return;
    }

    console.log('here....');

    let formData = new FormData();

    // add image to form data
    formData.append('attached_piece', event.target.files[0]);
    formData.append('uuid', uuid);

    this.spinner = true;
    this.boOfferService.upload_attached_piece(formData).subscribe(
      (res) => {
        this.offers = this.offers.map((o) =>
          o.id !== res.response.id ? o : res.response
        );
        this.spinner = false;
        this._toast.success('Fichier upload avec succès ');
      },
      (err) => {
        this.spinner = false;
        this._toast.error('Erreur lors de uploa');
      }
    );
  }
  ngOnInit(): void {
    this.spinner = true;
    this.boOfferService.fetchListOffers( null,1, this.merchant_uuid).subscribe(
      (result) => {
        this.offers = result.response.data;
        this.links = result.response.links;
        this.spinner = false;
      },
      (error) => {
        this.spinner = false;
        console.log('error', error);
      }
    );

    // this.boGridService.getCustomersProspects().subscribe((data) => {
    //   console.log("data client ",data)
    //   this.inputsFiler['3'].options = data["response"].map(elem => (
    //     {
    //       'text': elem.name,
    //       'value': elem.id,
    //       'code' : elem.code,

    //     }
    //   ));
    // });
  }

  editOffer(uuid: string) {
    this._router.navigate([`/tree-offer/update/${uuid}`]);
  }
  detailsOffer(uuid: string) {
    this._router.navigate([`/tree-offer/details/${uuid}`]);
  }

  openDialog(): void {
    this.dialog.open(CommercialesDialogComponent, {
      disableClose: true,
      width: '831px',
      data: {},
    });
  }

  downloadOffer(id: number): void {
    console.warn('download');
    this.boOfferService.download(id).subscribe((res) => {
      var blob = new Blob([res], { type: 'application/pdf' });
      var url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.click();
    });
  }
  edit(uuid): void {
    this._router.navigate([`/affretement-offer/update/${uuid}`]);
  }

  download(doc, id) {
    let doc_path =
      environment.STORAGE + '/offer_attached_piece/' + id + '/' + doc;
    window.open(doc_path, '_blank');
  }

  getTheNext(event) {
    this.spinner = true;
    this.boOfferService.fetchListOffers( null,event, this.merchant_uuid).subscribe(
      (result) => {
        this.offers = result.response.data;
        this.links = result.response.links;
        this.spinner = false;
      },
      (error) => {
        this.spinner = false;
        console.log('error', error);
      }
    );
  }


  filter(event) {
    this.spinner = true;
    this.boOfferService.fetchListOffers( event,1, this.merchant_uuid).subscribe(
      (result) => {
        this.offers = result.response.data;
        this.links = result.response.links;
        this.spinner = false;
      },
      (error) => {
        this.spinner = false;
        console.log('error', error);
      }
    );
  }


}
