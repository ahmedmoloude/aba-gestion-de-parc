import { Component, OnInit } from '@angular/core';
import { DialogInterventionComponent } from './dialog-intervention/dialog-intervention.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AffretementService } from 'app/core/services/affretement.service';
import { ParametreService } from 'app/core/services/parametre.service';
import { DialogCommentaireComponent } from '../liste-missions/dialog-commentaire/dialog-commentaire.component';
import { Router } from '@angular/router';
// import { DecisionVariableService } from 'app/core/services/decision-variable.service';
import { PermissionService } from 'app/core/services/permission.service';
// import { DetailsComponent } from '../demande/details-affretement/details-affretement.component';

@Component({
  selector: 'app-suivi-missions',
  templateUrl: './suivi-missions.component.html',
  styleUrls: ['./suivi-missions.component.css'],
})
export class SuiviMissionsComponent implements OnInit {
  headerColumuns = [
    'N° demande',
    'N° mission',
    'Date',
    'Code',
    'Immatriculation',
    'Tonnage',
    'Type',
    'Catégorie',
    'Ville de déchargement ',
    'Chauffeur',
    'Statut',
  ];

  headerColumuns1 = [
    'Date / H de déchargement ',
    'Client',
    'Ville de déchargement ',
    'Adresse de déchargement',
    // 'Nature Marchandise',
    'Nbr palette',
    'Type palette',
    'Retour fond',
    'Retour document',
    'Motif de refus',
    'Intervention'
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

  isVisible(index) {
    let founded = this.visibles.find((i) => i.index == index);
    return founded ? founded.visible : false;
  }
  returnFonds = {
    CHECK: 'Chèque',
    TRAIT: 'Traite',
    ESPECE: 'Espèce',
    CachOnDelivery : 'Espèce'
  };
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
              // private decisionService: DecisionVariableService,
              public permissionService: PermissionService) {}

  ngOnInit(): void {
    this.get();
  }

  detailsAffretement(uuid) {
    // this.decisionService.decision = false;
    this._router.navigate([`detailsAffretement/${uuid}`]);
  }

  get(){
    this.spinner = true;
    this.affretementService.approbationDechargement().subscribe(
      (data) => {
        this.demandes = data['response'];
        console.log("APPROBATION DECHARGEMENT ",  this.demandes)
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
        this.get();
      }
    });
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

  typePalette(data){
    let types = [];
    data.forEach(element => {
      types.push(element.type_palette)
    });
    const arraySansDoublons = types.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    return arraySansDoublons.map(function(obj) {
      return obj;
    }).join(', ');
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

  openDialogcomment(point): void {
    this.dialog.open(DialogCommentaireComponent, {
      width: '611px',
      data: { point },
    });
  }
  filtrer($event){
    // this.spinner = true;
    console.log("FILTER RDV", $event)

  }
}
