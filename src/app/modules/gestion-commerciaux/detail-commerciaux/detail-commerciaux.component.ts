import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommercialService } from 'app/core/services/commercial.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-detail-commerciaux',
  templateUrl: './detail-commerciaux.component.html',
  styleUrls: ['./detail-commerciaux.component.css']
})
export class DetailCommerciauxComponent implements OnInit {

  constructor(private commercialService : CommercialService ,     private route: ActivatedRoute,    ) { }

  uuid  = ''
  kpis = {} as any
  current_relation = ''
  years: number[] = [];

  current_year;
  current_customer;
  customers = [];

  ngOnInit(): void {

     this.uuid = this.route.snapshot.params.uuid;
      this.commercialService.getCommercialKPIS(this.uuid).subscribe((res) => {
        this.kpis  = res
      })

      this.commercialService.getCommercialLinkedCustomers(this.uuid).subscribe((res) => {
        this.customers = res.customers
      });

      const currentYear = new Date().getFullYear();
      for (let i = currentYear; i >= 2000; i--) {
        this.years.push(i);
      }
  }


  get img_src() {

    if(this.kpis?.commercial?.profile_picture_url?.includes("public")){
      var img_src = this.kpis?.commercial?.profile_picture_url?.replace("public/","")
      return environment.STORAGE + '/'+ img_src
      }
      else {
        return environment.STORAGE +'/uploads/personnel/profile_picture' + this.kpis?.commercial?.id + '/' + this.kpis?.commercial?.profile_picture_url
      }

  }


  parseJson(item){
    // console.log('json' ,JSON.parse(item))
    return JSON.parse(item) as any
  }

  

  set_current_relation(new_relation){
    this.current_relation = new_relation
    console.log(this.current_relation)
  }


  onchange_year(event){
    console.log('onchange_year' , event.value)
    this.current_year = event.value
    this.commercialService.getCommercialKPIS(this.uuid , event.value).subscribe((res) => {
      this.kpis  = res
    })
  }

  on_change_customer(event){
    console.log('on_change_customer' , event.value)
    this.current_customer = event.value
    this.commercialService.getCommercialKPIS(this.uuid , this.current_year , this.current_customer ).subscribe((res) => {
      this.kpis  = res
    })
  }
}
