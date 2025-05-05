import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Component({
  selector: 'app-import-vehicule-dialog',
  templateUrl: './import-vehicule-dialog.component.html',
})
export class ImportVehiculeDialogComponent {
  importForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<ImportVehiculeDialogComponent>,
    private VehiculeService : VehiculeService,
  ) {
    this.importForm = this.fb.group({});
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  importExcel(): void {
    if (!this.selectedFile) {
      alert('Please select an Excel file');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.VehiculeService.ImportTrucks(formData).subscribe({
      next: (res) => {
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Import failed:', err);
        alert('Failed to import file');
      }
    });
  }
}
