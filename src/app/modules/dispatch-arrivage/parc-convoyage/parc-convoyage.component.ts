import { DialogConvoyageComponent } from './dialog-convoyage/dialog-convoyage.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-parc-convoyage',
  templateUrl: './parc-convoyage.component.html',
  styleUrls: ['./parc-convoyage.component.css'],
})
export class ParcConvoyageComponent implements OnInit {
  constructor(public dialog: MatDialog,
    public permissionService: PermissionService) {}

  ngOnInit(): void {}
  openDialog(): void {
    this.dialog.open(DialogConvoyageComponent, {
      disableClose: true,
      width: '831px',
      data: {},
    });
  }
}
