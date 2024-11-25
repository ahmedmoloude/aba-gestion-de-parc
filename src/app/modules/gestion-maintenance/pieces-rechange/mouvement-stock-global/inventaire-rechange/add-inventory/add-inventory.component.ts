import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { StateEnum } from 'app/core/store/caisse/carte/carte.reducer';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { addInventory } from 'app/core/store/maintenance/piece-rechange/piece-rechange.actions';
import { PieceRechangeState } from 'app/core/store/maintenance/piece-rechange/piece-rechange.reducer';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  p: number = 1;

  @Input() stockReel: number;
  @Input() inventory: number;

  stock = new FormControl(null, [Validators.required]);

  headerColumuns = [
    'Inventorié par',
    'Date',
    'Stock réel',
  ];

  edit: boolean = false;
  spinner: boolean = false;

  inventory$ : Observable<PieceRechangeState> = this.store.select(state => state.pieceRechange);
  inventorySubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.stock.setValue(this.stockReel)
  }

  addInventory() {
    if(this.stock.invalid) return;
    this.spinner = true;
    this.edit = true;
    let inventory: any = new Object();
    inventory.stock_reel = this.stock.value;
    inventory.invantory_id = this.inventory;
    this.store.dispatch(addInventory({data: inventory}));
    this.inventorySubscription = this.inventory$.subscribe(
      (resp) => {
        if (resp.inventoryState == MaintenanceStateEnum.SUCCESS || resp.inventoryState == MaintenanceStateEnum.ERROR){
          this.spinner = false;
          this.edit=false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.inventorySubscription?.unsubscribe();
  }

}
