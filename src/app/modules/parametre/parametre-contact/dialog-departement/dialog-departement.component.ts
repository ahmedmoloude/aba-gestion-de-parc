import { ContactService } from 'app/core/services/contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-departement',
  templateUrl: './dialog-departement.component.html',
  styleUrls: ['./dialog-departement.component.css']
})
export class DialogDepartementComponent implements OnInit {
  spinnerAdd :boolean = false;
  createDeprtement : FormGroup;
  mode : any;
  item : any;
  form_btn : any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogDepartementComponent>,
    private contactService: ContactService,
  ) { }


  ngOnInit(): void {

    this.mode = this.data["mode"]
    this.item = this.data["item"]
    console.log("MODE", this.mode)
    console.log("ITEM", this.item)

    this.setForm();
  }

  
  setForm(){
    if(this.mode == "add"){
      this.form_btn = "Ajouter"
      this.createDeprtement = new FormGroup({
        name: new FormControl("", Validators.required),
      })
    }else{
      this.form_btn = "Modifier"
      this.createDeprtement = new FormGroup({
        name: new FormControl(this.item.name, Validators.required),
      })
    }
  }

  addDepartement(){
    this.spinnerAdd = true;
    if(this.mode == "add"){
      console.log("MODE ADD")
      this.contactService.addContactDepartement(this.createDeprtement.value).subscribe(
        (data) => {
          this.spinnerAdd = false
          console.log("departement", data)
          this.dialogRef.close(data["response"])
        },
        (error) => {
          console.log('error', error);
      });
    }else{
      console.log('MODE EDIT')
      this.contactService.editContactDepartement(this.createDeprtement.value, this.item.uuid).subscribe(
        (data) => {
          this.spinnerAdd = false
          console.log("departement", data)
          this.dialogRef.close(data["response"])
        },
        (error) => {
          console.log('error', error);
      });
    }
  }

}
