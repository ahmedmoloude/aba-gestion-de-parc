import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AffretementServiceService } from 'app/core/services/affretement-service.service';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-prix-gasoil',
  templateUrl: './prix-gasoil.component.html',
  styleUrls: ['./prix-gasoil.component.css']
})
export class PrixGasoilComponent implements OnInit {
  headerColumuns = ['Prix', 'Date MAJ'];
  prices = [];
  form = new FormGroup({});
  isSaving = false;
  isLoading = false;
  constructor(
    private affretementService: AffretementServiceService,
    public permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      price: new FormControl("", Validators.required),
    })
    this.isLoading = true;
    this.affretementService.getFuelPrices().subscribe((data: any) => {
      this.prices = data;
      this.isLoading = false;
    })
  }

  submit(){
    this.isSaving = true
    this.affretementService.saveFuelPrice(this.form.value).subscribe(() => {
      this.isSaving = false;
      this.isLoading = true;
      this.affretementService.getFuelPrices().subscribe((data: any) => {
        this.isLoading = false;
        this.prices = data;
      })
    })
  }

}
