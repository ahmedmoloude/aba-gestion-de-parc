import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AffretementService } from 'app/core/services/affretement.service';

@Component({
  selector: 'app-dialog-refuser',
  templateUrl: './dialog-refuser.component.html',
  styleUrls: ['./dialog-refuser.component.css']
})
export class DialogRefuserComponent implements OnInit {

  decision = new FormGroup({});
  motifs: any[] = [];
  demande: any;
  spinner: boolean = false;

  constructor(private affretementService: AffretementService,
              private _router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogRefuserComponent>,) { }

  ngOnInit(): void {
    this.demande = this.data["demande"];
    this.decision = new FormGroup({
      motif_id: new FormControl("", Validators.required),
      commentaire: new FormControl(""),
      uuid: new FormControl(this.demande["uuid"]),
      statut: new FormControl("REFUSED"),
    })

    this.affretementService.MotifDemande().subscribe(
      (data) => {
        this.motifs = data["response"];
        console.log("MOTIF ", this.motifs)
      })
  }

  intervenir(){
    this.spinner = true
    // let data = {
    //   uuid: this.demande["uuid"],
    //   statut: "REFUSED",
    // };
    this.affretementService.changerStatutDemande(this.decision.value).subscribe(
      (data) => {
        // this._toast.success("Décision prise avec succées")
        this.spinner = false;
        this.dialogRef.close();
        this._router.navigate([`listeclients`]);
      },
      (error) => {
        console.log('error', error);
      })
  }

}
