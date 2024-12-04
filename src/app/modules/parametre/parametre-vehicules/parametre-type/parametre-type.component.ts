import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvtruckTypeIsLoading, selectEnvtruckTypePayload } from 'app/core/store/truckType/truckType.selectors';

@Component({
  selector: 'app-parametre-type',
  templateUrl: './parametre-type.component.html',
  styleUrls: ['./parametre-type.component.css'],
})
export class ParametreTypeComponent implements OnInit {
  headerColumuns = ['Type'];
  p: number = 1;
  types : any;
  spinner : boolean;

  constructor(private store: Store<AppState>,) {}

  ngOnInit(): void {
    this.store.select(selectEnvtruckTypePayload).subscribe((res) => {  
      // console.log(" brand========>", res)
      this.types = res
    });

    this.store.select(selectEnvtruckTypeIsLoading).subscribe((res) => {  
      // console.log(" spinner========>", res)
      this.spinner = res
    });
  }
}
