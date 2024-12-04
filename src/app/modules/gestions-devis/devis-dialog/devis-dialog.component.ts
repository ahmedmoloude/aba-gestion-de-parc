import { PersonelService } from 'app/core/services/personel.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from 'app/services/search.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BoQuoteService } from 'app/core/services/admin-bo/bo-quotes.service';
import { ToastService } from 'app/services';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectAuthUser } from 'app/core/store/profil/profil.selectors';
import { ActivityService } from 'app/core/services/activity.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DateAdapter } from '@angular/material/core';
import { AffretementServiceService } from 'app/core/services/affretement-service.service';

@Component({
  selector: 'app-devis-dialog',
  templateUrl: './devis-dialog.component.html',
  styleUrls: ['./devis-dialog.component.css'],
  animations: [
    trigger('toggleState', [
      state('true', style({
        transform: 'rotate(100deg)',
        color: 'green'
      })),
      transition('false => true', animate('2s linear')),
      transition('true => false', animate('1s ease-in-out'))
    ])
  ]
})
export class DevisDialogComponent implements OnInit {
  authUser: any;
  quoteForm: FormGroup;
  options = [];
  display: boolean;
  date_required = false;
  submitted = false;
  loading = false;
  // previews = [];
  colis_previews = [];
  palette_previews = [];
  hors_normes_previews = [];

  colis_images = [];
  palette_images = [];
  hors_norme_images = [];


  type_customer_diabled = false


  displayed = ['name', 'identity_number']

  // enums from backend
  typeServices = ["Messageries", "Affretement"]
  typePayment = [
    { value: 'guichet', label: "Cash" },
    { value: 'en_compte', label: "En Compte" },
  ]

  // todo TEMP
  commercials = []


  selected_customer;
  

  typeAffretement: any [];
  hasIndexation = false
  hasMinimumPrice = false


  constructor(
    private dateAdapter: DateAdapter<Date>,
    private search: SearchService,
    private activityService: ActivityService,
    private quoteService: BoQuoteService,
    private personelService: PersonelService,
    public dialogRef: MatDialogRef<DevisDialogComponent>,
    private _router: Router,
    private affretementService: AffretementServiceService,
    private _toast: ToastService, private store: Store<AppState>) { 
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    }

  ngOnInit(): void {

    this.personelService.personnelbyFunction(null, 'COMMERCIAL').subscribe(
      (data:any) => {
        this.commercials = data.response;
        console.log("this.user", this.commercials)
        // this.nbUser = this.user.length;
      },
      (error) => {
        console.log('error', error);
      }
    );

    this.display = false;
    this.quoteForm = new FormGroup({
      client: new FormControl('', Validators.required),
      customer_id: new FormControl('', Validators.required),
      name: new FormControl(''),
      type_service: new FormControl('', Validators.required),
      mode_payment: new FormControl('', Validators.required),
      commercial_id: new FormControl(''),
      end_date_check_box: new FormControl(false), // todo if end_date_check_box false end_date expired in XX Month configured in DB
      end_date: new FormControl(''),
      
      limitation_max_revenues : new FormControl('' , [Validators.min(0)]), 
      limitation_max_volume: new FormControl('', [Validators.min(0)]),
      limitation_max_weight: new FormControl('', [Validators.min(0)]),
      limitation_max_qty: new FormControl('', [Validators.min(0)]),
      negotiated_max_volume: new FormControl('', [Validators.min(0)]),
      negotiated_max_weight: new FormControl('', [Validators.min(0)]),
      negotiated_max_qty: new FormControl('', [Validators.min(0)]),
      negotiated_period: new FormControl('', [Validators.min(0)]),
      negotiated_revenues: new FormControl('', [Validators.min(0)]),

      type_affretement_id: new FormControl(''),
      prix_reference: new FormControl(''),
      part_carburant: new FormControl(30),
      has_indexation: new FormControl(false),
      is_return: new FormControl(false),
    });


    this.affretementService.getTypeAffretement().subscribe((data: any) => {
      console.log('TPES', data)
      this.typeAffretement = data
    })

    this.quoteForm.get('type_affretement_id').valueChanges.subscribe(type => {
      console.log('LL', this.typeAffretement.filter(t => t.id == type))
      // alert(type)
      this.hasMinimumPrice = this.typeAffretement.filter(t => t.id == type)[0] && this.typeAffretement.filter(t => t.id == type)[0]['has_minimum_price']
      this.quoteForm.controls.is_return.setValue(this.typeAffretement.filter(t => t.id == type)[0] && this.typeAffretement.filter(t => t.id == type)[0]['is_return'])

    })
    this.quoteForm.get('has_indexation').valueChanges.subscribe(type => {
      this.hasIndexation = type
    })
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

    // set commercial_id required to no commercial profile 
    this.store.select(selectAuthUser).subscribe(res => {
      this.authUser = res;
      if (res.role.name !== 'commercial_bo')
        this.quoteForm.get('commercial_id').setValidators([
          Validators.required,
        ]);
    })
  }

