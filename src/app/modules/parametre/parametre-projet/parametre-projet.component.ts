import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjetService } from 'app/core/services/projet/projet.service';
import { ToastService } from 'app/services';
import Swal from 'sweetalert2';
import { DialogProjetComponent } from './dialog-projet/dialog-projet.component';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-parametre-projet',
  templateUrl: './parametre-projet.component.html',
  styleUrls: ['./parametre-projet.component.css']
})
export class ParametreProjetComponent implements OnInit {
  projets: any[] = [];
  spinner = false;
  headerColumuns = ['Projet'];
  constructor(
    private projetService: ProjetService,
    private dialog: MatDialog,
    private toast: ToastService,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets() {
    this.spinner = true;
    this.projetService.getProjets().subscribe({
      next: (res) => {
        this.projets = res['response'] || [];
        this.spinner = false;
      },
      error: () => this.spinner = false
    });
  }

  openDialog(type: 'add' | 'edit', item: any = null) {
    const dialogRef = this.dialog.open(DialogProjetComponent, {
      width: '500px',
      data: { type, item },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.loadProjets();
      }
    });
  }

  openDialogAjoutertype(type = "add", item = null): void {
      const dialogRef = this.dialog.open(DialogProjetComponent, {
        disableClose: true,
        width: '582px',
        data: { type, item },
      });
  
      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          if (type === 'edit') {
            this.projets = this.projets.filter(obj => obj.uuid !== item.uuid);
            this.projets.unshift(data);
          } else {
            this.projets.unshift(data);
          }
        }
      });
    }

  // delete(uuid: string) {
  //   Swal.fire({
  //     title: 'Confirmer la suppression ?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Supprimer'
  //   }).then(result => {
  //     if (result.isConfirmed) {
  //       this.projetService.deleteProjet(uuid).subscribe({
  //         next: () => {
  //           this.toast.success('Projet supprimé');
  //           this.loadProjets();
  //         },
  //         error: () => this.toast.error('Erreur lors de la suppression')
  //       });
  //     }
  //   });
  // }
}
