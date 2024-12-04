import { DialogSecteurComponent } from './dialog-secteur/dialog-secteur.component';
import { DialogPassageComponent } from './dialog-passage/dialog-passage.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BoTourService } from 'app/core/services/admin-bo/bo-tours.service';
import { ToastService } from 'app/services';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// todo show current tournée and status

// todo add passage to customer
// todo a customer passage from another sector ??
// todo fusion passages reguliers  ??
// todo drop all api / front ( api / front ?? )
// todo clear all tours items ( api / front ?? )

// todo fix order by sectors ??
// todo fix can drop  ??
// todo filter left and right container ??

@Component({
  selector: 'app-generation-tournee',
  templateUrl: './generation-tournee.component.html',
  styleUrls: ['./generation-tournee.component.css'],
  animations: [
    trigger('openClose', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px' })),
      transition('false <=> true', [animate(150)]),
    ]),
  ],
})
export class GenerationTourneeComponent implements OnInit {
  isOpen = false; // filter

  tour: any = null; // current tour
  tourIdentifant = ''; // current tour id or uuid
  toursList: any[]; // list of tours
  isManyToursPlanned = null;
  isLoading = false;
  isLoadingPassage = false;

  onInitSectors: any[] = [];
  onInitItems: any[] = []; // init sectors and expeditions
  leftSectors: any[] = [];
  leftSideItems: any[] = []; // left container sectors and expeditions
  rightSectors: any[] = [];
  rightSideItems: any[] = []; // right container sectors and expeditions

  constructor(
    private boTourService: BoTourService,
    private _toast: ToastService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isManyToursPlanned =
      this.router.url.split('/')[1] === 'planification-tours' ? true : false;
    if (!this.isManyToursPlanned) {
      // planification of a tour
      this.tourIdentifant = this._activatedRoute.snapshot.paramMap.get('uuid');
      this.getTourData(1); // get tour data by uuid
    } else {
      // todo refactor planification of multiple tour with groupped uuid tour
      // planification of multiple tours
      this.isLoading = true;
      const toursIds = this._activatedRoute.snapshot.paramMap
        .get('tours_ids')
        .split('-');
      this.boTourService.getToursByIds({ tours_ids: toursIds }).subscribe(
        (res: any) => {
          this.toursList = res.response; // set list of tours
          this.tourIdentifant = toursIds[0];
          this.getTourData(0); // get tour data by id
        },
        (err) => {
          this.isLoading = false;
          this._toast.error('Une erreur est survenu !');
        }
      );
    }
  }

  getDate(date: string) {
    if (date) return date.split(' ')[0];
    return '--';
  }

