import { Component, OnInit } from '@angular/core';
import { DialogEntityComponent } from './dialog-entity/dialog-entity.component'; 
import { MatDialog } from '@angular/material/dialog';
import { EntityService } from 'app/core/services/entity/entity.service';
import { Router } from '@angular/router';
import { ToastService } from 'app/services';
import Swal from 'sweetalert2';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-parametre-entity',
  templateUrl: './parametre-entity.component.html',
  styleUrls: ['./parametre-entity.component.css']
})
export class ParametreEntityComponent implements OnInit {
  headerColumuns = ['Entité'];
  entities : any;
  spinner : boolean = false;
  p: number = 1;

  constructor(
    public dialog: MatDialog,
    private EntityService: EntityService,
    public route: Router,
    private _toast: ToastService,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    console.log('ParametreEntityComponent loaded'); // ✅
    this.spinner = true;
    this.EntityService.getEntities().subscribe(
      (data) => {
        this.entities = data['response'];
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
      });
  }

  openDialogAjoutertype(type = "add", item = null): void {
    const dialogRef = this.dialog.open(DialogEntityComponent, {
      disableClose: true,
      width: '582px',
      data: { type, item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (type === 'edit') {
          this.entities = this.entities.filter(obj => obj.uuid !== item.uuid);
          this.entities.unshift(data);
        } else {
          this.entities.unshift(data);
        }
      }
    });
  }

  delet(uuid: string) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer l\'entity ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.EntityService.deletEntity(uuid).subscribe(
          () => {
            this._toast.success('Entity supprimé avec succès!');
            this.entities = this.entities.filter(obj => obj.uuid !== uuid);
          },
          (error) => {
            this._toast.error('Une erreur est survenue lors de la suppression de l\'entity !');
          });
      }
    });
  }
}
