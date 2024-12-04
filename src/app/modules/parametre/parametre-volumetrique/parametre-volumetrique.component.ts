import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParametreService } from 'app/core/services/parametre.service';
import { ToastService } from '../../../core';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-parametre-volumetrique',
  templateUrl: './parametre-volumetrique.component.html',
  styleUrls: ['./parametre-volumetrique.component.css']
})
export class ParametreVolumetriqueComponent implements OnInit {
  data : FormGroup;
  valeur : number;
  constructor(private parametreService: ParametreService, private _toast: ToastService,
    public permissionService: PermissionService) { }

  ngOnInit(): void {
    this.setForm();
  }

  addPV(){
    console.log("valeur",this.data.get('valeur').value)
    //const formData = new FormData();
    //.append('valeur', this.data.get('valeur').value);
    this.parametreService.addPV(this.data.value).subscribe((data) => {
        console.log("data retourné ",data)
        this._toast.success("Poids volumétriques ajouté avec succés");
      },
      (error) => {
        console.log('error', error);
        this._toast.error("Une erreur est survenue lors de l'ajout de Poids volumétrique !");
      }
    );
  }

  setForm() {
    this.data = new FormGroup({
      valeur: new FormControl("", Validators.required),
    })
  }

}
