import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.css']
})
export class TemplateDetailsComponent implements OnInit {
  spinner: boolean = false;
  services: any[];
  transport: any[]
  id: any;
  headerColumuns = ['Origine', 'Destination', 'Base de calcul', 'Tranche', 'Valeur', 'Valeur sup', 'Max poids'];
  headerColumunsservice = ['Origine', 'Destination', 'Rubrique', 'Base de calcul', 'Tranche', 'Valeur', 'Valeur sup'];
  transportPage: number = 1;
  servicesPage: number = 1;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private boGridService: BoGridService,) { }

  ngOnInit(): void {
    this.id = this.data["id"];
    this.spinner = true;
    this.boGridService.fetchListDetailsTemplate(this.id).subscribe((result: any[]) => {
      this.transport = result.filter(item => item.rubric_id === 1)
      this.services = result.filter(item => item.rubric_id !== 1)
      this.spinner = false;
    }, error => {
      this.spinner = false;
      console.log("error", error);
    })
  }
}


