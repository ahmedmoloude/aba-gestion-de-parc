import { AddPieceComponent } from './add-piece/add-piece.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlementationStockComponent } from './alementation-stock/alementation-stock.component';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from 'app/services';
import Swal from 'sweetalert2';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-pieces-rechange',
  templateUrl: './pieces-rechange.component.html',
  styleUrls: ['./pieces-rechange.component.css'],
})
export class PiecesRechangeComponent implements OnInit {
  headerColumuns = [
    'Date d’entrée',
    'Nom de pièce',
    'Référence',
    'Famille',
    'Fournisseur',
    'Stock minimal',
    'Quantité',
    // 'Prix (Dhs)',
    // 'Montant (Dhs)',
    'Saisi par',
    'Action',
  ];
  inputsFiler = [
    {
      name: 'date_entree',
      placeholder: 'Date d’entrée',
      type: 'date'
    },
    {
      name: 'nom_piece',
      placeholder: 'Nom de pièce',
      type: 'text',
    },
    {
      name: 'reference',
      placeholder: 'Référence',
      type: 'text'
    },
    {
      name: 'famille',
      placeholder: 'Famille',
      type: 'text'
    },
    {
      name: 'fournisseur',
      placeholder: 'Fournisseur',
      type: 'text'
    },
    {
      name: 'saisi_par',
      placeholder: 'Saisi par',
      type: 'text'
    },
  ];
  pieces : any = [];
  spinner : boolean = false;
  links : any = [];

  constructor(
              public dialog: MatDialog,
              private _router: Router,
              private vehiculeService :VehiculeService,
              private _toast: ToastService,
              public permissionService: PermissionService
              ) {}

  ngOnInit(): void {
    this.spinner = true ;
    this.vehiculeService.getPieceRechange(null).subscribe((res:any)=>{
      console.log("RESPONSE ", res)
      this.pieces = res.response.data
      this.links = res.response.links
      this.spinner = false
    },
    (error) => {
      console.log('error', error);
      this.spinner = false;
      this._toast.error("Une erreur est survenue");
    })
  }
  filtrer($event){
    // this.spinner = true;
    console.log("FILTER RDV", $event);
  }
  addpiece(type = true, item = null) {
    const dialogRef = this.dialog.open(AddPieceComponent, {
      width: '811px',
      data: { type, item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if(!type){
          this.pieces = this.pieces.filter(function(obj) {
            return obj.uuid !== item.uuid;
          });
          this.pieces.unshift(data);
        }else{
          this.pieces.unshift(data);
        }
      }
    });
  }

  alementationstock(item): void {
    const dialogRef = this.dialog.open(AlementationStockComponent, {
      width: '714px',
      data: { item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.pieces = this.pieces.filter(function(obj) {
          return obj.uuid !== item.uuid;
        });
        this.pieces.unshift(data);
      }
    });
  }

  demandepieces() {
    this._router.navigate(['demandepieces']);
  }

  detailpieces(uuid) {
    this._router.navigate([`detailpieces/${uuid}`]);
  }

  mouvementstock(uuid) {
    console.log('UUID ', uuid);
    this._router.navigate([`mouvementdestock/${uuid}`]);
  }

  deletPiece(uuid){
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer la piece de rechange?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.vehiculeService.deletPieceRechange(uuid).subscribe((res:any)=>{
          this.pieces = this.pieces.filter(d => d.uuid != uuid)
          this._toast.error("Piéce de rechange supprimé avec succées");
        },
        (error) => {
          console.log('error', error);
          this._toast.error("Une erreur est survenue");
        })
      }
    });
  }
}
