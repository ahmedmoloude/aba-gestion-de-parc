import { DialogFusionnerComponent } from './dialog-fusionner/dialog-fusionner.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { Router } from '@angular/router';
import { BoTourService } from 'app/core/services/admin-bo/bo-tours.service';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-passage-reguliers',
  templateUrl: './passage-reguliers.component.html',
  styleUrls: ['./passage-reguliers.component.css'],
})
export class PassageReguliersComponent implements OnInit {
  p: number = 1;
  spinner: boolean = false;
  tours: any[] = [];
  initTours: any[] = [];
  filters = { type: 'regular', status: '', from_date: '', to_date: '' };
  checkBoxes: any[] = [];

  constructor(
    public dialog: MatDialog,
    private boGridService: BoGridService,
    private boTourService: BoTourService,
    private router: Router,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.fetchTours();
  }

  fetchTours() {
    this.spinner = true;
    const page = 1
    this.boGridService.getAllTour(this.filters,page).subscribe(
      (data: any) => {
        this.tours = data.response;
        this.initTours = [...this.tours];
        this.checkBoxes = this.tours.map((item: any) => {
          return { id: item.id, checked: false, position: null };
        });
        this.spinner = false;
      },
      (error) => {
        this.spinner = false;
      }
    );
  }

  autoPlanifyTours() {
    this.spinner = true;
    this.boTourService.dailyPlanifyTours().subscribe(
      (data: any) => {
        this.fetchTours();
        this.spinner = false;
      },
      (error) => {
        this.spinner = false;
      }
    );
  }

  onCheckBoxChange(idx: number) {
    if (this.checkBoxes[idx].checked)
      this.checkBoxes[idx].position = this.getCheckBoxLastPosition() + 1;
    else this.checkBoxes[idx].position = null;

    console.log(this.checkBoxes, 'checkBoxes');
  }

  getCheckBoxLastPosition() {
    const temp = this.checkBoxes
      .filter((item) => item.position !== null)
      .map((item) => item.position);
    if (!temp.length) return -1;
    return Math.max(...temp);
  }

  getToursToMerge() {
    const toursIdsToMerge = this.checkBoxes
      .filter((item) => item.checked)
      .map((item) => item.id);
    if (toursIdsToMerge.length < 2) return [];
    return this.tours.filter((item: any) => toursIdsToMerge.includes(item.id));
  }

  onSearchKeydown($event) {
    const searchVal = $event.target.value.toLowerCase();
    if (searchVal) {
      this.tours = this.initTours.filter((item: any) =>
        item.zone?.name.toLowerCase().includes(searchVal)
      );
    } else {
      this.tours = [...this.initTours];
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFusionnerComponent, {
      disableClose: true,
      width: '720px',
      data: { tours: this.getToursToMerge() },
    });

    dialogRef.afterClosed().subscribe((output) => {
      if (output) this.fetchTours();
    });
  }

  planifyTours() {
    const toursIds = this.tours.map((tour) => tour.id).join('-');
    this.router.navigate([`/planification-tours/${toursIds}`]);
  }


  deleteTour(uuid){



    this.spinner = true;
    return this.boTourService.deleteTour(uuid).subscribe(
      (data: any) => {




        this.fetchTours();
      })
  }
}
