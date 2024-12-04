import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';

@Component({
  selector: 'app-tournees-cloture',
  templateUrl: './tournees-cloture.component.html',
  styleUrls: ['./tournees-cloture.component.css'],
})
export class TourneesClotureComponent implements OnInit {
  p: number = 1;
  spinner: boolean = false;
  tours: any;
  constructor(
    private boGridService: BoGridService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.spinner = true;
    // this.boGridService.getAllTour("done").subscribe(
    //   (data) => {
    //     this.tours = data['response'];
    //     this.spinner = false;
    //   },
    //   (error) => {
    //     this.spinner = false;
    //   }
    // );
  }

  updateColor(progress) {
    //console.log("progress", progress)
    if (progress < 50) {
      return 'warn';
    } else if (progress > 99) {
      //return 'accent';
    } else {
      return 'accent';
    }
  }

  getTourDetails(tour: any) {
    if (tour.status === "INITIALIZED" || tour.status === "PLANED")
      this.router.navigate([`/planification-tour/${tour.uuid}`]);
    else
      this.router.navigate([`/detailstournees/${tour.uuid}`]);
  }
}
