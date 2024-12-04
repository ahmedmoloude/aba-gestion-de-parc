import { Component, OnInit,Input,Inject } from '@angular/core';
import { TypeOfEpiServiceService } from '../../../../core/services/type-of-epi-service.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {PersonelService} from '../../../../core/services/personel.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.css'],
})
export class DialogAddComponent implements OnInit {
  typeOfEpis : any ;
  isLoading : boolean = false ;
  @Input() uuid : string ;
  constructor(
    private typeofpiserviceservice: TypeOfEpiServiceService,
    private personelservice : PersonelService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public dialogData: any, 
    ) {}
  epiForm = new FormGroup({
    epis: new FormArray([
      new FormGroup({ 
        type: new FormControl(),
        num_serie: new FormControl(),
        date_attr: new FormControl(),
        update_date: new FormControl(),
        amount: new FormControl(),
      })
    ])
  });
  ngOnInit() {
    this.typeofpiserviceservice.getAll().subscribe(resp=> {
      this.typeOfEpis = resp
    })
  }
  get epis() {
    return this.epiForm.controls['epis'] as FormArray;
  }
  addEpi() {
     this.epis.push(
      new FormGroup({ 
        type: new FormControl(),
        num_serie: new FormControl(),
        date_attr: new FormControl(),
        amount: new FormControl(),
      })
     )
  }
  getTypeChange(event , i){
 
  }
  onSubmit() {
    this.isLoading = true ;
  
    let dataToSend = {
        epis : this.epiForm.value,
        uuid : this.dialogData.uuid 
    }
    this.personelservice.addEpisToPersonnel(dataToSend).subscribe(
      () => {
        this.isLoading = false;
       window.location.reload()
      },
      (error) => {
        this.isLoading = false;
       window.location.reload()
      
      }
    );
  }
  convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
}
