import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PermissionService } from 'app/core/services/permission.service';
import { AppState } from 'app/core/store/app.states';
import { loadVersementsCheck, loadVersementsVirement } from 'app/core/store/caisse/versement/versement.actions';
import { loadAccountCustomers } from 'app/core/store/customer/customer.actions';

@Component({
  selector: 'app-versement',
  templateUrl: './versement.component.html',
  styleUrls: ['./versement.component.css']
})
export class VersementComponent implements OnInit {

  selected = new FormControl(0);


  constructor(private store: Store<AppState>,
    public permissionService: PermissionService) { }

  ngOnInit(): void {
    this.store.dispatch(loadVersementsVirement({ data: null }));
    this.store.dispatch(loadVersementsCheck({ data: null }));
    this.store.dispatch(loadAccountCustomers());

  }

  getIndex() {
    console.log(this.selected.value);
  }
}
