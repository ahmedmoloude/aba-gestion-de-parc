import { Component, OnInit } from '@angular/core';
import { DialogRamassageComponent } from './dialog-ramassage/dialog-ramassage.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-paramtre-ramassage',
  templateUrl: './paramtre-ramassage.component.html',
  styleUrls: ['./paramtre-ramassage.component.css']
})
export class ParamtreRamassageComponent implements OnInit {
  headerColumuns = ['Type de ramassage', 'Ville', 'Agence / Secteur', 'Chauffeur'];
  p: number = 1;
  constructor( public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  openramassage(): void {
    const dialogRef = this.dialog.open(DialogRamassageComponent, {
      disableClose: true,
      width: '562px',
      data: {  },
    });

    dialogRef.afterClosed().subscribe((data) => {
     console.log("data", data)
    });
  }

}
