import { DialogVolumeComponent } from './../volume-extincteur/dialog-volume/dialog-volume.component';
import { DialogTypeComponent } from './../type-extincteur/dialog-type/dialog-type.component';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-extincteur-tab-groupe',
  templateUrl: './extincteur-tab-groupe.component.html',
  styleUrls: ['./extincteur-tab-groupe.component.css'],
})
export class ExtincteurTabGroupeComponent implements OnInit {
  selectedTabIndex = 0;
  constructor(public dialog: MatDialog,
    public permissionService: PermissionService) {}

  ngOnInit(): void {}
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTabIndex = this.selectedTabIndex + 1;
    this.selectedTabIndex = tabChangeEvent.index;
  }
  openDialogAjoutertype(item, mode = "add"): void {
    this.dialog.open(DialogTypeComponent, {
      disableClose: true,
      width: '382px',
      data: { item, mode },
    });
  }
  openDialogAjoutervolume(item, mode = "add"): void {
    this.dialog.open(DialogVolumeComponent, {
      disableClose: true,
      width: '382px',
      data: { item, mode },
    });
  }
}
