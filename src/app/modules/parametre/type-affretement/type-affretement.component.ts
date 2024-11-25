import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AffretementServiceService } from 'app/core/services/affretement-service.service';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-type-affretement',
  templateUrl: './type-affretement.component.html',
  styleUrls: ['./type-affretement.component.css']
})
export class TypeAffretementComponent implements OnInit {
  headerColumuns = ['Type', 'Min prix', 'Date de création'];
  typeAffretements = [];
  form = new FormGroup({});
  isSaving = false;
  isLoading = false;
  constructor(
    private affretementService: AffretementServiceService,
    public permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl("", Validators.required),
      has_minimum_price: new FormControl(false),
    })
    this.isLoading = true;
    this.affretementService.getTypeAffretement().subscribe((data:any) => {
      this.typeAffretements = data;
      this.isLoading = false;
    })
  }

  submit(){
    this.isSaving = true
    this.affretementService.saveTypeAffretement(this.form.value).subscribe(() => {
      this.isSaving = false;
      this.isLoading = true;
      this.affretementService.getTypeAffretement().subscribe((data:any) => {
        this.typeAffretements = data;
        this.isLoading = false;
      })
    })
  }

}
