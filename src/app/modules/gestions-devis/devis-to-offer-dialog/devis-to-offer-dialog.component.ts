import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoQuoteService } from 'app/core/services/admin-bo/bo-quotes.service';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-devis-to-offer-dialog',
  templateUrl: './devis-to-offer-dialog.component.html',
  styleUrls: ['./devis-to-offer-dialog.component.css'],
})
export class DevisToOfferDialogComponent implements OnInit {
  quoteForm: FormGroup;
  date_required = false;
  submitted = false;
  loading = false;

  attached_piece;

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private datePipe : DatePipe,
    private boQuoteService: BoQuoteService,
    public dialogRef: MatDialogRef<DevisToOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private _toast: ToastService
  ) {
  }


  onDateSelection(event: any , form_control_name) {
    const selectedDate = event.value; // assuming your datepicker output is "value"
    const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd'); // adjust format as needed

    console.log('foramted date: ' + formattedDate)
    this.quoteForm.get(form_control_name).setValue(formattedDate)
  }
  ngOnInit(): void {
    // accept devis
    if (this.dialogData.confirmed === "accept-quote") {
      this.quoteForm = new FormGroup({
        start_date: new FormControl('', Validators.required),
        end_date_check_box: new FormControl(false),
        end_date: new FormControl(''),
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

      // todo end_date required if customer market and disable end_date_check_box
    }

    // decline or rollback devis
    if (this.dialogData.confirmed === 'decline-quote' || this.dialogData.confirmed === 'rollback-quote') {
      this.quoteForm = new FormGroup({
        motif: new FormControl('', Validators.required),
      });
    }
  }

  get f(): { [key: string]: AbstractControl } { return this.quoteForm.controls; }
  onSubmit() {
    this.submitted = true;

    console.log('dialog submitted' , this.dialogData);
    if (this.quoteForm.invalid) {
      this._toast.warn("certains informations sont non renseignés !"); console.warn('form invalid'); return;
    }

    this.loading = true;
    const payload = { ...this.quoteForm.value }
    payload.commercial_id =  this.dialogData.quote.commercial_id

    // accept quote
    if (this.dialogData.confirmed === "accept-quote") {
      payload.next_status = "ACCEPTED"

      if(!this.attached_piece){
        this._toast.warn('le fichier est obligatoire ')
        this.submitted = false;
        this.loading = false;
        return;
      }
      let formData = new FormData()

      formData.append('attached_piece' , this.attached_piece);

      for (const property in payload) {
        formData.append(property, payload[property]);
      }
      this.boQuoteService.acceptQuoteVersion(this.dialogData.quote.last_version[0].uuid, formData).subscribe((res: any) => {
        this.loading = false;
        this._toast.success("Offre commerciale généré avec succés !")
        this.dialogRef.close(res.response);
      }, err => { this.loading = false; this._toast.error("Une erreur est survenue !") })
    }

    // decline quote
    if (this.dialogData.confirmed === "decline-quote") {
      payload.next_status = "REJECTED"
      this.boQuoteService.declineQuoteVersion(this.dialogData.quote.last_version[0].uuid, payload).subscribe((res: any) => {
        this.loading = false;
        this._toast.success("Opération effectué avec succés !")
        this.dialogRef.close(res.response);
      }, err => { this.loading = false; this._toast.error("Une erreur est survenue !") })
    }

    // rollback quote
    if (this.dialogData.confirmed === "rollback-quote") {
      payload.next_status = "CREATED"
      this.boQuoteService.rollbackConfirmQuoteVersion(this.dialogData.quote.last_version[0].uuid, payload).subscribe((res: any) => {
        this.loading = false;
        this._toast.success("Opération effectué avec succés !")
        this.dialogRef.close(res.response);
      }, err => { this.loading = false; this._toast.error("Une erreur est survenue !") })
    }
  }

  downloadDoc(){
    var blob = new Blob([this.attached_piece], { type: 'application/pdf' });
    var url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.click();
  }


	selectDoc(event: any) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			return;
		}

		var mimeType = event.target.files[0].type;

		// if (mimeType.match(/image\/*/) == null) {
		// 	return;
		// }

		// var reader = new FileReader();
		// reader.readAsDataURL(event.target.files[0]);

    this.attached_piece = event.target.files[0]
	}

}
