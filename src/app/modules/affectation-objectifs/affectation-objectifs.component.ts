import { DialoEditDetailsObjectifComponent } from './dialo-edit-details-objectif/dialo-edit-details-objectif.component';
import { ToastService } from './../../core/services/toast.service';
import { ParametreService } from './../../core/services/parametre.service';
import { AffectationDialogComponent } from './affectation-dialog/affectation-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-affectation-objectifs',
  templateUrl: './affectation-objectifs.component.html',
  styleUrls: ['./affectation-objectifs.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AffectationObjectifsComponent implements OnInit {
  headerColumuns = [
    'Objectifs',
    'Ville',
    'Zone',
    'Secteur',
    'Commercial',
    'Mois',
    'Année',
    'Attendu',
    'Réalisé',
  ];

  visibles: any = [];
  ReadMore: boolean = true;
  visible: boolean = false;


  constructor(
    public dialog: MatDialog,
    private parametreService: ParametreService,
    private _toast: ToastService,
    public permissionService: PermissionService
  ) {}

  isVisible(index) {
    let founded = this.visibles.find((i) => i.index == index);
    return founded ? founded.visible : false;
  }

  onclick(index) {
    if (!this.visibles.find((i) => i.index == index)) {
      // console.log('TESTCHECK');
      this.visibles.push({
        index,
        visible: true,
      });
    } else {
      this.visibles.find((i) => i.index == index).visible = !this.visibles.find(
        (i) => i.index == index
      ).visible;
    }
    // console.log(this.visibles.find((i) => i.index == index));
  }
  objectifs: any = [];
  spinner: boolean;

  ngOnInit(): void {
    this.getData();
  }

  joinSectors(array) {
    // console.log("array en enter details", array)
    return array
      .map(function (obj) {
        return obj['name'];
      })
      .join(', ');
  }

  translate(date) {
    var fr = moment().locale('fr');
    var month = fr.localeData().months(moment(date)).toString();
    // console.log("DATE FR", month)
    var result = month.charAt(0).toUpperCase() + month.slice(1);
    // console.log("DATE FR", result)
    return result;
  }

  getData() {
    this.spinner = true;
    ELEMENT_DATA = [];
    this.parametreService.getObjectif().subscribe(
      (data) => {
        this.spinner = false;
        this.objectifs = data['response'];
        console.log('AFFECTATION OBJECTIF', this.objectifs);
      },
      (error) => {
        this.spinner = false;
        console.log('error', error);
      });
  }

  delet(uuid){
    console.log("uuid details", uuid)
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer Objectif ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.parametreService.DeleteAffectationObjectif(uuid).subscribe(
          (data) => {
            console.log('delet', data),
              this._toast.success('Détails objectif supprimer avec succés!');
              this.getData();
          },
          (error) => {
            console.log('error', error);
            this._toast.error('Une erreur est survenue lors de la suppression de l\'Objectif !');
          });
      }
    });
  }

  edit(details){
    const dialogRef = this.dialog.open(DialoEditDetailsObjectifComponent, {
      disableClose: true,
      width: '1089px',
      data: { details },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getData();
      }
    });
  }

  dataSource: any;
  columnsToDisplay = [
    'Objectif',
    'Attendu',
    'Date expiration',
    'Nbr commerciaux',
  ];
  expandedElement: PeriodicElement | null;

  affectation(): void {
    const dialogRef = this.dialog.open(AffectationDialogComponent, {
      disableClose: true,
      width: '1089px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getData();
      }
    });
  }
}

export interface PeriodicElement {
  Objectif: string;
  detail: Array<any>;
}
let ELEMENT_DATA: PeriodicElement[] = [];
