import { DialogDescisionComponent } from './dialog-descision/dialog-descision.component';
import { Component, OnInit } from '@angular/core';
import { DialogCommentaireComponent } from './dialog-commentaire/dialog-commentaire.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AffretementService } from 'app/core/services/affretement.service';
import { ParametreService } from 'app/core/services/parametre.service';
import { DialogInterventionComponent } from '../suivi-missions/dialog-intervention/dialog-intervention.component';
import { Router } from '@angular/router';
// import { DecisionVariableService } from 'app/core/services/decision-variable.service';
import { PermissionService } from 'app/core/services/permission.service';
// import { DetailsComponent } from '../demande/details-affretement/details-affretement.component';
@Component({
  selector: 'app-liste-missions',
  templateUrl: './liste-missions.component.html',
  styleUrls: ['./liste-missions.component.css'],
})
export class ListeMissionsComponent implements OnInit {
  headerColumuns = [
    'N° demande',
    'N° mission',
    'Date',
    'Code',
    'Immatriculation',
    'Tonnage',
    'Type',
    'Catégorie',
    'Ville d’enlèvement',
    'Chauffeur',
    'Décision'
  ];
  headerColumuns1 = [
    'Date / H d’enlèvement',
    'Ville d’enlèvement',
    'Adresse de chargement',
    'Nature Marchandise',
    'Nbr palette',
    'Poids',
    'Volume',
    'Valeur déclarée',
    'Motif de refus',
    'Décision'
  ];
  inputsFiler = [
    {
      name: 'n_envoi',
      placeholder: 'N° d’envoi',
      type: 'text'
    },
    {
      name: 'chauffeur',
      placeholder: 'Chauffeur',
      type: 'select',
      options: [],
    },
    {
      name: 'vehicule',
      placeholder: 'Véhicule',
      type: 'select',
      options: [],
    },
    {
      name: 'motif_refus',
      placeholder: 'Motif de refus',
      type: 'select',
      options: [],
    },
    {
      name: 'status',
      placeholder: 'Statut',
      type: 'select',
      options: [
        {
          text: 'REFORME',
          value: 'REFORME',
        },
        {
          text: 'En circulation',
          value: 'En circulation',
        },
        {
          text: 'En panne',
          value: 'En panne',
        },
        {
          text: 'Vendue',
          value: 'Vendue',
        },
      ],
    },
  ];
  p: number = 1;
  visibles: any = [];
  ReadMore: boolean = true;

  visible: boolean = false;
  spinner : boolean = false;
  demandes : any = [];
  pv : any;

  isVisible(index) {
    let founded = this.visibles.find((i) => i.index == index);
    return founded ? founded.visible : false;
  }

  onclick(index) {
    if (!this.visibles.find((i) => i.index == index)) {
      this.visibles.push({
        index,
        visible: true,
      });
    } else {
      this.visibles.find((i) => i.index == index).visible = !this.visibles.find(
        (i) => i.index == index
      ).visible;
    }
  }

  constructor(
    public dialog: MatDialog,
    private affretementService: AffretementService,
    private parametreService: ParametreService,
    private _router: Router,
    // private decisionService: ,
    public permissionService: PermissionService) {}

  ngOnInit(): void {
    this.getChargement();
    this.parametreService.getPV().subscribe(
      (data) => {
        console.log("RESPONSE ", data['response'])
        this.pv = data['response'].valeur;
        console.log("PV ",  this.pv)
    })
  }

  detailsAffretement(uuid) {
    console.log("UUID ", uuid)
    // this.decisionService.decision = false;
    this._router.navigate([`detailsAffretement/${uuid}`]);
  }

  getChargement(){
    this.spinner = true;
    this.affretementService.approbationChargement().subscribe(
      (data) => {
        this.demandes = data['response'];
        console.log("APPROBATION CHARGEMENT ",  this.demandes)
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
      })
  }

  openDialogintervention(point): void {
    const dialogRef = this.dialog.open(DialogInterventionComponent, {
      width: '402px',
      data: { point },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // console.log("DATA AFTER DECISION ", data)
        this.getChargement();
      }
    });
  }

  calcuPv(detail){
    // console.log("CALCUL PV ", detail)
    // console.log("CALCUL PV ", (detail.largeur * detail.longueur * detail.hauteur) / this.pv)
    return ((detail.largeur * detail.longueur * detail.hauteur) / this.pv).toFixed(4);
  }

  ville(data){
    let cities = [];
    data.forEach(element => {
      cities.push(element.city.name)
    });
    const arraySansDoublons = cities.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    return arraySansDoublons.map(function(obj) {
      return obj;
    }).join(', ');
  }

  openDialogcomment(point): void {
    this.dialog.open(DialogCommentaireComponent, {
      width: '611px',
      data: { point },
    });
  }

  openDialogdecision(): void {
    this.dialog.open(DialogDescisionComponent, {
      width: '611px',
      data: {},
    });
  }

  // openDialogDetails(demande): void {
  //   this.dialog.open(DetailsComponent, {
  //     disableClose: true,
  //     maxWidth: '100vw',
  //     maxHeight: '100vh',
  //     height: '100%',
  //     width: '100%',
  //     panelClass: 'full-screen-modal',
  //     data: { demande },
  //   });
  // }
  filtrer($event){
    // this.spinner = true;
    console.log("FILTER RDV", $event)

  }
}
