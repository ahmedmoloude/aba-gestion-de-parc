import { DialogLivraisonComponent } from './dialog-livraison/dialog-livraison.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-parc-livraison',
  templateUrl: './parc-livraison.component.html',
  styleUrls: ['./parc-livraison.component.css'],
})
export class ParcLivraisonComponent implements OnInit {
  constructor(public dialog: MatDialog,
    public permissionService: PermissionService) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.dialog.open(DialogLivraisonComponent, {
      disableClose: true,
      width: '831px',
      data: {},
    });
  }
}
