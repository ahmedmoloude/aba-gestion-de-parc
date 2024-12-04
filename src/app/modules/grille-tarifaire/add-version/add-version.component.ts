import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { importGridDetails } from 'app/core/store/grids/grids.actions';
import { selectPublicGrids } from 'app/core/store/grids/grids.selectors';

@Component({
  selector: 'app-add-version',
  templateUrl: './add-version.component.html',
  styleUrls: ['./add-version.component.css']
})
export class AddVersionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<AddVersionComponent>
  ) {}

  gridForm: FormGroup;
  file: any;
  gridList = []

  ngOnInit(): void {
    this.setForm()
    this.getGridsList()
  }

  uploadFile(event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  setForm() {
    this.gridForm = new FormGroup({
      grid_title: new FormControl('', Validators.required),
    })
  }

  getGridsList() {
    this.store.select(selectPublicGrids).subscribe((res) => {
      this.gridList = res
    })
  }
  // selectPublicGrids

  onSubmitForm() {
    let formData: any = new FormData()
    formData.append('grid_title', this.gridForm.controls['grid_title'].value)
    formData.append('rubric', this.data.rubric)
    formData.append('update_mode', 0);
    formData.append('nature', this.data.nature)
    formData.append('file', this.file)
    // let is_activated = this.gridList.length == 0 ? true : false
    // formData.append('is_activated', is_activated)

    this.store.dispatch(importGridDetails({ data: formData }));
    this.dialogRef.close()
  }

  close() {
    this.dialogRef.close()
  }

}
