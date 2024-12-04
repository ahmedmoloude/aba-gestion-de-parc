import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { AvoirState } from 'app/core/store/facturation/avoir/avoir.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rapport-avoir',
  templateUrl: './rapport-avoir.component.html',
  styleUrls: ['./rapport-avoir.component.css']
})
export class RapportAvoirComponent implements OnInit {

  avoir$: Observable<AvoirState> = this.store.select(state => state.avoir);
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

}

