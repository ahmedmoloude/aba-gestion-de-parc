import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BoOfferService } from 'app/core/services/admin-bo/bo-offers.service';
import { AffretementServiceService } from 'app/core/services/affretement-service.service';
import { SearchService } from 'app/services/search.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-commerciales-dialog',
  templateUrl: './commerciales-dialog.component.html',
  styleUrls: ['./commerciales-dialog.component.css'],
})
export class CommercialesDialogComponent implements OnInit {



  // TODO: get form api
  typeServices = [
    {
      name : 'Messagerie',
      id : 1,
    },
    {

      name : 'Affrètement',
      id : 2
    }
  ]

  offreform: FormGroup;
  options = [];
  display: boolean;
  constructor(private search: SearchService, private offerservice: BoOfferService, public dialogRef: MatDialogRef<CommercialesDialogComponent>, private _router: Router,
    private affretementService: AffretementServiceService
    ) { }

  date_required = false;
  submitted = false;
  loading = false;
  typeAffretement: any [];
  hasIndexation = false
  hasMinimumPrice = false

  ngOnInit(): void {
    this.display = false;
    this.offreform = new FormGroup({
      title: new FormControl('', Validators.required),
      type_affretement_id: new FormControl(''),
      prix_reference: new FormControl(''),
      part_carburant: new FormControl(30),
      has_indexation: new FormControl(false),
      is_return: new FormControl(false, Validators.required),
      client: new FormControl('', Validators.required),
      id_customer: new FormControl('', Validators.required),
      name: new FormControl(''),
      start_date: new FormControl('', Validators.required),
      end_date_check_box: new FormControl(false),
      end_date: new FormControl(''),
      id_service: new FormControl('', Validators.required),
      //
      limit_vl_max: new FormControl('', [Validators.min(0)]),
      limit_wg_max: new FormControl('', [Validators.min(0)]),
      limit_qt_max: new FormControl('', [Validators.min(0)]),
      potential_vl_max: new FormControl('', [Validators.min(0)]),
      potential_wg_max: new FormControl('', [Validators.min(0)]),
      potential_qt_max: new FormControl('', [Validators.min(0)]),
    });

    this.affretementService.getTypeAffretement().subscribe((data: any) => {
      console.log('TPES', data)
      this.typeAffretement = data
    })

    this.offreform.get('type_affretement_id').valueChanges.subscribe(type => {
      console.log('LL', this.typeAffretement.filter(t => t.id == type))
      // alert(type)
      this.hasMinimumPrice = this.typeAffretement.filter(t => t.id == type)[0] && this.typeAffretement.filter(t => t.id == type)[0]['has_minimum_price']
      this.offreform.controls.is_return.setValue(this.typeAffretement.filter(t => t.id == type)[0] && this.typeAffretement.filter(t => t.id == type)[0]['is_return'])

    })
    this.offreform.get('has_indexation').valueChanges.subscribe(type => {
      this.hasIndexation = type
    })

    this.offreform.get('end_date_check_box').valueChanges.subscribe((value) => {
      if (value == true) {
        this.offreform.controls.end_date.setValidators(Validators.required);
        this.offreform.controls.end_date.updateValueAndValidity()
      }
      else {
        this.offreform.controls.end_date.clearValidators();
        this.offreform.controls.end_date.updateValueAndValidity()
      }
    })

    // todo end_date required if customer market and disable end_date_check_box
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.warn('changes =', changes);
  }

  onSubmit() {
    this.submitted = true;

    if (this.offreform.invalid) {
      // this.offreform.invalid.c
      console.warn('form invalid')
      return;
    }
    this.loading = true;
    this.offerservice.createOffer(this.offreform.value).subscribe(
      (res) => {
        let uuid = res.response.data.uuid
        this.loading = false;
        this.dialogRef.close();

        //TODO: form api
        if (this.offreform.get('id_service').value == 2) {
          this._router.navigate([`/affretement-offer/create/${uuid}_${this.hasMinimumPrice}`]); return;
        }
        this._router.navigate([`/tree-offer/create/${uuid}`]);
      },
      (err) => {
        this.loading = false;
      });
  }

  to_fill(val: any, name: string) {
    this.offreform.patchValue({
      id_customer: val,
      client: name
    });
    this.display = false;
  }

  is_show() {
    this.display = !this.display
  }

  modelChangeFn(query: string) {
    this.is_show();
    if (query !== '') {
      this.search.getClient(query).subscribe(res => {
        this.options = res.response;
      })
    } else {
      this.options = [];
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.offreform.controls;
  }

}
