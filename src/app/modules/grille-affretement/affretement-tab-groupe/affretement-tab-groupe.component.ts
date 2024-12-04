import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { PermissionService } from 'app/core/services/permission.service';
import { ToastService } from 'app/services';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-affretement-tab-groupe',
  templateUrl: './affretement-tab-groupe.component.html',
  styleUrls: ['./affretement-tab-groupe.component.css']
})
export class AffretementTabGroupeComponent implements OnInit {
  selectedTabIndex = 0;
  file = null;
  baseCalcul = 'KM';
  gridName = null;

  spinner = false;

  constructor(private gridService: BoGridService, private router: Router , private  toaster : ToastService, public permissionService: PermissionService) { }


  ngOnInit(): void {

    console.log( 'permession service' ,this.permissionService.hasPermission('Gestion commerciale', 'Grille affretement', 'U'))

    
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTabIndex = this.selectedTabIndex + 1;
    this.selectedTabIndex = tabChangeEvent.index;
  }
  uploadFile(event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }
  onBaseChange(event){
    console.log('EVENT:', event)
    this.baseCalcul = event.target.value
  }
  onSubmitForm(){

      if (this.file) {

        this.spinner = true;
        let formData: any = new FormData()

        if (this.selectedTabIndex == 0 ) {
          formData.append('type', 'TRANSPORT')
          formData.append('baseCalcul', this.baseCalcul)
          formData.append('gridName', this.gridName)
        }
        else if (this.selectedTabIndex == 1) {
          formData.append('type', 'SERVICE_BY_TRUCK')
          formData.append('gridName', this.gridName)
        }
        else if (this.selectedTabIndex == 2) {
          formData.append('type', 'SERVICE_GLOBAL')
          formData.append('gridName', this.gridName)
        }
        formData.append('file', this.file)

        this.gridService.importGridAffertment(formData).subscribe((d) => {
          this.spinner = false;
          this.toaster.success('Grille importée avec succès')
          const currentRoute = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentRoute]);
          });
        })
      }

  }


  exporter(){



    let selectedTabMapType = {
       0 : 'Transport_affretement_canvas.xlsx', 
       1 : 'Service_par_type_de_camion_affretement_canvas.xlsx',
       2 : 'Service_global_affretement_canvas.xlsx',
    }



    let fileName = selectedTabMapType[this.selectedTabIndex]
  
    const filePath = `assets/canvas/${fileName}`;
    this.readExcelFile(filePath , fileName);

    
  }

  private readExcelFile(filePath: string , fileName : string ): void {
    fetch(filePath)
      .then((res) => res.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        // Process the workbook as needed, or simply trigger download
        this.triggerDownload(workbook, fileName);
      });
  }

  private triggerDownload(workbook: XLSX.WorkBook, fileName: string): void {

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob: Blob = new Blob([excelBuffer], { type: '.xlsx' })
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    // Release the object URL to free up resources
    window.URL.revokeObjectURL(url);
  }
}
