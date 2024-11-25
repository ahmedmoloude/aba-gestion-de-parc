import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { PersonelService } from '../../../../app/core/services/personel.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../app/core/services/toast.service' ;
@Component({
  selector: 'app-dialog-leave-personnel',
  templateUrl: './dialog-leave-personnel.component.html',
  styleUrls: ['./dialog-leave-personnel.component.css']
})
export class DialogLeavePersonnelComponent implements OnInit {
  ShowDate:boolean = false ;
  spinner : boolean = false;
  Date_debut : '';
  Date_de_fin: ' ';
  motif : any ;
  motifs = [
     {
      motif :  'abscence'
     },
     {
      motif : 'conge'
     },
     {
      motif : 'maladie'
     }
    
    
  ];
  form = new FormGroup({
    start_date : new FormControl(''),
    end_date : new FormControl(''),
  });
  constructor(
    private personelService : PersonelService,
    @Inject(MAT_DIALOG_DATA) 
    public personnel: any,
    private _toast : ToastService,
    public dialogRef: MatDialogRef<DialogLeavePersonnelComponent>,
    ) { 
    }

  ngOnInit(): void {
   
  }
  addConge(){
      this.spinner = true
      console.log(this.spinner)
      console.log(this.form.value.start_date)
      console.log(this.form.value.end_date)
      console.log(this.motif)
      const data = {
        start_date : this.form.value.start_date,
        Date_de_fin : this.form.value.end_date,
        motif : this.motif,
        per : this.personnel
      }
      
      this.personelService.availablity(data).subscribe((res:any)=>{
        if(res.status == 200) {
          this.spinner = false 
        this.dialogRef.close();
        this._toast.success('Opération a été bien affectuer ');
        window.location.reload();

        }
        
      })
  }
  onValChange(value){
    if(value.length!=0){
      this.motif = value ;
    }
  }

}
