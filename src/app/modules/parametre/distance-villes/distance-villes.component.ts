import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AffretementService } from 'app/core/services/affretement.service';
import { PermissionService } from 'app/core/services/permission.service';
import { selectCities } from 'app/core/store/location/location.selectors';
import { selectAllCity } from 'app/core/store/resources/resources.selectors';

@Component({
  selector: 'app-distance-villes',
  templateUrl: './distance-villes.component.html',
  styleUrls: ['./distance-villes.component.css']
})
export class DistanceVillesComponent implements OnInit {
  headerColumuns = ['Origine', 'Destination', 'Distance'];

  formGroup: FormGroup = new FormGroup({
    orgin_city_id: new FormControl(''),
    dest_city_id: new FormControl(''),
    distance: new FormControl('')
  });

  loading = true;
  cities = [];
  data = [];

  constructor(public store: Store, public permissionService: PermissionService, public affretementService: AffretementService) {}

  ngOnInit(): void {
    this.store.select(selectAllCity).subscribe((res) => {
      this.cities = res;
    });

    this.affretementService.getDistanceBetweenCities().subscribe((res) => {
      this.data = res;
      this.loading = false;
    });
  }

  validate() {
    // Implement validation logic here if needed
  }

  get isValid() {
    const originCityId = this.formGroup.get('orgin_city_id').value;
    const destCityId = this.formGroup.get('dest_city_id').value;
    const distance = this.formGroup.get('distance').value;
  
    return (
      originCityId !== null &&
      destCityId !== null &&
      originCityId !== destCityId &&
      distance !== null &&
      !isNaN(distance) &&
      distance > 0
    );
  }
  

  submit() {
    if (this.isValid) {
      const formData = this.formGroup.value;



      this.loading = true;
      this.affretementService.store_distance_between_cities(formData.orgin_city_id , formData.dest_city_id , formData.distance).subscribe((v) =>{

        
    this.affretementService.getDistanceBetweenCities().subscribe((res) => {
      this.data = res;
      this.loading = false;
    });
      })
    } else {
      // Handle the case when the form is not valid
      console.log('Form is not valid');
    }
  }

  onOriginChange(orginCity){
    if (orginCity) {
      this.formGroup.controls.orgin_city_id.setValue(orginCity?.id);
    }
  }

  onDestChange(destCity){
    if (destCity) {
      this.formGroup.controls.dest_city_id.setValue(destCity?.id);
    }
  }
}
