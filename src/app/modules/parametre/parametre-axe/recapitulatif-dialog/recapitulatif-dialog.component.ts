import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { addAxe, updateAxe } from 'app/core/store/axe/axe.action';
import { selectEnvIsLoadingAxe, selectEnvStatusAxe } from 'app/core/store/axe/axe.selectors';
@Component({
  selector: 'app-recapitulatif-dialog',
  templateUrl: './recapitulatif-dialog.component.html',
  styleUrls: ['./recapitulatif-dialog.component.css']
})
export class RecapitulatifDialogComponent implements OnInit {
axe : any;
type : any;
cities :any;
spinner :boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>,
    private _toast: ToastService,
    public dialogRef: MatDialogRef<RecapitulatifDialogComponent>,) { }

  ngOnInit(): void {
    this.axe = this.data["item"];
    this.cities = this.data["item"].cities;
    this.type = this.data["type"];
    console.log("item get", this.axe);
    console.log("type", this.type);
  }

  passage(){

    return this.axe["passage"].filter(axe => axe.pivot.deptere == "transit");
  }

  passageConfirmation(){
    return this.axe["passage"].filter(axe => axe.deptere == "transit");
  }

  cityName(id){
    return this.cities.find((city) => city.id == id);
  }

  addAxe(){
    let axe = {
      "title" : this.axe.title,
      "code" : this.axe.code,
      "truck_id" : this.axe.truck_id,
      "passage" : this.axe.passage,
    };
    if(this.axe.axe_id){
      this.spinner = true
      console.log("a envoyer", axe)
      axe["axe_id"] = this.axe.axe_id;
      this.store.dispatch(updateAxe({ data: axe, uuid: axe["axe_id"]}));
      this.store.select(selectEnvIsLoadingAxe).subscribe((res) => {
        this.spinner = res
      });
      this.store.select(selectEnvStatusAxe).subscribe((res) => {
        if(res == 'SUCCESS'){
          this.dialogRef.close("close");
        }
      });
    }else{
      console.log("a envoyer", axe)
      this.store.dispatch(addAxe({ data: axe }));
      this.store.select(selectEnvIsLoadingAxe).subscribe((res) => {
        this.spinner = res
      });
      this.store.select(selectEnvStatusAxe).subscribe((res) => {
        if(res == 'SUCCESS'){
          this.dialogRef.close("close");
        }
      });
    }
  }


}
