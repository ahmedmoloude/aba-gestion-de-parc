import { DialogSinistresComponent } from './../gestion-sinistres/dialog-sinistres/dialog-sinistres.component';
import { DialogAssuranceComponent } from './../assurance/dialog-assurance/dialog-assurance.component';
import { DialogContratComponent } from './../type-contrat/dialog-contrat/dialog-contrat.component';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectEnvVehiculePayload,
  selectEnvVehiculeIsLoading,
  selectEnvVehiculeStatus,
} from 'app/core/store/vehicule/vehicule.selectors';
import { environment } from 'environments/environment';
import { DialogVehiculesComponent } from '../list-vehicules/dialog-vehicules/dialog-vehicules.component';
import { selectEnvVehiculeContratPayload } from 'app/core/store/vehiculecontrat/vehiculecontrat.selectors';
import { selectEnvVehiculeDocumentPayload } from 'app/core/store/vehiculedocument/vehiculedocument.selectors';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { HistoriquestatutComponent } from './historiquestatut/historiquestatut.component';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-administrative-tab-groupe',
  templateUrl: './administrative-tab-groupe.component.html',
  styleUrls: ['./administrative-tab-groupe.component.css'],
})
export class AdministrativeTabGroupeComponent implements OnInit {
  selectedTabIndex = 0;
  spinner: boolean = false;
  vehicule: any;
  contrats: any;
  documents: any;
  asurances: any;
  vignettes: any;
  visites: any;
  carteGrises: any;
  autorisations: any;
  tachygraphes: any;
  essieus: any;
  uuid: any;
  displayCustom: boolean;
  displayBasic: boolean;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  images: any[] = [];
  activeIndex: number = 0;
  url = environment.STORAGE + '/vehicule/';
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private vehiculeService: VehiculeService,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.uuid = this.route.snapshot.params.uuid;
    // console.log('uuid', this.uuid);

    // this.store.select(selectEnvVehiculePayload).subscribe((res) => {
    //   console.log("111", res.data)
    //   this.vehicule = res.data.find((vehicule) => vehicule.uuid == this.uuid);
    //   console.log(' vehicules ========>', this.vehicule);
    // });

    this.spinner = true;
    this.vehiculeService.truckByUuid(this.uuid).subscribe((res: any) => {
      this.vehicule = res.response;
      console.log('truch', this.vehicule);
      // this.spinner = false;
      this.vehicule.images?.forEach((image) => {
        this.images.push(this.url + this.vehicule.id + '/' + image.file);
      });
      console.table(this.images);
      this.spinner = false;
    });

    // this.store.select(selectEnvVehiculeStatus).subscribe((res) => {
    //   // console.log("status", res)
    //   if(res == 'SUCCESS'){
    //     this.store.select(selectEnvVehiculeContratPayload).subscribe((resu) => {
    //       this.contrats = resu.filter(contrat => contrat.truck_id == this.vehicule.id );
    //       // console.log(" contarts ========>", this.contrats)
    //     });

    //     this.store.select(selectEnvVehiculeDocumentPayload).subscribe((result) => {
    //       this.documents = result.filter(document => document.truck_id == this.vehicule.id );
    //       // console.log(" documents ========>", this.documents)

    //       this.asurances = this.documents.filter(assurance => assurance.type == "ASSURANCE");
    //       // console.log(" asurances ========>", this.asurances)
    //       this.vignettes = this.documents.filter(vignette => vignette.type == "VIGNETTE");
    //       // console.log(" vignettes ========>", this.vignettes)
    //       this.visites = this.documents.filter(visite => visite.type == "VISITE_TECHNIQUE");
    //       // console.log(" visites ========>", this.visites)
    //       this.carteGrises = this.documents.filter(carte => carte.type == "CARTE_GRISE");
    //       // console.log(" carteGrises ========>", this.carteGrises)
    //       this.autorisations = this.documents.filter(autorisation => autorisation.type == "AUTORISATION");
    //       // console.log(" autorisations ========>", this.autorisations)
    //     });
    //   }
    // });

    // this.store.select(selectEnvVehiculeIsLoading).subscribe((res) => {
    //   this.spinner = res;
    // });
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
    console.log('TEST CLICK');
  }
  openDialog(type, item): void {
    const dialogRef = this.dialog.open(DialogVehiculesComponent, {
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      data: { type, item },
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.spinner = true;
          this.vehiculeService.truckByUuid(this.uuid).subscribe((res: any) => {
            this.vehicule = res.response;
            console.log('truch', this.vehicule);
            this.images = [];
            this.vehicule.images?.forEach((image) => {
              this.images.push(this.url + this.vehicule.id + '/' + image.file);
            });
            console.table(this.images);
            this.spinner = false;
          });
        }
      }
    )
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTabIndex = this.selectedTabIndex + 1;
    this.selectedTabIndex = tabChangeEvent.index;
  }

  ajoutercontrat(vehicule, item, type): void {
    const dialogRef = this.dialog.open(DialogContratComponent, {
      disableClose: true,
      width: '831px',
      data: { vehicule, item, type },
    });
  }

  joinService(array) {
    // console.log("array en enter details", array)
    return array
      .map(function (obj) {
        return obj['name'];
      })
      .join(', ');
  }

  // AddDialogAssurance(uuid, type): void {
  //   this.dialog.open(DialogAssuranceComponent, {
  //     disableClose: true,
  //     width: '1606px',
  //     data: { uuid, type },
  //   });
  // }

  getInterventioncategories(diagnostics: any[]) {
    const uniqueCategories = new Set<string>();
    diagnostics?.forEach(item => {
      uniqueCategories.add(item.category.name);
    });
    return Array.from(uniqueCategories);
  }

  AddDialogSinistres(vehicule, type): void {
    this.dialog.open(DialogSinistresComponent, {
      disableClose: true,
      width: '960px',
      data: { vehicule, type },
    });
  }

  Voirhistoriquestaatut(item) {
    this.dialog.open(HistoriquestatutComponent, {
      disableClose: true,
      width: '782px',
      height: '100vh',
      data: { item },
      position: { right: '0px' },
    });
  }
}
