import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { fetchVehicules } from 'app/core/store/vehicule/vehicule.actions';
import { selectEnvVehiculePayload } from 'app/core/store/vehicule/vehicule.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { DatePipe } from '@angular/common';
import { PersonelService } from 'app/core/services/personel.service';
@Component({
  selector: 'app-tab-gestion-disponibilites',
  templateUrl: './tab-gestion-disponibilites.component.html',
  styleUrls: ['./tab-gestion-disponibilites.component.css'],
})
export class TabGestionDisponibilitesComponent implements OnInit {
  selectedTabIndex = 0;
  constructor(private store: Store<AppState>,
    public datepipe: DatePipe,
    private personelService : PersonelService) {}

  ngOnInit(): void {}

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTabIndex = this.selectedTabIndex + 1;
    this.selectedTabIndex = tabChangeEvent.index;
  }

  formatNumber(value) {
    // console.log("value", value)
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

    getNumberOfMissionByMounth(convoyages,transferts ,tours){
    let i  = 0
    var date = new Date();
    var first_date = new Date(date);
    var lastDay = new Date(first_date);
    lastDay.setUTCDate(1);
    lastDay.setUTCMonth(lastDay.getUTCMonth() + 1);
    lastDay.setUTCDate(0) ;
    if(convoyages.length!=0){
      convoyages.forEach(element => {
        if(element.start_date < lastDay.toJSON().substring(0, 10)){
          i++
        }
      });
    }
    if(transferts.length!=0){
      convoyages.forEach(element => {
        if(element.start_date < lastDay.toJSON().substring(0, 10)){
          i++
        }
      });
    }
    if(tours.length!=0){
      convoyages.forEach(element => {
        if(element.start_date < lastDay.toJSON().substring(0, 10)){
          i++
        }
      });
    }
    return i ;
  }

  lastDateOfMission(convoyages,transferts ,tours){

    var dates = []
    if (convoyages.length!=0) {
      dates.push(
       convoyages.reduce((m,v,i) => (v.start_date > m.start_date) && i ? v : m).start_date
      )
     }
  if(transferts.length !=0){
      dates.push(
        transferts.reduce((m,v,i) => (v.start_date > m.start_date) && i ? v : m).start_date
      )
  }
  if(tours.length !=0 ){
    dates.push(
      tours.reduce((m,v,i) => (v.start_date > m.start_date) && i ? v : m).start_date
    )
  }
      if(dates && dates.length !=0){
        return dates.reduce(function (a, b) {
          return a > b ? a : b;
      });
      }
      else {
        return '---';
      }
}

  exportVahiculeExcel() {
    const data = [];
    let trucks = []
    this.store.dispatch(fetchVehicules({data: null, per_page : 10 , page : -1}));
    this.store.select(selectEnvVehiculePayload).subscribe((res:any) => {
      console.log("TRUCKS", res)
      trucks = res.data;
      for (const truck of trucks) {

        let object = {
          'N°': truck?.id,
          'Sous parc': truck?.parc?.name,
          'Code Véhicule': truck?.code_interne,
          'Marque': truck?.brand?.name,
          'Modèle': truck?.modele?.name,
          'Tonnage': truck?.tonnage?.name,
          'NB mission effectuée (mois)': truck?.nbr_mission,
          'Km parcouru': truck?.kilometrage,
          'Statut': (truck?.disponible?.status  && truck?.last_status?.status == 'En circulation') ? 'Disponible':'Indisponible',
          'Motif': truck?.disponible?.motif || '---',
        };
        data.push(object);
      }
      console.log('data', data);
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = {
        Sheets: { data: ws },
        SheetNames: ['data'],
      };
      const excelBuffer: any = XLSX.write(wb, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveExcelFile(excelBuffer, 'trucks');
    });


  }

  exportConducteurExcel() {
    const data = [];
    var drivers = [];
    this.personelService.getConduteurDispo(-1).subscribe((res:any)=>{
      drivers= res.response.data ;

    for (const driver of drivers) {
      let object = {
        'N°': driver?.id,
        'Conducteur': driver?.first_name + ' ' + driver?.last_name,
        'Matricule': driver?.matricule,
        'NB mission effectué (mois)': this.getNumberOfMissionByMounth( driver?.convoyages , driver?.transferts , driver?.tours) ,
        'Km parcouru': 'vvv',
        'NB d’heures de conduites': 'vvv',
        'Date de fin dernière mission': this.lastDateOfMission(driver?.convoyages , driver?.transferts ,driver?.tours ),
        'Statut': (driver?.disponible.status && driver?.statut && driver?.availablity.length ===0)? 'Disponible': 'Indisponible',
        'Motif': driver?.disponible.motif || '---',
      };
      data.push(object);
    }
    console.log('data', data);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = {
      Sheets: { data: ws },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveExcelFile(excelBuffer, 'drivers');
  }
    );
  }

  saveExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
