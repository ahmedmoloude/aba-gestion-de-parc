import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvtonnagePayload, selectEnvtonnageIsLoading } from 'app/core/store/tonnage/tonnage.selectors';

@Component({
  selector: 'app-parametre-tonnage',
  templateUrl: './parametre-tonnage.component.html',
  styleUrls: ['./parametre-tonnage.component.css'],
})
export class ParametreTonnageComponent implements OnInit {
  headerColumuns = ['Marque'];
  p: number = 1;
  tonnages : any;
  spinner : boolean;

  constructor(private store: Store<AppState>,) {}

  ngOnInit(): void {
    this.store.select(selectEnvtonnagePayload).subscribe((res) => {  
      // console.log(" brand========>", res)
      this.tonnages = res
    });

    this.store.select(selectEnvtonnageIsLoading).subscribe((res) => {  
      // console.log(" spinner========>", res)
      this.spinner = res
    });
  }
}
