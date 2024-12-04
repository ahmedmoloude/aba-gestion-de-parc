import { DialogCovoyageComponent } from './dialog-covoyage/dialog-covoyage.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-convoyage',
  templateUrl: './convoyage.component.html',
  styleUrls: ['./convoyage.component.css'],
})
export class ConvoyageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.dialog.open(DialogCovoyageComponent, {
      disableClose: true,
      width: '1200px',
      data: {},
    });
  }
}
