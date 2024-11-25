import { Service } from './../../../core/models/service.model';
import { DialogAddComponent } from './dialog-add/dialog-add.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PersonelService } from '../../../core/services/personel.service';
import { HistoriqueEpiComponent } from '../historique-epi/historique-epi.component';
import { environment } from 'environments/environment';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-detail-personnel',
  templateUrl: './detail-personnel.component.html',
  styleUrls: ['./detail-personnel.component.css'],
})
export class DetailPersonnelComponent implements OnInit {
  headerColumuns = ['EPI', 'Date d’attribution', 'Montant'];
  personnel: any = [];
  uuid: string = null;
  isLoading: boolean = false;
  epis: any = [];
  contact_1_gsm : any ;
  gsm_personnel : any ;
  gsm_professionnel : any ;
  image_src : any ;
  contact1 : any;
  studies_level : any;
  fixe_professionnel : any ;
  pro_experience :any;
  former_job : any ;
  diplome : any ;
  email :any ;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private personelservice: PersonelService,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.uuid = this.route.snapshot.params.uuid;
    this.getPersonnel(this.uuid)
    this.getEpis(this.uuid)
  
  }

  openDialog(uuid) {
    const dialogRef = this.dialog.open(DialogAddComponent, {
      disableClose: true,
      width: '831px',
      data: {
        uuid: uuid,
      },
    });
  }
  Voirhistorique(uuid) {
    const dialogRef = this.dialog.open(HistoriqueEpiComponent, {
      disableClose: true,
      width: '782px',
      height: '100vh',
      data: {
        uuid: uuid,
      },
      position: { right: '0px' },
    });
  }
  getPersonnel(uuid){
    this.personelservice.getPersonnelByUiid(uuid).subscribe((res:any) => {
      this.personnel = res.response;
      this.gsm_professionnel = JSON.parse(this.personnel.contact)?.gsm_professionnel
      this.gsm_personnel = JSON.parse(this.personnel.contact)?.gsm_personnel
      this.fixe_professionnel =JSON.parse(this.personnel.contact)?.fixe_professionnel
      this.contact1 = JSON.parse(this.personnel.contact)?.contact_1 
      this.contact_1_gsm = JSON.parse(this.personnel.contact)?.contact_1_gsm
      this.email = JSON.parse(this.personnel.contact)?.email 
      this.studies_level=JSON.parse(this.personnel.experience)?.studies_level
      this.pro_experience = JSON.parse(this.personnel.experience)?.pro_experience
      this.diplome = JSON.parse(this.personnel.experience)?.diplome
      this.former_job = JSON.parse(this.personnel.experience)?.former_job ;
      console.log("PERSONNEL", this.personnel)
      if(this.personnel.profile_picture_url){
        if(this.personnel.profile_picture_url?.includes("public")){
          var img_src = this.personnel.profile_picture_url?.replace("public/","")
          this.image_src = environment.STORAGE + '/'+ img_src
        }
        else {
          this.image_src = environment.STORAGE +'/uploads/personnel/profile_picture' + this.personnel.id + '/' + this.personnel.profile_picture_url
        }
      }

      this.isLoading = false;
    });
  }
  getEpis(uuid){
    this.personelservice.getPersonnelEpis(uuid).subscribe((res:any) => {
      this.epis = res.response;
    });
  }

}
