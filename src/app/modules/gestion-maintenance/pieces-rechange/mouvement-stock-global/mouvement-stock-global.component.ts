import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from 'app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mouvement-stock-global',
  templateUrl: './mouvement-stock-global.component.html',
  styleUrls: ['./mouvement-stock-global.component.css']
})
export class MouvementStockGlobalComponent implements OnInit {
  stocks : any = [];
  entres : any = [];
  sorties : any = [];
  spinner : boolean = false;

  constructor(
              public dialog: MatDialog,
              private vehiculeService :VehiculeService,
              private _toast: ToastService,
              private route: ActivatedRoute,
              private _router: Router
            ) { }

  ngOnInit(): void {
    this.spinner = true ;
    this.vehiculeService.mouvementsStocks().subscribe((res:any)=>{
      console.log("RESPONSE ", res)
      this.stocks = res.response
      this.entres = this.stocks?.filter(s => s.type == 'ALIMENTATION')
      this.sorties = this.stocks?.filter(s => s.type == 'CONSOMMATION')
      console.log(this.entres);
      console.log(this.sorties);

      this.spinner = false
    },
    (error) => {
      console.log('error', error);
      this.spinner = false;
      this._toast.error("Une erreur est survenue");
    })
  }
  inventairerechange() {
    console.log("hello link");
    this._router.navigate([`inventairerechange`]);
  }
}