  switchCanDropMode() {
    this.onInitItems.map((item) => {
      item.isLoading = this.isLoadingPassage;
      return item;
    });
    this.leftSideItems.map((item) => {
      item.isLoading = this.isLoadingPassage;
      return item;
    });
    this.rightSideItems.map((item) => {
      item.isLoading = this.isLoadingPassage;
      return item;
    });
  }
  resetTourData() {
    this.tour = null;
    this.onInitSectors = [];
    this.onInitItems = [];
    this.leftSectors = [];
    this.leftSideItems = [];
    this.rightSectors = [];
    this.rightSideItems = [];
  }
  getTourData(isUuid: 0 | 1) {
    this.isLoading = true;
    this.resetTourData();
    this.boTourService
      .getPassagesToPlanify(this.tourIdentifant, isUuid)
      .subscribe(
        (res: any) => {
          // todo check status of tournée already started // this._router.navigate([`/tournees`]);
          const payload = res.response;
          this.tour = payload.tour;
          console.log(payload);

          // init left sectors and expeditions
          this.leftSectors = payload.to_planify_passages.map(
            (item: any, index: number) => {
              const { passages, ...sector } = item;
              this.leftSideItems = this.leftSideItems.concat(passages); // concat all expedetions in one array
              //sector.position = index;
              return sector;
            }
          );

          // init right sectors and expeditions
          this.rightSectors = payload.planified_passages.map(
            (item: any, index: number) => {
              const { passages, ...sector } = item;
              this.rightSideItems = this.rightSideItems.concat(passages); // concat all expedetions in one array
              //sector.position = index;
              return sector;
            }
          );

          // init sectors and expeditions
          this.onInitItems = this.leftSideItems.concat(this.rightSideItems);
          this.onInitSectors = [...this.leftSectors];
          for (let sector of this.rightSectors) {
            if (
              !this.onInitSectors
                .map((item) => item.sector_id)
                .includes(sector.sector_id)
            )
              this.onInitSectors.push(sector);
          }

          // switch drag and drop mode
          this.switchCanDropMode();
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
          if (err.error.status == 403)
            this._toast.warn('Tournée en cours ou déja cloturé !');
          else this._toast.error('Tournée introuvable !');

          if (isUuid) this._router.navigate([`/tournees`]); // planification of one tour
        }
      );
  }
  onChangeTour() {
    if (this.tourIdentifant) this.getTourData(0);
  }
  getStatusPassage(passage: any) {
    if (passage?.is_planified)
      return { status: 'REGULAR', label: 'Passage planifié' };
    const draftExpeditions = passage.expeditions.filter(
      (item: any) => item.status === 'DRAFT'
    );
    if (
      draftExpeditions.length === passage.expeditions.length &&
      draftExpeditions.length
    )
      return { status: 'DRAFT', label: 'Rappel' };
    return { status: 'PICKUP', label: 'Ramassage' };
  }

  /* ---------------- getters ----------------*/
  get getTruckStats() {
    let totalColis = 0;
    let totalWeight = 0;
    for (let item of this.rightSideItems) {
      if (item.weight) totalWeight += item.weight;
      if (item.number) totalColis += item.number;
    }
    totalWeight = totalWeight / 1000; // convert to tonnes
    return { total_weight: totalWeight, total_colis: totalColis };
  }
  get percentWeightFilled() {
    if (!this.tour?.truck?.tonnage) return 0;
    const result =
      (this.getTruckStats.total_weight / this.tour?.truck?.tonnage) * 100;
    return Math.round(result * 100) / 100; // round 2 decimals
  }
  get truckBoxSize() {
    const maxBoxSize = 97; // truck is full
    const result = (maxBoxSize * this.percentWeightFilled) / 100;
    return Math.round(result);
  }
  /* ---------------------------------------------------------------- */

  /* drag and drop actions */
  canDrop(item: CdkDrag<any>) {
    return !item.data?.isLoading; // todo fixme
  }
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.leftSectors = this.reSyncSectorsList(this.leftSideItems);
      this.rightSectors = this.reSyncSectorsList(this.rightSideItems);
      const draggedPassage = event.container.data[event.currentIndex];

      // case left container id can't be get
      if (event.previousContainer.id.split('-').length != 4) {
        console.log(event.previousContainer.id, 'left container');
        this._toast.error('Impossible de planifié cet passage !');
        if (this.isManyToursPlanned) this.getTourData(0);
        else this.getTourData(1);
        return;
      }

