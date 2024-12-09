// report-menu.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReportDialogComponent, ReportType } from '../report-dialog/report-dialog.component';

interface MenuItem {
  icon: string;
  title: string;
  type: ReportType;
}

@Component({
  selector: 'app-report-menu',
  templateUrl: './report-menu.component.html'
})
export class ReportMenuComponent {
  menuItems: MenuItem[] = [
    { icon: 'speed', title: 'Rapport des excès de vitesses', type: 'speed' },
    { icon: 'warning', title: 'Rapport des alarmes/alertes', type: 'alarms' },
    { icon: 'power_off', title: "Rapport des coupures d'alimentation", type: 'power' },
    { icon: 'track_changes', title: 'Rapport des entrées/sorties des zones', type: 'zones' },
    { icon: 'place', title: 'Rapport de trajets', type: 'routes' },
    { icon: 'local_gas_station', title: 'Rapport de consommations', type: 'consumption' },
    { icon: 'schedule', title: '48 heures', type: '48hours' },
    { icon: 'event', title: 'Rapport de trajets weekends', type: 'weekend-routes' },
    { icon: 'timeline', title: "Rapport d'index kilomètrique", type: 'kilometer-index' },
    { icon: 'date_range', title: 'Rapport kilomètrique par date', type: 'kilometer-date' },
    { icon: 'weekend', title: 'Rapport kilomètrique week-end', type: 'kilometer-weekend' },
    { icon: 'assessment', title: 'Rapport kilomètrique mensuel', type: 'kilometer-monthly' }
  ];

  constructor(private dialog: MatDialog) {}

  openDialog(type: ReportType): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      data: { type },
      disableClose: false,
      panelClass: ['custom-dialog', 'rounded-lg'],
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      switch (result.action) {
        case 'extract':
          console.log('Extract data:', result);
          break;
        case 'confirm':
          console.log('Confirmed download for:', result.type);
          break;
        case 'download':
          console.log('Downloading file for:', result.type);
          break;
      }
    });
  }
}