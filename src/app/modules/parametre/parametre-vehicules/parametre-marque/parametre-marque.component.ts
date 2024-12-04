import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvbrandPayload, selectEnvbrandIsLoading } from 'app/core/store/brand/brand.selectors';
@Component({
  selector: 'app-parametre-marque',
  templateUrl: './parametre-marque.component.html',
  styleUrls: ['./parametre-marque.component.css'],
})
export class ParametreMarqueComponent implements OnInit {
  headerColumuns = ['Marque'];
  p: number = 1;
  brands : any;
  spinner : boolean;

  constructor(private store: Store<AppState>,) {}

  ngOnInit(): void {
    this.store.select(selectEnvbrandPayload).subscribe((res) => {  
      // console.log(" brand========>", res)
      this.brands = res
    });

    this.store.select(selectEnvbrandIsLoading).subscribe((res) => {  
      // console.log(" spinner========>", res)
      this.spinner = res
    });
  }
}
