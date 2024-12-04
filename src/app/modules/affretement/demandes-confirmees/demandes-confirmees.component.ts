import { Component, OnInit } from '@angular/core';
import { AffretementService } from 'app/core/services/affretement.service';
import Swal from 'sweetalert2';
import { DialogReclineComponent } from '../demande/dialog-recline/dialog-recline.component';
import { MatDialog } from '@angular/material/dialog';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-demandes-confirmees',
  templateUrl: './demandes-confirmees.component.html',
  styleUrls: ['./demandes-confirmees.component.css'],
})
export class DemandesConfirmeesComponent implements OnInit {

  isModalVisible = false;

  demande_uuid = '';
  status = ''




  openDialog(uuid){

    this.isModalVisible = true
    this.demande_uuid = uuid;


  }

  submitDialog(){




    
    this.affretementService.updateStatus({

      uuid : this.demande_uuid,
      status : this.status
    }).subscribe((v) => {

      this.handleCancel()
    })
    
  }


  decesions = [

    {
      text : 'Revenir à SDTM',
      value : 'COME_BACK_TO_SDTM'
    },
    {

      text : 'Rester dans sa ville actuelle',
      value : 'STAY_IN_THE_OTHER_CITY'
    }
  ]


  handleCancel(){

    this.isModalVisible = false
    this.demande_uuid = ''
    this.status = ''
  }

  headerColumuns = [
    'N° déclaration',
    'Destinataire',
    'Ville destination',
    'Adresse',
    'Nbr de palette',
    'Type de palette',
    'Retour documents',
    'Fonds',
  ];

  per_page = 10
  inputsFiler = [
    {
      name: 'n_envoi',
      placeholder: 'N° demande',
      type: 'text'
    },
    {
      name: 'n_expedition',
      placeholder: 'N° Déclaration',
      type: 'text',
    },
    {
      name: 'ville_depart',
      placeholder: 'Ville de départ',
      type: 'text'
    },
    {
      name: 'ville_arrive',
      placeholder: 'Ville d’arrivé',
      type: 'text'
    },
    {
      name: 'type_vehicule',
      placeholder: 'Type de véhicule',
      type: 'text'
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
  constructor(private affretementService: AffretementService,
              public dialog: MatDialog,
              public permissionService: PermissionService) { }

  visibles: any = [];
  ReadMore: boolean = true;

  visible: boolean = false;
  spinner : boolean = false;
  demandes : any = [];

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

  ngOnInit(): void {
    let data = {
      statut : 'ACCEPTED',
    }
    this.spinner = true;
    this.affretementService.getConfirmedDemandeAffretement({ filters : data , page : this.p , per_page : this.per_page }).subscribe(
      (data) => {
        this.demandes = data['response'].data;
        console.log("DEMANDES CONFIRMEE ",  this.demandes)
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
      })
  }

  annuler(item){
    console.log("DEMANDE", item)
    let data = {
      uuid : item.uuid,
      statut : 'CANCELED',
    }
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir désaffecter cette demande ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.affretementService.changerStatutDemande(data).subscribe(
          (data) => {
            this.demandes = this.demandes.filter(d => d.uuid != item.uuid)
          },
          (error) => {
            console.log('error', error);
          })
      }
    });
  }

  trajet(demande){
    const dialogRef = this.dialog.open(DialogReclineComponent, {
      width: '611px',
      data: { demande },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log("DATA ", data)
        this.demandes.find(d => d.id == data.id)["trajet"] = data.trajet;
      }
    });
  }

  filtrer($event){
    // this.spinner = true;
    console.log("FILTER RDV", $event)

  }

  getRetourDocuments(point_dechargement) {
    let docs = [];

    point_dechargement.retour_documents.map((retour_doc) => {
      docs = [...docs, retour_doc.references_documents];
    });
    return docs;
  }

  getRetourFonds(points_dechargement) {
    let fonds = [];
    fonds = [...fonds, ...points_dechargement.retour_fonds];

    return fonds;
  }

  returnFonds = {
    CHECK: 'chèque',
    TRAIT: 'traite',
    ESPECE: 'espèce',
    CachOnDelivery: 'espèce',
  };
  
  getNumberPalettes(point_dechargement) {
    let somme = point_dechargement.item_envois?.reduce(function (acc, obj) {
      return acc + Number(obj?.nbr_palette);
    }, 0);
    
    console.log('somme  ....', somme);
    
    return somme;
  }
  
}
