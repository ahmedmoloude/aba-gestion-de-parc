import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AffretementService } from 'app/core/services/affretement.service';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-dialog-recline',
  templateUrl: './dialog-recline.component.html',
  styleUrls: ['./dialog-recline.component.css']
})
export class DialogReclineComponent implements OnInit {

  demande :any;
  validerTrajet: FormGroup;
  spinner : boolean = false;

  constructor(
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogReclineComponent>,
              private affretementService: AffretementService,
              private _toast: ToastService
  ) { }

  ngOnInit(): void {
    this.demande = this.data["demande"];
    console.log("data get edit", this.demande)

    this.validerTrajet = new FormGroup({
      demande_id: new FormControl(this.demande.id, Validators.required),
      trajet: new FormControl(this.demande?.trajet, Validators.required),
    })
  }

  editDemande(){
    if(this.validerTrajet.valid){
      console.log("DEMANDE", this.validerTrajet.value)
      this.spinner = true
      this.affretementService.typeTrajetDemande(this.validerTrajet.value).subscribe(
        (data) => {
          console.log('data', data);
          this._toast.success("Trajet validé avec succés");
          this.spinner = false;
          this.dialogRef.close(data['response']);
        },
        (error) => {
          console.log('error', error);
          this.spinner = false;
          this._toast.error("Une erreur est survenue");
      });
    }
  }

}
