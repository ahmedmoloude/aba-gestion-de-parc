import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastService } from 'app/services';
@Component({
  selector: 'app-template-dialog',
  templateUrl: './template-dialog.component.html',
  styleUrls: ['./template-dialog.component.css'],
})
export class TemplateDialogComponent implements OnInit {
  spinner: boolean = false;
  spinnerActivity: boolean = false;
  templateForm: FormGroup;
  activities: any
  constructor(
    public dialogRef: MatDialogRef<TemplateDialogComponent>,
    private boGridService: BoGridService,
    private _toaster: ToastService,
    private router: Router,) {
  }

  ngOnInit(): void {
    this.setForm();
    this.spinnerActivity = true;
    this.boGridService.fetchListActivity().subscribe(data => {
      this.activities = data;
      this.spinnerActivity = false;
    }, error => {
      console.log("error", error);
    })
  }

  importTemplate() {
    if (this.templateForm.invalid) { console.log("invalid form"); return; }

    this.spinner = true;
    const formData = new FormData();
    formData.append('activity_id', this.templateForm.get('activity_id').value);
    formData.append('file', this.templateForm.get('fileSource').value);
    formData.append('grid_title', this.templateForm.get('title').value);

    this.boGridService.importTemplate(formData).subscribe(data => {
      this.spinner = false;
      this.dialogRef.close(data);
      this._toaster.success("Offre sectorielle importé avec succés !")
    }, error => {
      this.spinner = false;
      this._toaster.error("Erreur offre sectorielle non importé !")
      console.log("error", error);
    })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.templateForm.patchValue({
        fileSource: file
      });
    }
  }

  onActivityChange(event) {
    console.log(event.value)
    this.templateForm.patchValue({
      activity_id: event.value
    })
  }

  setForm() {
    this.templateForm = new FormGroup({
      activity_id: new FormControl("", Validators.required),
      title: new FormControl("", Validators.required),
      file: new FormControl("", Validators.required),
      fileSource: new FormControl('', [Validators.required])
    })
  }

}
