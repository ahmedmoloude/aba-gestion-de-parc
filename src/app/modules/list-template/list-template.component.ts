import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
import { selectSectorActivity } from './../../core/store/resources/resources.selectors';
import { TemplateDialogComponent } from './template-dialog/template-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { TemplateDetailsComponent } from './template-details/template-details.component';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.css'],
})
export class ListTemplateComponent implements OnInit {
  headerColumuns = ['Nom de template', "Secteur d'activité", 'Consultation'];
  p: number = 1;
  templates: any;
  links :any = [];
  spinner: boolean = false;
  activities : any = [];
  inputsFiler = [
    {
      name: 'title',
      placeholder: 'Nom de la grille',
      type: 'text'
    },
    {
      name: 'activity_id',
      placeholder: 'Secteur d\'activité',
      type: 'select',
      options: []
    },
  ];
  constructor(public dialog: MatDialog,
    private boGridService: BoGridService,
    private store: Store<AppState>,
    public permissionService: PermissionService) {}

  ngOnInit(): void {
    this.store.select(selectSectorActivity).subscribe((res) => {
      this.activities = res;
      for(var i=0; i<this.activities.length; i++){
        this.inputsFiler["1"].options.push({
          'text' : this.activities[i].title,
          'value' : this.activities[i].id,
        })
      }
      console.log("SECTEUR ACTIVITY", this.activities)
    });

    this.spinner = true;
    this.boGridService.fetchListTemplate('').subscribe(
      (data:any) => {
        this.templates = data.data;
        this.links = data.links
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  filter($event){
    this.spinner = true;
    console.log("FILTER CONTACT", $event)
    this.boGridService.fetchListTemplate($event).subscribe((data : any) => {
      this.spinner = false;
        console.log('data retourné ', data);
        this.templates = data.data;
        this.links = data.links
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TemplateDialogComponent, {
      disableClose: true,
      width: '831px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((data) => {
      console.warn('input data', data);
      if (data) {
        this.templates.push(data.response);
      }
    });
  }

  openDialogDetails(id): void {
    this.dialog.open(TemplateDetailsComponent, {
      disableClose: true,
      width: '1000px',
      data: { id },
    });
  }
  getTheNext(event){
    this.spinner = true;
    this.boGridService.fetchListTemplate(event).subscribe((response: any) => {
      this.templates = response.data;
      this.links = response.links
      this.spinner = false;
    });
  }
}
