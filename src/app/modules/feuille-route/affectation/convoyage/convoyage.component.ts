import { Component, OnInit } from '@angular/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ToastService } from 'app/core';
import { DialogAffectationComponent } from '../dialog-affectation/dialog-affectation.component';
import { MatDialog } from '@angular/material/dialog';
import { BoCovoyageService } from 'app/core/services/admin-bo/bo-covoyage.service';

@Component({
  selector: 'app-convoyage',
  templateUrl: './convoyage.component.html',
  styleUrls: ['./convoyage.component.css']
})
export class ConvoyageComponent implements OnInit {
  p: number = 1;
  spinner: boolean = false;
  covoyages: any;
  previousPageIndex = 0 ;
  itemsPerPage : number = 10 ;
  totale :number = 0 ;
  per_page : number = 0;
  links : any = [];
  type = 'Covoyage';
  // filters = { type: 'all', status: 'INITIALIZED', from_date: '', to_date: '' };
  constructor(public dialog: MatDialog,
    private boCovoyageService: BoCovoyageService,
    private _toaster: ToastService
  ) { }


  ngOnInit(): void {
    this.spinner = true;
    this.boCovoyageService.listCovoyages().subscribe(
      (data: any) => {
        console.log("covoyage", data)
        this.covoyages = data.response.data;
        this.links = data.response.links;
        console.log("covoyage", this.covoyages)
        this.spinner = false;
      },
      (error) => {
        this.spinner = false;
        this._toaster.error('Une erreur est survenue !');
      }
    );
  }

  getTheNext(event){
    this.spinner = true;
    this.boCovoyageService.listCovoyages(event).subscribe(
      (data: any) => {
        this.covoyages = data.response.data;
        this.spinner = false;
        this.totale = data.response.total
      },
      (error) => {
        this.spinner = false;
        this._toaster.error('Une erreur est survenue !');
      }
    );

  }

  openDialog(type, item): void {
    const dialogRef = this.dialog.open(DialogAffectationComponent, {
      width: '500px',
      data: { type, item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('get apres create', data);
        this.boCovoyageService.listCovoyages(this.p).subscribe(
          (data: any) => {
            console.log("data", data)
            this.covoyages = data.response.data;
            console.log("tours", this.covoyages)
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
    });

  }

}
