import { selectEnvprestatairePayload } from './../../../../core/store/prestataire/prestataire.selectors';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {
  addtonnage,
  updatetonnage,
} from 'app/core/store/tonnage/tonnage.actions';
import { MatDialogRef } from '@angular/material/dialog';
import {
  selectEnvtonnageStatus,
  selectEnvtonnageIsLoading,
} from 'app/core/store/tonnage/tonnage.selectors';
import { addVehiculeDocuments, updateVehiculeDocuments } from 'app/core/store/vehiculedocument/vehiculedocument.actions';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import {
  selectEnvVehiculeDocumentStatus,
  selectEnvVehiculeDocumentIsLoading,
} from 'app/core/store/vehiculedocument/vehiculedocument.selectors';
import { RessouresService } from 'app/core/services/ressoures.service';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;
  spinnerAdd: boolean = false;
  createAssurance: FormGroup;
  vehicule: any;
  file_assurance: any;
  prestataires: any = [];
  trucks: any = [];
  start_time : any
  end_time : any;
  mode : any;
  item : any;
  is_truck : boolean = false
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};

  url = environment.STORAGE + '/document_vehicule/';
  imageSrc;
  pdfSrc: string;
  fileExtension: string;
  selectedFileContent: string | ArrayBuffer | null = null;


  setDateDebut(e){
    console.log("DATE DEBUT", e.target.value)
    this.start_time= e.target.value;
  }

  setDateFin(e){
    console.log("DATE FIN", e.target.value)
    this.end_time= e.target.value;
  }

  constructor(
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private ressourceService: RessouresService,
    private _toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDialogComponent>
  ) {}

  // ngAfterViewInit(){
  //   if(this.mode == "edit"){
  //     console.log("AFTER VIEW", this.item?.truck)
  //     setTimeout(() => {
  //       this.searchComponents.toArray()[0]?.selectObject(this.item?.truck)
  //     });
  //   }
  // }

  ngOnInit(): void {
    this.mode = this.data['mode'];
    this.item = this.data['item'];
    this.setForm();
    this.vehicule = this.data['vehicule'];

    console.log(' truck ', this.vehicule);
    console.log(' item ', this.item);
    console.log(' mode ', this.mode);
    if(this.vehicule){
      this.is_truck = true
      this.createAssurance.controls['truck_id'].setValue(this.vehicule.id);
    }

    this.ressourceService.getTrucks().subscribe(
      (data:any) => {
        console.log("data conducteur", data)
        this.trucks = data.response;
        setTimeout(() => {
          this.searchComponents.toArray()[0]?.selectObject(this.item?.truck)
        });
      }
    );

    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      console.log(' prestatires ========>', res);
      this.data = res;
      this.prestataires = this.data.filter(d => d.type == 'ASSURANCE')
    });
  }

  onTruckChange(event){
    if(event){
      console.log("EVENT", event)
      this.vehicule = event
      this.createAssurance.controls['truck_id'].setValue(event.id);
    }
  }

  setForm() {
    if(this.mode == 'edit'){
      console.log("MODE EDIT")
      this.createAssurance = new FormGroup({
        truck_id: new FormControl(this.item.truck_id, Validators.required),
        type: new FormControl('ASSURANCE'),
        prestataire_id: new FormControl(this.item.prestataire_id, Validators.required),
        start_date: new FormControl(this.item.start_date, Validators.required),
        end_date: new FormControl(this.item.end_date, Validators.required),
        n_police: new FormControl(this.item.n_police, Validators.required),
        rappel: new FormControl(this.item.rappel, Validators.required),
        montant: new FormControl(this.item.montant),
      });
      this.imageSrc=`${this.url + this.item.id}/${this.item.file}`;
      this.fileExtension = this.getFileExtension(this.item.file);
      console.log('this.imageSrc');
      console.log(this.imageSrc);

    }else{
      console.log("MODE ADD")
      this.createAssurance = new FormGroup({
        truck_id: new FormControl('', Validators.required),
        type: new FormControl('ASSURANCE'),
        prestataire_id: new FormControl('', Validators.required),
        start_date: new FormControl('', Validators.required),
        end_date: new FormControl('', Validators.required),
        n_police: new FormControl('', Validators.required),
        rappel: new FormControl('', Validators.required),
        montant: new FormControl(''),
      });
    }

  }

  getFileExtension(url: string): string | undefined {
    try {
      // Extraire le nom de fichier de l'URL
      const fileName = url.split('/').pop();

      // Extraire l'extension du nom de fichier
      if (fileName) {
        const parts = fileName.split('.');
        if (parts.length > 1) {
          return parts.pop() || undefined;
        }
      }

      console.log('Extension de fichier non trouvée.');
      return undefined;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'extension du fichier :', error);
      return undefined;
    }
  }
  onSelectImageAssurance(event) {
    this.imageSrc=null;
    this.file_assurance = (event.target as HTMLInputElement).files[0];
    console.log(this.file_assurance, 'file');
  }

  addAssurance() {
    console.log(this.createAssurance.value);

    const formData = new FormData();
    for (var key in this.createAssurance.value) {
      if (this.createAssurance.value[key]) {
        formData.append(key, this.createAssurance.value[key]);
      }
    }
    if(this.mode == 'edit'){
      if (this.file_assurance) {
        formData.append('file', this.file_assurance);
      }
      this.store.dispatch(updateVehiculeDocuments({ data: formData, uuid: this.item.uuid }));
      this.store.select(selectEnvVehiculeDocumentIsLoading).subscribe((res) => {
        console.log('spinnerAdd', res);
        this.spinnerAdd = res;
      });
      this.store.select(selectEnvVehiculeDocumentStatus).subscribe((res) => {
        console.log('res', res);
        if (res == 'SUCCESS') {
          this.dialogRef.close('data');
        }
      });
    }else{
      if (this.file_assurance) {
        formData.append('file', this.file_assurance);
        this.store.dispatch(addVehiculeDocuments({ data: formData }));
        this.store.select(selectEnvVehiculeDocumentIsLoading).subscribe((res) => {
          console.log('spinnerAdd', res);
          this.spinnerAdd = res;
        });
        this.store.select(selectEnvVehiculeDocumentStatus).subscribe((res) => {
          console.log('res', res);
          if (res == 'SUCCESS') {
            this.dialogRef.close('data');
          }
        });
      } else {
        this._toast.error('Remplir le document !');
      }
    }
  }
}
