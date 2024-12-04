import { Component, OnInit } from '@angular/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  citiesFilter : any;
  constructor(private boGridService: BoGridService,) { }

  ngOnInit(): void {
  }

  filterCity(event : any){
    console.log(event)
    console.log(event.target.value);
    if(event.target.value.length > 2){
      console.log("send request")
      this.boGridService.citiesFilter(event.target.value.toUpperCase()).subscribe((data) => {
        console.log(data);
        this.citiesFilter = data;
        console.log("filter", this.citiesFilter)
      },
      (error) => {
        console.log('error', error);
      });
    }else{
      console.log("not send")
    }
  }

}
