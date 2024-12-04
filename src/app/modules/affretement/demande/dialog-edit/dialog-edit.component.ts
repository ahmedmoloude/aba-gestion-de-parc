import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AffretementService } from 'app/core/services/affretement.service';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})
export class DialogEditComponent implements OnInit {

  demande :any;
  createDemande: FormGroup;
  spinner : boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogEditComponent>,
              private affretementService: AffretementService,
              private _toast: ToastService) { }

  ngOnInit(): void {
    this.demande = this.data["demande"];
    console.log("data get edit", this.demande)

    this.createDemande = new FormGroup({
      // uuid: new FormControl(this.demande.uuid, Validators.required),
      // id: new FormControl(this.demande.id, Validators.required),
      date_debut: new FormControl(this.demande.date_debut, Validators.required),
      date_fin: new FormControl(this.demande.date_fin, Validators.required),
      // customer_id: new FormControl(this.demande.customer_id, Validators.required),
      // statut: new FormControl(this.demande.statut, Validators.required),
    })
  }

  editDemande(){
    if(this.createDemande.valid){
      console.log("DEMANDE", this.createDemande.value)
      this.spinner = true
      this.affretementService.editDemandeAffretement(this.createDemande.value, this.demande.uuid).subscribe(
        (data) => {
          console.log('data', data);
          this._toast.success("Demande modifié avec succés");
          this.spinner = false;
          this.dialogRef.close(data["response"]);
        },
        (error) => {
          console.log('error', error);
          this.spinner = false;
          this._toast.error("Une erreur est survenue");
      });
    }
  }

}
