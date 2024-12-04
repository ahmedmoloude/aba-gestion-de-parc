import { CreationTourneeComponent } from './creation-tournee/creation-tournee.component';
import { Component, OnInit } from '@angular/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ToastService } from './../../core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PermissionService } from 'app/core/services/permission.service';
import { BoTourService } from 'app/core/services/admin-bo/bo-tours.service';

@Component({
  selector: 'app-tournees',
  templateUrl: './tournees.component.html',
  styleUrls: ['./tournees.component.css'],
})
export class TourneesComponent implements OnInit {
  selectedTourStatus: string = 'INITIALIZED'
  p: number = 1;
  spinner: boolean = false;
  tours: any;
  previousPageIndex = 0 ;
  itemsPerPage : number = 10 ;
  totale :number = 0 ;
  per_page : number = 0;
  links : any = [];
  filters = { type: 'all', status: 'INITIALIZED', from_date: '', to_date: '' }; //PLANED , STARTED ,DONE , RENFORT
  constructor(
    public dialog: MatDialog,
    private boGridService: BoGridService,
    private router: Router,
    private _toaster: ToastService,
    public permissionService: PermissionService,
    private tourService : BoTourService
  ) {}

  ngOnInit(): void {
    this.filters.from_date = this.getTodayDate();
    this.fetchTours();
  }
  next(event){
    this.spinner = true;
    if(event.pageIndex >this.previousPageIndex ){
      let page = event.pageIndex+1
      this.boGridService.getAllTour(this.filters ,page).subscribe(
        (data: any) => {
          this.tours = data.response.data;
          this.spinner = false;
          this.totale = data.response.total
          this.per_page = data.response.per_page
        },
        (error) => {
          this.spinner = false;
          this._toaster.error('Une erreur est survenue !');
        }
      );
      this.previousPageIndex ++ ;
     }
     else {
      let page = event.pageIndex- 1
      this.boGridService.getAllTour(this.filters,page).subscribe(
        (data: any) => {
          this.tours = data.response.data;
          this.spinner = false;
          this.totale = data.response.total
          this.per_page = data.response.per_page
        },
        (error) => {
          this.spinner = false;
          this._toaster.error('Une erreur est survenue !');
        }
      );
      this.previousPageIndex -- ;
     }
    
  }
  getTheNext(event){
    this.spinner = true;

    this.boGridService.getAllTour(this.filters ,event).subscribe(
      (data: any) => {
        this.tours = data.response.data;
        this.spinner = false;
        this.totale = data.response.total
      },
      (error) => {
        this.spinner = false;
        this._toaster.error('Une erreur est survenue !');
      }
    );

  }
  onTourStatusChange(event: any) {
    console.log('Selected Tour Status:', event.target.value);
    // You can perform any action with the selected value here
  }
  fetchTours() {
    console.log('selected value', this.selectedTourStatus)
    if (!this.filters.from_date) {
      this._toaster.warn('Veuillez renseigner une date !');
      return;
    }
    this.spinner = true;
    const page = 1
    this.filters.status = this.selectedTourStatus
    this.boGridService.getAllTour(this.filters,page ).subscribe(
      (data: any) => {
        this.tours = data.response.data;
        this.spinner = false;
        this.totale = data.response.total
        this.links = data.response.links
        this.per_page = data.response.per_page
      },
      (error) => {
        this.spinner = false;
        this._toaster.error('Une erreur est survenue !');
      }
    );
  }

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

  getTourProgress(tour: any) {
    let progress = 0;
    tour.items.map((passage: any) => {
      if (passage.status === 'DONE') progress += 1;
    });
    return {
      value: progress,
      percent: tour.items.length ? (progress / tour.items.length) * 100 : 0,
    };
  }
  updateProgressColor(progress: number) {
    if (progress < 50) return 'warn';
    else return 'primary';
  }

  getTourExpeditionStats(planifiedPassages    : any) {
    let expCount = 0;
    let colisCount = 0;
    planifiedPassages?.map((PP) => {
      PP.passages?.map((passage: any) => {
        // todo : improve those loops
        passage.expeditions.map((exp: any) => {
          exp.expedition_items.map(
            (item: any) => (colisCount += item.number)
          );
        });
        // passages count
        expCount += passage.expeditions.length;
      });
    })
    
    return { expeditions_count: expCount, colis_count: colisCount };
  }

  openDialog(): void {
    this.dialog.open(CreationTourneeComponent, {
      disableClose: true,
      width: '1200px',
      data: {},
    });
  }

  getTourDetails(tour: any) {
    if (tour.status === 'INITIALIZED' || tour.status === 'PLANED')
      this.router.navigate([`/planification-tour/${tour.uuid}`]);
    else this.router.navigate([`/detailstournees/${tour.uuid}`]);
  }


  downloadPdf(id){
    this.tourService.downloadTourPdf(id).subscribe((res) => {
      var blob = new Blob([res], { type: 'application/pdf' });
      var url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.click();
    });
  }
}
