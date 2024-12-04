import { DialogStockComponent } from './dialog-stock/dialog-stock.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-parc-stock',
  templateUrl: './parc-stock.component.html',
  styleUrls: ['./parc-stock.component.css'],
})
export class ParcStockComponent implements OnInit {
  constructor(public dialog: MatDialog,
    public permissionService: PermissionService) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.dialog.open(DialogStockComponent, {
      disableClose: true,
      width: '831px',
      data: {},
    });
  }
}
