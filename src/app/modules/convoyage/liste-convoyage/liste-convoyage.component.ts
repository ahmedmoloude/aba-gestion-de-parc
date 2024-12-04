import { DialogCovoyageComponent } from './../dialog-covoyage/dialog-covoyage.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoCovoyageService } from 'app/core/services/admin-bo/bo-covoyage.service';
import { ToastService } from 'app/services';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectDrivers,
  selectTrucks,
} from 'app/core/store/resources/resources.selectors';
import { PermissionService } from 'app/core/services/permission.service';


@Component({
  selector: 'app-liste-convoyage',
  templateUrl: './liste-convoyage.component.html',
  styleUrls: ['./liste-convoyage.component.css'],
})
export class ListeConvoyageComponent implements OnInit {
  p: number = 1;
  isLoading = false;
  isLoadingSelect = false;
  covoyages: any[] = [];
  trucks: any[] = [];
  drivers: any[] = [];
  previousPageIndex: number = 0;
  totale: number = 0;
  per_page: number = 0;
  links: any = [];
  filters = { type: 'bo', status: 'INITIALIZED', from_date: '', to_date: '' };

  constructor(
    public dialog: MatDialog,
    private boCovoyageService: BoCovoyageService,
    private _toast: ToastService,
    private _router: Router,
    private _toaster: ToastService,
    private store: Store<AppState>,
    public permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.filters.from_date = this.getTodayDate();
    this.fetchCovoyages();
    this.store.select(selectDrivers).subscribe((res) => (this.drivers = res));
    this.store.select(selectTrucks).subscribe((res) => (this.trucks = res));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCovoyageComponent, {
      disableClose: true,
      width: '1200px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((output) => {
      if (output) this.fetchCovoyages();
    });
  }

  getTheNext(event) {

    this.isLoading = true;

    this.boCovoyageService.getListCovoyages(this.filters, event).subscribe(
      (data: any) => {
        this.covoyages = data.response.data;
        this.isLoading = false;
        this.links = data.response.links
      },
      (error) => {
        this.isLoading = false;
        this._toast.error('Une erreur est survenue !');
      }
    );


  }
  fetchCovoyages() {
    if (!this.filters.from_date) {
      this._toaster.warn('Veuillez renseigner une date !');
      return;
    }
    this.isLoading = true;
    this.boCovoyageService.getListCovoyages(this.filters).subscribe(
      (data: any) => {
        this.covoyages = data.response.data;
        this.links = data.response.links
        this.isLoading = false;
        this.totale = data.response.total
        this.per_page = data.response.per_page
      },
      (error) => {
        this.isLoading = false;
        this._toast.error('Une erreur est survenue !');
      }
    );
  }

  autoPlanifyCovoyages() {
    this.isLoading = true;
    this.boCovoyageService.dailyPlanifyCovoyages().subscribe(
      (data: any) => {
        this.fetchCovoyages();
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  // todo move to helpers
  getTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: number | string = today.getMonth() + 1; // Months start at 0!
    let dd: number | string = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return `${yyyy}-${mm}-${dd}`;
  }
  getDate(date: string) {
    if (date) return date.split(' ')[0];
    return '--';
  }
  truncateString(str: string, num: number) {
    if (!str) return '--';
    if (str.length <= num) return str;
    return str.slice(0, num) + '...';
  }

  //
  getTransitCities(covoyage: any) {
    return (
      covoyage.itineraries
        .map((item) => item.city_destination?.name)
        .join(' , ') || ''
    );
  }

  // covoyage planifier
  covoyagePlanifier(uuid: string) {
    this._router.navigate([`/generationcovoyage/${uuid}`]);
  }

  planifyCovoyage(covoyage: any) {
    // if (!covoyage.driver_id || !covoyage.truck_id) {
    //   this._toast.warn('Certains champs ne sont pas renseignés !');
    //   return;
    // }

    this.isLoading = true;
    this.boCovoyageService
      .updateCovoyage(
        {
          status: covoyage.status === 'INITIALIZED' ? 'PLANED' : 'INITIALIZED',
        },
        covoyage.uuid
      )
      .subscribe(
        (data: any) => {
          this.isLoading = false;
          if (covoyage.status === 'INITIALIZED')
            this._toast.success('Convoyage planifé avec succéss !');
          else this._toast.success('Planification annulée avec succéss !');
          this.fetchCovoyages(); // todo improve this
        },
        (error) => {
          this.isLoading = false;
          this._toast.error('Une erreur est survenue !');
        }
      );
  }

  // update driver or truck
  // onChangeDriver(covoyage: any) {
  //   const toasterMsg = {
  //     success: 'Chauffeur affecté avec succés !',
  //     error: 'Erreur, chauffeur non affecté !',
  //   };
  //   this.updateCovoyage(
  //     covoyage,
  //     { driver_id: covoyage.driver_id },
  //     toasterMsg
  //   );
  // }
  // onChangeTruck(covoyage: any) {
  //   const toasterMsg = {
  //     success: 'Camion affecté avec succés !',
  //     error: 'Erreur, camion non affecté !',
  //   };
  //   this.updateCovoyage(covoyage, { truck_id: covoyage.truck_id }, toasterMsg);
  // }
  // updateCovoyage(
  //   covoyage: any,
  //   params: any,
  //   toasterMsg: { success: string; error: string }
  // ) {
  //   this.isLoadingSelect = true;
  //   this.boCovoyageService.updateCovoyage(params, covoyage.uuid).subscribe(
  //     (data: any) => {
  //       this.isLoadingSelect = false;
  //       this._toast.success(toasterMsg.success);
  //     },
  //     (error) => {
  //       this.isLoadingSelect = false;
  //       this._toast.error(toasterMsg.success);
  //       this.fetchCovoyages();
  //     }
  //   );
  // }

  downloadLoadingSheet(covoyageId: number) {
    this.boCovoyageService.downloadLoadingSheet(covoyageId).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = `feuille_de_chargement_${covoyageId}.pdf`;
        link.click();
      },
      (error) => {
        this._toast.error('Une erreur est survenue lors du téléchargement de la feuille de chargement.');
      }
    );
  }
}
