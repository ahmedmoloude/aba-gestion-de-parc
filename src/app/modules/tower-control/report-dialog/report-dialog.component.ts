// report-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export type ReportType = 
  | 'speed'
  | 'alarms'
  | 'power'
  | 'zones'
  | 'routes'
  | 'consumption'
  | '48hours'
  | 'weekend-routes'
  | 'kilometer-index'
  | 'kilometer-date'
  | 'kilometer-weekend'
  | 'kilometer-monthly';

export type DialogMode = 
  | 'date-range'
  | 'confirmation'
  | 'file-select';

export interface DialogData {
  type: ReportType;
}

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html'
})
export class ReportDialogComponent {
  startDate: string = '';
  endDate: string = '';
  sequenceNumber: string = '';

  dialogTitles: Record<ReportType, string> = {
    speed: 'Rapport des excès de vitesses',
    alarms: 'Rapport des alarmes/alertes',
    power: "Rapport des coupures d'alimentation",
    zones: 'Rapport des entrées/sorties des zones',
    routes: 'Rapport de trajets',
    consumption: 'Rapport consommations',
    '48hours': '48 heures',
    'weekend-routes': 'Rapport des trajets weekends',
    'kilometer-index': 'Rapport index kilomètrique',
    'kilometer-date': 'Rapport kilomètrique par date',
    'kilometer-weekend': 'Rapport kilomètrique weekends',
    'kilometer-monthly': 'Rapport kilomètrique mensuel'
  };

  fileSelectInfos = {
    'kilometer-monthly': {
      title: 'Rapport kilomètrique par mois',
      description: 'Le rapport est généré automatiquement vers la fin de chaque mois'
    },
    'kilometer-weekend': {
      title: 'Rapport des trajets weekends',
      description: 'Le rapport est généré automatiquement vers la fin de chaque mois'
    },
    'weekend-routes': {
      title: 'Rapport des trajets weekends',
      description: 'Le rapport est généré automatiquement vers la fin de chaque mois'
    }
  };

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  getDialogMode(): DialogMode {
    if (['48hours', 'kilometer-index'].includes(this.data.type)) {
      return 'confirmation';
    }
    if (['weekend-routes', 'kilometer-monthly', 'kilometer-weekend'].includes(this.data.type)) {
      return 'file-select';
    }
    return 'date-range';
  }

  showSequenceInput(): boolean {
    return ['routes', 'consumption', 'kilometer-date'].includes(this.data.type);
  }

  getFileSelectInfo() {
    return this.fileSelectInfos[this.data.type];
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onExtract(): void {
    this.dialogRef.close({
      action: 'extract',
      type: this.data.type,
      startDate: this.startDate,
      endDate: this.endDate,
      sequenceNumber: this.sequenceNumber
    });
  }

  onConfirm(): void {
    this.dialogRef.close({ action: 'confirm', type: this.data.type });
  }

  onDownload(): void {
    this.dialogRef.close({ action: 'download', type: this.data.type });
  }
}