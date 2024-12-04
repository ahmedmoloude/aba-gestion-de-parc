import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParametreService } from 'app/core/services/parametre.service';
import { ToastService } from '../../../../core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tva-dialog',
  templateUrl: './tva-dialog.component.html',
  styleUrls: ['./tva-dialog.component.css']
})
export class TvaDialogComponent implements OnInit {
valeurTaxe : number;
taxe : any;
uuid : string;
TaxeEdit : FormGroup;
spinner: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<TvaDialogComponent>,
    private parameterService: ParametreService,
    private _toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.valeurTaxe = Math.trunc(this.data["data"].valeur * 100);
    this.uuid = this.data["data"].uuid;
    this.TaxeEdit = new FormGroup({
      valeur: new FormControl(this.valeurTaxe, Validators.required),
    })
  }

  TaxeUpdate(){
    this.taxe = this.TaxeEdit.get('valeur').value ;
    const formData = new FormData();
    formData.append('valeur', this.taxe);
    formData.append('type', "TVA");
    formData.append('libelle', "TVA");
    this.spinner = true;
    this.parameterService.addGlobalConfig( formData).subscribe((data) => {
      this.spinner = false;
      this.dialogRef.close(data);
      this._toast.success("TVA ajouter avec succés !")
    },
    (error) => {
      console.log('error', error);
      this._toast.error("Une erreur est survenue lors de l'ajout de TVA  !");
    });
  }

  confirmBox(){
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir ajouter ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.TaxeUpdate();
      } else {
        this.dialogRef.close();
      }
    })
  }

}
