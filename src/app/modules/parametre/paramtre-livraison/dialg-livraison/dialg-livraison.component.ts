import { Component, OnInit, Inject, QueryList, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametreService } from 'app/core/services/parametre.service';
import { Store } from '@ngrx/store';
import { selectCities } from 'app/core/store/location/location.selectors';
import { selectEnvPayloadAgence } from 'app/core/store/agence/agence.selectors';
import { RessouresService } from 'app/core/services/ressoures.service';
import {
  selectAllCity,
  selectZones,
} from 'app/core/store/resources/resources.selectors';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { S } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-dialg-livraison',
  templateUrl: './dialg-livraison.component.html',
  styleUrls: ['./dialg-livraison.component.css'],
})
export class DialgLivraisonComponent implements OnInit {


  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;

  searchStyle = {
    border: '1px solid #ccc',
    'border-radius': '3px',
    padding: '0.5rem',
  };
  contentStyle = {
    border: '1px solid #ccc',
    'border-radius': '3px',
    padding: '0.5rem',
  };

  form: FormGroup;
  cities: any[] = [];
  agences: any[] = [];
  Allagences: any[] = [];
  Allsectors: any[] = [];

  chauffeurs: any[] = [];
  secteurs: any[] = [];
  loading: boolean = true;

  constructor(
    private store: Store,
    private ressourceService: RessouresService,
    private fb: FormBuilder,
    private parametreService: ParametreService,
    public dialogRef: MatDialogRef<DialgLivraisonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {



    let type_delivery = this.data.delivery_type;

    this.form = this.fb.group({
      process_type: ['delivery', Validators.required],
      delivery_type: [type_delivery || '', Validators.required],
      city_id: [this?.data?.city_id || '', Validators.required],
      sector_id: [this.data?.sector_id || ''],
      agency_id: [this?.data?.agency_id || ''],
      driver_id: [this?.data?.driver_id || '', Validators.required],
    });



    



    this.form.get('delivery_type').valueChanges.subscribe((v) => {
    

      this.searchComponents.toArray()[1].value = '';
    })
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    Promise.all([
      this.getCities(),
      this.getAgences(),
      this.getChauffeurs(),
      this.getSectors(),
    ])
      .then(() => {
        let type_delivery = this.data.delivery_type;

        console.log('data ' , this.searchComponents)


        console.log('data ' , this.data)
        console.log('type delivery ', type_delivery)




        setTimeout(() => {
          this.searchComponents.toArray()[0]?.selectObject(this.data?.city);
        }, 0)

       


        let secondObj = type_delivery == 'domicile' ? this.data?.sector : this.data?.agency


        console.log('second obj ' , secondObj)


        setTimeout(() => {
          this.searchComponents.toArray()[1]?.selectObject(secondObj);
        }, 0)


        setTimeout(() => {
        this.searchComponents.toArray()[2]?.selectObject(this.data?.driver);
        }, 0)


        this.loading = false;


      })
      .catch(() => (this.loading = false));
  }

  getCities(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.store.select(selectAllCity).subscribe(
        (res) => {
          this.cities = res;
          console.log('all cities==============>', this.cities);
          resolve();
        },
        (error) => {
          console.error('Error fetching cities', error);
          reject();
        }
      );
    });
  }

  getAgences(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.store.select(selectEnvPayloadAgence).subscribe(
        (res) => {
          this.Allagences = res;
          console.log('agencies========>', this.Allagences);
          resolve();
        },
        (error) => {
          console.error('Error fetching agencies', error);
          reject();
        }
      );
    });
  }

  getChauffeurs(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ressourceService.getDrivers().subscribe(
        (data: any) => {
          this.chauffeurs = data.response;
          resolve();
        },
        (error) => {
          console.error('Error fetching chauffeurs', error);
          reject();
        }
      );
    });
  }

  getSectors(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ressourceService.getSectors().subscribe(
        (sectors) => {
          this.Allsectors = sectors;

          console.log('sectors========>', this.Allsectors);
          resolve();
        },
        (error) => {
          console.error('Error fetching sectors', error);
          reject();
        }
      );
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      if (this.data && this.data.id) {
        this.parametreService
          .updateDefaultDriver(this.data.id, formData)
          .subscribe(
            (response) => {
              this.dialogRef.close(true);
            },
            (error) => {
              console.error('Error updating delivery process', error);
            }
          );
      } else {
        this.parametreService.addDefaultDriver(formData).subscribe(
          (response) => {
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error adding delivery process', error);
          }
        );
      }
    }
  }

  departChange(event: any) {
    this.form.patchValue({ city_id: event.id });
    this.filterAgenciesAndSectorsByCity(event.id);
  }

  departAgence(event: any) {
    const delivery_type = this.form.get('delivery_type')?.value;
    if (delivery_type === 'agence') {
      this.form.patchValue({ agency_id: event.id });
    } else if (delivery_type === 'domicile') {
      this.form.patchValue({ sector_id: event.id });
    }
  }

  departChauffeur(event: any) {
    this.form.patchValue({ driver_id: event.id });
  }

  filterAgenciesAndSectorsByCity(city_id: any): void {
    this.agences = this.Allagences.filter(
      (agence) => agence.city_id === city_id
    );
    this.secteurs = this.Allsectors.filter(
      (secteur) => secteur?.zone.city_id === city_id
    );
  }

  get is_delivery_type_domicile() {
    return this.form.get('delivery_type')?.value === 'domicile';
  }
}
