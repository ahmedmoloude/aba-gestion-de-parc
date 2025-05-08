import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonelService } from 'app/core/services/personel.service';
import { AffectationVehiculeService } from 'app/core/services/vehicule/affectation-vehicule.service';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-affecation-vehicule',
  templateUrl: './affecation-vehicule.component.html',
  styleUrls: ['./affecation-vehicule.component.css']
})
export class AffecationVehiculeComponent implements OnInit {
  conducteurs: any[] = [];
  spinner = false;
  spinnerAdd = false;
  createAffectation!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AffecationVehiculeComponent>,
    private personnelService: PersonelService,
    private affectationVehiculeService: AffectationVehiculeService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.getConducteurs();
  }

  setForm(): void {
    this.createAffectation = new FormGroup({
      chauffeur_id: new FormControl('', Validators.required),
      mission: new FormControl(''),
      truck_id: new FormControl(this.data?.item?.id || '', Validators.required),
      date_affectation: new FormControl('', Validators.required),
    });
  }

  getConducteurs(): void {
    this.spinner = true;
    this.personnelService.getConducteurs().subscribe({
      next: (data) => {
        this.conducteurs = data['response'];
        this.spinner = false;
      },
      error: (err) => {
        console.error('Erreur chargement chauffeurs:', err);
        this.spinner = false;
      }
    });
  }

  addAffectation(): void {
    if (this.createAffectation.invalid) {
      console.warn('⚠️ Form invalid');
      return;
    }

    const payload = {
      ...this.createAffectation.value,
      date_affectation: formatDate(this.createAffectation.value.date_affectation, 'yyyy-MM-dd', 'en-US')
    };

    this.spinnerAdd = true;
    this.affectationVehiculeService.addAffectation(payload).subscribe({
      next: () => {
        this.spinnerAdd = false;
        this.snackBar.open('Affectation ajoutée avec succès ✅', 'Fermer', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close({refresh: true});
      },
      error: (err) => {
        console.error('Erreur affectation:', err);
        this.spinnerAdd = false;
        this.snackBar.open('Erreur lors de l\'affectation ❌', 'Fermer', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}