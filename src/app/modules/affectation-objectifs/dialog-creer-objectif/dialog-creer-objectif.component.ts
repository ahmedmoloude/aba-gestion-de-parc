import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastService } from 'app/services';
import { ParametreService } from 'app/core/services/parametre.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-creer-objectif',
  templateUrl: './dialog-creer-objectif.component.html',
  styleUrls: ['./dialog-creer-objectif.component.css']
})
export class DialogCreerObjectifComponent implements OnInit {

  objectifs: any = [];
  spinner: boolean;
  createObjectif = new FormGroup({});
  // date : any;
  constructor(
    public dialog: MatDialog,
    private parametreService: ParametreService,
    private _toast: ToastService,
    public dialogRef: MatDialogRef<DialogCreerObjectifComponent>,
  ) { }

  

  ngOnInit(): void {
    this.createObjectif = new FormGroup({
      objectif_id: new FormControl("", Validators.required),
      annee: new FormControl(moment().format('yyyy'), Validators.required),
    })

    this.spinner = true;
    this.parametreService.getObjectif().subscribe(
      (data) => {
        this.spinner = false;
        this.objectifs = data['response'];
        console.log('AFFECTATION OBJECTIF', this.objectifs);
      },
      (error) => {
        this.spinner = false;
        console.log('error', error);
      });
  }

  addObjectif(){
    this.createObjectif.get("annee").setValue(this.createObjectif.get("annee").value+'-01-01')
    console.log("CREER", this.createObjectif.value)
    this.parametreService.addAffectationYear(this.createObjectif.value).subscribe(
      (data) => {
        // this.spinner = false;
        // this.objectifs = data['response'];
        console.log('AFFECTATION YEAR', data['response']);
        this.dialogRef.close(data['response']);
      },
      (error) => {
        this.spinner = false;
        console.log('error', error);
      });
  }

}
