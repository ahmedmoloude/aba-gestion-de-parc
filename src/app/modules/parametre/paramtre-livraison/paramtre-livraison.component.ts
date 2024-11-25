import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialgLivraisonComponent } from './dialg-livraison/dialg-livraison.component';
import { ParametreService } from 'app/core/services/parametre.service';

@Component({
  selector: 'app-paramtre-livraison',
  templateUrl: './paramtre-livraison.component.html',
  styleUrls: ['./paramtre-livraison.component.css']
})
export class ParamtreLivraisonComponent implements OnInit {
  headerColumuns = ['Type de livraison', 'Ville', 'Agence / Secteur', 'Chauffeur'];
  p: number = 1;
  livraisons: any[] = [];


  loading = true
  constructor(
    public dialog: MatDialog,
    private parametreService: ParametreService
  ) { }

  ngOnInit(): void {
    this.getLivraisons();
  }

  getLivraisons(): void {
    this.parametreService.getDefaultDrivers({ process_type: 'delivery' }).subscribe(
      (data: any[]) => {
        this.livraisons = data;

        this.loading = false
      },
      error => {
        console.error('Error fetching livraison data', error);
      }
    );
  }

  openlivraison(): void {
    const dialogRef = this.dialog.open(DialgLivraisonComponent, {
      disableClose: true,
      width: '562px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getLivraisons(); // Refresh the list after adding a new livraison
      }
    });
  }

  deleteLivraison(id: number): void {
    this.parametreService.deleteDefaultDriver(id).subscribe(
      () => {
        this.getLivraisons(); // Refresh the list after deleting a livraison
      },
      error => {
        console.error('Error deleting livraison', error);
      }
    );
  }

  editLivraison(livraison: any): void {
    const dialogRef = this.dialog.open(DialgLivraisonComponent, {
      disableClose: true,
      width: '562px',
      data: livraison,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getLivraisons(); // Refresh the list after editing a livraison
      }
    });
  }
}
