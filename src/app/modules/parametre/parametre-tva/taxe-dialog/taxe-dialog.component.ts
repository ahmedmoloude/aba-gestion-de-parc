import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParametreService } from 'app/core/services/parametre.service';
import { ToastService } from '../../../../core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-taxe-dialog',
  templateUrl: './taxe-dialog.component.html',
  styleUrls: ['./taxe-dialog.component.css']
})
export class TaxeDialogComponent implements OnInit {
  spinner: boolean = false;
  valeurTaxe : number;
  taxe : any;
  uuid : string;
  TaxeEdit : FormGroup;
  constructor(
    public dialogRef: MatDialogRef<TaxeDialogComponent>,
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
    formData.append('type', "Taxe");
    formData.append('libelle', "Taxe");
    this.spinner = true;
    this.parameterService.addGlobalConfig(formData).subscribe((data) => {
      this.spinner = false;
      this.dialogRef.close(data);
      this._toast.success("Taxe ajouter avec succés !")
    },
    (error) => {
      console.log('error', error);
      this._toast.error("Une erreur est survenue lors de l'ajout de Taxe !");
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
