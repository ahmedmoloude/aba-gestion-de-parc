import { DialogTransitComponent } from './dialog-transit/dialog-transit.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-parc-transit',
  templateUrl: './parc-transit.component.html',
  styleUrls: ['./parc-transit.component.css'],
})
export class ParcTransitComponent implements OnInit {
  constructor(public dialog: MatDialog,
    public permissionService: PermissionService) {}

  ngOnInit(): void {}
  openDialog(): void {
    this.dialog.open(DialogTransitComponent, {
      disableClose: true,
      width: '831px',
      data: {},
    });
  }
}
