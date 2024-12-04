import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AffretementServiceService } from 'app/core/services/affretement-service.service';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-aff-percentage',
  templateUrl: './aff-percentage.component.html',
  styleUrls: ['./aff-percentage.component.css']
})
export class AffPercentageComponent implements OnInit {
  headerColumuns = ['Pourcentage Retour transport', 'Date MAJ'];
  pourcentages = [];
  form = new FormGroup({});
  isSaving = false;
  isLoading = false;
  constructor(
    private affretementService: AffretementServiceService,
    public permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      value: new FormControl("", Validators.required),
    })
    this.isLoading = true;
    this.affretementService.getPourcentageRetour().subscribe((data: any) => {
      this.pourcentages = data;
      this.isLoading = false;
    })
  }

  submit(){
    this.isSaving = true
    this.affretementService.savePourcentageRetour(this.form.value).subscribe(() => {
      this.isSaving = false;
      this.isLoading = true;
      this.affretementService.getPourcentageRetour().subscribe((data: any) => {
        this.isLoading = false;
        this.pourcentages = data;
      })
    })
  }

}
