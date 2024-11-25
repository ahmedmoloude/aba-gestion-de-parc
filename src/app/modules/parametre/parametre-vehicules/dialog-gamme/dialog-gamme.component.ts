import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { addmodele, updatemodele } from 'app/core/store/modele/modele.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { selectEnvmodelePayload } from 'app/core/store/modele/modele.selectors';
import { selectEnvgammeStatus, selectEnvgammeIsLoading } from 'app/core/store/gamme/gamme.selectors';
import { addgamme, updategamme } from 'app/core/store/gamme/gamme.actions';
import { selectEnvbrandPayload } from 'app/core/store/brand/brand.selectors';

@Component({
  selector: 'app-dialog-gamme',
  templateUrl: './dialog-gamme.component.html',
  styleUrls: ['./dialog-gamme.component.css']
})
export class DialogGammeComponent implements OnInit {
  spinnerAdd :boolean = false;
  createGamme : FormGroup;
  modeles :any;
  brands :any;
  mode : any;
  item : any;
  form_btn : any;
  
  constructor(
        private store: Store<AppState>,
        private boGridService: BoGridService,
        private _toast: ToastService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<DialogGammeComponent>,
  ) { }

  ngOnInit(): void {
    this.mode = this.data["mode"]
    this.item = this.data["item"]
    console.log("MODE", this.mode)
    console.log("ITEM", this.item)

    // this.store.select(selectEnvmodelePayload).subscribe((res) => {  
    //   console.log(" modeles========>", res)
    //   this.modeles = res
    // });

    this.store.select(selectEnvbrandPayload).subscribe((res) => {  
      // console.log(" brand========>", res)
      this.brands = res
    });
    this.setForm();
  }

  
  setForm(){
    if(this.mode == "add"){
      this.form_btn = "Ajouter"
      this.createGamme = new FormGroup({
        name: new FormControl("", Validators.required),
        modele_id: new FormControl("", Validators.required),
        brand_id: new FormControl("", Validators.required),
      })
    }else{
      this.form_btn = "Modifier"
      this.createGamme = new FormGroup({
        name: new FormControl(this.item?.name, Validators.required),
        modele_id: new FormControl(this.item?.modele_id, Validators.required),
        brand_id: new FormControl(this.item?.brand_id, Validators.required),
      })

      this.modeles = this.item?.brand?.modeles
    }
  }

  filterBrand($event){
    console.log(this.brands)
    this.modeles = this.brands.find(brand => brand.id == $event.value).modeles;
    console.log(this.modeles)
  }

  addGamme(){
    console.log(this.createGamme.value)
    if(this.mode == "add"){
      this.store.dispatch(addgamme({ data: this.createGamme.value }));
      this.store.select(selectEnvgammeIsLoading).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvgammeStatus).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }else{
      this.store.dispatch(updategamme({ data: this.createGamme.value, uuid: this.item.uuid }));
      this.store.select(selectEnvgammeIsLoading).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvgammeStatus).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }
  }

}
