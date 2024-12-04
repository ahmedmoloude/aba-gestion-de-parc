import { Component, OnInit } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ToastService } from 'app/services';
import { BoCovoyageService } from 'app/core/services/admin-bo/bo-covoyage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
import { selectDrivers, selectTrucks } from 'app/core/store/resources/resources.selectors';


@Component({
  selector: 'app-generation-covoyage',
  templateUrl: './generation-covoyage.component.html',
  styleUrls: ['./generation-covoyage.component.css'],
})
export class GenerationCovoyageComponent implements OnInit {
  isLoading = false;
  isLoadingCovoyage = false;
  covUuid: string;

  covoyage: any = null; // current covoyage
  leftSideItems: any[] = []; // left container sectors and expeditions
  rightSideItems: any[] = []; // right container sectors and expeditions
  leftSideCities: any[] = [];

  driver_id = "";
  truck_id = "";
  drivers: any[] = [];
  trucks: any[] = [];

  constructor(private store: Store<AppState>, private _toast: ToastService, private boCovoyageService: BoCovoyageService,
    private router: Router, private _activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.covUuid = this._activatedRoute.snapshot.paramMap.get('uuid');
    this.fetchCovoyageExpeditions()
    this.store.select(selectDrivers).subscribe(res => this.drivers = res)
    this.store.select(selectTrucks).subscribe(res => this.trucks = res)
  }

  /* ---------------- getters ----------------*/
  get percentWeightFilled() {
    if (!this.covoyage?.truck?.tonnage) return 0;
    let result = (this.covoyage.total_weight / (this.covoyage?.truck?.tonnage * 1000)) * 100;

    result = Math.round(result * 100) / 100;
    if (result > 100) return 100; // if truck is full
    return result // round 2 decimals
  }
  get truckIsFull() {
    return (this.covoyage.total_weight / 1000) > this.covoyage?.truck?.tonnage ? true : false;
  }
  get truckBoxSize() {
    const maxBoxSize = 97; // truck is full
    const result = (maxBoxSize * this.percentWeightFilled) / 100;
    return Math.round(result);
  }
  /* ---------------------------------------------------------------- */

  resetTourData() { this.rightSideItems = []; this.leftSideItems = []; }
  fetchCovoyageExpeditions() {
    this.isLoading = true; this.resetTourData();
    this.boCovoyageService.getCovoyageExpToPlanify(this.covUuid).subscribe(
      (data: any) => {
        this.isLoading = false;
        const payload = data.response;
        this.covoyage = payload.covoyage;
        this.leftSideCities = this.covoyage.itineraries.map(item => item.city_destination)

        // set driver and truck
        this.driver_id = this.covoyage.driver_id || "";
        this.truck_id = this.covoyage.truck_id || "";

        // init left and rigth side expeditions
        this.rightSideItems = payload.expeditions_planified;
        payload.expeditions_to_planify.forEach((item: any, index: number) => {
          const { expeditions } = item;
          this.leftSideItems = this.leftSideItems.concat(expeditions);  // concat all expedetions in one array
        });
      },
      (error) => {
        this.isLoading = false; this._toast.error("Une erreur est survenue !")
      }
    );
  }

  getCityDestExpeditions(expeditions: any[], cityId: number) {
    return expeditions.filter(
      (item) => item?.expedition?.address_delivery?.sector?.zone.city_id == cityId
    );
  }
  getTransitCities() {
    return this.covoyage?.itineraries.map(item => item.city_destination?.name).join(" , ") || ""
  }

  canDrop(item: CdkDrag<any>) { return true; }
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const draggedPassage = event.container.data[event.currentIndex]

      // case left container id can't be get
      if (event.previousContainer.id.split('-').length != 4) {
        console.log(event.previousContainer.id, "left container")
        this._toast.error('Impossible de planifié cette expedition !');
        this.fetchCovoyageExpeditions();
        return;
      }

      const leftContainerID = parseInt(event.previousContainer.id.split('-')[3]);
      if (leftContainerID % 2 == 0) {
        // left side to right side (planify expedition)
        const payload = {
          'covoyage_id': this.covoyage.id,
          'covoyage_item_id': draggedPassage.expedition?.covoyage_item_id,
          'expedition_id': draggedPassage.expedition.id,
        }

        this.isLoadingCovoyage = true;
        this.boCovoyageService.planifyExpedition(payload).subscribe((res: any) => {
          this.isLoadingCovoyage = false; console.log(res.response); const payload = res.response;
          // add covoyage item
          event.container.data[event.currentIndex].covoyage_item = payload.planified_expedition.covoyage_item_expedition.covoyage_item
          event.container.data[event.currentIndex].id = payload.planified_expedition.covoyage_item_expedition.id // need in unplanify

          // update kpis covoyage 
          this.covoyage.total_colis = payload.covoyage.total_colis;
          this.covoyage.total_weight = payload.covoyage.total_weight;
          this.covoyage.total_volume = payload.covoyage.total_volume;
        }, err => {
          this.isLoadingCovoyage = false; this._toast.error('Expédition non planifié !');
          setTimeout(() => { this.fetchCovoyageExpeditions(); }, 1000);
        })
      } else {
        // right side to left side (unplanify passage)
        this.isLoadingCovoyage = true;
        this.boCovoyageService.unPlanifyExpedition(draggedPassage.id).subscribe((res: any) => {
          this.isLoadingCovoyage = false; console.log(res.response); const payload = res.response;
          event.container.data[event.currentIndex].expedition.covoyage_item_id = draggedPassage.covoyage_item.id // need in planify
          event.container.data[event.currentIndex].covoyage_item = null
          event.container.data[event.currentIndex].id = null

          // update kpis covoyage 
          this.covoyage.total_colis = payload.covoyage.total_colis;
          this.covoyage.total_weight = payload.covoyage.total_weight;
          this.covoyage.total_volume = payload.covoyage.total_volume;
        }, err => {
          this.isLoadingCovoyage = false;
          this._toast.error("Erreur d'annulation de l'expédition !");
          setTimeout(() => { this.fetchCovoyageExpeditions(); }, 1000);
        })

      }
    }
  }

  getExpeditionKpis(expedition: any) {
    let colis = 0; let weight = 0; let volume = 0;
    if (!expedition) return { colis, weight, volume, type: "" }

    const type = expedition.expedition_items.map((item: any) => item.type).join(" , ") || ""
    expedition.expedition_items.map((item: any) => {
      colis += parseFloat(item.number); weight += parseFloat(item.weight); volume += parseFloat(item.volume);
    })
    return { colis, weight, volume, type }
  }
  planifyCovoyage() {
    if (!this.driver_id || !this.truck_id) {
      this._toast.warn("Certains champs ne sont pas renseignés !"); return;
    }

    this.isLoading = true;
    this.boCovoyageService.updateCovoyage({
      status: 'PLANED',
      driver_id: this.driver_id,
      truck_id: this.truck_id,
    }, this.covoyage.uuid).subscribe(
      (data: any) => {
        this.isLoading = false;
        if (this.covoyage.status === "INITIALIZED") this._toast.success("Covoyage planifé avec succéss !")
        else this._toast.success("Covoyage modifié avec succéss !")
        this.router.navigate([`/listeconvoyage`]);
      },
      (error) => { this.isLoading = false; this._toast.error("Une erreur est survenue !") }
    );
  }
}
