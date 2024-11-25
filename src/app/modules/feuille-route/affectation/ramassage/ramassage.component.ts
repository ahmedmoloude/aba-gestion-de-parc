import { Component, OnInit } from '@angular/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ToastService } from 'app/core';
import { DialogAffectationComponent } from '../dialog-affectation/dialog-affectation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ramassage',
  templateUrl: './ramassage.component.html',
  styleUrls: ['./ramassage.component.css']
})
export class RamassageComponent implements OnInit {
  p: number = 1;
  spinner: boolean = false;
  tours: any;
  previousPageIndex = 0 ;
  itemsPerPage : number = 10 ;
  totale :number = 0 ;
  per_page : number = 0;
  links : any = [];
  type = 'Ramassage';
  // filters = { type: 'all', status: 'INITIALIZED', from_date: '', to_date: '' };
  constructor(public dialog: MatDialog,
    private boGridService: BoGridService,
    private _toaster: ToastService
  ) { }

  ngOnInit(): void {
    this.spinner = true;
    // const page = 1
    this.boGridService.tours('PICKUP', this.p ).subscribe(
      (data: any) => {
        console.log("data", data)
        this.tours = data.response.data;
        console.log("tours", this.tours)
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

  getTheNext(event){
    this.spinner = true;
    this.boGridService.tours('PICKUP',event).subscribe(
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

  openDialog(type, item): void {
    const dialogRef = this.dialog.open(DialogAffectationComponent, {
      width: '500px',
      data: { type, item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('get apres create', data);
        this.boGridService.tours('PICKUP',this.p).subscribe(
          (data: any) => {
            console.log("data", data)
            this.tours = data.response.data;
            console.log("tours", this.tours)
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
