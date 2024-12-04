import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import { DialogReclineComponent } from './dialog-recline/dialog-recline.component';
import { Router } from '@angular/router';
import { PermissionService } from 'app/core/services/permission.service';
// import { DetailsComponent } from './details-affretement/details-affretement.component';
@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  @Input() demande: any
  @Output() dataEvent = new EventEmitter<any>();

  constructor(public dialog: MatDialog,
              private _router: Router,
              public permissionService: PermissionService) { }

  ngOnInit(): void {
  }

  openDialogedit(demande): void {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '611px',
      data: { demande },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log("DATA ", data)
        this.dataEvent.emit(data)
      }
    });
  }

  openDialogrecline(): void {
    this.dialog.open(DialogReclineComponent, {
      width: '611px',
      data: {},
    });
  }

  detailsAffretement(uuid) {
    this._router.navigate([`detailsAffretement/${uuid}`]);
  }

  // openDialogDetails(demande): void {
  //   this.dialog.open(DetailsComponent, {
  //     disableClose: false,
  //     maxWidth: '100vw',
  //     maxHeight: '100vh',
  //     height: '100%',
  //     width: '100%',
  //     panelClass: 'full-screen-modal',
  //     data: { demande },
  //   });
  // }
}
