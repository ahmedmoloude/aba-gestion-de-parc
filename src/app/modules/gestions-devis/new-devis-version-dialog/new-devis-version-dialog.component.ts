import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoQuoteService } from 'app/core/services/admin-bo/bo-quotes.service';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-new-devis-version-dialog',
  templateUrl: './new-devis-version-dialog.component.html',
  styleUrls: ['./new-devis-version-dialog.component.css'],
})
export class NewDevisVersionDialogComponent implements OnInit {
  quoteForm: FormGroup;
  date_required = false;
  submitted = false;
  loading = false;

  constructor(
    private quoteService: BoQuoteService,
    public dialogRef: MatDialogRef<NewDevisVersionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private _toast: ToastService
  ) { }

  ngOnInit(): void {
    this.quoteForm = new FormGroup({
      // start_date: new FormControl('', Validators.required), // todo min date today and default today
      end_date_check_box: new FormControl(false), // todo if end_date_check_box false end_date expired in XX Month configured in DB
      end_date: new FormControl(''),

      // todo extra fields and fill it with previous values 
      // limit_vl_max: new FormControl(''),
      // limit_wg_max: new FormControl(''),
      // limit_qt_max: new FormControl(''),
      // potential_vl_max: new FormControl(''),
      // potential_wg_max: new FormControl(''),
      // potential_qt_max: new FormControl(''),
    });

    this.quoteForm.get('end_date_check_box').valueChanges.subscribe((value) => {
      if (value == true) {
        this.quoteForm.controls.end_date.setValidators(Validators.required);
        this.quoteForm.controls.end_date.updateValueAndValidity()
      }
      else {
        this.quoteForm.controls.end_date.clearValidators();
        this.quoteForm.controls.end_date.updateValueAndValidity()
      }
    })
  }

  get f(): { [key: string]: AbstractControl } { return this.quoteForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.quoteForm.invalid) { console.warn('form invalid'); return; }

    this.loading = true;
    this.quoteService.newQuoteVersion(this.dialogData.uuid, this.quoteForm.value).subscribe(
      (res: any) => {
        this.loading = false;
        this.dialogRef.close(res.response);
        this._toast.success("Nouvelle proposition de devis crée avec succés !")
      },
      (err) => { this.loading = false; this._toast.error("Une Erreur est survenue !") });
  }
}
