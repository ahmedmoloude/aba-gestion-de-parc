import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoTourService } from 'app/core/services/admin-bo/bo-tours.service';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-dialog-fusionner',
  templateUrl: './dialog-fusionner.component.html',
  styleUrls: ['./dialog-fusionner.component.css']
})
export class DialogFusionnerComponent implements OnInit {
  tour: any = null;
  tour_id: number = null;
  truck_id: number = null;
  driver_id: number = null;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<DialogFusionnerComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private boTourService: BoTourService, private _toast: ToastService) { }

  ngOnInit(): void {
    this.tour = this.dialogData.tours[0];
    this.tour_id = this.tour.id; this.driver_id = this.tour?.driver_id; this.truck_id = this.tour?.truck_id
  }

  get trucks() {
    return this.dialogData.tours.filter((item: any) => item?.truck).map((item: any) => item.truck);
  }
  get drivers() {
    return this.dialogData.tours.filter((item: any) => item?.driver).map((item: any) => item.driver);
  }

  get toursToMerge() {
    return this.dialogData.tours.filter((item: any) => item.id !== this.tour_id);
  }
  get zonesToMerge() {
    return this.toursToMerge.map((item: any) => item.zone?.name).join(' , ');
  }

  onChangeTour() {
    this.tour = this.dialogData.tours.find((item: any) => item.id === this.tour_id);
  }

  onSubmit() {
    if (!this.tour_id || !this.truck_id || !this.driver_id) {
      this._toast.warn('Certains champs ne sont pas renseignés !'); return;
    }

    const payload = {
      tour: { tour_id: this.tour_id, truck_id: this.truck_id, driver_id: this.driver_id },
      tours_to_merge: this.toursToMerge.map((item: any) => item.id)
    }
    console.log(payload)

    this.isLoading = true;
    this.boTourService.mergeTours(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.dialogRef.close(res.response);
      this._toast.success('Tournée fusionée avec succes !');
    }, (err) => {
      console.log(err);
      this.isLoading = false
      this._toast.error('Une erreur est survenu !');
    })
  }

}
