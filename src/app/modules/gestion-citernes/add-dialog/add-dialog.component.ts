import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Observable } from 'rxjs';
// import { selectParc } from 'app/core/store/resources/resources.selectors';
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'app/core';
import { selectEnvciterneIsLoading, selectEnvciterneStatus } from 'app/core/store/citerne/citerne.selectors';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { addciterne, updateciterne } from 'app/core/store/citerne/citerne.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;

  filteredOptions: Observable<string[]>;
  createCiterne = new FormGroup({});
  parcs : any;
  citerne : any;
  capacity = 0;
  stockMin = 0;
  form_btn : any;
  spinnerAdd : boolean;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  constructor(private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private vehiculeService : VehiculeService,
    private _toast: ToastService,) {}

  ngOnInit(): void {
    this.store.select(selectEnvparcPayload).subscribe((res) => {
      // console.log(" parc========>", res)
      this.parcs = res;
    });

    this.setForm();
  }

  ngAfterViewInit(){
    if (this.data["type"] == "edit"){
      this.searchComponents.toArray()[0]?.selectObject(this.citerne?.parc)
    }
  }

  setForm(){
    if(this.data["type"] == "add"){
      this.form_btn = "Ajouter";
      console.log("form set")
      this.createCiterne = new FormGroup({
        n_citerne: new FormControl("", Validators.required),
        name: new FormControl("", Validators.required),
        qte_reel: new FormControl("", Validators.required),
        capacite: new FormControl("", Validators.required),
        stock_min: new FormControl("", Validators.required),
        stock_min_souhaite: new FormControl("", Validators.required),
        date_installation: new FormControl("", Validators.required),
        parc_id: new FormControl("", Validators.required),
      })
    }else{
      this.form_btn = "Modifier";
      this.citerne = this.data.item;
      this.capacity = this.citerne.capacite;
      this.stockMin = this.citerne.stock_min;
      this.createCiterne = new FormGroup({
        n_citerne: new FormControl(this.citerne.n_citerne, Validators.required),
        name: new FormControl(this.citerne.name, Validators.required),
        qte_reel: new FormControl(this.citerne.qte_reel, [Validators.required, Validators.max(this.capacity), Validators.min(this.stockMin)]),
        capacite: new FormControl(this.citerne.capacite, Validators.required),
        stock_min: new FormControl(this.citerne.stock_min, Validators.required),
        stock_min_souhaite: new FormControl(this.citerne.stock_min_souhaite, Validators.required),
        date_installation: new FormControl(this.citerne.date_installation, Validators.required),
        parc_id: new FormControl(this.citerne.parc_id, Validators.required),
      })
    }
    this.createCiterne.controls.capacite.valueChanges.subscribe(
      (v) => {
        console.log('capacite', v);
        this.capacity = v;
      }
    );
    this.createCiterne.controls.stock_min.valueChanges.subscribe(
      (v) => {
        console.log('stock_min', v);
        this.stockMin = v;
      }
    )
  }

  filterParc(event){
    if(event){
      this.createCiterne.controls['parc_id'].setValue(event.id);
    }
  }

  addCiterne(){
    if(this.createCiterne.get("qte_reel").value > this.createCiterne.get("capacite").value){
      this._toast.success("La quantité ne doit pas dépasser la capacité");
    }else{
      this.spinnerAdd = true
      console.log(this.createCiterne.value)
      let citerne$ = this.data["type"] == "add" ? this.vehiculeService.addCiterne(this.createCiterne.value) : this.vehiculeService.updateCiterne(this.createCiterne.value, this.citerne.uuid);
      citerne$.subscribe(
        (data) => {
          console.log('data', data);
          this.data["type"] == "add" ? this._toast.success("Citerne ajoutée avec succés"): this._toast.success("Citerne modifiée avec succés");
          this.spinnerAdd = false;
          this.dialogRef.close(data["response"]);
        },
        (error) => {
          console.log('error', error);
          this.spinnerAdd = false;
          this._toast.error("Une erreur est survenue");
      });
    }


    // this.store.dispatch(addciterne({ data: this.createCiterne.value}));
    //   this.store.select(selectEnvciterneIsLoading).subscribe((res) => {
    //     // console.log("spinner", res);
    //     this.spinnerAdd = res
    //   });
    //   this.store.select(selectEnvciterneStatus).subscribe((res) => {
    //     console.log("status", res);
    //     if(res == 'SUCCESS'){
    //       this.dialogRef.close();
    //     }
    //   });
  }
}
