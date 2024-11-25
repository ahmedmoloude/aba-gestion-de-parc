/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IDynamicDialogConfig {
  title?: string;
  acceptButtonTitle?: string;
  declineButtonTitle?: string;
  dialogContent: TemplateRef<any>;
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IDynamicDialogConfig) {
    data.acceptButtonTitle ?? 'Yes';
    data.title ?? 'Unnamed Dialog';
  }

  ngOnInit(): void {}
}
