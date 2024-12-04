import { ContactService } from 'app/core/services/contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-fonction',
  templateUrl: './dialog-fonction.component.html',
  styleUrls: ['./dialog-fonction.component.css']
})
export class DialogFonctionComponent implements OnInit {

  spinnerAdd :boolean = false;
  createFonction : FormGroup;
  departements :any;
  mode : any;
  item : any;
  form_btn : any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contactService: ContactService,
    public dialogRef: MatDialogRef<DialogFonctionComponent>,
  ) { }

  ngOnInit(): void {
    this.mode = this.data["mode"]
    this.item = this.data["item"]
    console.log("MODE", this.mode)
    console.log("ITEM", this.item)

    this.contactService.getContactDepartement().subscribe(
      (data) => {
        console.log("departement", data)
        this.departements = data['response'];
      },
      (error) => {
        console.log('error', error);
    });
    this.setForm();
  }

  
  setForm(){
    if(this.mode == "add"){
      this.form_btn = "Ajouter"
      this.createFonction = new FormGroup({
        name: new FormControl("", Validators.required),
        departement_id: new FormControl("", Validators.required),
      })
    }else{
      this.form_btn = "Modifier"
      this.createFonction = new FormGroup({
        name: new FormControl(this.item.name, Validators.required),
        departement_id: new FormControl(this.item.departement_id, Validators.required),
      })
    }
  }

  addFonction(){
    this.spinnerAdd = true;
    if(this.mode == "add"){
      console.log("MODE ADD")
      this.contactService.addContactFonction(this.createFonction.value).subscribe(
        (data) => {
          this.spinnerAdd = false
          console.log("fonction", data)
          this.dialogRef.close(data["response"])
        },
        (error) => {
          console.log('error', error);
      });
    }else{
      console.log('MODE EDIT')
      this.contactService.editContactFonction(this.createFonction.value, this.item.uuid).subscribe(
        (data) => {
          this.spinnerAdd = false
          console.log("fonction", data)
          this.dialogRef.close(data["response"])
        },
        (error) => {
          console.log('error', error);
      });
    }
  }

}
