import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shared-upload',
  templateUrl: './shared-upload.component.html',
  styleUrls: ['./shared-upload.component.css']
})
export class SharedUploadComponent implements OnInit {

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  imageSrc: string;
  
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
  }

  onEditImage() {
    //
  }

}
