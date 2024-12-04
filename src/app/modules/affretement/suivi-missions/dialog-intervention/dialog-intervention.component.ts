import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AffretementService } from 'app/core/services/affretement.service';
import { ToastService } from 'app/services';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-dialog-intervention',
  templateUrl: './dialog-intervention.component.html',
  styleUrls: ['./dialog-intervention.component.css']
})
export class DialogInterventionComponent implements OnInit {

  decision = new FormGroup({});
  pointChargement : any =[];
  images: any[] = [];
  spinner: boolean = false;
  url = environment.STORAGE + '/points_dechargement/';
  status = [
    {
      "status" : "WAITING",
      "name" : "Attendre",
    },
    {
      "status" : "IMMOBILISATION",
      "name" : "Immobilisation",
    },
    {
      "status" : "CONTINUE_MISSION",
      "name" : "Continuer la mission",
    },
    {
      "status" : "RETURN_SDTM",
      "name" : "Retour Marchandises",
    },
    // {
    //   "status" : "NEW_MISSION",
    //   "name" : "Nouvelle mission",
    // },
  ]

  constructor(
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogInterventionComponent>,
              private affretementService: AffretementService,
              private _toast: ToastService
              ) { }

  ngOnInit(): void {
    this.pointChargement = this.data["point"];
    this.pointChargement.images.forEach((image) => {
      this.images.push(this.url + this.pointChargement.id + '/' + image.file);
    });
    // console.table(this.images);
    // console.log("data get edit", this.pointChargement)

    this.decision = new FormGroup({
      statut: new FormControl("", Validators.required),
      uuid: new FormControl(this.pointChargement.uuid, Validators.required),
    })
  }

  intervenir(){
    this.spinner = true
    console.log("INTERVENIR", this.decision.value)
    this.affretementService.changerStatusPoint(this.decision.value).subscribe(
      (data) => {
        // this.demandes = data['response'];
        console.log("APPROBATION DECHARGEMENT ",  data['response'])
        this.dialogRef.close(data['response'])
        this._toast.success("Décision prise avec succées")
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
      })
  }

}
