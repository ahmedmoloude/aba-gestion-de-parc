import { DialogConosmationComponent } from './dialog-conosmation/dialog-conosmation.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-parametre-conosmation',
  templateUrl: './parametre-conosmation.component.html',
  styleUrls: ['./parametre-conosmation.component.css'],
})
export class ParametreConosmationComponent implements OnInit {
  headerColumuns = [
    'Marque',
    'Modèle',
    'Tonnage',
    '% de consommation théorique',
  ];
  page: number = 1;
  constructor(public dialog: MatDialog,
    public permissionService: PermissionService) {}

  ngOnInit(): void {}

  openDialogAjouter(): void {
    this.dialog.open(DialogConosmationComponent, {
      disableClose: true,
      width: '682px',
      data: {},
    });
  }
}
