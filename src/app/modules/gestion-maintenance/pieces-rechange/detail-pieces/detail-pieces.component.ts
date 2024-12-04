import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-detail-pieces',
  templateUrl: './detail-pieces.component.html',
  styleUrls: ['./detail-pieces.component.css']
})
export class DetailPiecesComponent implements OnInit {
  piece : any = [];
  spinner : boolean = false;
  uuid : any;
  entrees: any[] = [];

  constructor(
              public dialog: MatDialog,
              private vehiculeService :VehiculeService,
              private _toast: ToastService,
              private route: ActivatedRoute,
            ) { }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    this.spinner = true ;
    this.vehiculeService.getPieceByUuid(this.uuid).subscribe((res:any)=>{
      console.log("RESPONSE ", res)
      this.piece = res.response
      this.entrees = this.piece?.stock.filter(s => s.type == 'ALIMENTATION')
      this.spinner = false
    },
    (error) => {
      console.log('error', error);
      this.spinner = false;
      this._toast.error("Une erreur est survenue");
    })
  }

}