      const leftContainerID = parseInt(
        event.previousContainer.id.split('-')[3]
      );
      if (leftContainerID % 2 == 0) {
        // left side to right side (planify passage)
        const payload = {
          tour_id: this.tour.id,
          customer_id: draggedPassage.customer.id,
          adresse_id: draggedPassage.pickup_adresse.id,
          pickup_houre: draggedPassage.pickup_houre,
          passage_type: this.getStatusPassage(draggedPassage).status,
          is_planified: draggedPassage.is_planified,
        };

        this.isLoadingPassage = true;
        this.switchCanDropMode();
        this.boTourService.planifyPassage(payload).subscribe(
          (res: any) => {
            this.isLoadingPassage = false;
            this.switchCanDropMode();
            // add id to passage
            event.container.data[event.currentIndex].id = res.response.id;
            // console.log(event.container.data, "data")
          },
          (err) => {
            this.isLoadingPassage = false;
            this.switchCanDropMode();
            this._toast.error('Passage non planifié !');
            // refetch tour
            setTimeout(() => {
              if (this.isManyToursPlanned) this.getTourData(0);
              else this.getTourData(1);
            }, 1000);
          }
        );
      } else {
        // right side to left side (unplanify passage)
        this.isLoadingPassage = true;
        this.switchCanDropMode();
        this.boTourService.cancelPlanifyPassage(draggedPassage.id).subscribe(
          (res: any) => {
            this.isLoadingPassage = false;
            this.switchCanDropMode();
            event.container.data[event.currentIndex].id = null;
          },
          (err) => {
            this.isLoadingPassage = false;
            this.switchCanDropMode();
            this._toast.error("Erreur d'annulation du passage !");
            // refetch tour
            setTimeout(() => {
              if (this.isManyToursPlanned) this.getTourData(0);
              else this.getTourData(1);
            }, 1000);
          }
        );
      }
    }
  }
  dropAll() {
    this.rightSideItems = [...this.onInitItems];
    this.leftSideItems = [];
    this.rightSectors = [...this.onInitSectors];
    this.leftSectors = [];
  }
  clearAll() {
    this.rightSideItems = [];
    this.leftSideItems = [...this.onInitItems];
    this.rightSectors = [];
    this.leftSectors = [...this.onInitSectors];
  }

  /* helpers */
  getSectorById(sectorId: number) {
    return this.onInitSectors.find((item) => item.sector_id == sectorId);
  }
  getSectorPassages(passages: any[], sectorId: number) {
    return passages.filter(
      (item) => item.pickup_adresse?.sector_id == sectorId
    );
  }
  reSyncSectorsList(passages: any[]) {
    const sectors = [];
    const sectorsIds = [];
    for (let item of passages) {
      if (!sectorsIds.includes(item.pickup_adresse?.sector_id)) {
        const sectorId = item.pickup_adresse?.sector_id;
        const sector = this.getSectorById(sectorId);
        if (sector) sectors.push(sector);
        sectorsIds.push(sectorId);
      }
    }
    // todo fix me
    // sectors.sort((a, b) => (a.position > b.position) ? 1 : (a.position < b.position) ? -1 : 0)
    return sectors;
  }

  // planify a trounée
  planifyTour(planify: boolean) {
    if (!this.rightSideItems.length) {
      this._toast.warn("Aucun passages n'a été planifier !");
      return;
    }

    const payload: any = {};
    if (planify) payload.status = 'PLANED';
    else payload.status = 'INITIALIZED';

    this.isLoading = true;
    this.boTourService.planifyTour(this.tour.id, payload).subscribe(
      (res: any) => {
        this.isLoading = false;
        if (!this.isManyToursPlanned) this._router.navigate([`/tournees`]);
        else {
          this.tour.status = planify ? 'PLANED' : 'INITIALIZED';
          this.toursList = this.toursList.map((item) => {
            if (item.id == this.tour.id) item.status = this.tour.status;
            return item;
          });
        }
        // toaster alerts
        if (planify) this._toast.success('Tournée planifié avec succés !');
        else this._toast.success('Planification annulé avec succés !');

        this._router.navigate([`/passagereguliers`]);


        
      },
      (err) => {
        this.isLoading = false;
        this._toast.error('Une erreur est survenue !');
      }
    );
  }

  toggleplanifiee() {
    if (this.isLoading || this.isLoadingPassage) return;
    this.isOpen = false; //!this.isOpen;
  }
  openDialogpassage(): void {
    if (this.isLoading || this.isLoadingPassage) return;
    this.dialog.open(DialogPassageComponent, {
      disableClose: true,
      width: '805px',
      data: {},
    });
  }
  openDialogsecteur(): void {
    if (this.isLoading || this.isLoadingPassage) return;
    this.dialog.open(DialogSecteurComponent, {
      disableClose: true,
      width: '805px',
      data: {},
    });
  }
}
