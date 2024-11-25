import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {

  url = environment.STORAGE;
  document_path: string = '';
  constructor(
    public dialogRef: MatDialogRef<ShowImageComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { }

  ngOnInit(): void {
    this.document_path = !this.dialogData.document
      ? 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'
      : this.url +
        '/storage' +
        this.dialogData.document.path_document +
        '/' +
        this.dialogData.document.id +
        '.' +
        this.dialogData.document.extension;
  }

}
