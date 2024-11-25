import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { AppState } from 'app/core/store/app.states';
import { selectEnvprestatairePayload } from 'app/core/store/prestataire/prestataire.selectors';
import { ToastService } from 'app/services';
import { max } from 'moment';

@Component({
  selector: 'app-add-piece',
  templateUrl: './add-piece.component.html',
  styleUrls: ['./add-piece.component.css']
})
export class AddPieceComponent implements OnInit {

  names : any = [];
  families : any = [];
  prestataires: any = [];
  pieceForm: FormGroup;
  form_btn : any;
  file : any;
  type : any;
  piece : any;
  spinnerAdd : boolean = false;

  constructor(private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddPieceComponent>,
              private vehiculeService: VehiculeService,
              private _toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.type = this.data["type"];
    this.piece = this.data["item"];
    console.log("INIT TYPE ", this.type)
    this.vehiculeService.getNamePiece().subscribe(
      (data:any) => {
        console.log("NAMES ", data.response)
        this.names = data.response;
    });

    this.vehiculeService.getFamilyPiece().subscribe(
      (data:any) => {
        console.log("FAMILIES ", data.response)
        this.families = data.response;
    });

    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      console.log(' prestatires ========>', res);
      this.data = res;
      this.prestataires = this.data.filter(d => d.type == 'PIECE_RECHANGE')
    });

    this.setForm();
  }

  setForm(){
    // console.log("TYPE", this.data["type"])
    if(this.type){
      console.log("FORM ADD")
      this.form_btn = "Créer"
      this.pieceForm = new FormGroup({
        date_entree: new FormControl("", Validators.required),
        reference: new FormControl("", Validators.required),
        name_id: new FormControl("", Validators.required),
        family_id: new FormControl("", Validators.required),
        stock_min: new FormControl("", Validators.required),
        quantite: new FormControl("", Validators.required),
        prix_unitaire: new FormControl("", Validators.required),
        montant_ht: new FormControl({value:"", disabled: true}, Validators.required),
        montant_ttc: new FormControl({value:"", disabled: true}, Validators.required),
        tva: new FormControl({value:"", disabled: true}, Validators.required),
        prestataire_id: new FormControl("", Validators.required),
      })
      // Subscribe to value changes of prix_unitaire and quantite
        this.pieceForm.get('prix_unitaire').valueChanges.subscribe(() => {
          this.calculateMontant();
        });

        this.pieceForm.get('quantite').valueChanges.subscribe(() => {
          this.calculateMontant();
        });
    }else{
      this.form_btn = "Modifier"
      this.pieceForm = new FormGroup({
        date_entree: new FormControl(this.piece?.date_entree, Validators.required),
        reference: new FormControl(this.piece?.reference, Validators.required),
        name_id: new FormControl(this.piece?.name_id, Validators.required),
        family_id: new FormControl(this.piece?.family_id, Validators.required),
        stock_min: new FormControl(this.piece?.stock_min, [Validators.required, Validators.max(this.piece?.quantite)]),
        quantite: new FormControl(this.piece?.quantite, Validators.required),
        // prix_unitaire: new FormControl("", Validators.required),
        // montant_ht: new FormControl("", Validators.required),
        // montant_ttc: new FormControl("", Validators.required),
        // tva: new FormControl("", Validators.required),
        // prestataire_id: new FormControl("", Validators.required),
      })
    }
  }

  // Function to calculate montant_ht
  calculateMontant() {
    const prixUnitaire = this.pieceForm.get('prix_unitaire').value;
    const quantite = this.pieceForm.get('quantite').value;

    // Perform the calculation and update the montant_ht control
    const montantHt = prixUnitaire * quantite;
    const montantTTc = montantHt * 1.2;
    const tva = montantTTc - montantHt;
    this.pieceForm.get('montant_ht').setValue(montantHt);
    this.pieceForm.get('tva').setValue(tva);
    this.pieceForm.get('montant_ttc').setValue(montantTTc);
  }

  onSelectImagePiece(event){
    this.file = (event.target as HTMLInputElement).files[0];
  }

  addPiece(){
    const formData = new FormData();
    const formValue = this.pieceForm.getRawValue();
    for (var key in formValue) {
      if (formValue[key]) {
        formData.append(key, formValue[key]);
      }
    }
    if (this.file) {
      formData.append('file', this.file);
    }

    if(this.type){
      console.log("ADD FORM ")
      this.spinnerAdd = true ;
      this.vehiculeService.addPieceRechange(formData).subscribe((res:any)=>{
        console.log("DATA ADDED ", res.response)
        this.dialogRef.close(res.response);
        this._toast.success("Piéce de rechange ajoutée avec succées ");
      },
      (error) => {
        console.log('error', error);
        this.spinnerAdd = false;
        this._toast.error("Une erreur est survenue");
      })
    }else{
      console.log("EDIT FORM ")
      this.spinnerAdd = true ;
      this.vehiculeService.updatePieceRechange(formData, this.piece?.uuid).subscribe((res:any)=>{
        console.log("DATA ADDED ", res.response)
        this.dialogRef.close(res.response);
        this._toast.success("Piéce de rechange modifiée avec succées ");
      },
      (error) => {
        console.log('error', error);
        this.spinnerAdd = false;
        this._toast.error("Une erreur est survenue");
      })
    }
  }

}
