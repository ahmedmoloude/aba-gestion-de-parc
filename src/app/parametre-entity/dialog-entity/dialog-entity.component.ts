import { Component,Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EntityService } from 'app/core/services/entity/entity.service';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-dialog-entity',
  templateUrl: './dialog-entity.component.html',
  styleUrls: ['./dialog-entity.component.css']
})
export class DialogEntityComponent implements OnInit {

  createEntity = new FormGroup({});
  entity : any;
  form_btn : any;
  type : any;
  spinnerAdd : boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<DialogEntityComponent>,
        private EntityService : EntityService,
        private _toast: ToastService
  ) { }

  ngOnInit(): void {
    this.setForm()
    this.type = this.data["type"]
  }

  setForm(){
      if(this.data["type"] == "add"){
        this.form_btn = "Ajouter"
  
        this.createEntity = new FormGroup({
          name: new FormControl("", Validators.required),
        })
      }else{
        this.entity = this.data["item"]
        this.form_btn = "Modifier"
        this.createEntity = new FormGroup({
          name: new FormControl(this.entity.name, Validators.required),
        })
      }
    }
  
    addEntity(){
      console.log("gps", this.createEntity.value)
  
        switch(this.type){
            case "add":
              console.log("add")
              console.log("type form add")
              this.spinnerAdd = true
              this.EntityService.addEntity(this.createEntity.value).subscribe(
                (data) => {
                  console.log('data', data);
                  this._toast.success("Entity ajouté avec succés");
                  this.spinnerAdd = false;
                  this.dialogRef.close(data["response"]);
                },
                (error) => {
                  console.log('error', error);
                  this.spinnerAdd = false;
                  this._toast.error("Une erreur est survenue");
              });
                break;
            case "edit":
              console.log("edit")
              console.log("type form edit")
              this.spinnerAdd = true
              this.EntityService.editEntity(this.createEntity.value, this.entity.uuid).subscribe(
                (data) => {
                  console.log('data', data);
                  this._toast.success("Entity modifié avec succés");
                  this.spinnerAdd = false;
                  this.dialogRef.close(data["response"]);
                },
                (error) => {
                  console.log('error', error);
                  this.spinnerAdd = false;
                  this._toast.error("Une erreur est survenue");
              });
                break;
            
            default :
            console.log("rien")
        }
    }

}