  get f(): { [key: string]: AbstractControl } { return this.quoteForm.controls; }

  is_show() {
    this.display = !this.display
  }
  to_fill(customer) {

    this.selected_customer =  customer
    console.log('selected_customer', this.selected_customer)
    if (customer.is_prospect) {
      this.quoteForm.patchValue({ type_service : 'Messageries' , commercial_id : customer.commercial_id ,  customer_id: customer.id, client: customer.name  , mode_payment : customer.customer_type});
      this.display = false;
      this.type_customer_diabled = false;
    }else{
      this.quoteForm.patchValue({  type_service : 'Messageries' , commercial_id : customer.commercial_id  ,  customer_id: customer.id, client: customer.name  , mode_payment : customer.customer_type});
      this.display = false;
      this.type_customer_diabled = true;
    }
  }
  modelChangeFn(query: string) {
    this.is_show();
    if (query !== '') {
      this.search.getClient(query).subscribe(res => { this.options = res.response; })
    } else {
      this.options = [];
    }
  }

  onSubmit() {

    // limitation_max_qty: new FormControl('', [Validators.min(0)]),
    // negotiated_max_volume: new FormControl('', [Validators.min(0)]),
    // negotiated_max_weight: new FormControl('', [Validators.min(0)]),
    // negotiated_max_qty: new FormControl('', [Validators.min(0)]),
    // negotiated_revenues: new FormControl('', [Validators.min(0)]),
    if (!this.f.negotiated_revenues.value && !this.f.negotiated_max_volume.value && !this.f.negotiated_max_weight.value && !this.f.negotiated_max_qty.value) {
      return this._toast.warn('Prière de renseigner au moins un champs dans potentiel négocié')
    }
    this.submitted = true;
    if (this.quoteForm.invalid) { console.warn('form invalid'); return; }

    const formData = new FormData();

    for (const key in this.quoteForm.controls) {
      formData.append(key, this.quoteForm.controls[key].value);
    }

    for (var i = 0; i < this.colis_images.length; i++) { 
      formData.append("colis_images[]", this.colis_images[i]);
    }

    for (var i = 0; i < this.palette_images.length; i++) { 
      formData.append("palette_images[]", this.palette_images[i]);
    }

    for (var i = 0; i < this.hors_norme_images.length; i++) { 
      formData.append("hors_norme_images[]", this.hors_norme_images[i]);
    }
    this.loading = true;
    this.quoteService.createQuote(formData).subscribe(
      (res: any) => {
        let uuid = res.response.last_version[0].uuid; this.loading = false; this.dialogRef.close();


        console.log('service' , res.response.service.name)
        if (res.response.service.name == 'Affretement') {
          this._router.navigate([`/affretement-devis/create/${uuid}`]);
        }
        else{
          this._router.navigate([`/tree-quote/create/${uuid}`]);

        }
      },
      (err) => { this.loading = false; this._toast.error("Une Erreur est survenue !") });
  }


  selectFile(event: any , type) {


    console.log('type: ' + type);
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {

      if(type == 'COLIS'){
        this.colis_previews.push(reader.result);
        this.colis_images.push(event.target.files[0])
      }
      if (type == 'PALLETE') {
        this.palette_previews.push(reader.result);
        this.palette_images.push(event.target.files[0])
      }
      if (type == 'HORSNORME') {
        this.hors_normes_previews.push(reader.result);
        this.hors_norme_images.push(event.target.files[0])
      }
		}
	}
}
