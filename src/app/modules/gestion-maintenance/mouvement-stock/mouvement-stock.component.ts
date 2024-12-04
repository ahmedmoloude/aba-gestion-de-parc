import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from 'app/core/services/permission.service';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-mouvement-stock',
  templateUrl: './mouvement-stock.component.html',
  styleUrls: ['./mouvement-stock.component.css']
})
export class MouvementStockComponent implements OnInit {

  piece : any = [];
  entres : any = [];
  sorties : any = [];
  spinner : boolean = false;
  uuid : any;

  constructor(
              public dialog: MatDialog,
              private vehiculeService :VehiculeService,
              private _toast: ToastService,
              private route: ActivatedRoute,
              public permissionService: PermissionService
            ) { }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    this.spinner = true ;
    this.vehiculeService.getPieceByUuid(this.uuid).subscribe((res:any)=>{
      // console.log("RESPONSE ", res)
      this.piece = res.response
      this.entres = this.piece?.stock.filter(s => s.type == 'ALIMENTATION')
      this.sorties = this.piece?.stock.filter(s => s.type == 'CONSOMMATION')
      this.spinner = false
    },
    (error) => {
      console.log('error', error);
      this.spinner = false;
      this._toast.error("Une erreur est survenue");
    })
  }

}
